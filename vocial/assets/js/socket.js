// Import Phoenix's Socket Library
import {Socket} from "phoenix";

// Next, create a new Phoenix socket to reuse
let socket = new Socket("/socket");

// Connect to the socket itself
socket.connect();

// Finally, export the socket to be imported in app.js
export default socket;
