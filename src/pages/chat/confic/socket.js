import { io } from "socket.io-client";

const socket = io.connect("http://localhost:8000", { autoConnect: false });
export { socket }
