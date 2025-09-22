document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('mobileMenuBtn');
    const closeButton = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        
        menuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
        document.body.classList.toggle('menu-open');
    }

    // Open/close menu when clicking the menu button
    menuButton.addEventListener('click', toggleMenu);

    // Close menu when clicking the close button
    closeButton.addEventListener('click', toggleMenu);

    // Add cancel button functionality
    const cancelButton = document.getElementById('cancelMobileMenu');
    if (cancelButton) {
        cancelButton.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
            toggleMenu();
        }
    });

    // Close menu when resizing to desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && menuButton.getAttribute('aria-expanded') === 'true') {
            toggleMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (menuButton.getAttribute('aria-expanded') === 'true' && 
            !mobileMenu.contains(e.target) && 
            !menuButton.contains(e.target)) {
            toggleMenu();
        }
    });
});