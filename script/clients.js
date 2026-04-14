function updatePageScale() {
    const designWidth = 1440;
    const container = document.getElementById('page-scale-container');
    const desktop = document.getElementById('page-desktop');

    if (!container || !desktop) return;

    const viewportWidth = window.innerWidth;
    const scale = Math.min(viewportWidth / designWidth, 1);

    document.documentElement.style.setProperty('--page-scale', scale);

    requestAnimationFrame(() => {
        const scaledHeight = desktop.offsetHeight * scale;
        container.style.height = scaledHeight + 'px';
        container.style.visibility = 'visible';
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
    const container = document.getElementById('page-scale-container');

    if (container) {
        container.style.visibility = 'hidden';
    }

    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    fadeElements.forEach(element => observer.observe(element));

    updatePageScale();
});

window.addEventListener('resize', updatePageScale);