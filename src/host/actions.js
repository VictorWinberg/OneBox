export const createRoom = socket => {
  const room = Math.random()
    .toString(36)
    .substr(2, 5)
    .toUpperCase();

  socket.emit("add host", room);

  return room;
};

export const rejoinRoom = (socket, room) => {
  if (room) {
    socket.emit("add host", room);
  }
};
