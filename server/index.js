// Setup basic express server
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { shuffle } = require("shuffle-seed");
require("dotenv").config();

const port = process.env.PORT || 4000;

const COLORS = "#1f77b4,#aec7e8,#ff7f0e,#ffbb78,#2ca02c,#98df8a,#d62728,#ff9896,#9467bd,#8c564b,#e377c2,#bcbd22,#17becf".split(
  ","
);

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

// Routing
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

// Chatroom
io.on("connection", socket => {
  let addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on("new message", data => {
    // we tell the client to execute 'new message'
    socket.broadcast.in(socket.room).emit("new message", {
      username: socket.username,
      color: socket.color,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on("add user", (username, room) => {
    if (addedUser || username === "HOST" || !socket.adapter.rooms[room]) return;

    // we store the username in the socket session for this client
    socket.username = username;
    socket.room = room;
    socket.color = shuffle(COLORS, room)[
      socket.adapter.rooms[room].length % COLORS.length
    ];
    addedUser = true;
    socket.join(room);
    socket.emit("login", {
      color: socket.color
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.in(socket.room).emit("user joined", {
      username: socket.username,
      color: socket.color,
      userCount: socket.adapter.rooms[room].length
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on("add host", room => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = "HOST";
    socket.room = room;
    addedUser = true;
    socket.join(room);
    socket.emit("login", {
      userCount: socket.adapter.rooms[room].length
    });
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", () => {
    if (addedUser) {
      socket.leave(socket.room);

      if (socket.adapter.rooms[socket.room]) {
        socket.broadcast.in(socket.room).emit("user left", {
          username: socket.username,
          color: socket.color,
          userCount: socket.adapter.rooms[socket.room].length
        });
      }
    }
  });
});
