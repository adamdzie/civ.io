let io;

const { Server } = require("socket.io");

exports.socketConnection = (server) => {
  io = new Server(server, {
    cors: ["http://25.22.175.22:3000"],
  });
};
exports.onConnection = (fire) =>
  io.on("connection", (socket) => {
    fire(socket);
  });
exports.sendToAll = (namespace, args) => io.emit(namespace, args);
exports.sendToClient = (namespace, key, args) =>
  io.to(key).emit(namespace, args);
