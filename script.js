// Carousel auto-slide
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
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('data-tab');
    tabSections.forEach(section => section.style.display = 'none');
    document.getElementById(target).style.display = 'block';
    tabLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Drag & Drop + Multi-file preview
const fileDropZone = document.getElementById('fileDropZone');
const fileInput = document.getElementById('file');
const filePreview = document.getElementById('filePreview');
const filePrompt = document.getElementById('filePrompt');

fileDropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileDropZone.style.boxShadow = '0 0 50px #0ff inset';
});
fileDropZone.addEventListener('dragleave', () => {
  fileDropZone.style.boxShadow = '0 0 15px rgba(0,255,255,0.3)';
});
fileDropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
  fileDropZone.style.boxShadow = '0 0 15px rgba(0,255,255,0.3)';
  updateFilePreview();
});

fileInput.addEventListener('change', updateFilePreview);

function updateFilePreview(){
  filePreview.innerHTML = '';
  if(fileInput.files.length > 0){
    filePrompt.style.display = 'none';
    Array.from(fileInput.files).forEach(file => {
      const div = document.createElement('div');
      div.classList.add('glow-file');
      div.textContent = file.name;
      filePreview.appendChild(div);
    });
  } else {
    filePrompt.style.display = 'block';
  }
}
