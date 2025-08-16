// Bootstrap Carousel auto slide
const carousel = document.querySelector('#shopCarousel');
if(carousel){
  const bsCarousel = new bootstrap.Carousel(carousel,{
    interval:4000,
    ride:'carousel'
  });
}

// Optional: Add scroll animations for elements
window.addEventListener('scroll',()=>{
  const elements = document.querySelectorAll('[data-aos]');
  elements.forEach(el=>{
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      el.classList.add('aos-animate');
    }
  });
});
