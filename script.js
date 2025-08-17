// Slider carousel
const carousel = document.querySelector('#shopCarousel');
if (carousel) {
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 3000,
    ride: 'carousel'
  });
}

// Tab navigation
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

    // Show the selected tab section
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).style.display = 'block';
  });
});

// Initialize first visible tab
document.getElementById('home').style.display = 'block';
