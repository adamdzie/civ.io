import { Player } from "./player.js";
import Grid from "./Grid.js";
import Storage from "./storage.js";
import InputManager from "./InputManager.js";
import UI from "./Ui.js";
import Resources from "./Resources.js";
import ShowConstruction from "./ShowConstruction.js";
//import { Resource } from "pixi.js";

//var SAT = require("sat");

export const socket = io("http://localhost:3000");

export var socket_id = "";

let initiated = false;

socket.on("connect", () => {});

socket.on("initialize", async (players, _socketId, grid) => {
  socket_id = _socketId;

  Resources.initialize();

  await Grid.initialize(
    grid.width,
    grid.height,
    grid.edgeLength,
    grid.borderWidth,
    grid.map
  );

  for (var key in players) {
    await Storage.Add(key, players[key]);
  }
  ShowConstruction.initialize();
  InputManager.initialize();
  UI.initialize();
  initiated = true;
});

socket.on("add_player", (id, player) => {
  Storage.Add(id, player);
});

socket.on("movement", (id, time, position) => {
  Storage.PlayerList[id].HandleNewTick({
    time: time,
    x: position.x,
    y: position.y,
  });
});

socket.on("hero_rotation", (id, time, rotation) => {
  //console.log("TO CZAS:" + time + "A TO ANGLE: " + rotation);
  if (!initiated) return;
  Storage.PlayerList[id].HandleNewRotationTick({
    time: time,
    angle: rotation,
  });
});

const Application = PIXI.Application;

export const app = new Application({
  width: 500,
  height: 500,
  transparent: false,
  antialias: true,
});

app.renderer.backgroundColor = 0xaaaaaa;

app.renderer.resize(window.innerWidth, window.innerHeight);

app.renderer.view.style.position = "absolute";

document.body.appendChild(app.view);

app.stage.position.x = app.renderer.width / 2;
app.stage.position.y = app.renderer.height / 2;
app.stage.sortableChildren = true;

socket.emit("initialize", {
  x: app.stage.position.x,
  y: app.stage.position.y,
});

export const Graphics = PIXI.Graphics;
export const Text = PIXI.Text;
export const Container = PIXI.Container;
export const Sprite = PIXI.Sprite;

// let collider = new SAT.Polygon(new SAT.Vector(0, 0), [
//   new SAT.Vector(0, 121.24),
//   new SAT.Vector(70, 0),
//   new SAT.Vector(210, 0),
//   new SAT.Vector(280, 121.24),
//   new SAT.Vector(210, 242.48),
//   new SAT.Vector(70, 242.48),
// ]);

const cull = new PIXI.Cull().addAll(app.stage.children);

app.ticker.add((delta) => loop(delta));

function loop(delta) {
  if (socket_id === "" || !initiated) return;
  if (!InputManager.initialized) return;
  if (!UI.initialized) return;
  if (!Grid) return;

  for (var key in Storage.PlayerList) {
    Storage.PlayerList[key].update(app.ticker.deltaMS);
  }

  app.stage.pivot.x = Storage.PlayerList[socket_id].sprite.x;
  app.stage.pivot.y = Storage.PlayerList[socket_id].sprite.y;

  UI.update();
  InputManager.Update();

  // if (
  //   SAT.pointInPolygon(
  //     new SAT.Vector(
  //       inputManager.mousePosition.x,
  //       inputManager.mousePosition.y
  //     ),
  //     collider
  //   )
  // )
  //   console.log("overlapuje");

  //TODO OPTIMIZE SEARCHING HEX
  //NOW IS O(n) DEPENDS FROM MAP SIZE

  cull.cull(app.renderer.screen);
}
