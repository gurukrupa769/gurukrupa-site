// Insert current year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Carousel (slides)
const slidesWrap = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const dotsWrap = document.getElementById('dots');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let slideIndex = 0, slideTimer = null;

function updateSlides() {
  slidesWrap.style.transform = `translateX(-${slideIndex * 100}%)`;
  // update dots
  if (dotsWrap) {
    [...dotsWrap.children].forEach((d,i)=> d.classList.toggle('active', i===slideIndex));
  }
}

function goTo(i){
  slideIndex = (i + slides.length) % slides.length;
  updateSlides();
  resetTimer();
}

function next(){ goTo(slideIndex + 1) }
function prev(){ goTo(slideIndex - 1) }

function resetTimer(){
  clearInterval(slideTimer);
  slideTimer = setInterval(next, 3500);
}

// build dots
if (dotsWrap) {
  slides.forEach((s,i)=>{
    const d = document.createElement('div');
    d.className = 'dot' + (i===0 ? ' active' : '');
    d.addEventListener('click', ()=> goTo(i));
    dotsWrap.appendChild(d);
  });
}

// Prev/next events
if (prevBtn) prevBtn.addEventListener('click', prev);
if (nextBtn) nextBtn.addEventListener('click', next);

// touch support
let startX = null;
slidesWrap.addEventListener('touchstart', e => startX = e.touches[0].clientX, {passive:true});
slidesWrap.addEventListener('touchend', e => {
  if (startX === null) return;
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
  startX = null;
}, {passive:true});

// start autoplay
resetTimer();

// scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
}, {threshold: 0.18});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// smooth nav links
document.querySelectorAll('.main-nav a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({behavior:'smooth'});
  });
});

// hamburger (mobile) menu toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.main-nav ul');
hamburger && hamburger.addEventListener('click', ()=>{
  if (!navList) return;
  navList.style.display = (navList.style.display === 'flex') ? 'none' : 'flex';
});
