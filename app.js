import { Player } from "./player.js";
import { Grid } from "./Grid.js";
import { Storage } from "./storage.js";
import { InputManager } from "./InputManager.js";
import { UI } from "./Ui.js";
import { Resources } from "./Resources.js";
import { ShowConstruction } from "./ShowConstruction.js";

//var SAT = require("sat");

export const socket = io("http://localhost:3000");

export var socket_id = "";
export let map;
export let ui;

let initiated = false;

socket.on("connect", () => {});

socket.on("initialize", async (players, _socketId, grid) => {
  socket_id = _socketId;

  map = await new Grid(
    grid.width,
    grid.height,
    grid.edgeLength,
    grid.borderWidth,
    grid.map
  );

  for (var key in players) {
    await storage.Add(key, players[key]);
  }
  ui = await new UI();
  initiated = true;
});

socket.on("add_player", (id, player) => {
  storage.Add(id, player);
});

socket.on("movement", (id, time, position) => {
  storage.PlayerList[id].HandleNewTick({
    time: time,
    x: position.x,
    y: position.y,
  });
});

socket.on("hero_rotation", (id, time, rotation) => {
  //console.log("TO CZAS:" + time + "A TO ANGLE: " + rotation);
  if (!initiated) return;
  storage.PlayerList[id].HandleNewRotationTick({
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

export let storage = new Storage();
export let inputManager = new InputManager();
export let resources = new Resources();
export let showConstruction = new ShowConstruction();
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
  if (!inputManager) return;
  if (!ui) return;
  if (!map) return;

  for (var key in storage.PlayerList) {
    storage.PlayerList[key].update(app.ticker.deltaMS);
  }

  app.stage.pivot.x = storage.PlayerList[socket_id].sprite.x;
  app.stage.pivot.y = storage.PlayerList[socket_id].sprite.y;

  ui.update();
  inputManager.Update();

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
