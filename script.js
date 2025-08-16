// Auto slide every 3 seconds
const carousel = document.querySelector('#shopCarousel');
if (carousel) {
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 3000,
    ride: 'carousel'
  });
}
