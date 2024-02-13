import io from "socket.io-client";

const socket = io("http://localhost:8080"); // Remplacez l'URL par l'URL de votre serveur WebSocket

export default socket;