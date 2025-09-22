// Handle section animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section-fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animation
                // sectionObserver.unobserve(entry.target);
            } else {
                // Optional: Remove the class when section is not in view
                // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
