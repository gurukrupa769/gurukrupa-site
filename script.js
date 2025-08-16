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

    tabSections.forEach(sec => sec.style.display = 'none');

    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).style.display = 'block';
  });
});

// Chatbot
const chatSendBtn = document.getElementById("chat-send");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

chatSendBtn.addEventListener("click", async () => {
  const message = chatInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  chatInput.value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    appendMessage("Bot", reply);
  } catch (err) {
    appendMessage("Bot", "Error connecting to OpenAI.");
  }
});

function appendMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("mb-2");
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
