const myName = "Ahmad Umar Mukhtar";
const myRole = "Full Stack Developer & Project Manager";

let currentDay = "18";
let isStudent = true;

const statusElement = document.getElementById("status-text");

statusElement.innerText = `Day ${currentDay}: The "Dark Mode" Toggle`;

statusElement.style.color = "purple";
statusElement.style.fontWeight = "bold";

const sendButton = document.getElementById("send-btn");
const subscribeButton = document.getElementById("subscribed");

sendButton.addEventListener("click", function() {
    alert("Message sent! (Not really, but the code works!) 😊");

    sendButton.innerText = "Message Sent!";
    sendButton.style.backgroundColor = "var(--secondary-accent)";
    sendButton.disabled = true;
});
subscribeButton.addEventListener("click", function() {
    alert("Subscribed! (Not really, but the code works!) 😊");

    subscribeButton.innerText = "Subscribed!";
    subscribeButton.style.backgroundColor = "var(--secondary-accent)";
    subscribeButton.disabled = true;
});

const themeButton = document.getElementById("theme-toggle");
const body = document.body;

themeButton.addEventListener("click", function() {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        themeButton.innerText = "☀️ Light Mode";
    } else {
        themeButton.innerText = "🌙 Dark Mode";
    }
});