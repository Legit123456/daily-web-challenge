const myName = "Ahmad Umar Mukhtar";
const myRole = "Full Stack Developer & Project Manager";

let currentDay = "17";
let isStudent = true;

console.log(`Hello, My name is ${myName} and I am a ${myRole}`);
console.log(`Current Challenge Day: ${currentDay}`);

const statusElement = document.getElementById("status-text");

statusElement.innerText = `Day ${currentDay}: The Event (Listening for Clicks)`;

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