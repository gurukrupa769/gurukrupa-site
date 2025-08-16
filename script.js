// Slider carousel
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
  link.addEventListener('click', function(e){
    e.preventDefault();
    tabLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    const tabId = this.getAttribute('data-tab');
    tabSections.forEach(sec => sec.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
  });
});

// Chatbot
const chatButton = document.getElementById('chatbot-button');
const chatWindow = document.getElementById('chatbot-window');
const chatClose = document.getElementById('chat-close');
const chatSend = document.getElementById('chat-send');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

chatButton.addEventListener('click', () => chatWindow.style.display = 'flex');
chatClose.addEventListener('click', () => chatWindow.style.display = 'none');

async function sendMessage() {
  const message = chatInput.value.trim();
  if(!message) return;

  const userMsg = document.createElement('div');
  userMsg.textContent = "You: " + message;
  chatMessages.appendChild(userMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  chatInput.value = '';

  try {
    const res = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();

    const botMsg = document.createElement('div');
    botMsg.textContent = "Bot: " + data.reply;
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch(err) {
    console.error(err);
    const botMsg = document.createElement('div');
    botMsg.textContent = "Bot: Error connecting to server.";
    chatMessages.appendChild(botMsg);
  }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') sendMessage();
});
