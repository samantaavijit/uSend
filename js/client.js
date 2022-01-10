const socket = io("http://localhost:8050");

const form = document.getElementById("send-container");
const msgInput = document.getElementById("messageInp");
const msgContainer = document.querySelector(".container");

const appende = (msg, position) => {
  const msgElement = document.createElement("div");
  msgElement.innerText = msg;
  msgElement.classList.add("message");
  msgElement.classList.add(position);
  msgContainer.append(msgElement);
};

const userName = prompt("Enter your name to join");
socket.emit("new-user-joined", userName);

// WHEN NEW USER JOINED
socket.on("user-joined", (name) => {
  appende(`${name} joined the chat`, "right");
});

// WHEN USER RECEIVED ANY MESSAGE
socket.on("receive", (data) => {
  appende(`${data.message}: ${data.user}`, "left");
});
