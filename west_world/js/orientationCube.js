// OrientationCube widget extracted from original head.html
const THREE = window.THREE;

class OrientationCube {
    constructor(cube, arrows) {
        this.cube = cube;
        this.arrows = arrows;
        this.currentView = 'front';
        this.cubeRotation = { x: 0, y: 0 };
        this.isDraggingCube = false;
        this.dragStart = { x: 0, y: 0 };
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add hover effect for all faces
        const faces = this.cube.querySelectorAll('.cube-face');
        faces.forEach(face => {
            face.addEventListener('mouseenter', () => face.classList.add('hovered'));
            face.addEventListener('mouseleave', () => face.classList.remove('hovered'));
            face.addEventListener('click', e => {
                e.stopPropagation();
                const viewName = face.getAttribute('data-face');
                this.setCameraView(viewName);
            });
        });

        // Cube drag handlers
        this.cube.addEventListener('mousedown', e => {
            this.isDraggingCube = true;
            this.dragStart.x = e.clientX;
            this.dragStart.y = e.clientY;
            e.preventDefault();
        });
        document.addEventListener('mousemove', e => {
            if (!this.isDraggingCube) return;
            const deltaX = e.clientX - this.dragStart.x;
            const deltaY = e.clientY - this.dragStart.y;
            // Drag-to-rotate mapping
            this.cubeRotation.y += deltaX * 0.5;   // yaw
            this.cubeRotation.x -= deltaY * 0.5;   // pitch
            this.updateCubeRotation();
            this.updateCameraFromCube();
            this.updateActiveFaceFromRotation();
            this.dragStart.x = e.clientX;
            this.dragStart.y = e.clientY;
        });
        document.addEventListener('mouseup', () => {
            if (this.isDraggingCube) {
                this.isDraggingCube = false;
                this.updateActiveFaceFromRotation();
            }
        });

        // Arrow click handlers
        const arrowElements = this.arrows.querySelectorAll('.cube-arrow');
        arrowElements.forEach(arrow => {
            arrow.addEventListener('click', e => {
                e.stopPropagation();
                const dir = arrow.getAttribute('data-direction');
                this.rotateCubeByArrow(dir);
            });
        });

        // Initial state
        this.setCameraView('front');
        this.updateActiveFaceFromRotation();
    }

    setCameraView(viewName) {
        this.currentView = viewName;
        // Highlight face
        document.querySelectorAll('.cube-face').forEach(f => {
            f.classList.toggle('active', f.getAttribute('data-face') === viewName);
        });
        // Camera positions
        const viewPos = {front:{x:0,y:0,z:0.5},back:{x:0,y:0,z:-0.5},right:{x:0.5,y:0,z:0},left:{x:-0.5,y:0,z:0},top:{x:0,y:0.5,z:0},bottom:{x:0,y:-0.5,z:0}};
        const viewRot = {front:{x:0,y:0},back:{x:0,y:180},right:{x:0,y:-90},left:{x:0,y:90},top:{x:-90,y:0},bottom:{x:90,y:0}};
        this.animateCameraTo(viewPos[viewName], viewRot[viewName]);
        this.cubeRotation = {...viewRot[viewName]};
        this.updateCubeRotation();
        this.updateActiveFaceFromRotation();
    }

    rotateCubeByArrow(dir){
        const trans={front:{up:'top',down:'bottom',left:'left',right:'right'},back:{up:'top',down:'bottom',left:'right',right:'left'},left:{up:'top',down:'bottom',left:'back',right:'front'},right:{up:'top',down:'bottom',left:'front',right:'back'},top:{up:'back',down:'front',left:'left',right:'right'},bottom:{up:'front',down:'back',left:'left',right:'right'}};
        this.setCameraView(trans[this.currentView][dir]||'front');
    }

    updateCubeRotation(){
        this.cube.style.transform=`rotateX(${this.cubeRotation.x}deg) rotateY(${this.cubeRotation.y}deg)`;
    }

    updateActiveFaceFromRotation(){
        const faces=['front','back','right','left','top','bottom'];
        const normals={front:{x:0,y:0},back:{x:0,y:180},right:{x:0,y:-90},left:{x:0,y:90},top:{x:-90,y:0},bottom:{x:90,y:0}};
        const norm=(v)=>((v%360)+360)%360;
        const nx=norm(this.cubeRotation.x), ny=norm(this.cubeRotation.y);
        let min=360,closest='front';
        faces.forEach(f=>{const n=normals[f];let dx=Math.abs(nx-norm(n.x));let dy=Math.abs(ny-norm(n.y));if(dx>180)dx=360-dx;if(dy>180)dy=360-dy;const d=dx+dy;if(d<min){min=d;closest=f;}});
        document.querySelectorAll('.cube-face').forEach(el=>el.classList.toggle('active',el.getAttribute('data-face')===closest));
        const cube=document.getElementById('orientationCube');
        if(cube){cube.classList.toggle('face-perfectly-aligned',min<20);}
        this.currentView=closest;
    }

    updateCameraFromCube(){
        const dist=0.5;
        const radX=-this.cubeRotation.x*Math.PI/180;
        const radY=-this.cubeRotation.y*Math.PI/180;
        const x=dist*Math.sin(radY)*Math.cos(radX);
        const y=dist*Math.sin(radX);
        const z=dist*Math.cos(radY)*Math.cos(radX);
        electronBotStudio.camera.position.lerp(new THREE.Vector3(x,y,z),0.1);
        electronBotStudio.camera.lookAt(0,0,0);
        electronBotStudio.controls.target.set(0,0,0);
        electronBotStudio.controls.update();
    }

    animateCameraTo(pos,rot){
        const start=electronBotStudio.camera.position.clone();
        const end=new THREE.Vector3(pos.x,pos.y,pos.z);
        let progress=0,startTime=Date.now();
        const dur=500;
        const step=()=>{progress=Math.min((Date.now()-startTime)/dur,1);const ease=1-Math.pow(1-progress,3);electronBotStudio.camera.position.lerpVectors(start,end,ease);electronBotStudio.camera.lookAt(0,0,0);electronBotStudio.controls.target.set(0,0,0);electronBotStudio.controls.update();if(progress<1)requestAnimationFrame(step);};
        step();
    }
}

export default OrientationCube;
