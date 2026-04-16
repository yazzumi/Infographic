let lastViewportWidth = window.innerWidth;

function isPinchZooming() {
    return window.visualViewport && Math.abs(window.visualViewport.scale - 1) > 0.01;
}

function updatePageScale() {
    const shell = document.getElementById('page-shell');
    const desktop = document.getElementById('page-desktop');

    if (!shell || !desktop) return;

    const designWidth = 1440;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scale = viewportWidth / designWidth;

    document.documentElement.style.setProperty('--page-scale', scale);

    // Make the unscaled canvas tall enough so the scaled page still fills the phone screen
    desktop.style.minHeight = `${viewportHeight / scale}px`;

    requestAnimationFrame(() => {
        const scaledHeight = desktop.offsetHeight * scale;
        shell.style.height = `${scaledHeight}px`;
        shell.classList.add('is-ready');
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    fadeElements.forEach(element => observer.observe(element));

    updatePageScale();
});

window.addEventListener('load', updatePageScale);

window.addEventListener('resize', () => {
    if (isPinchZooming()) return;

    const currentWidth = window.innerWidth;

    if (currentWidth !== lastViewportWidth) {
        lastViewportWidth = currentWidth;
        updatePageScale();
    }
});

window.addEventListener('orientationchange', () => {
    lastViewportWidth = window.innerWidth;
    updatePageScale();
});