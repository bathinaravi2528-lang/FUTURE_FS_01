// 1. THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = body.classList.toggle('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// Apply saved theme
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
}

// 2. SCROLL REVEAL (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // Reveal only once
        }
    });
}, { threshold: 0.1 });

// Reveal all elements with .reveal class
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 3. ACTIVE NAV LINK ON SCROLL
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.5 });

// Only observe sections if they exist on the page
sections.forEach(section => navObserver.observe(section));

// 4. SMOOTH NAVIGATION (Click Handling)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        // Only prevent default and scroll smoothly if it's an anchor link on the same page
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 5. PREVENT SNAP ON DRAG (Optional refinement)
window.addEventListener('resize', () => {
    // Basic fix for snap positioning on resize
    const activeSection = document.querySelector('.page-section:hover') || sections[0];
    if (activeSection) activeSection.scrollIntoView();
});

// 6. NAVBAR SCROLL EFFECT
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}
