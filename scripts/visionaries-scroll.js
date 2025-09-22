document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.visionaries-scroll');
    const cards = document.querySelectorAll('.visionary-card');
    const isMobile = window.innerWidth <= 768;
    
    // Only get buttons if not on mobile
    const prevBtn = !isMobile ? document.querySelector('.scroll-prev') : null;
    const nextBtn = !isMobile ? document.querySelector('.scroll-next') : null;

    if (!container || !cards.length) return;

    let isAnimating = false;
    const scrollAmount = isMobile ? container.clientWidth * 0.85 : container.clientWidth * 0.8;
    let autoScrollInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    const updateButtonStates = () => {
        if (!prevBtn || !nextBtn) return;
        
        const isAtStart = container.scrollLeft <= 0;
        const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth;
        
        // Update button states
        prevBtn.disabled = isAtStart;
        nextBtn.disabled = isAtEnd;
        
        // Show/hide buttons based on scroll position
        prevBtn.style.opacity = isAtStart ? "0" : "1";
        nextBtn.style.opacity = isAtEnd ? "0" : "1";
    };

    const animateScroll = (direction) => {
        if (isAnimating || isMobile) return;
        isAnimating = true;

        // Only add animations on desktop
        if (!isMobile) {
            // Remove any existing animation classes
            cards.forEach(card => {
                card.classList.remove('slide-left', 'slide-right');
            });

            // Add new animation class based on direction
            cards.forEach(card => {
                card.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');
            });
        }

        container.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: isMobile ? 'auto' : 'smooth' // No smooth scroll on mobile
        });

        setTimeout(() => {
            isAnimating = false;
            if (!isMobile) {
                updateButtonStates();
            }
        }, isMobile ? 0 : 500); // No delay on mobile
    };

    // Add button event listeners only if they exist
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(autoScrollInterval);
            animateScroll('prev');
        });

        nextBtn.addEventListener('click', () => {
            clearInterval(autoScrollInterval);
            animateScroll('next');
        });
    }

    const startAutoScroll = () => {
        if (isMobile) return; // Disable auto-scroll on mobile
        
        autoScrollInterval = setInterval(() => {
            if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                animateScroll('next');
            }
            updateButtonStates();
        }, 5000);
    };

    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(autoScrollInterval);
    });

    container.addEventListener('touchmove', (e) => {
        // Allow default touch behavior on mobile
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        if (isMobile) {
            // On mobile, just let the native scroll behavior work
            return;
        }

        touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                animateScroll('prev');
            } else {
                animateScroll('next');
            }
        }
    });

    container.addEventListener('scroll', () => {
        if (!isMobile) {
            updateButtonStates();
        }
    });
    
    if (!isMobile) {
        container.addEventListener('mouseover', () => clearInterval(autoScrollInterval));
        container.addEventListener('mouseleave', startAutoScroll);
        updateButtonStates();
    }
    
    // Start auto-scroll
    startAutoScroll();
});
