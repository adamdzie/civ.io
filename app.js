import { Player } from "./player.js";
import { Grid } from "./Grid.js";
import { Storage } from "./storage.js";
import { InputManager } from "./InputManager.js";

export const socket = io("http://localhost:3000");

export let storage = new Storage();
let inputManager = new InputManager();
export var socket_id = "";
let map;

socket.on("connect", () => {});

socket.on("initialize", (players, _socketId, grid) => {
  socket_id = _socketId;

  map = new Grid(
    grid.width,
    grid.height,
    grid.edgeLength,
    grid.borderWidth,
    grid.map
  );

  for (var key in players) {
    storage.Add(key, players[key]);
  }
});

socket.on("add_player", (id, player) => {
  storage.Add(id, player);
});

socket.on("movement", (id, time, position) => {
  //console.log("its time: ", time);
  //console.log("date now: ", Date.now());
  storage.PlayerList[id].HandleNewTick({
    time: time,
    x: position.x,
    y: position.y,
  });
});

socket.on("hero_rotation", (id, time, rotation) => {
  console.log("TO CZAS:" + time + "A TO ANGLE: " + rotation);
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

socket.emit("initialize", {
  x: app.stage.position.x,
  y: app.stage.position.y,
});

export const Graphics = PIXI.Graphics;
export const Text = PIXI.Text;
export const Container = PIXI.Container;
export const Sprite = PIXI.Sprite;

const cull = new PIXI.Cull().addAll(app.stage.children);

app.ticker.add((delta) => loop(delta));

function loop(delta) {
  if (socket_id === "") return;

  for (var key in storage.PlayerList) {
    storage.PlayerList[key].update(app.ticker.deltaMS);
  }

  app.stage.pivot.x = storage.PlayerList[socket_id].sprite.x;
  app.stage.pivot.y = storage.PlayerList[socket_id].sprite.y;
  cull.cull(app.renderer.screen);
}
