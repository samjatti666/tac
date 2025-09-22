// Responsive mobile menu toggle for header
// Mobile-first, gold-accented, full-width overlay

document.addEventListener('DOMContentLoaded', function() {
  var openBtn = document.getElementById('openMobileNav');
  var closeBtn = document.getElementById('closeMobileNav');
  var mobileNav = document.getElementById('mobileNav');
  var body = document.body;

  function openMenu() {
    if (mobileNav) mobileNav.classList.add('show-mobile-nav');
    if (body) body.classList.add('mobile-nav-open');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    if (mobileNav) mobileNav.classList.remove('show-mobile-nav');
    if (body) body.classList.remove('mobile-nav-open');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
  }

  if (openBtn && mobileNav) {
    openBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (mobileNav.classList.contains('show-mobile-nav')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeMenu();
    });
  }

  // Hide menu on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // Hide menu by default on load
  closeMenu();
});
