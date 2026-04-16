function updatePageScale() {
    const shell = document.getElementById('page-shell');
    const desktop = document.getElementById('page-desktop');

    if (!shell || !desktop) return;

    const designWidth = 1440;
    const viewportWidth = window.innerWidth;
    const scale = viewportWidth / designWidth;

    document.documentElement.style.setProperty('--page-scale', scale);

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
window.addEventListener('resize', updatePageScale);
window.addEventListener('orientationchange', updatePageScale);