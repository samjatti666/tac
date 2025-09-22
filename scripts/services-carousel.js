// 3D Carousel Manual Rotation Logic
// This script assumes the carousel is static and rotates only on button click

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('servicesCarousel3D');
    if (!carousel) return;
    const cards = carousel.querySelectorAll('.carousel-card');
    let angle = 0;
    const cardCount = cards.length;
    const angleStep = 360 / cardCount;

    function updateCarousel() {
        cards.forEach((card, i) => {
            card.style.transform = `rotateY(${i * angleStep + angle}deg) translateZ(420px)`;
        });
    }

    document.getElementById('carouselLeft')?.addEventListener('click', () => {
        angle -= angleStep;
        updateCarousel();
    });
    document.getElementById('carouselRight')?.addEventListener('click', () => {
        angle += angleStep;
        updateCarousel();
    });

    updateCarousel();
});
