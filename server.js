const { Server } = require("socket.io");
const io = new Server(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let players = {};

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);


  socket.emit("updatePlayers", players);


  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit("updatePlayers", players);
  });


  socket.on("updatePosition", (position) => {
    players[socket.id] = position;
    io.emit("updatePlayers", players);
  });
});

console.log("Server is running on port 3000");
