// -----------------------------
// script.js - futuristic site
// -----------------------------

// Wait for DOM & bootstrap to be ready
document.addEventListener('DOMContentLoaded', () => {

  /*** PRELOADER ***/
  const preloader = document.getElementById('preloader');
  if(preloader){
    window.setTimeout(()=> preloader.classList.add('hidden'), 700);
    // hide fully after animation
    window.setTimeout(()=> { if(preloader) preloader.style.display='none' }, 1200);
  }

  /*** SLIDER PAUSE/PLAY BUTTON (uses Bootstrap carousel) ***/
  const carouselEl = document.querySelector('#shopCarousel');
  const carousel = carouselEl ? bootstrap.Carousel.getOrCreateInstance(carouselEl) : null;
  const pauseBtn = document.getElementById('sliderPause');

  let isPaused = false;
  if(pauseBtn){
    pauseBtn.addEventListener('click', () => {
      if(!carousel) return;
      if(isPaused){
        carousel.cycle();
        pauseBtn.textContent = '⏸︎'; // show pause icon
        isPaused = false;
      } else {
        carousel.pause();
        pauseBtn.textContent = '▶'; // play icon
        isPaused = true;
      }
    });
  }

  /*** BACK TO TOP ***/
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 400) backBtn.style.display = 'block';
    else backBtn.style.display = 'none';
  });
  backBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  /*** SMOOTH SCROLL FOR NAV LINKS (and tab behavior) ***/
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabSections = document.querySelectorAll('.tab-section');

  function showSectionById(id){
    // hide all
    tabSections.forEach(s => s.style.display = 'none');
    const el = document.getElementById(id);
    if(el) el.style.display = 'block';
    // update active in navbar
    tabLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-tab') === id);
    });
    // smooth scroll
    const top = el ? el.getBoundingClientRect().top + window.scrollY - 72 : 0;
    window.scrollTo({top, behavior:'smooth'});
  }

  tabLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const tabId = link.getAttribute('data-tab');
      showSectionById(tabId);
      // update url hash without jumping
      history.replaceState(null, '', `#${tabId}`);
    });
  });

  // Show home by default (if no hash)
  const initialHash = location.hash ? location.hash.replace('#','') : 'home';
  showSectionById(initialHash);

  /*** GALLERY LIGHTBOX SUPPORT ***/
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  document.querySelectorAll('.gallery-card img').forEach(img => {
    // allow keyboard opening by focusing parent
    img.addEventListener('click', (e) => {
      const full = img.getAttribute('data-full') || img.src;
      lightboxImg.src = full;
      lightboxCaption.textContent = img.alt || '';
    });
    img.parentElement.addEventListener('keydown', (ev) => {
      if(ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        img.click();
      }
    });
  });

  // Close lightbox on ESC
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
      const mod = bootstrap.Modal.getInstance(lightboxModal);
      if(mod) mod.hide();
    }
  });

  /*** ACCESSIBILITY: focus outlines for keyboard users ***/
  function handleFirstTab(e){
    if(e.key === 'Tab') {
      document.body.classList.add('show-focus');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

  /*** OPTIONAL: small floating delays for gallery */
  document.querySelectorAll('.gallery-card').forEach((el, i) => {
    el.style.setProperty('--i', String(i));
  });

  /*** REDUCED MOTION: stop animations if user prefers reduced motion ***/
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    // pause bootstrap carousel
    if(carousel) carousel.pause();
    document.querySelectorAll('*').forEach(n => n.style.animationPlayState = 'paused');
  }

  /*** OPTIONAL: keyboard navigation on carousel (left/right) ***/
  document.addEventListener('keydown', (e) => {
    if(!carousel) return;
    if(e.key === 'ArrowLeft') carousel.prev();
    if(e.key === 'ArrowRight') carousel.next();
  });

});
