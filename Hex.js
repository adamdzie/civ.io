import { app, Graphics, Text, Container, Sprite } from "./App.js";

import InputManager from "./InputManager.js";
import Resources from "./Resources.js";

export class Hex {
  constructor(
    position,
    edgeLength,
    borderWidth,
    points,
    terrainType,
    terrainObstacle,
    terrainResource,
    hexCord
  ) {
    this.position = position;
    this.edgeLength = edgeLength;
    this.borderWidth = borderWidth;
    this.h = (this.edgeLength * Math.sqrt(3)) / 2;
    this.hexCord = hexCord;

    this.points = points;
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

    //CREATE RESOURCE SPRITE

    this.resource_sprite = "none";

    if (this.terrainResource !== "none") {
      this.resource_sprite = new PIXI.Sprite(
        Resources.assets[this.terrainResource]
      );
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

    // console.log("Pos: " + this.container.x + "," + this.container.y);
    //console.log(this.container.position);
    app.stage.addChild(this.container);
    app.stage.addChild(this.tempgraph);
    //console.log(this.points);
  }
  IsCollide(point) {
    return SAT.pointInPolygon(point, this.collider);
  }
}
