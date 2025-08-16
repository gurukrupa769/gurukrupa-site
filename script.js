// Slider carousel
const carousel = document.querySelector('#shopCarousel');
if (carousel) {
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 3000,
    ride: 'carousel'
  });
}

// Tab navigation with fade-in
const tabLinks = document.querySelectorAll('.tab-link');
const tabSections = document.querySelectorAll('.tab-section');

tabLinks.forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();

    // Remove active class from all links
    tabLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // Hide all sections
    tabSections.forEach(sec => sec.style.display = 'none');

    // Show the selected tab section with fade
    const tabId = this.getAttribute('data-tab');
    const section = document.getElementById(tabId);
    section.style.display = 'block';
    section.style.opacity = 0;
    let op = 0;
    const fade = setInterval(() => {
      op += 0.05;
      section.style.opacity = op;
      if(op >=1) clearInterval(fade);
    }, 20);
  });
});

// Initialize Home tab by default
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.tab-link.active').click();
});
