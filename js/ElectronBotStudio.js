        class ElectronBotStudio {
            constructor() {
                // Unity RobotController variables
                this.slerpRatio = 0.1;
                
                // Target angles (exact Unity naming) - REMOVED ARM CONTROLS
                this.targetAngleHead = 0;
                this.targetAngleBody = 0;
                this.targetAngleMouth = 0; // Add mouth control
                
                this.isPlaying = false;
                this.currentFrame = 0;
                this.requestFrame = -1;
                
                // Timeline data
                this.timelineFrames = [];
                
                // Advanced Trajectory Parameters
                this.trajectoryParams = {
                    height: 0.04,      // Updated to match current Height setting
                    direction: 0,      // Direction angle in degrees
                    curvature: 1.0,    // Curvature factor
                    progress: 0,       // Current progress (0-1)
                    // Individual dot positions (0-1 scale, multiplied by height)
                    greenDot: 0.05,    // Green dot depth position (25% progress) - baseline
                    yellowDot: 0.15,   // Yellow dot depth position (50% progress) - baseline
                    orangeDot: 0.4,    // Orange dot depth position (75% progress) - baseline
                    blueDot: 0.75,     // Blue dot depth position (100% progress) - baseline
                    // Individual dot vertical offsets (-0.8 to +0.8, multiplied by height)
                    greenVertical: -0.3,   // Green dot vertical offset - baseline
                    yellowVertical: -0.6,  // Yellow dot vertical offset - baseline
                    orangeVertical: -0.9,  // Orange dot vertical offset - baseline
                    blueVertical: -1.0     // Blue dot vertical offset - baseline
                };
                
                // Baseline parameters for LEFT FACE diagonal trajectory
                this.leftFaceTrajectoryParams = {
                    height: -0.04,      // New baseline from user adjustment
                    direction: 180,
                    
                    // HORIZONTAL-only params (the OLD depth values). NOT connected to sliders.
                    // This preserves the user's desired horizontal positions permanently.
                    greenLat: 0.45,
                    yellowLat: 0.6,
                    orangeLat: 0.7,
                    blueLat: 0.75,

                    // DEPTH-only params - NEW BASELINES
                    greenDot: -0.05,
                    yellowDot: 0.05,
                    orangeDot: 0.2,
                    blueDot: 0.35,

                    // Vertical params - NEW BASELINES
                    greenVertical: -0.1,
                    yellowVertical: -0.35,
                    orangeVertical: -0.65,
                    blueVertical: -0.9
                };
                
                // Visualization containers for left face trajectory
                this.leftFaceTrajectoryLine = null;
                this.leftFaceTrajectoryPoints = null;
                this.leftFaceTrajectoryPointsForMovement = null;
                this.leftFaceTrajectoryDebugMarkers = [];
                
                // Trajectory animation
                this.trajectoryAnimation = {
                    isAnimating: false,
                    startTime: 0,
                    duration: 2000 // 2 seconds
                };
                
                // NEW: Animation properties for Left Face
                this.isLeftFaceAnimating = false;
                this.leftFaceAnimationId = null;
                this.leftFaceAnimationStartTime = 0;
                
                // Animation properties for back-and-forth mouth movement
                this.isAnimating = false;
                this.animationId = null;
                this.animationStartTime = 0;
                
                // Timeline and animation state
                this.timeline = [];
                this.currentFrame = 0;
                this.isRecording = false;
                
                // Orientation cube state
                this.cubeRotation = { x: 0, y: 0 };
                this.isDraggingCube = false;
                this.dragStart = { x: 0, y: 0 };
                this.currentView = 'front';
                
                this.initThreeJS();
                this.setupEventListeners();
                this.initializeFrame0();
                this.initOrientationCube();
            }
            
            initThreeJS() {
                const container = document.getElementById('robot-viewport');
                
                // Scene setup
                this.scene = new THREE.Scene();
                this.scene.background = new THREE.Color(0x2c3e50); // Unity-style darker blue-gray
                
                // Camera
                this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
                this.camera.position.set(0, 2, 6);
                
                // Renderer
                this.renderer = new THREE.WebGLRenderer({ antialias: true });
                this.renderer.setSize(container.clientWidth, container.clientHeight);
                this.renderer.shadowMap.enabled = true;
                this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                this.renderer.setClearColor(0x2c3e50, 1); // Match scene background
                container.appendChild(this.renderer.domElement);
                
                // Controls - Simple front-facing camera with Y-axis rotation ONLY
                this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
                this.controls.enableDamping = false; // Disable damping for precise control
                this.controls.rotateSpeed = 1.0; // Standard rotation speed
                this.controls.zoomSpeed = 1.2; // Zoom control
                this.controls.enableZoom = true; // Allow zoom in/out
                this.controls.enableRotate = true; // Allow rotation
                this.controls.enablePan = false; // Disable panning - anchored base
                this.controls.autoRotate = false;
                
                // REMOVED CAMERA LIMITS - Allow unlimited rotation in all directions
                // this.controls.minPolarAngle = Math.PI * 0.4; // REMOVED - no vertical limits
                // this.controls.maxPolarAngle = Math.PI * 0.6; // REMOVED - no vertical limits
                this.controls.minAzimuthAngle = -Infinity; // Full horizontal Y-axis rotation
                this.controls.maxAzimuthAngle = Infinity; // Full horizontal Y-axis rotation
                
                // Remove zoom limits - let user zoom freely
                // this.controls.minDistance = 3; // REMOVED - no zoom limits
                // this.controls.maxDistance = 10; // REMOVED - no zoom limits
                this.controls.target.set(0, 0, 0); // Center target
                
                // Lighting - Balanced lighting (not too bright)
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Moderate ambient
                this.scene.add(ambientLight);
                
                // Main directional light (key light)
                const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                directionalLight.position.set(5, 10, 5);
                directionalLight.castShadow = true;
                directionalLight.shadow.mapSize.width = 2048;
                directionalLight.shadow.mapSize.height = 2048;
                directionalLight.shadow.camera.near = 0.1;
                directionalLight.shadow.camera.far = 50;
                directionalLight.shadow.camera.left = -10;
                directionalLight.shadow.camera.right = 10;
                directionalLight.shadow.camera.top = 10;
                directionalLight.shadow.camera.bottom = -10;
                this.scene.add(directionalLight);
                
                // Fill lights for even illumination
                const fillLight1 = new THREE.DirectionalLight(0xffffff, 0.3);
                fillLight1.position.set(-5, 5, -5);
                this.scene.add(fillLight1);
                
                const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.2);
                fillLight2.position.set(0, -5, 10);
                this.scene.add(fillLight2);
                
                const fillLight3 = new THREE.DirectionalLight(0xffffff, 0.2);
                fillLight3.position.set(10, 0, -5);
                this.scene.add(fillLight3);
                
                // Hemisphere light for natural-looking illumination
                const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
                hemiLight.position.set(0, 20, 0);
                this.scene.add(hemiLight);
                
                this.loadElectronBotModel();
                this.animate();
            }
            
            loadElectronBotModel() {
                const loader = new THREE.GLTFLoader();
                
                // Remove old robot if present
                if (this.robot) {
                    this.scene.remove(this.robot);
                }
                this.robot = new THREE.Group();
                
                // Load GLTF component files from correct directory
                const componentFiles = [
                    'west_world/4.CAD-Model/Head3.0/Cranium.gltf',
                    'west_world/4.CAD-Model/Head3.0/Mouth.gltf',
                    'west_world/4.CAD-Model/Head3.0/Lower_Cheek.gltf',
                    'west_world/4.CAD-Model/Head3.0/Upper_Cheek.gltf',
                    'west_world/4.CAD-Model/Head3.0/Left_Face.gltf'
                ];
                
                let loadedComponents = 0;
                this.totalComponents = componentFiles.length; // Make it a class property
                this.componentFiles = componentFiles; // Store for debugging
                
                console.log(`Loading ${this.totalComponents} GLTF component files...`);
                
                componentFiles.forEach((filename, index) => {
                    loader.load(filename, (gltf) => {
                        console.log(`Loaded GLTF component: ${filename}`);
                        
                        // Add each component to the robot group
                        const component = gltf.scene;
                        component.name = filename.replace('.gltf', ''); // Clean name
                        
                        // Enhanced material processing for GLTF files
                        component.traverse((child) => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                
                                // Ensure materials are bright and visible
                                if (child.material) {
                                    // Force material update
                                    child.material.needsUpdate = true;
                                    
                                    // DISABLE FACE CULLING - Show both sides of triangles
                                    child.material.side = THREE.DoubleSide;
                                    
                                    // If material is too dark, brighten it slightly
                                    if (child.material.color) {
                                        const hsl = {};
                                        child.material.color.getHSL(hsl);
                                        // Only brighten if it's very dark (lightness < 0.3)
                                        if (hsl.l < 0.3) {
                                            child.material.color.setHSL(hsl.h, hsl.s, Math.max(hsl.l, 0.4));
                                        }
                                    }
                                    
                                    // Reduce metalness if too high (can make materials appear dark)
                                    if (child.material.metalness !== undefined && child.material.metalness > 0.7) {
                                        child.material.metalness = 0.3;
                                    }
                                    
                                    // Adjust roughness for better visibility
                                    if (child.material.roughness !== undefined && child.material.roughness > 0.8) {
                                        child.material.roughness = 0.5;
                                    }
                                    
                                    // Ensure material is not transparent unless intended
                                    if (child.material.transparent === undefined) {
                                        child.material.transparent = false;
                                    }
                                    if (child.material.opacity === undefined) {
                                        child.material.opacity = 1.0;
                                    }
                                }
                            }
                        });
                        
                        // Add component to robot group (should maintain original position)
                        this.robot.add(component);
                        
                        loadedComponents++;
                        console.log(`Component ${loadedComponents}/${this.totalComponents} loaded: ${filename}`);
                        
                        // When all components are loaded
                        if (loadedComponents === this.totalComponents) {
                            this.onAllComponentsLoaded();
                        }
                        
                    }, undefined, (error) => {
                        console.error(`Error loading GLTF component ${filename}:`, error);
                        loadedComponents++;
                        
                        // Continue even if one component fails
                        if (loadedComponents === this.totalComponents) {
                            this.onAllComponentsLoaded();
                        }
                    });
                });
            }
            
            onAllComponentsLoaded() {
                console.log('All components loaded successfully!');
                
                // Calculate bounding box of the complete model
                const box = new THREE.Box3().setFromObject(this.robot);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                
                console.log('Model bounding box:', {
                    center: center,
                    size: size,
                    min: box.min,
                    max: box.max
                });
                
                // DEBUG: List all components and their names
                console.log('=== LOADED COMPONENTS DEBUG ===');
                console.log(`Total components loaded: ${this.totalComponents}`);
                console.log('Component files loaded:', this.componentFiles);
                this.robot.traverse((child) => {
                    if (child.isMesh || child.isGroup || child.isObject3D) {
                        console.log('Component found:', {
                            name: child.name,
                            type: child.type,
                            isMesh: child.isMesh,
                            isGroup: child.isGroup,
                            parent: child.parent ? child.parent.name : 'root',
                            position: child.position,
                            rotation: child.rotation
                        });
                    }
                });
                console.log('=== END COMPONENTS DEBUG ===');
                
                // Center the model
                this.robot.position.sub(center);
                
                // ROTATE THE ROBOT TO BE UPRIGHT - Face forward, not backwards
                this.robot.rotation.x = Math.PI / 2; // Keep X rotation to make it upright
                // Remove Z rotation - this was making it face backwards
                
                // Add to scene
                this.scene.add(this.robot);
                
                // Camera setup - Make head bigger from the start
                const maxDim = Math.max(size.x, size.y, size.z);
                const distance = maxDim * 2; // Better distance calculation based on model size
                
                console.log('Camera setup:', {
                    maxDim: maxDim,
                    distance: distance,
                    modelCenter: center,
                    modelSize: size
                });
                
                // Position camera SQUARE FRONT - no angles, straight ahead
                this.camera.position.set(0, 0, distance);
                
                // Look straight at the center of the upright head
                this.camera.lookAt(0, 0, 0);
                this.controls.target.set(0, 0, 0);
                this.controls.update();
                
                console.log('Camera positioned at:', this.camera.position);
                console.log('Camera looking at:', this.controls.target);
                
                // Hide loading indicator
                document.querySelector('.loading').style.display = 'none';
                
                // Initialize left face panel physics
                this.initializeLeftFacePanelPhysics();
                
                // Build the Left Face diagonal trajectory visualization
                this.addLeftFaceTrajectoryVisualization();
                
                // List all model components to find "Middle Linkage"
                this.listModelComponents();
                
                // Add simple trajectory visualization
                this.addSimpleTrajectoryVisualization();
                
                console.log('Left Face Panel Physics Engine Initialized');
                if (this.leftFaceTrajectoryLine) this.leftFaceTrajectoryLine.visible = false;
                if (this.leftFaceTrajectoryDebugMarkers) this.leftFaceTrajectoryDebugMarkers.forEach(m=>m.visible=false);
                if (this.trajectoryLine) this.trajectoryLine.visible = false;
                if (this.trajectoryDebugMarkers) this.trajectoryDebugMarkers.forEach(marker=>marker.visible=false);
            }
            
            // Unity Update method - HEAD UPRIGHT WITH Z-AXIS ROTATION ONLY
            update() {
                if (!this.robot) return;
                
                // HEAD ROTATION - Apply to entire robot so all parts (cranium + mouth) move together
                const headTargetRotZ = this.targetAngleHead * Math.PI / 180;
                this.robot.rotation.z = THREE.MathUtils.lerp(this.robot.rotation.z, headTargetRotZ, this.slerpRatio);
                
                // BODY ROTATION - Apply Y-axis rotation (separate from head)
                const bodyTargetRotY = this.targetAngleBody * Math.PI / 180;
                this.robot.rotation.y = THREE.MathUtils.lerp(this.robot.rotation.y, bodyTargetRotY, this.slerpRatio);
                
                // MOUTH INDIVIDUAL CONTROL - Find and control mouth component separately for jaw movement
                let mouthComponent = null;
                this.robot.traverse((child) => {
                    // Look for the main Mouth component group (the parent of all Mouth_XX meshes)
                    if (child.name && child.name === 'Mouth') {
                        mouthComponent = child;
                    }
                });
                
                // If we didn't find the main Mouth group, look for the GLTF scene containing mouth meshes
                if (!mouthComponent) {
                    this.robot.traverse((child) => {
                        // Look for a group that contains multiple mouth meshes
                        if (child.isGroup || child.isObject3D) {
                            let mouthMeshCount = 0;
                            child.traverse((subChild) => {
                                if (subChild.name && subChild.name.includes('Mouth_')) {
                                    mouthMeshCount++;
                                }
                            });
                            if (mouthMeshCount > 5) { // If this group contains multiple mouth meshes
                                mouthComponent = child;
                            }
                        }
                    });
                }
                
                if (mouthComponent) {
                    // MOUTH ROTATION - Simple X-axis rotation (jaw movement) - separate from head rotation
                    const mouthTargetRotX = this.targetAngleMouth * Math.PI / 180;
                    mouthComponent.rotation.x = THREE.MathUtils.lerp(mouthComponent.rotation.x, mouthTargetRotX, this.slerpRatio);
                }
                
                // Update slider values if playing
                if (this.isPlaying) {
                    document.getElementById('bodySlider').value = this.targetAngleBody;
                    document.getElementById('headSlider').value = this.targetAngleHead;
                    this.updateSliderDisplays();
                }
                
                // Update left face panel physics
                this.updateLeftFacePanelPhysics();
            }
            
            animate() {
                requestAnimationFrame(() => this.animate());
                this.controls.update();
                this.update();
                this.renderer.render(this.scene, this.camera);
            }
            
            // Unity setter methods - exact naming (REMOVED ARM CONTROLS)
            setAngleBody(val) { this.targetAngleBody = val; }
            setAngleHead(val) { this.targetAngleHead = val; }
            setAngleMouth(val) { this.targetAngleMouth = val; }
            
            // Unity ResetPose method
            resetPose() {
                // Instantly snap all rotating parts back to 0 before doing anything else.
                // This ensures all coordinate systems are in their default state before
                // any trajectory recalculations happen.
                if (this.head) this.head.rotation.y = 0;
                if (this.body) this.body.rotation.y = 0;

                this.targetAngleHead = 0;
                this.targetAngleBody = 0;
                this.targetAngleMouth = 0; // Reset mouth
                
                // Update sliders
                document.getElementById('headSlider').value = 0;
                document.getElementById('bodySlider').value = 0;
                this.updateSliderDisplays();
                
                // Reset all mouth and left face trajectory controls
                this.resetAllMouthControls();
                this.resetLeftFacePanel();
            }
            
            // New method to reset all mouth trajectory controls
            resetAllMouthControls() {
                // Reset all trajectory sliders to center (0)
                document.getElementById('trajectoryProgressSlider').value = 0;
                document.getElementById('trajectoryProgressValue').textContent = '0%';
                
                // Reset collapsed progress slider too
                document.getElementById('trajectoryProgressSliderCollapsed').value = 0;
                document.getElementById('trajectoryProgressValueCollapsed').textContent = '0%';
                
                document.getElementById('trajectoryHeightSlider').value = 0;
                document.getElementById('trajectoryHeightValue').textContent = '0';
                
                document.getElementById('trajectoryDirectionSlider').value = 0;
                document.getElementById('trajectoryDirectionValue').textContent = '0°';
                
                // Reset all dot control sliders to 0
                document.getElementById('greenDotSlider').value = 0;
                document.getElementById('greenDotValue').textContent = '0';
                document.getElementById('greenVerticalSlider').value = 0;
                document.getElementById('greenVerticalValue').textContent = '0';
                
                document.getElementById('yellowDotSlider').value = 0;
                document.getElementById('yellowDotValue').textContent = '0';
                document.getElementById('yellowVerticalSlider').value = 0;
                document.getElementById('yellowVerticalValue').textContent = '0';
                
                document.getElementById('orangeDotSlider').value = 0;
                document.getElementById('orangeDotValue').textContent = '0';
                document.getElementById('orangeVerticalSlider').value = 0;
                document.getElementById('orangeVerticalValue').textContent = '0';
                
                document.getElementById('blueDotSlider').value = 0;
                document.getElementById('blueDotValue').textContent = '0';
                document.getElementById('blueVerticalSlider').value = 0;
                document.getElementById('blueVerticalValue').textContent = '0';
                
                // Reset trajectory parameters to baseline values
                this.trajectoryParams.height = 0.04; // Baseline + 0
                this.trajectoryParams.direction = 0;
                this.trajectoryParams.progress = 0;
                this.trajectoryParams.greenDot = 0.05; // Baseline + 0
                this.trajectoryParams.yellowDot = 0.15; // Baseline + 0
                this.trajectoryParams.orangeDot = 0.4; // Baseline + 0
                this.trajectoryParams.blueDot = 0.75; // Baseline + 0
                this.trajectoryParams.greenVertical = -0.3; // Baseline + 0
                this.trajectoryParams.yellowVertical = -0.6; // Baseline + 0
                this.trajectoryParams.orangeVertical = -0.9; // Baseline + 0
                this.trajectoryParams.blueVertical = -1.0; // Baseline + 0
                
                // Update trajectory and mouth position
                this.updateTrajectoryPath();
                this.setMouthTrajectoryPosition(0);
                
                // Hide trajectory line and debug markers after reset
                if (this.trajectoryLine) {
                    this.trajectoryLine.visible = false;
                }
                if (this.trajectoryDebugMarkers) {
                    this.trajectoryDebugMarkers.forEach(marker => marker.visible = false);
                }
                
                // Stop any running animation
                if (this.isAnimating) {
                    this.isAnimating = false;
                    if (this.animationId) {
                        cancelAnimationFrame(this.animationId);
                        this.animationId = null;
                    }
                    const animateBtn = document.getElementById('animateBtn');
                    if (animateBtn) {
                        animateBtn.textContent = 'Animate';
                        animateBtn.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
                    }
                }
                
                console.log('All trajectory controls reset to center (0) - mouth returned to baseline position - trajectory visualization hidden');
            }
            
            updateSliderDisplays() {
                document.getElementById('headValue').textContent = document.getElementById('headSlider').value + '°';
                document.getElementById('bodyValue').textContent = document.getElementById('bodySlider').value + '°';
            }
            
            updateTrajectoryDisplays() {
                document.getElementById('trajectoryProgressValue').textContent = document.getElementById('trajectoryProgressSlider').value + '%';
                document.getElementById('trajectoryHeightValue').textContent = document.getElementById('trajectoryHeightSlider').value;
                document.getElementById('trajectoryDirectionValue').textContent = document.getElementById('trajectoryDirectionSlider').value + '°';
                document.getElementById('greenDotValue').textContent = document.getElementById('greenDotSlider').value;
                document.getElementById('yellowDotValue').textContent = document.getElementById('yellowDotSlider').value;
                document.getElementById('orangeDotValue').textContent = document.getElementById('orangeDotSlider').value;
                document.getElementById('greenVerticalValue').textContent = document.getElementById('greenVerticalSlider').value;
                document.getElementById('yellowVerticalValue').textContent = document.getElementById('yellowVerticalSlider').value;
                document.getElementById('orangeVerticalValue').textContent = document.getElementById('orangeVerticalSlider').value;
                document.getElementById('blueDotValue').textContent = document.getElementById('blueDotSlider').value;
                document.getElementById('blueVerticalValue').textContent = document.getElementById('blueVerticalSlider').value;
            }
            
            setupEventListeners() {
                // Servo control sliders (REMOVED ARM CONTROLS)
                document.getElementById('headSlider').addEventListener('input', (e) => {
                    this.setAngleHead(parseInt(e.target.value));
                    this.updateSliderDisplays();
                });
                
                document.getElementById('bodySlider').addEventListener('input', (e) => {
                    this.setAngleBody(parseInt(e.target.value));
                    this.updateSliderDisplays();
                });
                
                
                
                
                
                // Trajectory control sliders
                document.getElementById('trajectoryProgressSlider').addEventListener('input', (e) => {
                    const progress = parseInt(e.target.value) / 100; // Convert to 0-1 range
                    this.trajectoryParams.progress = progress;
                    this.setMouthTrajectoryPosition(progress);
                    this.updateTrajectoryDisplays();
                    
                    // Sync with collapsed slider
                    const collapsedSlider = document.getElementById('trajectoryProgressSliderCollapsed');
                    const collapsedValue = document.getElementById('trajectoryProgressValueCollapsed');
                    if (collapsedSlider && collapsedValue) {
                        collapsedSlider.value = e.target.value;
                        collapsedValue.textContent = e.target.value + '%';
                    }
                });
                
                document.getElementById('trajectoryHeightSlider').addEventListener('input', (e) => {
                    this.trajectoryParams.height = 0.04 + parseFloat(e.target.value); // Baseline 0.04 + slider offset
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                });
                
                document.getElementById('trajectoryDirectionSlider').addEventListener('input', (e) => {
                    this.trajectoryParams.direction = parseInt(e.target.value);
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                });
                
                // Individual dot position controls
                document.getElementById('greenDotSlider').addEventListener('input', (e) => {
                    this.trajectoryParams.greenDot = 0.05 + parseFloat(e.target.value); // Keep existing baseline
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                });
                
                document.getElementById('yellowDotSlider').addEventListener('input', (e) => {
                    this.trajectoryParams.yellowDot = 0.15 + parseFloat(e.target.value); // Updated baseline: 0.2 + (-0.05) = 0.15
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                });
                
                document.getElementById('orangeDotSlider').addEventListener('input', (e) => {
                    this.trajectoryParams.orangeDot = 0.4 + parseFloat(e.target.value); // Updated baseline: 0.45 + (-0.05) = 0.4
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                });
                
                // Individual dot vertical position controls
                document.getElementById('greenVerticalSlider').addEventListener('input', (e) => {
                    this.trajectoryParams.greenVertical = -0.3 + parseFloat(e.target.value); // Keep existing baseline
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                });
                
                document.getElementById('yellowVerticalSlider').addEventListener('input', (e) => {
                    this.trajectoryParams.yellowVertical = -0.6 + parseFloat(e.target.value); // Keep existing baseline
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                });
                
                document.getElementById('orangeVerticalSlider').addEventListener('input', (e) => {
                    this.trajectoryParams.orangeVertical = -0.9 + parseFloat(e.target.value); // Updated baseline: -0.8 + (-0.1) = -0.9
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                });
                
                document.getElementById('blueDotSlider').addEventListener('input', (e) => {
                    this.trajectoryParams.blueDot = 0.75 + parseFloat(e.target.value); // Updated baseline: 0.85 + (-0.1) = 0.75
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                });
                
                document.getElementById('blueVerticalSlider').addEventListener('input', (e) => {
                    this.trajectoryParams.blueVertical = -1.0 + parseFloat(e.target.value); // Updated baseline: -0.8 + (-0.2) = -1.0
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                });
                
                // Collapsed trajectory progress slider
                document.getElementById('trajectoryProgressSliderCollapsed').addEventListener('input', (e) => {
                    const progress = parseInt(e.target.value) / 100; // Convert to 0-1 range
                    this.trajectoryParams.progress = progress;
                    this.setMouthTrajectoryPosition(progress);
                    
                    // Sync with main slider
                    const mainSlider = document.getElementById('trajectoryProgressSlider');
                    const mainValue = document.getElementById('trajectoryProgressValue');
                    if (mainSlider && mainValue) {
                        mainSlider.value = e.target.value;
                        mainValue.textContent = e.target.value + '%';
                    }
                    
                    // Update collapsed value display
                    document.getElementById('trajectoryProgressValueCollapsed').textContent = e.target.value + '%';
                });
                
                // Timeline controls
                document.getElementById('playBtn').addEventListener('click', () => {
                    this.isPlaying = !this.isPlaying;
                    document.getElementById('playBtn').classList.toggle('active', this.isPlaying);
                });
                
                // Window resize
                window.addEventListener('resize', () => {
                    const container = document.getElementById('robot-viewport');
                    this.camera.aspect = container.clientWidth / container.clientHeight;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(container.clientWidth, container.clientHeight);
                });

                // Left Face Panel Slider
                document.getElementById('leftFacePanelSlider').addEventListener('input', function() {
                    const value = this.value;
                    const progress = value / 100.0; // Convert to 0.0-1.0 range
                    document.getElementById('leftFacePanelValue').textContent = value + '%';
                    setLeftFacePanelPosition(progress);
                });
            }
            
            initializeFrame0() {
                const frameData = {
                    id: 0,
                    targetAngleBody: 0,
                    targetAngleHead: 0,
                    targetAngleArmPitchLeft: 0,
                    targetAngleArmRollLeft: 0,
                    targetAngleArmPitchRight: 0,
                    targetAngleArmRollRight: 0
                };
                this.timelineFrames.push(frameData);
            }
            
            // ========================================
            // LEFT FACE PANEL CONTROLS (Placeholder)
            // ========================================
            
            // Placeholder methods for left face panel - to be implemented with real data
            initializeLeftFacePanelPhysics() {
                console.log('Left Face Panel: Ready for real animation data');
            }
            
            updateLeftFacePanelPhysics() {
                // Currently no dynamic physics applied; trajectory position handled directly by slider inputs.
            }
            
            // ========================================
            // LEFT FACE DIAGONAL TRAJECTORY IMPLEMENTATION
            // ========================================
            
            addLeftFaceTrajectoryVisualization() {
                if (!this.robot) return;

                // Robustly locate a parent group that contains meshes with name containing 'Left_Face'
                const findLeftFaceComponent = () => {
                    let exact = null;
                    this.robot.traverse(ch => {
                        if (ch.isGroup && ch.name && ch.name.includes('Left_Face')) exact = ch; // deepest encountered first
                    });
                    if (exact) return exact;

                    // Fallback: parent that contains meshes with Left_Face
                    let candidate=null;
                    this.robot.traverse(child=>{
                        if(child.isGroup||child.isObject3D){
                            let meshCnt=0;
                            child.traverse(sc=>{if(sc.isMesh && sc.name && sc.name.includes('Left_Face')) meshCnt++;});
                            if(meshCnt>0){if(!candidate||child.id>candidate.id) candidate=child;}
                        }
                    });
                    return candidate;
                };

                const comp = findLeftFaceComponent();
                if (!comp) { console.warn('Left_Face component not found'); return; }
                this.leftFaceComponent = comp;
                
                // --- NEW LOGIC: Account for pivot vs. center ---
                // 1. Get the initial world position of the component's pivot.
                const initialWorldPosition = new THREE.Vector3();
                comp.getWorldPosition(initialWorldPosition);

                // 2. Get the initial world position of the component's geometric center.
                const initialCenter = new THREE.Box3().setFromObject(comp).getCenter(new THREE.Vector3());

                // 3. Store the offset between them. This is constant.
                this.pivotToCenterOffset = initialCenter.clone().sub(initialWorldPosition);

                // 4. The trajectory is based on moving the CENTER of the object.
                this.leftFaceTrajectoryStartPoint = initialCenter;
                this.updateLeftFaceTrajectoryPath();
            }

            updateLeftFaceTrajectoryPath(dotKeyToUpdate = null) {
                if (!this.leftFaceTrajectoryStartPoint) {
                    console.warn('Cannot update Left Face trajectory: start point not initialized.');
                    return;
                }
                const p = this.leftFaceTrajectoryParams;
                const start = this.leftFaceTrajectoryStartPoint.clone();
                const diagOffset = new THREE.Vector3(-0.02, -0.06, 0.04);

                const dotPositions = [
                    {key: 'redDot',    t:0,    depth:0,           vert:0,               lat:0},
                    {key: 'greenDot',  t:0.25, depth:p.greenDot,  vert:p.greenVertical,  lat:p.greenLat},
                    {key: 'yellowDot', t:0.5,  depth:p.yellowDot, vert:p.yellowVertical, lat:p.yellowLat},
                    {key: 'orangeDot', t:0.75, depth:p.orangeDot, vert:p.orangeVertical, lat:p.orangeLat},
                    {key: 'blueDot',   t:1,    depth:p.blueDot,   vert:p.blueVertical,   lat:p.blueLat}
                ];

                if (dotKeyToUpdate) {
                    let dotIndex = dotPositions.findIndex(d => d.key === dotKeyToUpdate || d.key === dotKeyToUpdate.replace('Vertical', 'Dot'));

                    if (dotIndex !== -1) {
                        const dot = dotPositions[dotIndex];
                        
                        // --- DEFINITIVE, SIMPLIFIED FIX & 180-DEGREE VERTICAL ROTATION ---
                        // Replicate mouth logic, but rotate trajectory 180 deg vertically.
                        const offsetX = -p.height * dot.lat;       // Horizontal (unaffected by vertical rotation)
                        const offsetY = p.height * dot.vert;      // Vertical (flipped from -p.height to p.height)
                        const offsetZ = -p.height * dot.depth;      // Depth (flipped from p.height to -p.height)
                        
                        // Apply the direction rotation to the XZ plane.
                        const dirRad = p.direction * Math.PI / 180;
                        const rotatedX = offsetX * Math.cos(dirRad) - offsetZ * Math.sin(dirRad);
                        const rotatedZ = offsetX * Math.sin(dirRad) + offsetZ * Math.cos(dirRad);

                        // 5. Construct the final offset vector with the rotation applied.
                        const finalOffset = new THREE.Vector3(rotatedX, offsetY, rotatedZ);
                        const worldPt = start.clone().add(finalOffset);
                        
                        if (this.leftFaceTrajectoryPointsForMovement[dotIndex]) {
                            this.leftFaceTrajectoryPointsForMovement[dotIndex].copy(worldPt);
                        }
                        if (this.leftFaceTrajectoryPoints[dotIndex]) {
                            this.leftFaceTrajectoryPoints[dotIndex].copy(worldPt.clone().add(diagOffset));
                        }
                        if (this.leftFaceTrajectoryDebugMarkers[dotIndex]) {
                            this.leftFaceTrajectoryDebugMarkers[dotIndex].position.copy(this.leftFaceTrajectoryPoints[dotIndex]);
                        }
                        
                        if (this.leftFaceTrajectoryLine) {
                            this.leftFaceTrajectoryLine.geometry.setFromPoints(this.leftFaceTrajectoryPoints);
                        }
                        return; 
                    }
                }

                // --- Full regeneration if no specific dot key is provided ---
                const pts = [];
                const movePts = [];
                
                dotPositions.forEach(dot => {
                    // --- APPLYING THE SAME 180-DEGREE ROTATION FOR FULL REGENERATION ---
                    const offsetX = -p.height * dot.lat;
                    const offsetY = p.height * dot.vert;
                    const offsetZ = -p.height * dot.depth;

                    // Apply the direction rotation to the XZ plane.
                    const dirRad = p.direction * Math.PI / 180;
                    const rotatedX = offsetX * Math.cos(dirRad) - offsetZ * Math.sin(dirRad);
                    const rotatedZ = offsetX * Math.sin(dirRad) + offsetZ * Math.cos(dirRad);

                    // 4. Construct the final offset vector with the rotation applied.
                    const finalOffset = new THREE.Vector3(rotatedX, offsetY, rotatedZ);
                    const worldPt = start.clone().add(finalOffset);

                    movePts.push(worldPt.clone());
                    pts.push(worldPt.clone().add(diagOffset));
                });

                this.leftFaceTrajectoryPointsForMovement = movePts;
                this.leftFaceTrajectoryPoints = pts;

                if (this.leftFaceTrajectoryLine) this.scene.remove(this.leftFaceTrajectoryLine);
                const geo = new THREE.BufferGeometry().setFromPoints(pts);
                this.leftFaceTrajectoryLine = new THREE.Line(geo, new THREE.LineBasicMaterial({color:0x0080ff}));
                this.scene.add(this.leftFaceTrajectoryLine);

                this.addLeftFaceTrajectoryDebugMarkers(pts);
                
                console.log('REGENERATED ALL DOTS with correct rotation logic.');
            }

            addLeftFaceTrajectoryDebugMarkers(pts){
                if(this.leftFaceTrajectoryDebugMarkers.length) this.leftFaceTrajectoryDebugMarkers.forEach(m=>this.scene.remove(m));
                this.leftFaceTrajectoryDebugMarkers=[];
                
                // FIXED: We only have 5 dots now, not 50+ interpolated points
                // Use direct indices for our 5 independent dots: [0,1,2,3,4]
                const colors=[0xff0000,0x00ff00,0xffff00,0xff8800,0x0000ff]; // Red, Green, Yellow, Orange, Blue
                
                pts.forEach((pt,index)=>{
                    if(pt && index < colors.length){
                        const sph=new THREE.Mesh(
                            new THREE.SphereGeometry(0.005,8,8), // Changed from 0.008 to 0.005 to match mouth dots
                            new THREE.MeshBasicMaterial({color:colors[index]})
                        );
                        sph.position.copy(pt);
                        this.scene.add(sph);
                        this.leftFaceTrajectoryDebugMarkers.push(sph);
                    }
                });
                
                console.log(`Added ${this.leftFaceTrajectoryDebugMarkers.length} independent dots`);
            }

            setLeftFaceTrajectoryPosition(progress){
                if(!this.leftFaceTrajectoryPointsForMovement || !this.leftFaceComponent || !this.leftFaceComponent.parent || !this.pivotToCenterOffset) return;

                // 1. Get the target world position for the CENTER of the face from the trajectory.
                const pts = this.leftFaceTrajectoryPointsForMovement;
                progress = Math.max(0, Math.min(1, progress));
                const idx = Math.floor(progress * (pts.length - 1));
                const next = Math.min(idx + 1, pts.length - 1);
                const t = (progress * (pts.length - 1)) - idx;
                const targetCenterWorldPosition = pts[idx].clone().lerp(pts[next], t);

                // 2. Calculate the target world position for the PIVOT by applying the inverse offset.
                const targetPivotWorldPosition = targetCenterWorldPosition.clone().sub(this.pivotToCenterOffset);

                // 3. Convert the PIVOT's target world position into the parent's LOCAL space.
                const targetLocalPosition = this.leftFaceComponent.parent.worldToLocal(targetPivotWorldPosition);

                // 4. Set the component's local position. This moves the pivot, and thus the whole object.
                this.leftFaceComponent.position.copy(targetLocalPosition);
            }

            resetLeftFacePanel(){
                // FIX: First, physically reset the component to its "Frame 0" position.
                if (this.leftFaceComponent && this.leftFaceComponent.userData.originalPosition) {
                    this.leftFaceComponent.position.copy(this.leftFaceComponent.userData.originalPosition);
                    this.leftFaceComponent.updateMatrixWorld(true);
                }

                // New baseline parameters from user adjustment - set as permanent reset state
                this.leftFaceTrajectoryParams = {
                    height: -0.04,
                    direction: 180,
                    greenLat: 0.45,
                    yellowLat: 0.6,
                    orangeLat: 0.7,
                    blueLat: 0.75,
                    greenDot: -0.05,
                    yellowDot: 0.05,
                    orangeDot: 0.2,
                    blueDot: 0.35,
                    greenVertical: -0.1,
                    yellowVertical: -0.35,
                    orangeVertical: -0.65,
                    blueVertical: -0.9
                };

                // Stop any running animation for the left face
                if (this.isLeftFaceAnimating) {
                    this.isLeftFaceAnimating = false;
                    if (this.leftFaceAnimationId) {
                        cancelAnimationFrame(this.leftFaceAnimationId);
                        this.leftFaceAnimationId = null;
                    }
                    const animateBtn = document.getElementById('leftFaceAnimateBtn');
                    if (animateBtn) {
                        animateBtn.textContent = 'Animate';
                        animateBtn.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
                    }
                }

                // Force regenerate trajectory from the now-reset component position
                this.initializeLeftFacePanelPhysics();
                
                // Reset Left Face position to 0%
                this.setLeftFaceTrajectoryPosition(0);
                
                console.log('RESET: State permanently wiped. Dots forced back to baseline positions.');
            
                // ADDED: Reset all UI sliders and displays for the Left Face panel
                // Reset trajectory sliders
                document.getElementById('leftTrajectoryProgressSlider').value = 0;
                document.getElementById('leftTrajectoryProgressValue').textContent = '0%';
                document.getElementById('leftTrajectoryProgressSliderCollapsed').value = 0;
                document.getElementById('leftTrajectoryProgressValueCollapsed').textContent = '0%';
                
                document.getElementById('leftTrajectoryHeightSlider').value = 0;
                document.getElementById('leftTrajectoryHeightValue').textContent = '0';
                
                // Reset direction to its specific default of 0
                document.getElementById('leftTrajectoryDirectionSlider').value = 0;
                document.getElementById('leftTrajectoryDirectionValue').textContent = '0°';

                // Reset all dot control sliders to 0
                const dots = ['Orange', 'Yellow', 'Green', 'Blue'];
                dots.forEach(dot => {
                    // Reset Depth slider (e.g., 'leftOrangeDotSlider')
                    const depthSlider = document.getElementById(`left${dot}DotSlider`);
                    if (depthSlider) depthSlider.value = 0;
                    const depthValue = document.getElementById(`left${dot}DotValue`);
                    if (depthValue) depthValue.textContent = '0';
                    
                    // Reset Vertical slider (e.g., 'leftOrangeVerticalSlider')
                    const verticalSlider = document.getElementById(`left${dot}VerticalSlider`);
                    if (verticalSlider) verticalSlider.value = 0;
                    const verticalValue = document.getElementById(`left${dot}VerticalValue`);
                    if (verticalValue) verticalValue.textContent = '0';
                });
            }
            
            // ========================================
            // LEFT FACE PANEL PHYSICS ENGINE
            // ========================================
            
            // Public control methods for left face panel
            openLeftFacePanel() {
                console.log('Left Face Panel: Open command (placeholder)');
            }
            
            closeLeftFacePanel() {
                console.log('Left Face Panel: Close command (placeholder)');
            }
            
            setLeftFacePanelPosition(progress) {
                electronBotStudio.setLeftFacePanelPosition(progress);
            }
            
            // List all model components to find "Middle Linkage"
            listModelComponents() {
                console.log('Listing model components...');
                const components = [];
                this.robot.traverse((child) => {
                    if (child.isMesh) {
                        components.push(child.name);
                    }
                });
                console.log('Model components:', components);
            }

            // Advanced trajectory visualization with customizable parameters
            addSimpleTrajectoryVisualization() {
                // Find mouth component to get its position
                let mouthComponent = null;
                this.robot.traverse((child) => {
                    if (child.isGroup || child.isObject3D) {
                        let mouthMeshCount = 0;
                        child.traverse((subChild) => {
                            if (subChild.name && subChild.name.includes('Mouth_')) {
                                mouthMeshCount++;
                            }
                        });
                        if (mouthMeshCount > 5) {
                            mouthComponent = child;
                        }
                    }
                });
                
                if (!mouthComponent) {
                    console.log('Cannot create trajectory: no mouth component found');
                    return;
                }
                
                // Store mouth component reference for trajectory following
                this.mouthComponent = mouthComponent;
                
                // Calculate mouth center for trajectory start point
                const mouthBox = new THREE.Box3().setFromObject(mouthComponent);
                this.trajectoryStartPoint = mouthBox.getCenter(new THREE.Vector3());
                
                console.log('Creating advanced trajectory from mouth center:', this.trajectoryStartPoint);
                
                // Generate trajectory points based on parameters
                this.updateTrajectoryPath();
            }
            
            // Update trajectory path based on current parameters
            updateTrajectoryPath() {
                if (!this.trajectoryStartPoint) return;
                
                const params = this.trajectoryParams;
                const trajectoryPoints = [];
                
                // FIXED: Start trajectory from mouth's ACTUAL position (blue dot = mouth center)
                // This ensures 0% progress = mouth at natural position, no snap-back
                const startPoint = this.trajectoryStartPoint.clone();
                
                // VISUAL OFFSET: Move the entire trajectory visualization downward and forward
                const visualOffset = new THREE.Vector3(0, -0.14, 0.02); // Move down by 0.15 units and forward by 0.1 units
                
                // Convert direction to radians
                const directionRad = params.direction * Math.PI / 180;
                
                // Define key points for custom curvature
                const keyPoints = [
                    { t: 0.0, depth: 0.0, vertical: 0.0 },           // Red dot (0%) - original position
                    { t: 0.25, depth: params.greenDot, vertical: params.greenVertical },   // Green dot (25%)
                    { t: 0.5, depth: params.yellowDot, vertical: params.yellowVertical },   // Yellow dot (50%)
                    { t: 0.75, depth: params.orangeDot, vertical: params.orangeVertical },  // Orange dot (75%)
                    { t: 1.0, depth: params.blueDot, vertical: params.blueVertical }            // Blue dot (100%) - custom depth and vertical
                ];
                
                // Create trajectory with custom interpolation between key points
                const numPoints = 50; // More points for smoother curve
                for (let i = 0; i <= numPoints; i++) {
                    const t = i / numPoints; // 0 to 1
                    
                    // Find which key points to interpolate between
                    let keyIndex = 0;
                    for (let k = 0; k < keyPoints.length - 1; k++) {
                        if (t >= keyPoints[k].t && t <= keyPoints[k + 1].t) {
                            keyIndex = k;
                            break;
                        }
                    }
                    
                    // Interpolate between the two key points
                    const key1 = keyPoints[keyIndex];
                    const key2 = keyPoints[keyIndex + 1];
                    const localT = (t - key1.t) / (key2.t - key1.t);
                    
                    // Apply curvature to the local interpolation
                    const curvedLocalT = Math.pow(localT, params.curvature);
                    const interpolatedDepth = key1.depth + (key2.depth - key1.depth) * curvedLocalT;
                    const interpolatedVertical = key1.vertical + (key2.vertical - key1.vertical) * curvedLocalT;
                    
                    // CUSTOM 3D CURVATURE: Use interpolated depth and vertical from individual dot positions
                    const localX = 0; // No left/right movement in local space
                    
                    // Vertical movement: base trajectory + individual vertical offsets
                    const localY = params.height * interpolatedVertical; // Vertical offset (up/down)
                    
                    // Depth movement: based on interpolated depth between key points
                    const localZ = -params.height * interpolatedDepth; // Depth (forward/back opening)
                    
                    // Apply direction rotation around Y-axis
                    const px = localX * Math.cos(directionRad) - localZ * Math.sin(directionRad);
                    const py = localY;
                    const pz = localX * Math.sin(directionRad) + localZ * Math.cos(directionRad);

                    const rot = new THREE.Vector3(px, py, pz);
                    const worldPt = startPoint.clone().add(rot);

                    trajectoryPoints.push(worldPt.clone().add(visualOffset));
                }
                
                // Store trajectory points for mouth following (WITHOUT visual offset for actual mouth movement)
                this.trajectoryPointsForMouth = [];
                for (let i = 0; i <= 50; i++) {
                    const t = i / 50;
                    let keyIndex = 0;
                    const keyPoints = [
                        { t: 0.0, depth: 0.0, vertical: 0.0 },
                        { t: 0.25, depth: params.greenDot, vertical: params.greenVertical },
                        { t: 0.5, depth: params.yellowDot, vertical: params.yellowVertical },
                        { t: 0.75, depth: params.orangeDot, vertical: params.orangeVertical },
                        { t: 1.0, depth: params.blueDot, vertical: params.blueVertical }
                    ];
                    
                    for (let k = 0; k < keyPoints.length - 1; k++) {
                        if (t >= keyPoints[k].t && t <= keyPoints[k + 1].t) {
                            keyIndex = k;
                            break;
                        }
                    }
                    
                    const key1 = keyPoints[keyIndex];
                    const key2 = keyPoints[keyIndex + 1];
                    const localT = (t - key1.t) / (key2.t - key1.t);
                    const curvedLocalT = Math.pow(localT, params.curvature);
                    const interpolatedDepth = key1.depth + (key2.depth - key1.depth) * curvedLocalT;
                    const interpolatedVertical = key1.vertical + (key2.vertical - key1.vertical) * curvedLocalT;
                    
                    const localX = 0;
                    const localY = params.height * interpolatedVertical;
                    const localZ = -params.height * interpolatedDepth;
                    
                    const x = startPoint.x + localX * Math.cos(directionRad) - localZ * Math.sin(directionRad);
                    const y = startPoint.y + localY;
                    const z = startPoint.z + localX * Math.sin(directionRad) + localZ * Math.cos(directionRad);
                    
                    // Store original points WITHOUT visual offset for mouth movement
                    this.trajectoryPointsForMouth.push(new THREE.Vector3(x, y, z));
                }
                
                // Store trajectory points for visualization (WITH visual offset)
                this.trajectoryPoints = trajectoryPoints;
                
                // Create/update line geometry
                const pathGeometry = new THREE.BufferGeometry().setFromPoints(trajectoryPoints);
                const pathMaterial = new THREE.LineBasicMaterial({ 
                    color: 0x00ff00, 
                    linewidth: 3,
                    transparent: false,
                    opacity: 1.0
                });
                
                // Remove old trajectory line if exists
                if (this.trajectoryLine) {
                    this.scene.remove(this.trajectoryLine);
                }
                
                // Add new trajectory line
                this.trajectoryLine = new THREE.Line(pathGeometry, pathMaterial);
                this.trajectoryLine.visible = true;
                this.scene.add(this.trajectoryLine);
                
                // Update debug markers (with visual offset)
                this.addTrajectoryDebugMarkers(trajectoryPoints);
                
                console.log('Advanced trajectory updated with', trajectoryPoints.length, 'points');
                console.log('Visual offset applied:', visualOffset);
                console.log('Parameters:', params);
            }
            
            // Position mouth along trajectory based on progress
            setMouthTrajectoryPosition(progress) {
                if (!this.trajectoryPointsForMouth || !this.mouthComponent) return;
                
                // Store original mouth position if not already stored
                if (!this.originalMouthPosition) {
                    this.originalMouthPosition = this.mouthComponent.position.clone();
                }
                
                // Clamp progress between 0 and 1
                progress = Math.max(0, Math.min(1, progress));
                
                // Calculate index in trajectory points (use original points for mouth movement)
                const index = Math.floor(progress * (this.trajectoryPointsForMouth.length - 1));
                const nextIndex = Math.min(index + 1, this.trajectoryPointsForMouth.length - 1);
                
                // Interpolate between points for smooth movement
                const t = (progress * (this.trajectoryPointsForMouth.length - 1)) - index;
                const currentPoint = this.trajectoryPointsForMouth[index];
                const nextPoint = this.trajectoryPointsForMouth[nextIndex];
                
                if (currentPoint && nextPoint) {
                    const interpolatedPoint = currentPoint.clone().lerp(nextPoint, t);
                    
                    // FIXED: Calculate mouth path by rotating the green line path 90° clockwise
                    // Green line shows: Y=forward/back, Z=vertical (upright U)
                    // Mouth should follow: Y=vertical, Z=forward/back (rotated 90° clockwise)
                    
                    const greenLineOffset = interpolatedPoint.clone().sub(this.trajectoryStartPoint);
                    
                    // Rotate the offset 90° clockwise: swap Y and Z, negate new Y
                    const mouthOffset = new THREE.Vector3(
                        greenLineOffset.x,           // X stays the same
                        greenLineOffset.z,           // Y becomes old Z (vertical movement)
                        -greenLineOffset.y           // Z becomes negative old Y (forward/back)
                    );
                    
                    // Apply the rotated trajectory offset to the ORIGINAL position
                    const newPosition = this.originalMouthPosition.clone().add(mouthOffset);
                    this.mouthComponent.position.copy(newPosition);
                    
                    console.log(`Mouth moved with rotated path at progress ${(progress * 100).toFixed(1)}%`);
                    console.log('Original position:', this.originalMouthPosition);
                    console.log('Mouth offset (rotated):', mouthOffset);
                    console.log('New position:', newPosition);
                }
            }
            
            // Add debug markers to see trajectory points
            addTrajectoryDebugMarkers(trajectoryPoints) {
                // Remove old debug markers
                if (this.trajectoryDebugMarkers) {
                    this.trajectoryDebugMarkers.forEach(marker => this.scene.remove(marker));
                }
                this.trajectoryDebugMarkers = [];
                
                // Add spheres at key points along the trajectory for better visualization
                const debugIndices = [0, 12, 25, 37, 49]; // Start, quarter, middle, three-quarter, end
                const colors = [0xff0000, 0xff8800, 0xffff00, 0x88ff00, 0x0000ff]; // Red to Blue gradient
                
                debugIndices.forEach((index, i) => {
                    if (trajectoryPoints[index]) {
                        const sphereGeometry = new THREE.SphereGeometry(0.005, 8, 8);
                        const sphereMaterial = new THREE.MeshBasicMaterial({ color: colors[i] });
                        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                        sphere.position.copy(trajectoryPoints[index]);
                        this.scene.add(sphere);
                        this.trajectoryDebugMarkers.push(sphere);
                        console.log(`Debug marker ${i} added at:`, trajectoryPoints[index]);
                    }
                });
            }
            
            // Update trajectory height parameter
            updateTrajectoryHeight() {
                const slider = document.getElementById('trajectoryHeightSlider');
                if (slider) {
                    this.trajectoryParams.height = 0.04 + parseFloat(slider.value); // Baseline 0.04 + slider offset
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                    console.log('Trajectory height updated to:', this.trajectoryParams.height);
                }
            }
            
            // Update trajectory direction parameter
            updateTrajectoryDirection() {
                const slider = document.getElementById('trajectoryDirectionSlider');
                if (slider) {
                    this.trajectoryParams.direction = parseInt(slider.value);
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                    console.log('Trajectory direction updated to:', this.trajectoryParams.direction);
                }
            }
            
            // Update trajectory curvature parameter
            updateTrajectoryCurvature() {
                const slider = document.getElementById('trajectoryCurvatureSlider');
                if (slider) {
                    this.trajectoryParams.curvature = parseFloat(slider.value);
                    this.updateTrajectoryPath();
                    this.updateTrajectoryDisplays();
                    console.log('Trajectory curvature updated to:', this.trajectoryParams.curvature);
                }
            }
            
            // Update trajectory progress
            updateTrajectoryProgress() {
                const slider = document.getElementById('trajectoryProgressSlider');
                if (slider) {
                    const progress = parseFloat(slider.value) / 100;
                    this.setMouthTrajectoryPosition(progress);
                    this.updateTrajectoryDisplays();
                    console.log('Trajectory progress updated to:', progress);
                }
            }

            updateCameraFromCube() {
                // Convert cube rotation to camera position
                const distance = 0.5;
                // Camera moves OPPOSITE to cube rotation to make head appear to rotate WITH the drag
                // When cube rotates right (+Y), camera moves left (-Y) around head
                // When cube rotates up (-X), camera moves down (+X) around head  
                const radX = -this.cubeRotation.x * Math.PI / 180; // Camera moves opposite in X
                const radY = -this.cubeRotation.y * Math.PI / 180; // Camera moves opposite in Y
                
                // Calculate camera position based on cube rotation (spherical coordinates)
                const x = distance * Math.sin(radY) * Math.cos(radX);
                const y = distance * Math.sin(radX);
                const z = distance * Math.cos(radY) * Math.cos(radX);
                
                // Smooth camera movement
                this.camera.position.lerp(new THREE.Vector3(x, y, z), 0.1);
                this.camera.lookAt(0, 0, 0);
                this.controls.target.set(0, 0, 0);
                this.controls.update();
            }

            // Animation method for trajectory movement
            animateTrajectory() {
                if (!this.isAnimating) return;
                
                const currentTime = Date.now();
                const elapsed = currentTime - this.animationStartTime;
                const duration = 3000; // 3 seconds for full cycle
                
                // Calculate progress (0 to 1 and back)
                const cycle = (elapsed % duration) / duration;
                const progress = cycle <= 0.5 ? cycle * 2 : (1 - cycle) * 2;
                
                // Update trajectory progress slider and mouth position
                const progressSlider = document.getElementById('trajectoryProgressSlider');
                if (progressSlider) {
                    progressSlider.value = progress * 100;
                    this.setMouthTrajectoryPosition(progress);
                    this.updateTrajectoryDisplays();
                }
                
                // Continue animation
                this.animationId = requestAnimationFrame(() => this.animateTrajectory());
            }
            
            // ========================================
            // ORIENTATION CUBE FUNCTIONALITY
            // ========================================
            
            initOrientationCube() {
                const cube = document.getElementById('orientationCube');
                const arrows = document.getElementById('cubeArrows');
                if (!cube || !arrows) return;
                // Add hover effect for all faces
                const faces = cube.querySelectorAll('.cube-face');
                faces.forEach(face => {
                    face.addEventListener('mouseenter', () => {
                        face.classList.add('hovered');
                    });
                    face.addEventListener('mouseleave', () => {
                        face.classList.remove('hovered');
                    });
                    // Restore click-to-face functionality
                    face.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const viewName = face.getAttribute('data-face');
                        this.setCameraView(viewName);
                    });
                });
                // Cube drag handlers
                cube.addEventListener('mousedown', (e) => {
                    this.isDraggingCube = true;
                    this.dragStart.x = e.clientX;
                    this.dragStart.y = e.clientY;
                    e.preventDefault();
                });
                
                document.addEventListener('mousemove', (e) => {
                    if (!this.isDraggingCube) return;
                    
                    const deltaX = e.clientX - this.dragStart.x;
                    const deltaY = e.clientY - this.dragStart.y;
                    
                    // FIXED DIRECTION MAPPING - Intuitive drag behavior:
                    // Drag RIGHT = Cube turns RIGHT = Head turns RIGHT
                    // Drag LEFT = Cube turns LEFT = Head turns LEFT  
                    // Drag UP = Cube turns UP = Head tilts UP
                    // Drag DOWN = Cube turns DOWN = Head tilts DOWN
                    this.cubeRotation.y += deltaX * 0.5; // Drag RIGHT = positive deltaX = positive Y rotation = turn RIGHT
                    this.cubeRotation.x -= deltaY * 0.5; // Drag UP = negative deltaY = negative X rotation = tilt UP
                    
                    this.updateCubeRotation();
                    this.updateCameraFromCube();
                    this.updateActiveFaceFromRotation(); // ADDED: Check alignment and show/hide triangles
                    
                    this.dragStart.x = e.clientX;
                    this.dragStart.y = e.clientY;
                });
                
                document.addEventListener('mouseup', () => {
                    if (this.isDraggingCube) {
                        this.isDraggingCube = false;
                        // Do NOT snap to a face or call setCameraView here!
                        // Only update highlights and triangle visibility:
                        this.updateActiveFaceFromRotation();
                    }
                });
                
                // Arrow click handlers
                const arrowElements = arrows.querySelectorAll('.cube-arrow');
                arrowElements.forEach(arrow => {
                    arrow.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const direction = arrow.getAttribute('data-direction');
                        this.rotateCubeByArrow(direction);
                    });
                });
                
                // Initialize cube to front view
                this.setCameraView('front');
                
                // ADDED: Ensure triangles start with correct visibility
                this.updateActiveFaceFromRotation();
            }
            
            setCameraView(viewName) {
                this.currentView = viewName;
                
                // Update active face
                const faces = document.querySelectorAll('.cube-face');
                faces.forEach(face => {
                    face.classList.remove('active');
                    if (face.getAttribute('data-face') === viewName) {
                        face.classList.add('active');
                    }
                });
                
                // Define camera positions for each view
                const viewPositions = {
                    front: { x: 0, y: 0, z: 0.5 },
                    back: { x: 0, y: 0, z: -0.5 },
                    right: { x: 0.5, y: 0, z: 0 },
                    left: { x: -0.5, y: 0, z: 0 },
                    top: { x: 0, y: 0.5, z: 0 },
                    bottom: { x: 0, y: -0.5, z: 0 }
                };
                
                // Define cube rotations for each view
                const cubeRotations = {
                    front: { x: 0, y: 0 },
                    back: { x: 0, y: 180 },
                    right: { x: 0, y: -90 },
                    left: { x: 0, y: 90 },
                    top: { x: -90, y: 0 },
                    bottom: { x: 90, y: 0 }
                };
                
                const position = viewPositions[viewName];
                const rotation = cubeRotations[viewName];
                
                // Animate camera to new position
                this.animateCameraTo(position, rotation);
                
                // Update cube rotation
                this.cubeRotation = { ...rotation };
                this.updateCubeRotation();
                
                // ADDED: Check alignment and show/hide triangles after setting camera view
                this.updateActiveFaceFromRotation();
                
                console.log(`Camera view set to: ${viewName.toUpperCase()}`);
            }
            
            rotateCubeByArrow(direction) {
                // Determine target face based on current face and arrow direction
                const currentFace = this.currentView || 'front';
                let targetFace;
                
                // Map arrow directions to target faces based on current orientation
                const faceTransitions = {
                    'front': {
                        'up': 'top',
                        'down': 'bottom', 
                        'left': 'left',
                        'right': 'right'
                    },
                    'back': {
                        'up': 'top',
                        'down': 'bottom',
                        'left': 'right',  // Reversed because we're looking from behind
                        'right': 'left'   // Reversed because we're looking from behind
                    },
                    'left': {
                        'up': 'top',
                        'down': 'bottom',
                        'left': 'back',
                        'right': 'front'
                    },
                    'right': {
                        'up': 'top', 
                        'down': 'bottom',
                        'left': 'front',
                        'right': 'back'
                    },
                    'top': {
                        'up': 'back',
                        'down': 'front',
                        'left': 'left',
                        'right': 'right'
                    },
                    'bottom': {
                        'up': 'front',
                        'down': 'back', 
                        'left': 'left',
                        'right': 'right'
                    }
                };
                
                targetFace = faceTransitions[currentFace]?.[direction] || 'front';
                
                // Use setCameraView to properly snap to the target face
                this.setCameraView(targetFace);
                
                console.log(`Triangle ${direction} clicked: ${currentFace.toUpperCase()} → ${targetFace.toUpperCase()}`);
            }
            
            updateCubeRotation() {
                const cube = document.getElementById('orientationCube');
                if (cube) {
                    cube.style.transform = `rotateX(${this.cubeRotation.x}deg) rotateY(${this.cubeRotation.y}deg)`;
                }
            }
            
            updateActiveFaceFromRotation() {
                // Determine which face is most forward-facing based on rotation
                const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
                let closestFace = 'front';
                let minAngle = Infinity;
                
                const faceNormals = {
                    front: { x: 0, y: 0 },
                    back: { x: 0, y: 180 },
                    right: { x: 0, y: -90 },
                    left: { x: 0, y: 90 },
                    top: { x: -90, y: 0 },
                    bottom: { x: 90, y: 0 }
                };
                
                // Normalize current rotation to 0-360 range
                const normalizedX = ((this.cubeRotation.x % 360) + 360) % 360;
                const normalizedY = ((this.cubeRotation.y % 360) + 360) % 360;
                
                faces.forEach(face => {
                    const normal = faceNormals[face];
                    let normalizedNormalX = ((normal.x % 360) + 360) % 360;
                    let normalizedNormalY = ((normal.y % 360) + 360) % 360;
                    
                    // Calculate angle difference accounting for 360° wrap-around
                    let diffX = Math.abs(normalizedX - normalizedNormalX);
                    let diffY = Math.abs(normalizedY - normalizedNormalY);
                    if (diffX > 180) diffX = 360 - diffX;
                    if (diffY > 180) diffY = 360 - diffY;
                    
                    const angleDiff = diffX + diffY;
                    
                    if (angleDiff < minAngle) {
                        minAngle = angleDiff;
                        closestFace = face;
                    }
                });
                
                // ALIGNMENT: Show triangles when reasonably aligned (within 15 degrees)
                console.log("DEBUG: minAngle =", minAngle, "isPerfectlyAligned =", true); const isPerfectlyAligned = minAngle < 20;
                
                // Update active face
                const faceElements = document.querySelectorAll('.cube-face');
                faceElements.forEach(faceEl => {
                    faceEl.classList.remove('active');
                    if (faceEl.getAttribute('data-face') === closestFace) {
                        faceEl.classList.add('active');
                    }
                });
                
                // Show/hide triangles based on STRICT alignment - like Fusion 360
                const cube = document.getElementById('orientationCube');
                if (cube) {
                    if (isPerfectlyAligned) {
                        cube.classList.add('face-perfectly-aligned'); document.querySelectorAll(".cube-arrow").forEach(arrow => arrow.style.opacity = "1");
                        
                    } else {
                        cube.classList.remove('face-perfectly-aligned'); document.querySelectorAll(".cube-arrow").forEach(arrow => arrow.style.opacity = "0");
                    }
                }
                
                this.currentView = closestFace;
            }
            
            animateCameraTo(targetPosition, targetRotation) {
                const startPosition = this.camera.position.clone();
                const endPosition = new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z);
                
                let progress = 0;
                const duration = 500; // milliseconds
                const startTime = Date.now();
                
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    progress = Math.min(elapsed / duration, 1);
                    
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    
                    this.camera.position.lerpVectors(startPosition, endPosition, easeProgress);
                    this.camera.lookAt(0, 0, 0);
                    this.controls.target.set(0, 0, 0);
                    this.controls.update();
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                
                animate();
            }
        }
        
export default ElectronBotStudio;