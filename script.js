// Simple welcome message in console
console.log("Welcome to My Xerox & Printing Shop Website!");

// Smooth scroll effect for navigation
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
