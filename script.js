document.addEventListener('DOMContentLoaded', () => {
    // Add subtle parallax to the orb based on mouse movement
    const hero = document.getElementById('hero');
    const orb = document.querySelector('.glow-orb');

    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        orb.style.transform = `translate(-50%, -50%) translate(${(x - 0.5) * 50}px, ${(y - 0.5) * 50}px)`;
    });

    hero.addEventListener('mouseleave', () => {
        orb.style.transform = `translate(-50%, -50%)`;
    });

    // Add scroll reveal animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Identify elements to animate
    const animatableElements = document.querySelectorAll('.about-text > *, .about-image, .toc-title, .grid-item');

    animatableElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        // Add staggered delay based on element type or index
        if (el.classList.contains('grid-item')) {
            // Stagger grid items 
            let delay = (index % 3) * 0.15; // 0s, 0.15s, 0.3s for each row
            el.style.transitionDelay = `${delay}s`;
        } else if (el.parentElement.classList.contains('about-text')) {
            // stagger about text children
            let delay = Array.from(el.parentElement.children).indexOf(el) * 0.15;
            el.style.transitionDelay = `${delay}s`;
        }

        observer.observe(el);
    });

    // Define the 'visible' class in JS directly or add it to CSS
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
