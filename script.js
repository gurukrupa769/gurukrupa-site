// Slider carousel
const carousel = document.querySelector('#shopCarousel');
if (carousel) {
  new bootstrap.Carousel(carousel, {
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
    tabLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    tabSections.forEach(sec => sec.style.display = 'none');
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).style.display = 'block';
  });
});

// Show Home section by default
document.getElementById('home').style.display = 'block';

// ✅ Fade-in animation on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
