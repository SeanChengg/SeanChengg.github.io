// Virtual ElectronBot Studio - Main JavaScript
class ElectronBotStudio {
    constructor() {
        this.robot = {
            head: { yaw: 0, pitch: 0 },
            leftArm: { shoulder: 0, elbow: 0 },
            rightArm: { shoulder: 0, elbow: 0 }
        };
        
        this.isPlaying = false;
        this.isRecording = false;
        this.currentTime = 0;
        this.timeline = [];
        this.animationFrame = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startStatusUpdates();
        this.updateTimestamp();
        this.initializeRobot();
    }
    
    setupEventListeners() {
        // Servo Controls
        this.setupServoControls();
        
        // Motion Presets
        this.setupMotionPresets();
        
        // Timeline Controls
        this.setupTimelineControls();
        
        // Camera Controls
        this.setupCameraControls();
        
        // Settings Modal
        this.setupModal();
        
        // Viewport Controls
        this.setupViewportControls();
    }
    
    setupServoControls() {
        // Head Controls
        const headYaw = document.getElementById('headYaw');
        const headPitch = document.getElementById('headPitch');
        const headYawValue = document.getElementById('headYawValue');
        const headPitchValue = document.getElementById('headPitchValue');
        
        headYaw.addEventListener('input', (e) => {
            this.robot.head.yaw = parseInt(e.target.value);
            headYawValue.textContent = `${this.robot.head.yaw}°`;
            this.updateRobotHead();
            this.recordKeyframe('head');
        });
        
        headPitch.addEventListener('input', (e) => {
            this.robot.head.pitch = parseInt(e.target.value);
            headPitchValue.textContent = `${this.robot.head.pitch}°`;
            this.updateRobotHead();
            this.recordKeyframe('head');
        });
        
        // Left Arm Controls
        const leftShoulder = document.getElementById('leftShoulder');
        const leftElbow = document.getElementById('leftElbow');
        const leftShoulderValue = document.getElementById('leftShoulderValue');
        const leftElbowValue = document.getElementById('leftElbowValue');
        
        leftShoulder.addEventListener('input', (e) => {
            this.robot.leftArm.shoulder = parseInt(e.target.value);
            leftShoulderValue.textContent = `${this.robot.leftArm.shoulder}°`;
            this.updateRobotArm('left');
            this.recordKeyframe('leftArm');
        });
        
        leftElbow.addEventListener('input', (e) => {
            this.robot.leftArm.elbow = parseInt(e.target.value);
            leftElbowValue.textContent = `${this.robot.leftArm.elbow}°`;
            this.updateRobotArm('left');
            this.recordKeyframe('leftArm');
        });
        
        // Right Arm Controls
        const rightShoulder = document.getElementById('rightShoulder');
        const rightElbow = document.getElementById('rightElbow');
        const rightShoulderValue = document.getElementById('rightShoulderValue');
        const rightElbowValue = document.getElementById('rightElbowValue');
        
        rightShoulder.addEventListener('input', (e) => {
            this.robot.rightArm.shoulder = parseInt(e.target.value);
            rightShoulderValue.textContent = `${this.robot.rightArm.shoulder}°`;
            this.updateRobotArm('right');
            this.recordKeyframe('rightArm');
        });
        
        rightElbow.addEventListener('input', (e) => {
            this.robot.rightArm.elbow = parseInt(e.target.value);
            rightElbowValue.textContent = `${this.robot.rightArm.elbow}°`;
            this.updateRobotArm('right');
            this.recordKeyframe('rightArm');
        });
    }
    
    setupMotionPresets() {
        const presetButtons = document.querySelectorAll('.preset-btn');
        
        presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const preset = btn.dataset.preset;
                this.executePreset(preset);
            });
        });
    }
    
    setupTimelineControls() {
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const stopBtn = document.getElementById('stopBtn');
        const recordBtn = document.getElementById('recordBtn');
        
        playBtn.addEventListener('click', () => this.playTimeline());
        pauseBtn.addEventListener('click', () => this.pauseTimeline());
        stopBtn.addEventListener('click', () => this.stopTimeline());
        recordBtn.addEventListener('click', () => this.toggleRecording());
    }
    
    setupCameraControls() {
        const startCamera = document.getElementById('startCamera');
        const takePhoto = document.getElementById('takePhoto');
        const faceTracking = document.getElementById('faceTracking');
        const gestureRecognition = document.getElementById('gestureRecognition');
        const motionMirroring = document.getElementById('motionMirroring');
        
        startCamera.addEventListener('click', () => this.toggleCamera());
        takePhoto.addEventListener('click', () => this.takePhoto());
        
        faceTracking.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.startFaceTracking();
            } else {
                this.stopFaceTracking();
            }
        });
        
        gestureRecognition.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.startGestureRecognition();
            } else {
                this.stopGestureRecognition();
            }
        });
        
        motionMirroring.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.startMotionMirroring();
            } else {
                this.stopMotionMirroring();
            }
        });
    }
    
    setupModal() {
        const settingsBtn = document.getElementById('settingsBtn');
        const modal = document.getElementById('settingsModal');
        const closeModal = document.getElementById('closeModal');
        
        settingsBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
        
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    setupViewportControls() {
        const resetView = document.getElementById('resetView');
        const fullscreen = document.getElementById('fullscreen');
        
        resetView.addEventListener('click', () => this.resetRobotView());
        fullscreen.addEventListener('click', () => this.toggleFullscreen());
    }
    
    initializeRobot() {
        this.updateRobotHead();
        this.updateRobotArm('left');
        this.updateRobotArm('right');
    }
    
    updateRobotHead() {
        const robotHead = document.getElementById('robotHead');
        if (robotHead) {
            const yawRotation = this.robot.head.yaw;
            const pitchRotation = this.robot.head.pitch;
            robotHead.style.transform = `translateX(-50%) rotateY(${yawRotation}deg) rotateX(${pitchRotation}deg)`;
        }
    }
    
    updateRobotArm(side) {
        const armElement = document.getElementById(side === 'left' ? 'leftArm' : 'rightArm');
        if (armElement) {
            const arm = this.robot[side + 'Arm'];
            const shoulderRotation = arm.shoulder;
            const elbowRotation = arm.elbow;
            
            // Base arm rotation
            const baseRotation = side === 'left' ? -30 : 30;
            armElement.style.transform = `rotate(${baseRotation + shoulderRotation}deg)`;
            
            // Forearm rotation
            const forearm = armElement.querySelector('.forearm');
            if (forearm) {
                forearm.style.transform = `rotate(${elbowRotation}deg)`;
            }
        }
    }
    
    executePreset(preset) {
        this.clearRobotAnimations();
        
        switch (preset) {
            case 'wave':
                this.executeWavePreset();
                break;
            case 'dance':
                this.executeDancePreset();
                break;
            case 'point':
                this.executePointPreset();
                break;
            case 'thinking':
                this.executeThinkingPreset();
                break;
            case 'celebrate':
                this.executeCelebratePreset();
                break;
            case 'reset':
                this.executeResetPreset();
                break;
        }
    }
    
    executeWavePreset() {
        const robotContainer = document.querySelector('.robot-container');
        robotContainer.classList.add('robot-wave');
        
        // Animate servo values
        this.animateServo('rightArm', 'shoulder', 45, 1000);
        this.animateServo('rightArm', 'elbow', 90, 1000);
        
        setTimeout(() => {
            robotContainer.classList.remove('robot-wave');
        }, 4000);
    }
    
    executeDancePreset() {
        const robotContainer = document.querySelector('.robot-container');
        robotContainer.classList.add('robot-dance');
        
        // Animate both arms
        this.animateServo('leftArm', 'shoulder', -45, 500);
        this.animateServo('rightArm', 'shoulder', 45, 500);
        this.animateServo('leftArm', 'elbow', 60, 500);
        this.animateServo('rightArm', 'elbow', 60, 500);
        
        setTimeout(() => {
            this.animateServo('leftArm', 'shoulder', 45, 500);
            this.animateServo('rightArm', 'shoulder', -45, 500);
        }, 1000);
        
        setTimeout(() => {
            robotContainer.classList.remove('robot-dance');
            this.executeResetPreset();
        }, 3000);
    }
    
    executePointPreset() {
        this.animateServo('rightArm', 'shoulder', -90, 800);
        this.animateServo('rightArm', 'elbow', 0, 800);
        this.animateServo('head', 'yaw', 30, 800);
    }
    
    executeThinkingPreset() {
        const robotContainer = document.querySelector('.robot-container');
        robotContainer.classList.add('robot-thinking');
        
        this.animateServo('rightArm', 'shoulder', -60, 1000);
        this.animateServo('rightArm', 'elbow', 120, 1000);
        
        setTimeout(() => {
            robotContainer.classList.remove('robot-thinking');
        }, 5000);
    }
    
    executeCelebratePreset() {
        this.animateServo('leftArm', 'shoulder', -90, 600);
        this.animateServo('rightArm', 'shoulder', 90, 600);
        this.animateServo('leftArm', 'elbow', 45, 600);
        this.animateServo('rightArm', 'elbow', 45, 600);
        this.animateServo('head', 'pitch', -20, 600);
    }
    
    executeResetPreset() {
        this.animateServo('head', 'yaw', 0, 800);
        this.animateServo('head', 'pitch', 0, 800);
        this.animateServo('leftArm', 'shoulder', 0, 800);
        this.animateServo('leftArm', 'elbow', 0, 800);
        this.animateServo('rightArm', 'shoulder', 0, 800);
        this.animateServo('rightArm', 'elbow', 0, 800);
    }
    
    animateServo(part, joint, targetValue, duration) {
        const startValue = this.robot[part][joint];
        const difference = targetValue - startValue;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = this.easeInOutCubic(progress);
            
            const currentValue = Math.round(startValue + (difference * easeProgress));
            this.robot[part][joint] = currentValue;
            
            // Update UI
            const sliderId = this.getSliderIdForServo(part, joint);
            const valueId = this.getValueIdForServo(part, joint);
            
            if (sliderId) {
                document.getElementById(sliderId).value = currentValue;
                document.getElementById(valueId).textContent = `${currentValue}°`;
            }
            
            // Update robot visual
            if (part === 'head') {
                this.updateRobotHead();
            } else {
                this.updateRobotArm(part.replace('Arm', ''));
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    getSliderIdForServo(part, joint) {
        const mapping = {
            'head': { 'yaw': 'headYaw', 'pitch': 'headPitch' },
            'leftArm': { 'shoulder': 'leftShoulder', 'elbow': 'leftElbow' },
            'rightArm': { 'shoulder': 'rightShoulder', 'elbow': 'rightElbow' }
        };
        return mapping[part]?.[joint];
    }
    
    getValueIdForServo(part, joint) {
        const mapping = {
            'head': { 'yaw': 'headYawValue', 'pitch': 'headPitchValue' },
            'leftArm': { 'shoulder': 'leftShoulderValue', 'elbow': 'leftElbowValue' },
            'rightArm': { 'shoulder': 'rightShoulderValue', 'elbow': 'rightElbowValue' }
        };
        return mapping[part]?.[joint];
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    clearRobotAnimations() {
        const robotContainer = document.querySelector('.robot-container');
        robotContainer.classList.remove('robot-wave', 'robot-dance', 'robot-thinking');
    }
    
    recordKeyframe(servo) {
        if (this.isRecording) {
            const keyframe = {
                time: this.currentTime,
                servo: servo,
                value: { ...this.robot[servo] }
            };
            this.timeline.push(keyframe);
            this.updateTimelineVisual();
        }
    }
    
    playTimeline() {
        if (this.timeline.length === 0) return;
        
        this.isPlaying = true;
        this.currentTime = 0;
        
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        
        this.animateTimeline();
    }
    
    pauseTimeline() {
        this.isPlaying = false;
        
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
    
    stopTimeline() {
        this.isPlaying = false;
        this.currentTime = 0;
        
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        this.updatePlayhead();
    }
    
    toggleRecording() {
        this.isRecording = !this.isRecording;
        
        const recordBtn = document.getElementById('recordBtn');
        if (this.isRecording) {
            recordBtn.style.color = '#ff4757';
            recordBtn.style.animation = 'pulse 1s infinite';
        } else {
            recordBtn.style.color = '';
            recordBtn.style.animation = '';
        }
    }
    
    animateTimeline() {
        if (!this.isPlaying) return;
        
        this.currentTime += 16; // ~60fps
        this.updatePlayhead();
        
        // Apply keyframes at current time
        const activeKeyframes = this.timeline.filter(kf => 
            Math.abs(kf.time - this.currentTime) < 50
        );
        
        activeKeyframes.forEach(kf => {
            this.robot[kf.servo] = { ...kf.value };
            this.updateRobotFromKeyframe(kf.servo);
        });
        
        // Check if timeline is complete
        const maxTime = Math.max(...this.timeline.map(kf => kf.time), 0);
        if (this.currentTime >= maxTime + 1000) {
            this.stopTimeline();
            return;
        }
        
        this.animationFrame = requestAnimationFrame(() => this.animateTimeline());
    }
    
    updateRobotFromKeyframe(servo) {
        if (servo === 'head') {
            this.updateRobotHead();
        } else if (servo.includes('Arm')) {
            this.updateRobotArm(servo.replace('Arm', ''));
        }
    }
    
    updatePlayhead() {
        const playhead = document.getElementById('playhead');
        const timelineTrack = document.querySelector('.timeline-track');
        
        if (playhead && timelineTrack) {
            const maxTime = Math.max(...this.timeline.map(kf => kf.time), 5000);
            const percentage = (this.currentTime / maxTime) * 100;
            playhead.style.left = `${Math.min(percentage, 100)}%`;
        }
    }
    
    updateTimelineVisual() {
        // Add visual keyframe indicators
        const tracks = document.querySelectorAll('.keyframe-track');
        tracks.forEach(track => {
            const servo = track.dataset.servo;
            const keyframes = track.querySelector('.keyframes');
            
            // Clear existing keyframes
            keyframes.innerHTML = '';
            
            // Add keyframe markers
            const servoKeyframes = this.timeline.filter(kf => kf.servo === servo);
            servoKeyframes.forEach(kf => {
                const marker = document.createElement('div');
                marker.className = 'keyframe-marker';
                marker.style.cssText = `
                    position: absolute;
                    left: ${(kf.time / 5000) * 100}%;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 8px;
                    height: 8px;
                    background: #00d4ff;
                    border-radius: 50%;
                    border: 2px solid #ffffff;
                `;
                keyframes.appendChild(marker);
            });
        });
    }
    
    toggleCamera() {
        const cameraFeed = document.getElementById('cameraFeed');
        const startBtn = document.getElementById('startCamera');
        
        if (cameraFeed.classList.contains('active')) {
            // Stop camera
            cameraFeed.classList.remove('active');
            cameraFeed.innerHTML = `
                <div class="camera-placeholder">
                    <i class="fas fa-video"></i>
                    <span>Camera Feed</span>
                </div>
            `;
            startBtn.innerHTML = '<i class="fas fa-video"></i> Start Camera';
        } else {
            // Start camera simulation
            cameraFeed.classList.add('active');
            this.simulateCamera();
            startBtn.innerHTML = '<i class="fas fa-video-slash"></i> Stop Camera';
        }
    }
    
    simulateCamera() {
        const cameraFeed = document.getElementById('cameraFeed');
        cameraFeed.innerHTML = `
            <div style="width: 100%; height: 100%; background: linear-gradient(45deg, #1a1a2e, #16213e); display: flex; align-items: center; justify-content: center; color: #00d4ff; position: relative;">
                <div style="text-align: center;">
                    <i class="fas fa-camera" style="font-size: 24px; margin-bottom: 8px; display: block;"></i>
                    <span style="font-size: 12px;">Live Feed</span>
                </div>
                <div style="position: absolute; top: 5px; right: 5px; width: 8px; height: 8px; background: #2ed573; border-radius: 50%; animation: pulse 2s infinite;"></div>
            </div>
        `;
    }
    
    takePhoto() {
        // Simulate photo capture
        const cameraFeed = document.getElementById('cameraFeed');
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            opacity: 0.8;
            pointer-events: none;
        `;
        
        cameraFeed.appendChild(flash);
        
        setTimeout(() => {
            cameraFeed.removeChild(flash);
        }, 200);
        
        // Show notification
        this.showNotification('Photo captured!', 'success');
    }
    
    startFaceTracking() {
        this.showNotification('Face tracking enabled', 'info');
        // Simulate face tracking by moving head randomly
        this.faceTrackingInterval = setInterval(() => {
            if (document.getElementById('faceTracking').checked) {
                const randomYaw = Math.random() * 60 - 30; // -30 to 30
                const randomPitch = Math.random() * 30 - 15; // -15 to 15
                
                this.animateServo('head', 'yaw', randomYaw, 1000);
                this.animateServo('head', 'pitch', randomPitch, 1000);
            }
        }, 3000);
    }
    
    stopFaceTracking() {
        if (this.faceTrackingInterval) {
            clearInterval(this.faceTrackingInterval);
        }
        this.showNotification('Face tracking disabled', 'info');
    }
    
    startGestureRecognition() {
        this.showNotification('Gesture recognition enabled', 'info');
    }
    
    stopGestureRecognition() {
        this.showNotification('Gesture recognition disabled', 'info');
    }
    
    startMotionMirroring() {
        this.showNotification('Motion mirroring enabled', 'info');
    }
    
    stopMotionMirroring() {
        this.showNotification('Motion mirroring disabled', 'info');
    }
    
    resetRobotView() {
        this.executeResetPreset();
        this.showNotification('Robot view reset', 'success');
    }
    
    toggleFullscreen() {
        const robotContainer = document.getElementById('robotContainer');
        
        if (!document.fullscreenElement) {
            robotContainer.requestFullscreen().catch(err => {
                console.log('Fullscreen not supported');
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${type === 'success' ? '#2ed573' : type === 'error' ? '#ff4757' : '#00d4ff'};
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    startStatusUpdates() {
        // Update FPS counter
        let frameCount = 0;
        let lastTime = Date.now();
        
        const updateFPS = () => {
            frameCount++;
            const currentTime = Date.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                const fpsCounter = document.getElementById('fpsCounter');
                if (fpsCounter) {
                    fpsCounter.textContent = fps;
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(updateFPS);
        };
        
        updateFPS();
        
        // Update system status randomly
        setInterval(() => {
            this.updateSystemStatus();
        }, 2000);
    }
    
    updateSystemStatus() {
        const cpuFill = document.querySelector('.status-item:nth-child(1) .progress-fill');
        const memoryFill = document.querySelector('.status-item:nth-child(2) .progress-fill');
        const batteryFill = document.querySelector('.status-item:nth-child(3) .progress-fill');
        
        const cpuValue = document.querySelector('.status-item:nth-child(1) .status-value');
        const memoryValue = document.querySelector('.status-item:nth-child(2) .status-value');
        const batteryValue = document.querySelector('.status-item:nth-child(3) .status-value');
        
        // Simulate realistic values
        const cpu = Math.round(30 + Math.random() * 40); // 30-70%
        const memory = Math.round(50 + Math.random() * 30); // 50-80%
        const battery = Math.max(20, Math.round(85 + Math.random() * 15 - Math.random() * 5)); // Slowly decreasing
        
        if (cpuFill && cpuValue) {
            cpuFill.style.width = `${cpu}%`;
            cpuValue.textContent = `${cpu}%`;
        }
        
        if (memoryFill && memoryValue) {
            memoryFill.style.width = `${memory}%`;
            memoryValue.textContent = `${memory}%`;
        }
        
        if (batteryFill && batteryValue) {
            batteryFill.style.width = `${battery}%`;
            batteryValue.textContent = `${battery}%`;
        }
    }
    
    updateTimestamp() {
        const updateTime = () => {
            const timestamp = document.getElementById('timestamp');
            if (timestamp) {
                const now = new Date();
                timestamp.textContent = now.toLocaleTimeString();
            }
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the ElectronBot Studio when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.electronBotStudio = new ElectronBotStudio();
});

// Add some demo keyframes for testing
setTimeout(() => {
    if (window.electronBotStudio) {
        // Add some sample timeline data
        window.electronBotStudio.timeline = [
            { time: 0, servo: 'head', value: { yaw: 0, pitch: 0 } },
            { time: 1000, servo: 'head', value: { yaw: 30, pitch: -10 } },
            { time: 2000, servo: 'rightArm', value: { shoulder: 45, elbow: 90 } },
            { time: 3000, servo: 'leftArm', value: { shoulder: -45, elbow: 60 } },
            { time: 4000, servo: 'head', value: { yaw: -30, pitch: 10 } },
            { time: 5000, servo: 'head', value: { yaw: 0, pitch: 0 } }
        ];
        window.electronBotStudio.updateTimelineVisual();
    }
}, 2000); 