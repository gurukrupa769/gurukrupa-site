// Slider carousel
const carousel = document.querySelector('#shopCarousel');
if (carousel) {
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 3000,
    ride: 'carousel'
  });
}

// Tab navigation with fade effect
const tabLinks = document.querySelectorAll('.tab-link');
const tabSections = document.querySelectorAll('.tab-section');

tabLinks.forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();

    tabLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    tabSections.forEach(sec => {
      sec.style.opacity = 0;
      sec.style.display = 'none';
    });

    const tabId = this.getAttribute('data-tab');
    const section = document.getElementById(tabId);
    section.style.display = 'block';
    setTimeout(() => section.style.opacity = 1, 50);
  });
});

// Show home section by default
document.getElementById('home').style.display = 'block';
document.getElementById('home').style.opacity = 1;
