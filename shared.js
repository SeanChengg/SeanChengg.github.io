// Scale and center content based on window size
function updateScale() {
    const container = document.querySelector('.group-parent');
    const originalWidth = 1920;
    const originalHeight = 1080;
    
    const scaleX = window.innerWidth / originalWidth;
    const scaleY = window.innerHeight / originalHeight;
    const scale = Math.min(scaleX, scaleY) * 1.03; // Scale at 103% as originally set
    
    document.documentElement.style.setProperty('--scale-factor', scale);
    
    // Center the main content container
    const scaledWidth = originalWidth * scale;
    const scaledHeight = originalHeight * scale;
    container.style.left = `${(window.innerWidth - scaledWidth) / 2}px`;
    container.style.top = `${(window.innerHeight - scaledHeight) / 2}px`;
}

// Initialize scaling
window.addEventListener('load', updateScale);
window.addEventListener('resize', updateScale);

// Fade out before navigation
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const href = this.getAttribute('href');
        
        document.body.style.opacity = 0;
        setTimeout(() => {
            window.location.href = href;
        }, 200);
    });
}); 