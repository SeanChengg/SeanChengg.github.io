// Main bootstrap module that wires the ElectronBotStudio app together
import ElectronBotStudio from './ElectronBotStudio.js';
import OrientationCube from './orientationCube.js';

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    const studio = new ElectronBotStudio();
    window.electronBotStudio = studio;

    // Orientation cube
    const cube = document.getElementById('orientationCube');
    const arrows = document.getElementById('cubeArrows');
    if (cube && arrows) new OrientationCube(cube, arrows);

    /* global helper wrappers required by legacy inline HTML attributes */
    window.resetPose = () => studio.resetPose();
    window.wavePose  = () => { studio.setAngleArmRollRight(-30); studio.setAngleArmPitchRight(90); studio.updateSliderDisplays(); };
    window.dancePose = () => { studio.setAngleArmRollLeft(20); studio.setAngleArmRollRight(-20); studio.setAngleArmPitchLeft(45); studio.setAngleArmPitchRight(-45); studio.updateSliderDisplays(); };
    window.pointPose = () => { studio.setAngleArmRollRight(0); studio.setAngleArmPitchRight(-90); studio.updateSliderDisplays(); };

    // Left face helpers
    window.openLeftFacePanel  = () => studio.openLeftFacePanel();
    window.closeLeftFacePanel = () => studio.closeLeftFacePanel();
    window.setLeftFacePanelPosition = p => studio.setLeftFacePanelPosition(p);

    // Trajectory path toggle button
    window.toggleTrajectoryPath = () => {
        if (!studio.trajectoryLine) return;
        const visible = !studio.trajectoryLine.visible;
        studio.trajectoryLine.visible = visible;
        if (studio.trajectoryDebugMarkers) studio.trajectoryDebugMarkers.forEach(m => m.visible = visible);
        const btn = event?.target;
        if (btn && btn.tagName === 'BUTTON') btn.textContent = visible ? 'Hide Path' : 'Show Path';
    };

    // Orange reset button
    window.resetTrajectory = () => {
        studio.resetAllMouthControls();
        studio.updateTrajectoryPath();
        studio.setMouthTrajectoryPosition(0);
        studio.updateTrajectoryDisplays();
    };

    // Expand / collapse mouth panel
    window.toggleMouthPanel = () => {
        const full = document.getElementById('mouthFullPanel');
        const collapsed = document.getElementById('mouthCollapsedPanel');
        const toggleBtn = document.getElementById('mouthToggleBtn');
        const dotControls = document.getElementById('mouthDotControls');
        const buttonControls = document.getElementById('mouthButtonControls');
        const dotIds = ['orangeDotControls1','orangeDotControls2','yellowDotControls1','yellowDotControls2','greenDotControls1','greenDotControls2','blueDotControls1','blueDotControls2'];
        const isCollapsed = full.style.display === 'none';
        if (isCollapsed) {
            full.style.display = 'block';
            collapsed.style.display = 'none';
            dotControls.style.display = 'block';
            buttonControls.style.display = 'flex';
            dotIds.forEach(id=>{const el=document.getElementById(id); if(el) el.style.display='block';});
            if (studio.trajectoryLine) studio.trajectoryLine.visible = true;
            if (studio.trajectoryDebugMarkers) studio.trajectoryDebugMarkers.forEach(m=>m.visible=true);
            toggleBtn.textContent='▲';
        } else {
            full.style.display='none';
            collapsed.style.display='block';
            dotControls.style.display='none';
            buttonControls.style.display='none';
            dotIds.forEach(id=>{const el=document.getElementById(id); if(el) el.style.display='none';});
            if (studio.trajectoryLine) studio.trajectoryLine.visible = false;
            if (studio.trajectoryDebugMarkers) studio.trajectoryDebugMarkers.forEach(m=>m.visible=false);
            toggleBtn.textContent='▼';
        }
    };

    // Homepage button fade-out then redirect
    window.backToMain = () => {
        document.body.style.opacity = 0;
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    };

    // Animate mouth button
    const animateBtn = document.getElementById('animateBtn');
    if (animateBtn) {
        animateBtn.addEventListener('click', () => {
            if (studio.isAnimating) {
                studio.isAnimating = false;
                if (studio.animationId) cancelAnimationFrame(studio.animationId);
                animateBtn.textContent='Animate';
                animateBtn.style.background='linear-gradient(135deg, #f39c12, #e67e22)';
                studio.trajectoryParams.progress=0;
                studio.setMouthTrajectoryPosition(0);
                document.getElementById('trajectoryProgressSlider').value=0;
                document.getElementById('trajectoryProgressSliderCollapsed').value=0;
                document.getElementById('trajectoryProgressValue').textContent='0%';
                document.getElementById('trajectoryProgressValueCollapsed').textContent='0%';
            } else {
                studio.isAnimating=true;
                studio.animationStartTime=Date.now();
                animateBtn.textContent='STOP';
                animateBtn.style.background='linear-gradient(135deg, #e74c3c, #c0392b)';
                const loop=()=>{
                    if(!studio.isAnimating) return;
                    const elapsed=Date.now()-studio.animationStartTime;
                    const duration=2000;
                    const cycle=(elapsed%duration)/duration;
                    const progress=cycle<=0.5?cycle*2:(1-cycle)*2;
                    studio.trajectoryParams.progress=progress;
                    studio.setMouthTrajectoryPosition(progress);
                    const pct=Math.round(progress*100);
                    document.getElementById('trajectoryProgressSlider').value=pct;
                    document.getElementById('trajectoryProgressSliderCollapsed').value=pct;
                    document.getElementById('trajectoryProgressValue').textContent=pct+'%';
                    document.getElementById('trajectoryProgressValueCollapsed').textContent=pct+'%';
                    studio.animationId=requestAnimationFrame(loop);
                };
                loop();
            }
        });
    }

    // ================= LEFT FACE PANEL CONTROLS ==================
    const lProgressSlider = document.getElementById('leftTrajectoryProgressSlider');
    const lProgressValue  = document.getElementById('leftTrajectoryProgressValue');
    const lProgressSliderCol = document.getElementById('leftTrajectoryProgressSliderCollapsed');
    const lProgressValCol   = document.getElementById('leftTrajectoryProgressValueCollapsed');
    const lHeightSlider  = document.getElementById('leftTrajectoryHeightSlider');
    const lHeightValue   = document.getElementById('leftTrajectoryHeightValue');
    const lDirSlider     = document.getElementById('leftTrajectoryDirectionSlider');
    const lDirValue      = document.getElementById('leftTrajectoryDirectionValue');

    if (lProgressSlider && lProgressValue) lProgressSlider.addEventListener('input', e => {
        const p = parseFloat(e.target.value)/100;
        studio.leftFaceTrajectoryParams.progress = p;
        studio.setLeftFaceTrajectoryPosition(p);
        lProgressValue.textContent = e.target.value + '%';
        if (lProgressSliderCol) lProgressSliderCol.value = e.target.value;
        if (lProgressValCol)  lProgressValCol.textContent = e.target.value + '%';
    });
    if (lProgressSliderCol && lProgressValCol) lProgressSliderCol.addEventListener('input', e => {
        const p = parseFloat(e.target.value)/100;
        studio.leftFaceTrajectoryParams.progress = p;
        studio.setLeftFaceTrajectoryPosition(p);
        lProgressValCol.textContent = e.target.value + '%';
        if (lProgressSlider) lProgressSlider.value = e.target.value;
        if (lProgressValue)  lProgressValue.textContent = e.target.value + '%';
    });

    if (lHeightSlider && lHeightValue) lHeightSlider.addEventListener('input', e => {
        studio.leftFaceTrajectoryParams.height = -0.04 + parseFloat(e.target.value); // New baseline -0.04
        lHeightValue.textContent = e.target.value;
        studio.updateLeftFaceTrajectoryPath();
    });

    if (lDirSlider && lDirValue) lDirSlider.addEventListener('input', e => {
        studio.leftFaceTrajectoryParams.direction = parseInt(e.target.value); // baseline 180°
        lDirValue.textContent = e.target.value + '°';
        studio.updateLeftFaceTrajectoryPath();
    });

    // Dot sliders helpers (depth/vertical) - FIXED: Each slider controls ONLY its own dot
    const dotMap = [
        {depth:'leftOrangeDotSlider',   vert:'leftOrangeVerticalSlider',   depthKey:'orangeDot', vertKey:'orangeVertical', baseDepth:0.2,  baseVert:-0.65},
        {depth:'leftYellowDotSlider',   vert:'leftYellowVerticalSlider',   depthKey:'yellowDot', vertKey:'yellowVertical', baseDepth:0.05,  baseVert:-0.35},
        {depth:'leftGreenDotSlider',    vert:'leftGreenVerticalSlider',    depthKey:'greenDot',  vertKey:'greenVertical',  baseDepth:-0.05,  baseVert:-0.1},
        {depth:'leftBlueDotSlider',     vert:'leftBlueVerticalSlider',     depthKey:'blueDot',   vertKey:'blueVertical',   baseDepth:0.35,   baseVert:-0.9}
    ];

    dotMap.forEach(m => {
        const dSlider = document.getElementById(m.depth);
        const vSlider = document.getElementById(m.vert);
        if (dSlider) dSlider.addEventListener('input', e => {
            studio.leftFaceTrajectoryParams[m.depthKey] = m.baseDepth + parseFloat(e.target.value);
            studio.updateLeftFaceTrajectoryPath(m.depthKey);
            const valSpan = document.getElementById(m.depth.replace('Slider','Value'));
            if (valSpan) valSpan.textContent = e.target.value;
        });
        if (vSlider) vSlider.addEventListener('input', e => {
            studio.leftFaceTrajectoryParams[m.vertKey] = m.baseVert + parseFloat(e.target.value);
            studio.updateLeftFaceTrajectoryPath(m.vertKey);
            const valSpan = document.getElementById(m.vert.replace('Slider','Value'));
            if (valSpan) valSpan.textContent = e.target.value;
        });
    });

    // Dynamically create and inject the Left Face Animate button to be permanently visible
    const leftFacePanel = document.getElementById('leftFacePanel');
    const divider = leftFacePanel.querySelector('.mouth-divider');
    if (leftFacePanel && divider) {
        const animateBtn = document.createElement('button');
        animateBtn.id = 'leftFaceAnimateBtn';
        animateBtn.className = 'preset-btn';
        animateBtn.style.width = '100%';
        animateBtn.style.marginBottom = '10px';
        animateBtn.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
        animateBtn.textContent = 'Animate';
        // Insert the button directly after the divider to make it always visible
        divider.insertAdjacentElement('afterend', animateBtn);
    }

    // Animate Left Face button
    const leftFaceAnimateBtn = document.getElementById('leftFaceAnimateBtn');
    if (leftFaceAnimateBtn) {
        leftFaceAnimateBtn.addEventListener('click', () => {
            if (studio.isLeftFaceAnimating) {
                studio.isLeftFaceAnimating = false;
                if (studio.leftFaceAnimationId) cancelAnimationFrame(studio.leftFaceAnimationId);
                leftFaceAnimateBtn.textContent='Animate';
                leftFaceAnimateBtn.style.background='linear-gradient(135deg, #f39c12, #e67e22)';
                studio.leftFaceTrajectoryParams.progress=0;
                studio.setLeftFaceTrajectoryPosition(0);
                document.getElementById('leftTrajectoryProgressSlider').value=0;
                document.getElementById('leftTrajectoryProgressSliderCollapsed').value=0;
                document.getElementById('leftTrajectoryProgressValue').textContent='0%';
                document.getElementById('leftTrajectoryProgressValueCollapsed').textContent='0%';
            } else {
                studio.isLeftFaceAnimating=true;
                studio.leftFaceAnimationStartTime=Date.now();
                leftFaceAnimateBtn.textContent='STOP';
                leftFaceAnimateBtn.style.background='linear-gradient(135deg, #e74c3c, #c0392b)';
                const loop=()=>{
                    if(!studio.isLeftFaceAnimating) return;
                    const elapsed=Date.now()-studio.leftFaceAnimationStartTime;
                    const duration=2000;
                    const cycle=(elapsed%duration)/duration;
                    const progress=cycle<=0.5?cycle*2:(1-cycle)*2;
                    studio.leftFaceTrajectoryParams.progress=progress;
                    studio.setLeftFaceTrajectoryPosition(progress);
                    const pct=Math.round(progress*100);
                    document.getElementById('leftTrajectoryProgressSlider').value=pct;
                    document.getElementById('leftTrajectoryProgressSliderCollapsed').value=pct;
                    document.getElementById('leftTrajectoryProgressValue').textContent=pct+'%';
                    document.getElementById('leftTrajectoryProgressValueCollapsed').textContent=pct+'%';
                    studio.leftFaceAnimationId=requestAnimationFrame(loop);
                };
                loop();
            }
        });
    }

    // Left panel toggle helpers
    window.toggleLeftFacePanel = () => {
        const full = document.getElementById('leftFaceFullPanel');
        const collapsed = document.getElementById('leftFaceCollapsedPanel');
        const toggleBtn = document.getElementById('leftFaceToggleBtn');
        const dotControls = document.getElementById('leftDotControls');
        const buttonControls = document.getElementById('leftButtonControls');
        const dotIds = ['leftOrangeDotControls1','leftOrangeDotControls2','leftYellowDotControls1','leftYellowDotControls2','leftGreenDotControls1','leftGreenDotControls2','leftBlueDotControls1','leftBlueDotControls2'];
        const isCollapsed = full.style.display === 'none';
        if (isCollapsed) {
            full.style.display='block'; collapsed.style.display='none'; dotControls.style.display='block'; buttonControls.style.display='flex';
            dotIds.forEach(id=>{const el=document.getElementById(id); if(el) el.style.display='block';});
            if (studio.leftFaceTrajectoryLine) studio.leftFaceTrajectoryLine.visible=true;
            if (studio.leftFaceTrajectoryDebugMarkers) studio.leftFaceTrajectoryDebugMarkers.forEach(m=>m.visible=true);
            toggleBtn.textContent='▲';
        } else {
            full.style.display='none'; collapsed.style.display='block'; dotControls.style.display='none'; buttonControls.style.display='none';
            dotIds.forEach(id=>{const el=document.getElementById(id); if(el) el.style.display='none';});
            if (studio.leftFaceTrajectoryLine) studio.leftFaceTrajectoryLine.visible=false;
            if (studio.leftFaceTrajectoryDebugMarkers) studio.leftFaceTrajectoryDebugMarkers.forEach(m=>m.visible=false);
            toggleBtn.textContent='▼';
        }
    };

    window.toggleLeftFaceTrajectoryPath = () => {
        if (!studio.leftFaceTrajectoryLine) return;
        const visible = !studio.leftFaceTrajectoryLine.visible;
        studio.leftFaceTrajectoryLine.visible = visible;
        if (studio.leftFaceTrajectoryDebugMarkers) studio.leftFaceTrajectoryDebugMarkers.forEach(m=>m.visible=visible);
        const btn = event?.target; if(btn) btn.textContent = visible? 'Hide Path':'Show Path';
    };

    window.resetLeftFaceTrajectory = () => {
        studio.resetLeftFacePanel();
    };

    // expose class too
    window.ElectronBotStudio = ElectronBotStudio;
}); 