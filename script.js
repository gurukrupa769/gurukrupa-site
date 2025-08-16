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

    // Remove active class
    tabLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // Hide all sections
    tabSections.forEach(sec => sec.style.display = 'none');

    // Show selected tab
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).style.display = 'block';
  });
});

// Chatbot toggle
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotBox = document.getElementById("chatbot-box");

chatbotToggle.addEventListener("click", () => {
  chatbotBox.style.display = chatbotBox.style.display === "none" ? "flex" : "none";
});

// Chatbot messages
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");

function appendMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender.toLowerCase());

  if(sender === "Bot") {
    let i = 0;
    msgDiv.innerHTML = "";
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    function typeWriter() {
      if(i < text.length) {
        msgDiv.innerHTML += text.charAt(i);
        i++;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        setTimeout(typeWriter, 20);
      }
    }
    typeWriter();
  } else {
    msgDiv.innerHTML = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Send chat
chatSendBtn.addEventListener("click", async () => {
  const message = chatInput.value.trim();
  if (!message) return;

  appendMessage("User", message);
  chatInput.value = "";

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    const reply = data.choices[0].message.content;
    appendMessage("Bot", reply);
  } catch (err) {
    appendMessage("Bot", "Error connecting to OpenAI.");
  }
});
