document.addEventListener("DOMContentLoaded", () => {
            
    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Prevent breaking if href is just "#"

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Dark Mode Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Hamburger Menu Logic ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    hamburgerBtn.addEventListener('click', () => {
        // Toggle the menu open class
        navMenu.classList.toggle('open');
        
        // Update aria-expanded for screen readers (Accessibility)
        const isExpanded = navMenu.classList.contains('open');
        hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (event) => {
        // Check if the click was outside the menu AND outside the hamburger button
        if (!hamburgerBtn.contains(event.target) && !navMenu.contains(event.target) && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when a link inside it is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        });
    });
});