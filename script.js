// Year update
document.getElementById('year').textContent = new Date().getFullYear();

// Carousel logic
const slides = document.querySelector('.slides');
const imagesCount = slides.children.length;
const dots = document.querySelector('.dots');
let index = 0, timer;

function showSlide(i) {
  index = (i + imagesCount) % imagesCount;
  slides.style.transform = `translateX(-${index*100}%)`;
  updateDots();
  resetTimer();
}

function setupDots() {
  for (let i = 0; i < imagesCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (!i ? ' active' : '');
    dot.addEventListener('click', () => showSlide(i));
    dots.appendChild(dot);
  }
}

function updateDots() {
  [...dots.children].forEach((d, i) => d.classList.toggle('active', i === index));
}

document.querySelector('.prev').onclick = () => showSlide(index - 1);
document.querySelector('.next').onclick = () => showSlide(index + 1);

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(() => showSlide(index + 1), 3500);
}

setupDots();
resetTimer();

// Smooth scroll
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});
