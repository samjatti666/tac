// Function to ensure favicon persistence
function setupFavicon() {
    const faviconPath = './pictures/tac-logo.png';
    const head = document.querySelector('head');

    // Helper function to create and add favicon links
    function createFaviconLink(rel, sizes = null, type = 'image/png') {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = faviconPath;
        if (sizes) link.sizes = sizes;
        if (type) link.type = type;
        head.appendChild(link);
        return link;
    }

    // Function to check if favicon is loaded
    function checkFaviconLoaded() {
        const favicon = document.querySelector('link[rel="icon"]');
        if (!favicon || !favicon.href.includes('tac-logo.png')) {
            // Re-add favicons if missing
            const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
            existingFavicons.forEach(f => f.remove());

            // Add standard favicons
            createFaviconLink('icon', '32x32');
            createFaviconLink('icon', '16x16');
            createFaviconLink('shortcut icon', null, 'image/x-icon');

            // Add Apple Touch Icons
            const appleSizes = ['57x57', '60x60', '72x72', '76x76', '114x114', '120x120', '144x144', '152x152', '180x180'];
            appleSizes.forEach(size => createFaviconLink('apple-touch-icon', size));

            // Add Windows Tile meta tags
            let tileMeta = document.querySelector('meta[name="msapplication-TileImage"]');
            if (!tileMeta) {
                tileMeta = document.createElement('meta');
                tileMeta.name = 'msapplication-TileImage';
                tileMeta.content = faviconPath;
                head.appendChild(tileMeta);
            }
        }
    }

    // Check favicon on page load
    checkFaviconLoaded();

    // Check favicon periodically
    setInterval(checkFaviconLoaded, 2000);

    // Check when page becomes visible
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            checkFaviconLoaded();
        }
    });

    // Check when window gains focus
    window.addEventListener('focus', checkFaviconLoaded);
}

// Initialize favicon handling
document.addEventListener('DOMContentLoaded', setupFavicon);

function setupServiceCardLinks() {
    const serviceCards = document.querySelectorAll('.carousel-card');
    if (!serviceCards.length) return;

    serviceCards.forEach(card => {
        card.addEventListener('click', function () {
            const service = this.dataset.service;
            if (service) window.location.href = `service-details.html?service=${service}`;
        });
    });
}

function setupServiceCardLinks() {
    const serviceCards = document.querySelectorAll('.carousel-card');
    if (!serviceCards.length) return;

    serviceCards.forEach(card => {
        card.addEventListener('click', function () {
            const service = this.dataset.service;
            if (service) window.location.href = `service-details.html?service=${service}`;
        });
    });
}

function setupMobileNavigation() {
  const mobileNav = document.getElementById('mobileNav');
  const openMobileNav = document.getElementById('openMobileNav');
  const closeMobileNav = document.getElementById('closeMobileNav');
  
  // Only set up mobile navigation if all required elements exist
  if (mobileNav && openMobileNav && closeMobileNav) {
    let isAnimating = false;

    const toggleMobileNav = (show) => {
      if (isAnimating) return;
      isAnimating = true;

      try {
        if (show) {
          mobileNav.classList.add('active');
          document.body.classList.add('body-no-scroll');
        } else {
          mobileNav.classList.remove('active');
          document.body.classList.remove('body-no-scroll');
        }
      } catch (error) {
        console.warn('Error toggling mobile nav:', error);
      } finally {
        setTimeout(() => {
          isAnimating = false;
        }, 400); // Match your transition duration
      }
    };

    // Add event listeners with error handling
    openMobileNav.addEventListener('click', () => toggleMobileNav(true));
    closeMobileNav.addEventListener('click', () => toggleMobileNav(false));

    // Close nav on link click
    const links = mobileNav.querySelectorAll('a');
    if (links.length) {
      links.forEach(link => {
        if (link) {
          link.addEventListener('click', () => toggleMobileNav(false));
        }
      });
    }
  }
}

function setupStickyBar() {
  // Dark/Light mode toggle
  const toggleDarkMode = document.getElementById('toggleDarkMode');
  let darkMode = true;
  if (toggleDarkMode) {
    toggleDarkMode.addEventListener('click', () => {
      darkMode = !darkMode;
      document.body.style.background = darkMode ? '#0a0a0a' : '#fffbe9';
      document.body.style.color = darkMode ? '#e0e0e0' : '#222';
      toggleDarkMode.innerHTML = darkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
  }

  // Hide sticky bar on desktop
  function handleStickyBar() {
    const bar = document.getElementById('stickyBottomBar');
    if (!bar) return;
    if (window.innerWidth > 900) {
      bar.style.display = 'none';
    } else {
      bar.style.display = 'flex';
    }
  }
  window.addEventListener('resize', handleStickyBar);
  handleStickyBar();
}

function setupVisionariesAnimation() {
  const visionaryCards = document.querySelectorAll('.visionary-card');
  if (!visionaryCards.length) return;

  let animationFrame;
  let isAnimating = false;

  function animateVisionaries() {
    if (isAnimating) {
      cancelAnimationFrame(animationFrame);
    }

    isAnimating = true;
    const grid = document.getElementById('visionaries-grid');
    
    if (!grid) {
      isAnimating = false;
      return;
    }

    try {
      const gridRect = grid.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (gridRect.top < windowHeight * 0.95) {
        visionaryCards.forEach((card, i) => {
          if (card) {
            setTimeout(() => {
              try {
                card.classList.add('animated');
              } catch (err) {
                console.warn('Error animating card:', err);
              }
            }, i * 120);
          }
        });
        window.removeEventListener('scroll', scrollHandler);
      }
    } catch (error) {
      console.warn('Error in animateVisionaries:', error);
    }

    isAnimating = false;
  }

  // Throttled scroll handler
  const scrollHandler = () => {
    if (!isAnimating) {
      animationFrame = requestAnimationFrame(animateVisionaries);
    }
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
  animateVisionaries();
}

function setupCultureScrollSync() {
  const cultureSection = document.getElementById('culture-section');
  const cultureCards = document.querySelectorAll('.culture-card');
  if (!cultureSection || cultureCards.length === 0) return;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function handleCultureScrollSync() {
    const sectionRect = cultureSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // Section progress: 0 (top enters viewport) to 1 (bottom leaves viewport)
    const sectionHeight = sectionRect.height;
    const scrollStart = windowHeight * 0.2; // Start animating a bit before fully in view
    const scrollEnd = windowHeight * 0.2 + sectionHeight;
    const progress = clamp((windowHeight - sectionRect.top - scrollStart) / (scrollEnd - scrollStart), 0, 1);

    cultureCards.forEach((card, i) => {
      // Stagger each card's animation by index
      const cardDelay = i * 0.15;
      const cardProgress = clamp((progress - cardDelay) / 0.5, 0, 1); // 0.5 = duration of each card's animation

      // Animate transform and opacity based on cardProgress
      let translateX = 0;
      if (card.classList.contains('from-left')) {
        translateX = lerp(-80, 0, cardProgress); // Slide in from left
      } else if (card.classList.contains('from-right')) {
        translateX = lerp(80, 0, cardProgress); // Slide in from right
      } else {
        translateX = 0;
      }
      const opacity = lerp(0, 1, cardProgress);
      card.style.transform = `translateX(${translateX}px)`;
      card.style.opacity = opacity;
    });
  }

  window.addEventListener('scroll', handleCultureScrollSync, { passive: true });
  window.addEventListener('resize', handleCultureScrollSync);
  handleCultureScrollSync();
}

function setupFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', function () {
      // Remove flip from other cards
      flipCards.forEach(c => { if (c !== card) c.classList.remove('flipped'); });
      // Toggle flip on this card
      card.classList.toggle('flipped');
    });
  });
}

// Update mouse coordinates
window.addEventListener('mousemove', (e) => {
    mouseY = e.clientY;
});

// --- Main Application Logic ---
function main() {
    // --- Shared Elements & Helper Functions ---
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuButton = document.getElementById('mobileMenuButton');

    /**
     * Closes the mobile navigation menu and resets associated states.
     */
    function closeMobileMenu() {
        mobileMenu?.classList.remove('active');
        mobileMenuButton?.classList.remove('is-active');
        mobileMenuButton?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('body-no-scroll');
    }

    /**
     * Sets up smooth scrolling for all anchor links.
     */
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                // Close mobile menu if open
                closeMobileMenu();
            });
        });
    }

    /**
     * Sets up Intersection Observers for scroll-triggered animations.
     */
    function setupIntersectionObservers() {
        // Observer for general section fade-ins
        const fadeInObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section-fade-in, .portfolio-item').forEach(section => {
            fadeInObserver.observe(section);
        });

        // Observer for the animated stats counter
        const statsSection = document.getElementById('achievements');
        if (statsSection) {
            const statsObserver = new IntersectionObserver((entries, observer) => {
                if (entries[0].isIntersecting) {
                    statsSection.classList.add('is-visible');
                    statsSection.querySelectorAll('.stat-number').forEach(animateCounter);
                    observer.unobserve(statsSection);
                }
            }, { threshold: 0.2 });
            statsObserver.observe(statsSection);
        }

        // Observer for "About Us" points animation
        const aboutList = document.getElementById('about-points-list');
        if (aboutList) {
            const aboutObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.25 }); // Trigger when 25% of the list is visible
            aboutObserver.observe(aboutList);
        }

        // Observer for Vision & Mission cards
        const visionMissionGrid = document.getElementById('vision-mission-grid');
        if (visionMissionGrid) {
            const visionMissionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 }); // Trigger when 30% is visible
            visionMissionObserver.observe(visionMissionGrid);
        }
    }
    
    /**
     * Animates a number from 0 to a target value.
     * @param {HTMLElement} counter The element containing the number.
     */
    function animateCounter(counter) {
        const target = +counter.dataset.target;
        const duration = 2000;
        const suffix = counter.dataset.suffix || '';
        let startTimestamp = null;
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = easeOutCubic(progress);
            counter.innerText = Math.floor(easedProgress * target);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                counter.innerText = target + suffix;
            }
        };
        requestAnimationFrame(step);
    }

    /**
     * Toggles the mobile navigation menu.
     */
    function setupMobileMenu() {
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    closeMobileMenu();
                } else {
                    mobileMenu.classList.add('active');
                    mobileMenuButton.classList.add('is-active');
                    mobileMenuButton.setAttribute('aria-expanded', 'true');
                    document.body.classList.add('body-no-scroll');
                }
            });
        }
    }

    /**
     * Scroll to top functionality removed
     */
    function setupScrollToTop() {
        // Function removed
    }



    /**
     * Initializes the hero section's background image slideshow.
     */
    function setupHeroSlideshow() {
        const slides = document.querySelectorAll('#hero-slideshow .hero-slide');
        if (slides.length <= 1) return;
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }

    /**
     * Applies a parallax scrolling effect to the "Our Culture" section's background.
     * NOTE: This requires specific HTML and CSS. The section (e.g., with id="culture-section")
     * should have `position: relative` and `overflow: hidden`. The background element
     * (e.g., with class="parallax-bg") should be positioned absolutely inside it with
     * a height larger than the section (e.g., 140%) to have room to move vertically.
     */
    function setupCultureParallax() {
        const cultureSection = document.getElementById('culture-section');
        const parallaxElement = cultureSection?.querySelector('.parallax-bg');

        if (!cultureSection || !parallaxElement) return;

        const parallaxSpeed = -0.2; // Negative to move up as we scroll down. Adjust for speed.
        let isTicking = false;

        const updateParallax = () => {
            const rect = cultureSection.getBoundingClientRect();

            // Only run when the section is in the viewport
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                // Distance scrolled since the section entered the viewport from the bottom
                const scrollDistance = window.innerHeight - rect.top;
                const translateY = scrollDistance * parallaxSpeed;
                parallaxElement.style.transform = `translate3d(0, ${translateY}px, 0)`;
            }
        };

        window.addEventListener('scroll', () => {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    updateParallax();
                    isTicking = false;
                });
                isTicking = true;
            }
        }, { passive: true }); // Improve scroll performance

        // Set initial position on load, in case it's already in view
        updateParallax();
    }

    // The 'Visionaries Carousel Logic' (setupVisionariesCarousel) has been removed
    // because the 'Meet Our Visionaries' section in index.html was updated from a
    // carousel to a static grid layout. This JavaScript function is no longer needed.

    /**
     * Initializes the interactive, auto-sliding brands carousel.
     */
    function setupBrandsCarousel() {
        const wrapper = document.getElementById('brands-wrapper');
        const track = document.getElementById('brandsTrack');
        const prevButton = document.getElementById('brandsPrevBtn');
        const nextButton = document.getElementById('brandsNextBtn');    
        if (!wrapper || !track || !prevButton || !nextButton) return;

        let currentIndex = 0;
        let autoSlideTimer;
        const SLIDE_INTERVAL = 5000; // 5 seconds

        const getSlidesPerPage = () => {
            if (window.innerWidth >= 1024) return 3 ; // Desktop            
            if (window.innerWidth >= 768) return 2;  // Tablet
            return 1; // Mobile
        };
        const updateCarousel = () => {
            const slides = Array.from(track.children);
            const slidesPerPage = getSlidesPerPage();
            const maxIndex = Math.max(0, slides.length - slidesPerPage);

            // Clamp index for safety, especially on resize
            currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= maxIndex;
        };

        const startAutoSlide = () => {
            stopAutoSlide(); // Prevent multiple timers
            autoSlideTimer = setInterval(() => {
                const slidesPerPage = getSlidesPerPage();
                const maxIndex = Math.max(0, slides.length - slidesPerPage);
                
                // If at the end, loop to the beginning, otherwise advance
                currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
                updateCarousel();
            }, SLIDE_INTERVAL);
        };

        const stopAutoSlide = () => {
            clearInterval(autoSlideTimer);
        };

        nextButton.addEventListener('click', () => {
            const slidesPerPage = getSlidesPerPage();
            const maxIndex = Math.max(0, slides.length - slidesPerPage);
            if (currentIndex < maxIndex) currentIndex++;
            updateCarousel();
            startAutoSlide(); // Reset timer on interaction
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) currentIndex--;
            updateCarousel();
            startAutoSlide(); // Reset timer on interaction
        });

        // Pause auto-slide on hover
        wrapper.addEventListener('mouseenter', stopAutoSlide);
        wrapper.addEventListener('mouseleave', startAutoSlide);

        new ResizeObserver(updateCarousel).observe(wrapper);
        
        // Initial call and start auto-sliding
        setTimeout(() => {
            updateCarousel();
            startAutoSlide();
        }, 100);
    }

    /**
     * Initializes the user-controlled testimonial slider.
     */
    function setupTestimonialCarousel() {
        const track = document.getElementById('testimonialTrack');
        const nextButton = document.getElementById('testimonialNextBtn');
        const prevButton = document.getElementById('testimonialPrevBtn');
        if (!track || !nextButton || !prevButton) return;

        const slides = Array.from(track.children);
        if (slides.length === 0) return;
        let currentIndex = 0;

        const getSlidesPerPage = () => {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        };

        const updateCarousel = () => {
            const slidesPerPage = getSlidesPerPage();
            const maxIndex = Math.max(0, slides.length - slidesPerPage);
            currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= maxIndex;

            slides.forEach((slide, index) => {
                const isVisible = index >= currentIndex && index < currentIndex + slidesPerPage;
                slide.classList.toggle('is-active', isVisible);
            });
        };

        nextButton.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });
        prevButton.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });

        new ResizeObserver(updateCarousel).observe(document.body);
        setTimeout(updateCarousel, 100); // Init 
    }

    /**
     * Initializes the portfolio filtering functionality.
     */
    function setupPortfolioFilter() {
        const filtersContainer = document.getElementById('portfolio-filters');
        const portfolioGrid = document.getElementById('portfolio-grid');
        if (!filtersContainer || !portfolioGrid) return;

        const portfolioItems = Array.from(portfolioGrid.children);
        const filterButtons = filtersContainer.querySelectorAll('.filter-btn');

        filtersContainer.addEventListener('click', (e) => {
            const target = e.target.closest('.filter-btn');
            if (!target || target.classList.contains('active')) return;

            // Update active button style
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gold-gradient', 'text-black');
                btn.classList.add('bg-gray-800', 'text-white');
            });
            target.classList.add('active', 'bg-gold-gradient', 'text-black');
            target.classList.remove('bg-gray-800', 'text-white');

            const filter = target.dataset.filter;

            // Animate portfolio items with fade-out and fade-in
            portfolioItems.forEach(item => {
                const shouldBeVisible = filter === 'all' || item.dataset.category === filter;
                // An item is considered "visible" if it's not hidden and not in the process of hiding.
                const isCurrentlyVisible = item.style.display !== 'none' && !item.classList.contains('is-hiding');

                // Case 1: Item is visible but needs to be hidden.
                if (isCurrentlyVisible && !shouldBeVisible) {
                    item.classList.add('is-hiding');
                    item.classList.remove('is-visible');

                    item.addEventListener('animationend', function handler(e) {
                        // Check if the animation that ended is the fade-out one.
                        if (e.animationName === 'portfolioItemFadeOut') {
                            item.style.display = 'none';
                            item.classList.remove('is-hiding'); // Clean up class.
                        }
                    }, { once: true }); // Listener is removed after it runs once.
                } 
                // Case 2: Item is hidden but needs to be shown.
                else if (!isCurrentlyVisible && shouldBeVisible) {
                    item.classList.remove('is-hiding'); // Stop any hiding animation.
                    item.style.display = 'block';
                    requestAnimationFrame(() => item.classList.add('is-visible'));
                }
            });
        });
    }

    /**
     * Initializes contact form validation and AJAX submission.
     */
    function setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const submitButton = form.querySelector('#submit-button');
        const formStatus = document.getElementById('form-status');

        const fields = {
            name: { input: form.querySelector('#name'), errorEl: form.querySelector('#name-error'), validators: [{ check: val => val.trim() !== '', message: 'Name is required.' }, { check: val => val.length >= 2, message: 'Name must be at least 2 characters.' }] },
            email: { input: form.querySelector('#email'), errorEl: form.querySelector('#email-error'), validators: [{ check: val => val.trim() !== '', message: 'Email is required.' }, { check: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), message: 'Please enter a valid email address.' }] },
            phone: { input: form.querySelector('#phone'), errorEl: form.querySelector('#phone-error'), validators: [{ check: val => val.trim() === '' || /^\+?[0-9\s-()]{7,}$/.test(val), message: 'Please enter a valid phone number.' }] },
            message: { input: form.querySelector('#message'), errorEl: form.querySelector('#message-error'), validators: [{ check: val => val.trim() !== '', message: 'Message is required.' }, { check: val => val.length >= 10, message: 'Message must be at least 10 characters.' }] },
            services: { 
                inputs: form.querySelectorAll('input[name="services[]"]'), 
                errorEl: form.querySelector('#services-error'), 
                validators: [{ check: () => Array.from(form.querySelectorAll('input[name="services[]"]:checked')).length > 0, message: 'Please select at least one service.' }] 
            }
        };
 
        const showError = (field, message) => {
            field.errorEl.textContent = message;
            field.input.classList.add('border-red-500', 'focus:border-red-500');
            field.input.setAttribute('aria-invalid', 'true');
            field.input.setAttribute('aria-errormessage', field.errorEl.id);
            field.input.classList.remove('border-gray-700', 'focus:border-gold');
        };

        const clearError = (field) => {
            field.errorEl.textContent = '';
            field.input.classList.remove('border-red-500', 'focus:border-red-500');
            field.input.classList.add('border-gray-700', 'focus:border-gold');
            field.input.removeAttribute('aria-invalid');
        };

        const validateField = (field) => {
            if (field.inputs) { // For checkbox groups
                for (const validator of field.validators) {
                    if (!validator.check()) {
                        field.errorEl.textContent = validator.message;
                        return false;
                    }
                }
                field.errorEl.textContent = '';
            } else { // For regular inputs
                for (const validator of field.validators) {
                    if (!validator.check(field.input.value)) {
                        showError(field, validator.message);
                        return false;
                    }
                }
                clearError(field);
            }
            return true;
        };

        Object.values(fields).forEach(field => {
            if (field.input) {
                field.input.addEventListener('input', () => validateField(field));
            } else if (field.inputs) {
                field.inputs.forEach(input => input.addEventListener('change', () => validateField(fields.services)));
            }
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const isFormValid = Object.values(fields).every(validateField);
            if (!isFormValid) return;

            submitButton.disabled = true;
            submitButton.querySelector('span').textContent = 'Sending...';
            submitButton.querySelector('i').classList.remove('hidden');
            formStatus.textContent = '';
            formStatus.className = 'mt-4 text-center font-semibold';

            try {
                const selectedServices = Array.from(fields.services.inputs)
                    .filter(i => i.checked)
                    .map(i => i.value)
                    .join(', ');

                const payload = {
                    access_key: form.querySelector('input[name="access_key"]').value,
                    name: fields.name.input.value.trim(),
                    email: fields.email.input.value.trim(),
                    phone: fields.phone.input.value.trim(),
                    message: fields.message.input.value.trim(),
                    services_interest: selectedServices,
                    subject: form.querySelector('input[name="subject"]').value,
                    replyto: fields.email.input.value.trim()
                };
                const response = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) });
                if (response.ok) {
                    formStatus.textContent = "Thanks for your message! We'll be in touch soon.";
                    formStatus.classList.add('text-green-400');
                    form.reset();
                    Object.values(fields).forEach(clearError);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formStatus.textContent = "Oops! There was a problem submitting your form.";
                formStatus.classList.add('text-red-400');
            } finally {
                submitButton.disabled = false;
                submitButton.querySelector('span').textContent = 'Send Message';
                submitButton.querySelector('i').classList.add('hidden');
            }
        });
    }

    /**
     * Initializes the podcast feature section interactive elements.
     */
    function setupPodcastFeature() {
        const playButton = document.querySelector('#podcast-feature .play-button');
        if (playButton) {
            playButton.addEventListener('click', () => {
                console.log('Podcast play button clicked. Implement audio playback here.');
                // Example: You could play an audio file
                // const audio = new Audio('path/to/your/podcast-preview.mp3');
                // audio.play();

                // For now, just add a visual effect
                playButton.classList.add('playing');
                setTimeout(() => {
                    playButton.classList.remove('playing');
                }, 1000);
            });
        }
    }

    // Initialize all components
    setupSmoothScrolling();
    setupIntersectionObservers();
    setupMobileMenu();
    setupScrollToTop();
    setupCursorHoverEffects();
    setupHeroSlideshow();
    setupCultureParallax();
    setupBrandsCarousel();
    setupTestimonialCarousel();
    setupPortfolioFilter();
    setupContactForm();
    setupPodcastFeature();
}

document.addEventListener('DOMContentLoaded', () => {
    // The main() function initializes most of the site-wide features.
    main();

    // The functions below are for specific components or older page designs.
    // For better organization, you could move these calls inside the main() function
    // and remove any redundant functions (like the extra mobile menu logic).
    setupServiceCardLinks();
    setupMobileNavigation();
    setupStickyBar();
    setupVisionariesAnimation();
    setupCultureScrollSync();
    setupFlipCards();
});
