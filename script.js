// Small interactivity
document.addEventListener("DOMContentLoaded", () => {
  console.log("Website Loaded Successfully!");

  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      alert(`Navigating to ${link.textContent} section`);
    });
  });
});
