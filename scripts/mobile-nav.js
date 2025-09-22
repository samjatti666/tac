document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('openMobileNav');
    const closeButton = document.getElementById('closeMobileNav');
    const mobileNav = document.getElementById('mobileNav');
    
    function toggleMenu() {
        if (mobileNav.style.display === 'none' || !mobileNav.style.display) {
            mobileNav.style.display = 'flex';
            menuButton.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            
            // Add animation classes
            setTimeout(() => {
                mobileNav.classList.add('show');
            }, 10);
        } else {
            mobileNav.classList.remove('show');
            menuButton.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            
            // Wait for animation to complete before hiding
            setTimeout(() => {
                mobileNav.style.display = 'none';
            }, 300);
        }
    }

    // Toggle menu on button click
    menuButton.addEventListener('click', toggleMenu);
    
    // Close menu when close button is clicked
    closeButton.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileNav.style.display === 'flex' && 
            !mobileNav.contains(event.target) && 
            !menuButton.contains(event.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileNav.style.display === 'flex') {
            toggleMenu();
        }
    });

    // Close menu when window is resized to desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && mobileNav.style.display === 'flex') {
            toggleMenu();
        }
    });
});