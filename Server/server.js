const Player = require("./player.js");
const Constants = require("./constants.js");
const Storage = require("./storage.js");
const Grid = require("./Grid.js");

const io = require("socket.io")(3000, {
  cors: ["http://localhost:5500"],
});

let storage = new Storage();

let grid = new Grid(Constants.MAP_WIDTH, Constants.MAP_HEIGHT, 140, 0);

//console.log(grid);

io.on("connection", (socket) => {
  socket.on("initialize", (screenCenter) => {
    storage.Add(socket.id, new Player(100, 100, 35, 5, screenCenter));

    socket.emit("initialize", storage.PlayerList, socket.id, grid);
    socket.broadcast.emit(
      "add_player",
      socket.id,
      storage.PlayerList[socket.id]
    );

    socket.on("movement", (move_vector) => {
      storage.PlayerList[socket.id].move_vector = move_vector;
      storage.PlayerList[socket.id].setIsMoving();
    });

    socket.on("hero_rotation", (mouse_pos) => {
      storage.PlayerList[socket.id].mouse_position = mouse_pos;
      storage.PlayerList[socket.id].setIsRotating();
    });
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });

  //socket.broadcast.emit()

  //socket.on("input", (message) => {
  //  io.emit("receive-message", message);
  //});
});
//console.log(Constants.TICK_RATE * 1000);

//var interval = Constants.TICK_RATE * 1000;
function Timer(callback, timeInterval) {
  this.timeInterval = timeInterval;

  this.start = () => {
    this.expected = Date.now() + this.timeInterval;
    this.timeout = setTimeout(this.round, this.timeInterval);
  };

  this.stop = () => {
    clearTimeout(this.timeout);
  };

  this.round = () => {
    let drift = Date.now() - this.expected;
    callback();
    this.expected += this.timeInterval;
    this.timeout = setTimeout(this.round, this.timeInterval - drift);
  };
}

const myTimer = new Timer(update, Constants.TICK_RATE * 1000);
myTimer.start();
// TICK LOOP
function update() {
  for (var key in storage.PlayerList) {
    if (storage.PlayerList[key].isMoving) {
      storage.PlayerList[key].move();
      let time = Date.now();
      //console.log(time);
      io.emit("movement", key, time, storage.PlayerList[key].position);
    }

    if (storage.PlayerList[key].isRotating) {
      storage.PlayerList[key].rotate();
      let time = Date.now();
      io.emit("hero_rotation", key, time, storage.PlayerList[key].rotation);
    }
  }
  //console.log("Czas trwania petli: ", time - Date.now());
}
