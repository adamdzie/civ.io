const {
  socketConnection,
  onConnection,
  sendToAll,
} = require("./Utils/Socket-io.js");

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const Player = require("./Player.js");
const Constants = require("./Constants.js");
const Storage = require("./Storage.js");
const Grid = require("./Grid.js");
//const City = require("./Buildings/City.js");
const Timer = require("./Utils/Timer.js");
const Sender = require("./Utils/Sender.js");
const Serializer = require("./Utils/Serializer.js");
const Deserializer = require("./Utils/Deserializer.js");
const IDManager = require("./Utils/IDManager.js");
const sth = { x: 5, y: -2 };

socketConnection(server);

app.use(express.static(__dirname + "/Public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Public/index.html");
});
// app.get("App.js", (req, res) => {
//   res.sendFile(__dirname + "Public/App.js");
// });

onConnection(Receive);

server.listen(3000, () => {
  console.log("listening on *:3000");
});

const myTimer = new Timer(update, Constants.TICK_RATE * 1000);
myTimer.start();

// TICK LOOP
function update() {
  let time = Date.now();
  for (var key in Storage.PlayerList) {
    if (Storage.PlayerList[key].isMoving) {
      Storage.PlayerList[key].move();
      time = Date.now();
      //console.log(time);
      let _data = Serializer.Movement(
        Storage.PlayerList[key].id,
        time,
        Storage.PlayerList[key].position
      );
      sendToAll("movement", _data);
      //io.emit("movement", key, time, Storage.PlayerList[key].position);
    }

    if (Storage.PlayerList[key].isRotating) {
      Storage.PlayerList[key].rotate();
      time = Date.now();

      let _data = Serializer.Rotation(
        Storage.PlayerList[key].id,
        time,
        Storage.PlayerList[key].rotation
      );
      sendToAll("hero_rotation", _data);
      //io.emit("hero_rotation", key, time, Storage.PlayerList[key].rotation);
    }
  }
  //Sender.execute();
  //console.log("Czas trwania petli: ", time - Date.now());
}

function Receive(socket) {
  socket.on("initialize", (screenCenter) => {
    let id = IDManager.getId();
    Storage.Add(socket.id, new Player(100, 100, 35, 5, screenCenter, id));

    let _data = Serializer.Initialize(
      Grid.width,
      Grid.height,
      Grid.edgeLength,
      Grid.map,
      Storage.PlayerList,
      id
    );

    let _data_player = Serializer.AddPlayer(
      id,
      Storage.PlayerList[socket.id].position.x,
      Storage.PlayerList[socket.id].position.y,
      Storage.PlayerList[socket.id].rotation
    );

    socket.emit("initialize", _data);
    socket.broadcast.emit("add_player", _data_player);

    socket.on("movement", (m_vector) => {
      let move_vector = Deserializer.Movement(m_vector);

      Storage.PlayerList[socket.id].move_vector = move_vector;
      Storage.PlayerList[socket.id].setIsMoving();
    });

    socket.on("hero_rotation", (_data) => {
      let data = Deserializer.Rotation(_data);
      Storage.PlayerList[socket.id].mouse_position = data;
      Storage.PlayerList[socket.id].setIsRotating();
    });

    socket.on("build", (_data) => {
      let data = Deserializer.Build(_data);
      Storage.PlayerList[socket.id].build(data.hexCord, data.type);
    });

    socket.on("update_screen", (screenPosition) => {
      Storage.PlayerList[socket.id].screenCenter = screenPosition;
    });
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
}
