const myName = "Ahmad Umar Mukhtar";
const myRole = "Full Stack Developer & Project Manager";

let currentDay = "16";
let isStudent = true;

console.log(`Hello, My name is ${myName} and I am a ${myRole}`);
console.log(`Current Challenge Day: ${currentDay}`);

const statusElement = document.getElementById("status-text");

statusElement.innerText = `Day ${currentDay}: Mastering the DOM!`;

statusElement.style.color = "purple";
statusElement.style.fontWeight = "bold";