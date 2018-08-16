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
  const chatLog = $(".chat-messages").append(
     `<li>
        <span class="author">&lt;${author}&gt;</span>
        <span class="message">${message}</span>
      </li>`
    );
};

// Presence functions

// Presence default state
let presences = {};

// The timer we'll use to check the user's idle status
let idleTimeout = null;

// How long we'll wait for the user to be marked as idle
const TIMEOUT = 30 * 1000; // 30 seconds

// Provide a way to hide the current chat UI
const hideChatUI = () => {
  $("div.chat-ui").addClass("hidden");
};

// And a way to show the chat UI
const showChatUI = () => {
  $("div.chat-ui").removeClass("hidden");
};

// Load the chat, display the UI, connect to the socket
const loadChat = socket => {
  // Set a handler that when the join-chat button is clicked,
  // we verify that the username is not empty, and then show
  // the UI and connect to the socket
  $(".join-chat").on("click", () => {
    const username = $(".author-input").val();
    if (username.length <= 0) {
      return;
    }
    showChatUI();
    connect(socket, username);
  });
};

// Given a metas array for a user, return their current status
const getStatus = metas => metas.length > 0 && metas[0]["status"];

// Sync up the list of users to the current Presence State
const syncUserList = presences => {
  $(".username-list").empty();
  Presence.list(presences, (username, { metas }) => {
    const status = getStatus(metas);
    $(".username-list").append(`<li class="${status}">${username}</li>`);
  });
};

// Reset the timer when an interaction occurs
const resetTimer = (channel, username, skipPush = false) => {
  if (!skipPush) {
    channel.push("user_active", { username });
  }
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => {
    channel.push("user_idle", { username });
  }, TIMEOUT);
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
