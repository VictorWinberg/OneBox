$(function() {
  var COLORS = [
    "#1f77b4",
    "#aec7e8",
    "#ff7f0e",
    "#ffbb78",
    "#2ca02c",
    "#98df8a",
    "#d62728",
    "#ff9896",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#bcbd22",
    "#17becf"
  ];

  // Initialize variables
  var $roomInput = $(".roomInput"); // Input for room
  var $participantsUl = $(".participants ul"); // Ul for participants

  // Prompt for setting a host session
  var room;

  var socket = io();

  // Sets the host's room
  const createRoom = () => {
    room = Math.random()
      .toString(36)
      .substr(2, 5)
      .toUpperCase();

    $roomInput.val(room);

    // Tell the server your host room
    socket.emit("add host", room);
  };

  // Adds the visual username to the participants list
  const addParticipant = data => {
    var $usernameDiv = $("<li />")
      .text(data.username)
      .css("color", getHashColor(room + data.username));

    $participantsUl.append($usernameDiv);
  };

  // Removes the visual username from the participants list
  const removeParticipant = data => {
    var $usernameDiv = $(`.participants ul li:contains('${data.username}')`);

    $usernameDiv.remove();
  };

  // Gets the color of a value through our hash function
  const getHashColor = value => {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  };

  // Socket events

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on("user joined", data => {
    console.log(data.username + " joined");
    addParticipant(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on("user left", data => {
    console.log(data.username + " left");
    removeParticipant(data);
  });

  socket.on("disconnect", () => {
    console.log("you have been disconnected");
  });

  socket.on("reconnect", () => {
    console.log("you have been reconnected");
    if (room) {
      socket.emit("add host", room);
    }
  });

  socket.on("reconnect_error", () => {
    console.log("attempt to reconnect has failed");
  });

  // On load
  createRoom();
});
