// ---------- Carousel ----------
const carousel = document.querySelector('#shopCarousel');
if (carousel) {
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 3000,
    ride: 'carousel'
  });
}

// ---------- Tab Navigation ----------
const tabLinks = document.querySelectorAll('.tab-link');
const tabSections = document.querySelectorAll('.tab-section');

tabLinks.forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();

    // Remove active class from all links
    tabLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // Hide all sections
    tabSections.forEach(sec => sec.style.display = 'none');

    // Show the selected tab section
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).style.display = 'block';
  });
});

// ---------- Chatbot ----------
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatbox = document.getElementById('chatbox');

async function sendMessage(message) {
  // Show user message
  const userMsg = document.createElement('div');
  userMsg.classList.add('chat-msg', 'chat-user');
  userMsg.innerText = message;
  chatbox.appendChild(userMsg);
  chatbox.scrollTop = chatbox.scrollHeight;

  // Fetch response from server
  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    const botMsg = document.createElement('div');
    botMsg.classList.add('chat-msg', 'chat-bot');
    botMsg.innerText = data.reply;
    chatbox.appendChild(botMsg);
    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (err) {
    console.error(err);
    const botMsg = document.createElement('div');
    botMsg.classList.add('chat-msg', 'chat-bot');
    botMsg.innerText = "Error: Could not get response.";
    chatbox.appendChild(botMsg);
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}

if (chatForm) {
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
      sendMessage(message);
      chatInput.value = '';
    }
  });
}
