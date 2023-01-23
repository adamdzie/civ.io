import { app, Graphics, Text, Container, Sprite } from "./App.js";

import InputManager from "./InputManager.js";
import Resources from "./Resources.js";
import BuildingFactory from "./Buildings/BuildingFactory.js";
import View from "./View.js";
import Grid from "./Grid.js";
import { existOnMap } from "./Utils/Functions.js";

export class Hex {
  constructor(
    terrainType,
    terrainObstacle,
    terrainResource,
    hexCord,
    hexOwner
  ) {
    this.edgeLength = Grid.edgeLength;
    this.h = (this.edgeLength * Math.sqrt(3)) / 2;
    this.hexCord = hexCord;
    this.hexOwner = hexOwner;

    if (this.hexCord.x % 2)
      this.position = {
        x: hexCord.x * this.edgeLength * 1.5,
        y: hexCord.y * this.h * 2 + this.h,
      };
    else
      this.position = {
        x: hexCord.x * this.edgeLength * 1.5,
        y: hexCord.y * this.h * 2,
      };

    this.building = "none";

    this.neighbours = [];

    //EVEN
    if (this.hexCord.x % 2 === 0) {
      if (existOnMap(this.hexCord.x - 1, this.hexCord.y - 1))
        this.neighbours.push({ x: this.hexCord.x - 1, y: this.hexCord.y - 1 });
      else this.neighbours.push("none");

      if (existOnMap(this.hexCord.x, this.hexCord.y - 1))
        this.neighbours.push({ x: this.hexCord.x, y: this.hexCord.y - 1 });
      else this.neighbours.push("none");

      if (existOnMap(this.hexCord.x + 1, this.hexCord.y - 1))
        this.neighbours.push({ x: this.hexCord.x + 1, y: this.hexCord.y - 1 });
      else this.neighbours.push("none");

      if (existOnMap(this.hexCord.x + 1, this.hexCord.y))
        this.neighbours.push({
          x: this.hexCord.x + 1,
          y: this.hexCord.y,
        });
      else this.neighbours.push("none");

      if (existOnMap(this.hexCord.x, this.hexCord.y + 1))
        this.neighbours.push({ x: this.hexCord.x, y: this.hexCord.y + 1 });
      else this.neighbours.push("none");

      if (existOnMap(this.hexCord.x - 1, this.hexCord.y))
        this.neighbours.push({
          x: this.hexCord.x - 1,
          y: this.hexCord.y,
        });
      else this.neighbours.push("none");
    }
    //ODD
    else if (this.hexCord.x % 2 === 1) {
      if (existOnMap(this.hexCord.x - 1, this.hexCord.y))
        this.neighbours.push({
          x: this.hexCord.x - 1,
          y: this.hexCord.y,
        });
      else this.neighbours.push("none");

      if (existOnMap(this.hexCord.x, this.hexCord.y - 1))
        this.neighbours.push({ x: this.hexCord.x, y: this.hexCord.y - 1 });
      else this.neighbours.push("none");

      if (existOnMap(this.hexCord.x + 1, this.hexCord.y))
        this.neighbours.push({
          x: this.hexCord.x + 1,
          y: this.hexCord.y,
        });
      else this.neighbours.push("none");

      if (existOnMap(this.hexCord.x + 1, this.hexCord.y + 1))
        this.neighbours.push({ x: this.hexCord.x + 1, y: this.hexCord.y + 1 });
      else this.neighbours.push("none");

      if (existOnMap(this.hexCord.x, this.hexCord.y + 1))
        this.neighbours.push({ x: this.hexCord.x, y: this.hexCord.y + 1 });
      else this.neighbours.push("none");

      if (existOnMap(this.hexCord.x - 1, this.hexCord.y + 1))
        this.neighbours.push({ x: this.hexCord.x - 1, y: this.hexCord.y + 1 });
      else this.neighbours.push("none");
    }

    this.points = [
      this.position.x,
      this.position.y + this.h,
      this.position.x + this.edgeLength / 2,
      this.position.y,
      this.position.x + this.edgeLength + this.edgeLength / 2,
      this.position.y,
      this.position.x + this.edgeLength * 2,
      this.position.y + this.h,
      this.position.x + this.edgeLength + this.edgeLength / 2,
      this.position.y + this.h * 2,
      this.position.x + this.edgeLength / 2,
      this.position.y + this.h * 2,
    ];
    //var v = new SAT.Vector(10, 10);
    this.collider = new SAT.Polygon(new SAT.Vector(0, 0), [
      new SAT.Vector(this.points[0], this.points[1]),
      new SAT.Vector(this.points[2], this.points[3]),
      new SAT.Vector(this.points[4], this.points[5]),
      new SAT.Vector(this.points[6], this.points[7]),
      new SAT.Vector(this.points[8], this.points[9]),
      new SAT.Vector(this.points[10], this.points[11]),
    ]);

    this.tempgraph = new Graphics();
    this.tempgraph
      .lineStyle(3, 0x000000, 0.1)
      .moveTo(this.points[0], this.points[1])
      .lineTo(this.points[2], this.points[3])
      .lineTo(this.points[4], this.points[5])
      .lineTo(this.points[6], this.points[7])
      .lineTo(this.points[8], this.points[9])
      .lineTo(this.points[10], this.points[11])
      .lineTo(this.points[0], this.points[1]);

    this.borderTopLeft = new Graphics();
    this.borderTopLeft
      .lineStyle(3, 0x000000, 1)
      .moveTo(this.points[0], this.points[1])
      .lineTo(this.points[2], this.points[3]);

    this.borderTop = new Graphics();
    this.borderTop
      .lineStyle(3, 0x000000, 1)
      .moveTo(this.points[2], this.points[3])
      .lineTo(this.points[4], this.points[5]);

    this.borderTopRight = new Graphics();
    this.borderTopRight
      .lineStyle(3, 0x000000, 1)
      .moveTo(this.points[4], this.points[5])
      .lineTo(this.points[6], this.points[7]);

    this.borderBottomRight = new Graphics();
    this.borderBottomRight
      .lineStyle(3, 0x000000, 1)
      .moveTo(this.points[6], this.points[7])
      .lineTo(this.points[8], this.points[9]);

    this.borderBottom = new Graphics();
    this.borderBottom
      .lineStyle(3, 0x000000, 1)
      .moveTo(this.points[8], this.points[9])
      .lineTo(this.points[10], this.points[11]);

    this.borderBottomLeft = new Graphics();
    this.borderBottomLeft
      .lineStyle(3, 0x000000, 1)
      .moveTo(this.points[10], this.points[11])
      .lineTo(this.points[0], this.points[1]);

    this.border_array = [
      this.borderTopLeft,
      this.borderTop,
      this.borderTopRight,
      this.borderBottomRight,
      this.borderBottom,
      this.borderBottomLeft,
    ];

    this.activeBorders = {};
    this.activeBorders["top-left"] = false;
    this.activeBorders["top"] = false;
    this.activeBorders["top-right"] = false;
    this.activeBorders["bottom-right"] = false;
    this.activeBorders["bottom"] = false;
    this.activeBorders["bottom-left"] = false;

    this.terrainType = terrainType;
    this.terrainObstacle = terrainObstacle;
    this.terrainResource = terrainResource;

    if (this.terrainType === "snow") {
      this.hex = PIXI.Texture.from("./Assets/Hex/HEX_SNOW.png");
    } else if (this.terrainType === "grass") {
      this.hex = PIXI.Texture.from("./Assets/Hex/HEX_GRASS.png");
    } else if (this.terrainType === "ocean") {
      this.hex = PIXI.Texture.from("./Assets/Hex/HEX_OCEAN.png");
    } else if (this.terrainType === "lake") {
      this.hex = PIXI.Texture.from("./Assets/Hex/HEX_LAKE.png");
    } else if (this.terrainType === "mountain") {
      this.hex = PIXI.Texture.from("./Assets/Hex/HEX_MOUNTAIN.png");
    }
    this.container = new Container();

    if (this.terrainResource !== "none") {
      this.resourceText = new PIXI.Text(this.terrainResource, {
        align: "justify",
        fontSize: 24,
      });
    } else {
      this.resourceText = new PIXI.Text("", {
        align: "justify",
        fontSize: 24,
      });
    }

    this.sprite = new PIXI.Sprite(this.hex);
    this.sprite.width = 280;
    this.sprite.x = 0;
    this.sprite.y = 0;

    this.sprite.zIndex = 1;

    //CREATE RESOURCE SPRITE

    this.resource_sprite = "none";

    if (this.terrainResource !== "none") {
      this.resource_sprite = new PIXI.Sprite(
        Resources.assets[this.terrainResource]
      );
      this.resource_sprite.zIndex = 4;
    }

    this.resource_sprite.anchor.x = -2.5;
    this.resource_sprite.anchor.y = -3.0;

    this.container.addChild(this.sprite);

    if (this.resource_sprite !== "none")
      this.container.addChild(this.resource_sprite);

    this.container.x = this.position.x;
    this.container.y = this.position.y;

    this.container.interactive = true;
    this.container.hitArea = new PIXI.Polygon([
      0,
      this.h,
      this.edgeLength / 2,
      0,
      this.edgeLength + this.edgeLength / 2,
      0,
      this.edgeLength * 2,
      this.h,
      this.edgeLength + this.edgeLength / 2,
      this.h * 2,
      this.edgeLength / 2,
      this.h * 2,
    ]);
    this.container.on("pointerdown", () => {
      if (!InputManager.mode && InputManager.active_slot !== -1) {
        console.log(this.position);
      }
    });

    this.ownerSprite = "none";
    // if (this.hexOwner !== 0) {
    //   this.ownerSprite = new PIXI.Sprite(Resources.assets["Hex_mask_owner"]);
    //   this.ownerSprite.zIndex = 3;
    //   this.container.addChild(this.ownerSprite);
    // }

    this.container.sortableChildren = true;
    console.log(this.hexOwner);
    View.Add([this.container, this.tempgraph]);
    // app.stage.addChild(this.container);
    // app.stage.addChild(this.tempgraph);
    //console.log(this.position.x + this.edgeLength);
    // console.log(this.position.y + this.h);
  }
  IsCollide(point) {
    return SAT.pointInPolygon(point, this.collider);
  }
  displayHexOwnage() {
    if (this.hexOwner !== 0) {
      this.ownerSprite = new PIXI.Sprite(Resources.assets["Hex_mask_owner"]);
      this.ownerSprite.zIndex = 3;
      this.container.addChild(this.ownerSprite);
    }
  }
  drawBorders() {
    for (let i = 0; i < this.neighbours.length; i++) {
      let border = this.getCurrentBorder(i);

      if (this.neighbours[i] !== "none") {
        if (
          Grid.map[[this.neighbours[i].x, this.neighbours[i].y]].hexOwner !==
          this.hexOwner
        ) {
          View.Add([this.border_array[i]]);
          this.activeBorders[border] = true;
        }
      } else {
        View.Add([this.border_array[i]]);
      }
    }
  }
  updateNeighbours() {
    for (let i = 0; i < this.neighbours.length; i++) {
      let border = this.getReverseBorder(i);

      if (this.neighbours[i] !== "none") {
        if (
          Grid.map[[this.neighbours[i].x, this.neighbours[i].y]].hexOwner ===
          this.hexOwner
        )
          Grid.map[[this.neighbours[i].x, this.neighbours[i].y]].disableBorder(
            border
          );
      }
    }
  }
  getCurrentBorder(i) {
    let border = "";
    if (i === 0) border = "top-left";
    if (i === 1) border = "top";
    if (i === 2) border = "top-right";
    if (i === 3) border = "bottom-right";
    if (i === 4) border = "bottom";
    if (i === 5) border = "bottom-left";
    return border;
  }
  getReverseBorder(i) {
    let border = "";
    if (i === 0) border = "bottom-right";
    if (i === 1) border = "bottom";
    if (i === 2) border = "bottom-left";
    if (i === 3) border = "top-left";
    if (i === 4) border = "top";
    if (i === 5) border = "top-right";
    return border;
  }
  borderToIndex(border) {
    let index = 0;
    if (border === "top-left") index = 0;
    if (border === "top") index = 1;
    if (border === "top-right") index = 2;
    if (border === "bottom-right") index = 3;
    if (border === "bottom") index = 4;
    if (border === "bottom-left") index = 5;
    return index;
  }
  disableBorder(border) {
    if (this.activeBorders[border]) {
      this.activeBorders[border] = false;
      View.Remove([this.border_array[this.borderToIndex(border)]]);
    }
  }
}
