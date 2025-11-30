const myName = "Ahmad Umar Mukhtar";
const myRole = "Full Stack Developer & Project Manager";

let currentDay = "19";
let isStudent = true;

const statusElement = document.getElementById("status-text");

statusElement.innerText = `Day ${currentDay}: The Logic (Form Validation)`;

statusElement.style.color = "purple";
statusElement.style.fontWeight = "bold";

const sendButton = document.getElementById("send-btn");
const subscribeButton = document.getElementById("subscribed");

sendButton.addEventListener("click", function() {

    const nameInput = document.getElementById("name").value;
    const emailInput = document.getElementById("email").value;
    const messageInput = document.getElementById("message").value;

    if (nameInput === "" || emailInput === "" || messageInput === "") {
        alert("Please fill in all fields before sending the message.");
        return;
    }

    alert(`Thank you, ${nameInput}! Your message has been sent.`);

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    sendButton.innerText = "Message Sent!";
    sendButton.style.backgroundColor = "var(--secondary-accent)";
    sendButton.disabled = true;

    setTimeout(function () {
        sendButton.innerText = "Send Message";
        sendButton.style.backgroundColor = "";
    }, 3000);
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