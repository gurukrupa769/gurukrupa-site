// Slider carousel
const carousel = document.querySelector('#shopCarousel');
if (carousel) {
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 3000,
    ride: 'carousel'
  });
}

// Tabs
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

// Chatbot
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMsg = chatInput.value.trim();
  if(!userMsg) return;
  
  // Display user message
  const userDiv = document.createElement('div');
  userDiv.classList.add('user-msg');
  userDiv.textContent = userMsg;
  chatMessages.appendChild(userDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  chatInput.value = '';

  // Send to server
  try {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({message: userMsg})
    });
    const data = await response.json();

    const botDiv = document.createElement('div');
    botDiv.classList.add('bot-msg');
    botDiv.textContent = data.reply;
    chatMessages.appendChild(botDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (err) {
    console.error(err);
  }
});
