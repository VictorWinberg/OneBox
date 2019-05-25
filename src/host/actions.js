export const createRoom = () => {
  const room = Math.random()
    .toString(36)
    .substr(2, 5)
    .toUpperCase();

  // ADD SOCKET.IO operations

  return room;
};
