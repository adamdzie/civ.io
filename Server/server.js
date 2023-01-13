const Player = require("./Player.js");
const Constants = require("./Constants.js");
const Storage = require("./Storage.js");
const Grid = require("./Grid.js");
const City = require("./Buildings/City.js");

const io = require("socket.io")(3000, {
  cors: ["http://localhost:5500"],
});

let building_temp = new City(12, { x: 0, y: 0 }, { x: 0, y: 0 }, 100, 100, 16);

// let timson = setInterval(() => {
//   console.log(Grid.map[[0, 0]].building);
// }, 2000);

io.on("connection", (socket) => {
  socket.on("initialize", (screenCenter) => {
    Storage.Add(
      socket.id,
      new Player(100, 100, 35, 5, screenCenter, socket.id)
    );

    socket.emit("initialize", Storage.PlayerList, socket.id, Grid);
    socket.broadcast.emit(
      "add_player",
      socket.id,
      Storage.PlayerList[socket.id]
    );

    socket.on("movement", (move_vector) => {
      Storage.PlayerList[socket.id].move_vector = move_vector;
      Storage.PlayerList[socket.id].setIsMoving();
    });

    socket.on("hero_rotation", (mouse_pos) => {
      Storage.PlayerList[socket.id].mouse_position = mouse_pos;
      Storage.PlayerList[socket.id].setIsRotating();
    });

    socket.on("build", (hexCord) => {});
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
});

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
  for (var key in Storage.PlayerList) {
    if (Storage.PlayerList[key].isMoving) {
      Storage.PlayerList[key].move();
      let time = Date.now();
      //console.log(time);
      io.emit("movement", key, time, Storage.PlayerList[key].position);
    }

    if (Storage.PlayerList[key].isRotating) {
      Storage.PlayerList[key].rotate();
      let time = Date.now();
      io.emit("hero_rotation", key, time, Storage.PlayerList[key].rotation);
    }
  }
  //console.log("Czas trwania petli: ", time - Date.now());
}
