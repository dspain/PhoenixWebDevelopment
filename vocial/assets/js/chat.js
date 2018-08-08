// Import Phoenix's Socket Library
import { Socket, Presence } from "phoenix";
import $ from "jquery";

// Utility functions

const pushMessage = (channel, author, message) => {
  channel
    .push("new_message", { author, message })
    .receive("ok", res => console.log("Message sent!"))
    .receive("error", res => console.log("Failed to send message:", res));
};

// When we join the channel, do this
const onJoin = (res, channel) => {
  $(".chat-send").on("click", event => {
      event.preventDefault();
      const message = $(".chat-input").val();
      const author = $(".author-input").val();
      pushMessage(channel, author, message);
      $(".chat-input").val("");
    });
  console.log("Joined channel:", res);
};

// Add a message to the list of chat messages
const addMessage = (author, message) => {
  const chatLog = document.querySelector(".chat-messages");
  chatLog.innerHTML += `<li>
    <span class="author">&lt;${author}&gt;</span>
    <span class="message">${message}</span>`;
};

// Next, create a new Phoenix Socket to reuse
const socket = new Socket("/socket");

// Connect to the socket itself
socket.connect();


const connect = (socket) => {
  // Only connect to the socket if the chat channel actually exists!
  const enableLiveChat = document.getElementById("enable-chat-channel");
  if (!enableLiveChat) {
    return;
  }

  // Get the chatroom that we're supposed to connect to
  const chatroom = document
    .getElementById("enable-chat-channel")
    .getAttribute("data-chatroom");
  // Create a channel to handle joining/sending/receiving
  const channel = socket.channel("chat:" + chatroom);

  // Next, join the topic on the channel!
  channel
    .join()
    .receive("ok", res => onJoin(res, channel))
    .receive("error", res => console.log("Failed to join channel:", res));

  channel.on("new_message", ({ author, message }) => {
    addMessage(author, message);
  });
};

// Finally, export the scoket to be imported in app.js
export default { connect };
