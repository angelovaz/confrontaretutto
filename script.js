/**
 * ConfrontaReTutto — Script
 * Dark theme interactions
 */
document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initScrollReveal();
    initSmoothScroll();
    initCardHoverEffects();
    initCategoryAccordion();
});

/* Header background on scroll */
function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;
    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 40);
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* Intersection Observer scroll reveal */
function initScrollReveal() {
    const els = document.querySelectorAll('.animate-on-scroll');
    if (!els.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Stagger cards in the same row
                    const card = entry.target;
                    const parent = card.parentElement;
                    if (parent && (parent.classList.contains('cards-grid') || parent.classList.contains('comparison-list'))) {
                        const siblings = Array.from(parent.querySelectorAll('.animate-on-scroll'));
                        const idx = siblings.indexOf(card);
                        card.style.transitionDelay = `${idx * 0.12}s`;
                    }
                    requestAnimationFrame(() => card.classList.add('visible'));
                    observer.unobserve(card);
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );

    els.forEach((el) => observer.observe(el));
}

/* Smooth scroll */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

/* Subtle glow follow on cards (desktop) */
function initCardHoverEffects() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--glow-x', `${x}%`);
            card.style.setProperty('--glow-y', `${y}%`);
        });
    });
}

/* ── Category Accordion ── */
function initCategoryAccordion() {
    const rows = document.querySelectorAll('.category-row');
    if (!rows.length) return;

    rows.forEach((row) => {
        row.addEventListener('click', () => {
            const isOpen = row.classList.contains('open');

            // Close all rows
            rows.forEach((r) => r.classList.remove('open'));

            // If it was closed, open it
            if (!isOpen) {
                row.classList.add('open');
            }
        });
    });
}
