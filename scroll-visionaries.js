document.addEventListener('DOMContentLoaded', function() {
  // Scroll visionaries section
  function scrollVisionaries(direction) {
    const container = document.querySelector('.visionaries-scroll');
    const scrollAmount = direction === 'left' ? -340 : 340;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  // Add click event listeners to scroll buttons
  const prevBtn = document.querySelector('.scroll-btn.prev');
  const nextBtn = document.querySelector('.scroll-btn.next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => scrollVisionaries('left'));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => scrollVisionaries('right'));
  }

  // Update button visibility based on scroll position
  const container = document.querySelector('.visionaries-scroll');
  if (container) {
    container.addEventListener('scroll', () => {
      const isAtStart = container.scrollLeft === 0;
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
      
      prevBtn.style.opacity = isAtStart ? '0.3' : '1';
      prevBtn.style.pointerEvents = isAtStart ? 'none' : 'all';
      
      nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
      nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'all';
    });
  }
});
