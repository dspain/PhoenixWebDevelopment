// Import the default Phoenix HTML libraries
import "phoenix_html";

// Import the User Socket code to enable websockets
import socket from "./socket";

// Import the polls channel code to enable live polling
import LivePolls from "./poll";
LivePolls.connect(socket);
import LiveChat from "./chat";
LiveChat.loadChat(socket);
