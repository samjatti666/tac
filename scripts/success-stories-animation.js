// scripts/success-stories-animation.js
// Animation for the Success Stories section

document.addEventListener('DOMContentLoaded', function() {
  const stories = document.querySelectorAll('.success-story-card');
  if (!stories.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
      }
    });
  }, { threshold: 0.2 });

  stories.forEach(card => {
    observer.observe(card);
  });
});
