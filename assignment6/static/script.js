const welcomeView = document.getElementById("welcome-view");
const chatView = document.getElementById("chat-view");
const conclusionView = document.getElementById("conclusion-view");

const welcomeForm = document.getElementById("welcome-form");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const endChatBtn = document.getElementById("end-chat-btn");
const restartBtn = document.getElementById("restart-btn");
const conclusionContent = document.getElementById("conclusion-content");

const questionButtons = document.querySelectorAll(".btn-question");

let sessionId = null;
let isWaiting = false;

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function linkify(text) {
    const escaped = escapeHtml(text);
    return escaped.replace(
        /(https?:\/\/[^\s<]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
    );
}

function showView(view) {
    document
        .querySelectorAll(".view")
        .forEach((v) => v.classList.remove("active"));
    view.classList.add("active");
}

function addMessage(sender, text) {
    const wrapper = document.createElement("div");
    wrapper.classList.add(
        "message",
        sender === "You" ? "message-user" : "message-bot",
    );

    const senderLabel = document.createElement("div");
    senderLabel.classList.add("message-sender");
    senderLabel.textContent = sender;

    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble");
    if (sender === "You") {
        bubble.textContent = text;
    } else {
        bubble.innerHTML = linkify(text);
    }

    wrapper.appendChild(senderLabel);
    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("message", "message-bot");
    wrapper.id = "typing";

    const bubble = document.createElement("div");
    bubble.classList.add("typing-indicator");
    bubble.textContent = "Typing...";

    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
    const el = document.getElementById("typing");
    if (el) el.remove();
}

function setButtonsDisabled(disabled) {
    questionButtons.forEach((btn) => {
        btn.disabled = disabled;
    });
}

async function sendMessage(text) {
    if (isWaiting || !sessionId) return;

    addMessage("You", text);
    isWaiting = true;
    setButtonsDisabled(true);
    chatInput.disabled = true;
    showTyping();

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId, message: text }),
        });

        removeTyping();

        if (!res.ok) {
            addMessage(
                "Bot",
                "Experiencing high model usage from Google Gemini.",
            );
            return;
        }

        const data = await res.json();
        addMessage("Bot", data.response || data.error || "No response.");
    } catch {
        removeTyping();
        addMessage("Bot", "Connection error. Please try again.");
    } finally {
        isWaiting = false;
        setButtonsDisabled(false);
        chatInput.disabled = false;
        chatInput.focus();
    }
}

// WELCOME FORM
welcomeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!firstName || !lastName || !email) return;

    try {
        const res = await fetch("/api/start", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
            }),
        });

        if (!res.ok) {
            alert("Failed to start session. Please try again.");
            return;
        }

        const data = await res.json();
        sessionId = data.session_id;
        showView(chatView);
        addMessage(
            "Bot",
            "Hello, " +
                firstName +
                "! How can I help you today? Feel free to ask a question using the buttons below or type your own.",
        );
    } catch {
        alert("Connection error. Please try again.");
    }
});

// QUESTION BUTTONS
questionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const question = btn.dataset.question;
        if (question) sendMessage(question);
    });
});

// CHAT FORM
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = "";
    sendMessage(text);
});

// END CHAT
endChatBtn.addEventListener("click", async () => {
    if (!sessionId) return;

    try {
        const res = await fetch("/api/conclusion/" + sessionId, {
            method: "POST",
        });

        if (!res.ok) {
            alert("Failed to end session.");
            return;
        }

        const data = await res.json();

        conclusionContent.innerHTML =
            '<div class="conclusion-section">' +
            "<h3>Your Information</h3>" +
            "<p>" +
            linkify(data.summary) +
            "</p>" +
            "</div>" +
            '<div class="conclusion-section">' +
            "<h3>Chatbot Farewell</h3>" +
            "<p>" +
            linkify(data.farewell || "Goodbye!") +
            "</p>" +
            "</div>";

        showView(conclusionView);
    } catch {
        alert("Connection error. Please try again.");
    }
});

// RESTART
restartBtn.addEventListener("click", () => {
    sessionId = null;
    chatMessages.innerHTML = "";
    welcomeForm.reset();
    showView(welcomeView);
});
