const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const sessions = {};
const sessionHistory = [];

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/create-session", (req, res) => {
  const sessionId = uuidv4();

  sessions[sessionId] = {
    participants: [],
    createdAt: new Date(),
  };

  sessionHistory.push({
    sessionId,
    createdAt: new Date(),
  });

  res.json({
    sessionId,
  });
});

app.get("/history", (req, res) => {
  res.json(sessionHistory);
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-session", (sessionId) => {
    socket.join(sessionId);

    if (sessions[sessionId]) {
      if (!sessions[sessionId].participants.includes(socket.id)) {
        sessions[sessionId].participants.push(socket.id);
      }

      io.to(sessionId).emit(
        "participant-count",
        sessions[sessionId].participants.length
      );
    }
  });

  socket.on("chat-message", (data) => {
    io.to(data.sessionId).emit(
      "receive-message",
      data.message
    );
  });

  socket.on("end-session", (sessionId) => {
    delete sessions[sessionId];

    io.to(sessionId).emit(
      "session-ended"
    );
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server Running On Port 5000");
});