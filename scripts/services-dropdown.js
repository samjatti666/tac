document.addEventListener('DOMContentLoaded', function() {
    const servicesBtn = document.querySelector('.services-btn');
    const servicesMenu = document.querySelector('.services-menu');
    const cancelServices = document.getElementById('cancelServices');

    // Close services menu when cancel button is clicked
    if (cancelServices) {
        cancelServices.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            servicesMenu.style.opacity = '0';
            servicesMenu.style.visibility = 'hidden';
            servicesMenu.style.transform = 'translateY(-10px)';
            servicesBtn.focus(); // Return focus to services button
        });
    }

    // Close services menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!servicesMenu.contains(e.target) && 
            !servicesBtn.contains(e.target) && 
            servicesMenu.style.visibility === 'visible') {
            servicesMenu.style.opacity = '0';
            servicesMenu.style.visibility = 'hidden';
            servicesMenu.style.transform = 'translateY(-10px)';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && servicesMenu.style.visibility === 'visible') {
            servicesMenu.style.opacity = '0';
            servicesMenu.style.visibility = 'hidden';
            servicesMenu.style.transform = 'translateY(-10px)';
            servicesBtn.focus(); // Return focus to services button
        }
    });
});
