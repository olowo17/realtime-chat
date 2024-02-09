// client.js
let socket = io('http://localhost:3000');

let form = document.getElementById("form");
let input = document.getElementById("input");
let typingDiv = document.getElementById("someoneIsTyping");
let timeout;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("message", input.value);
    input.value = "";
    typingDiv.textContent = "";
  }
  return false;
});

socket.on("message", function (msg) {
  let messages = document.getElementById("messages");
  let li = document.createElement("li");
  li.textContent = msg;
  messages.appendChild(li);
  typingDiv.textContent = "";
});

function timeoutFunction() {
  socket.emit("typing", false);
}

input.addEventListener("keydown", () => {
  // socket.emit('typing', input.value);
  socket.emit("typing", true);
  clearTimeout(timeout);
  timeout = setTimeout(timeoutFunction, 500);
});

socket.on("typing", (data) => {
  if (data) {
    typingDiv.textContent = "Someone is typing...";
  } else {
    typingDiv.textContent = "";
  }
});
