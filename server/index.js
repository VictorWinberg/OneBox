// Setup basic express server
var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
var io = require("socket.io")(server);
require("dotenv").config();

var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

// Routing
app.use(express.static(path.resolve(__dirname, "..", "public")));

// Chatroom
var numUsers = 0;

io.on("connection", socket => {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on("new message", data => {
    // we tell the client to execute 'new message'
    socket.broadcast.in(socket.room).emit("new message", {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on("add user", (username, room) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    socket.room = room;
    ++numUsers;
    addedUser = true;
    socket.join(room);
    socket.emit("login", {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.in(socket.room).emit("user joined", {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on("typing", () => {
    socket.broadcast.in(socket.room).emit("typing", {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on("stop typing", () => {
    socket.broadcast.in(socket.room).emit("stop typing", {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", () => {
    if (addedUser) {
      --numUsers;

      socket.leave(socket.room);
      // echo globally that this client has left
      socket.broadcast.in(socket.room).emit("user left", {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
