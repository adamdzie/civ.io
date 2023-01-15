let io;

exports.socketConnection = () => {
  io = require("socket.io")(3000, {
    cors: ["http://localhost:5500"],
  });
};
exports.onConnection = (fire) =>
  io.on("connection", (socket) => {
    fire(socket);
  });
exports.sendToAll = (namespace, args) => io.emit(namespace, args);
exports.sendToClient = (namespace, key, args) =>
  io.to(key).emit(namespace, args);
