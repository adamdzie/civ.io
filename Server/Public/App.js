export let ratio_x = 1;
export let ratio_y = 1;
export let ratio = 1;

import { Player } from "./Player.js";
import Grid from "./Grid.js";
import Storage from "./Storage.js";
import InputManager from "./InputManager.js";
import UI from "./Ui.js";
import Resources from "./Resources.js";
import ShowConstruction from "./ShowConstruction.js";
import BuildingFactory from "./Buildings/BuildingFactory.js";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import View from "./View.js";

// import { io } from "./socket.io-client";
//import { Resource } from "pixi.js";

//var SAT = require("sat");

export const socket = io("http://localhost:3000");
//export const socket = io("http://localhost:3000");

export var socket_id = "";

let initiated = false;

socket.on("connect", () => {});

socket.on("initialize", async (players, _socketId, grid) => {
  socket_id = _socketId;
  Resources.initialize(grid.map[[0, 0]].points);

  await Grid.initialize(
    grid.width,
    grid.height,
    grid.edgeLength,
    grid.borderWidth,
    grid.map
  );

  for (var key in players) {
    Storage.Add(key, players[key]);
    for (var cord in players[key].buildings) {
      BuildingFactory.Build(
        key,
        players[key].buildings[cord].type,
        players[key].buildings[cord].hexCord,
        players[key].buildings[cord].isBuilt,
        players[key].buildings[cord].ownedHexes
      );
    }
  }

  ShowConstruction.initialize();
  InputManager.initialize();
  UI.initialize();
  resize();
  initiated = true;
});

socket.on("add_player", (id, player) => {
  Storage.Add(id, player);
});

socket.on("movement", (args) => {
  if (!initiated) return;
  Storage.PlayerList[args[0]].HandleNewTick({
    time: args[1],
    x: args[2].x,
    y: args[2].y,
  });
});

socket.on("hero_rotation", (args) => {
  //console.log("TO CZAS:" + time + "A TO ANGLE: " + rotation);
  if (!initiated) return;
  Storage.PlayerList[args[0]].HandleNewRotationTick({
    time: args[1],
    angle: args[2],
  });
});

socket.on("build", (args) => {
  if (!initiated) return;
  Grid.map[[args[2].x, args[2].y]].building = BuildingFactory.Build(
    args[0],
    args[1],
    args[2],
    false,
    args[3]
  );
  //console.log(Grid.map[[args[2].x, args[2].y]].building);
});

socket.on("Building_complete", (args) => {
  if (!initiated) return;
  Grid.map[[args[0].x, args[0].y]].building.complete();
});

socket.on("city_grow", (args) => {
  if (!initiated) return;
  Grid.map[[args[0].x, args[0].y]].building.grow(args[1]);
});

const Application = PIXI.Application;
//2400
//1250

//1600
//900
// const GAME_WIDTH = 1600 * window.devicePixelRatio;
// const GAME_HEIGHT = 900 * window.devicePixelRatio;
const GAME_WIDTH = 1600;
const GAME_HEIGHT = 900;
//console.log(window.devicePixelRatio);
//console.log(window.screen.width);

export const app = new Application({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  // width: window.innerWidth * window.devicePixelRatio,
  // height: window.innerHeight * window.devicePixelRatio,
  transparent: false,
  antialias: true,
  resolution: window.devicePixelRatio,
  autoResize: true,
  //ROUND_PIXELS: true,
  //resolution: 1,
});

app.renderer.backgroundColor = 0xaaaaaa;

app.renderer.view.style.position = "absolute";
app.renderer.view.style.top = "0px";
app.renderer.view.style.left = "0px";

document.body.appendChild(app.view);

window.addEventListener("resize", resize);

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

//app.view.style.width = app.renderer.width + "px";
//app.view.style.height = app.renderer.height + "px";
// let collider = new SAT.Polygon(new SAT.Vector(0, 0), [
//   new SAT.Vector(0, 121.24),
//   new SAT.Vector(70, 0),
//   new SAT.Vector(210, 0),
//   new SAT.Vector(280, 121.24),
//   new SAT.Vector(210, 242.48),
//   new SAT.Vector(70, 242.48),
// ]);

app.stage.addChild(View.container);
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
  View.container.pivot.x = Storage.PlayerList[socket_id].sprite.x;
  View.container.pivot.y = Storage.PlayerList[socket_id].sprite.y;
  // app.stage.pivot.x = Storage.PlayerList[socket_id].sprite.x;
  // app.stage.pivot.y = Storage.PlayerList[socket_id].sprite.y;

  UI.update();
  InputManager.Update();
  //console.log(Grid.map[[0, 0]].building);
  //console.log(Grid.map[[0, 1]].building);

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
  // app.view.style.width = window.innerWidth + "px";
  // app.view.style.height = window.innerHeight + "px";

  //app.stage.height = window.innerHeight;
  cull.cull(app.renderer.screen);
}

function resize() {
  // Determine which screen dimension is most constrained
  ratio = Math.max(
    window.innerWidth / GAME_WIDTH,
    window.innerHeight / GAME_HEIGHT
  );

  ratio_x = window.innerWidth / GAME_WIDTH;
  ratio_y = window.innerHeight / GAME_HEIGHT;

  // Scale the view appropriately to fill that dimension
  // app.stage.scale.x = app.stage.scale.y = ratio;
  //ratio -= 0.5;
  View.container.scale.x = View.container.scale.y = ratio;

  // Update the renderer dimensions
  app.renderer.resize(
    Math.ceil(GAME_WIDTH * ratio_x),
    Math.ceil(GAME_HEIGHT * ratio_y)
    //Math.ceil(GAME_HEIGHT * ratio)
  );
  // View.container.pivot.x = app.renderer.width / 2;
  // View.container.pivot.y = app.renderer.height / 2;
  //console.log(app.renderer.width);
  // View.container.x = app.renderer.width / 2;
  // View.container.y = app.renderer.height / 2;

  // View.container.x = app.stage.pivot.x;
  // View.container.y = app.stage.pivot.y;

  app.stage.position.x = app.renderer.width / 2;
  app.stage.position.y = app.renderer.height / 2;

  //app.stage.position.x = window.innerWidth / 2;
  //app.stage.position.y = window.innerHeight / 2;

  //console.log(app.stage.position.y);
  socket.emit("update_screen", {
    x: app.stage.position.x,
    y: app.stage.position.y,
  });

  UI.Resize();
  console.log(window.innerWidth / 2);
  console.log(app.stage.position.x);
  // app.stage.position.x = View.container.width / 2;
  // app.stage.position.y = View.container.height / 2;
  //app.renderer.height = GAME_HEIGHT;
}
