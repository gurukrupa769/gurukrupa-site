// Bootstrap Carousel
const carousel = document.querySelector('#shopCarousel');
if(carousel){
  const bsCarousel = new bootstrap.Carousel(carousel,{
    interval:3000,
    ride:'carousel'
  });
}

// Scroll animations
const sections = document.querySelectorAll('section');
window.addEventListener('scroll',()=>{
  const scrollPos = window.scrollY + window.innerHeight - 100;
  sections.forEach(section=>{
    if(scrollPos > section.offsetTop){
      section.classList.add('visible');
    }
  });
});
