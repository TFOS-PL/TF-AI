const OPENROUTER_API_KEY = "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"; // Klucz OpenRouter
const DEEPAI_API_KEY = "43d76131-e33b-49f9-aae4-1b9f378d408b"; // Klucz DeepAI

// Wysyłanie wiadomości do OpenRouter AI
async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    addMessage("Ty: " + userInput);

    let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "mistral", 
            messages: [{ role: "user", content: userInput }]
        })
    });

    let data = await response.json();
    let botReply = data.choices[0].message.content;
    addMessage("AI: " + botReply);
}

// Generowanie obrazów przez DeepAI
async function generateImage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    addMessage("Generowanie obrazu: " + userInput);

    let response = await fetch("https://api.deepai.org/api/text2img", {
        method: "POST",
        headers: {
            "Api-Key": DEEPAI_API_KEY
        },
        body: new URLSearchParams({ text: userInput })
    });

    let data = await response.json();
    let imgUrl = data.output_url;

    addMessage(`<img src="${imgUrl}" alt="Wygenerowany obraz" style="max-width:100%;">`);
}

// Dodawanie wiadomości do chatu
function addMessage(message) {
    let chatBox = document.getElementById("chat-box");
    let newMessage = document.createElement("p");
    newMessage.innerHTML = message;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Obsługa Enter w polu tekstowym
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
