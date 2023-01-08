import { app, Graphics, Text, Container, Sprite, resources } from "./app.js";

export class Hex {
  constructor(
    position,
    edgeLength,
    borderWidth,
    points,
    terrainType,
    terrainObstacle,
    terrainResource
  ) {
    this.position = position;
    this.edgeLength = edgeLength;
    this.borderWidth = borderWidth;
    this.h = (this.edgeLength * Math.sqrt(3)) / 2;

    this.points = points;

    for (let i = 0; i < this.points.length; i++) {
      if (i % 2 === 0) this.points[i] += this.edgeLength;
      else this.points[i] += this.h;
    }

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

    this.sprite.x = 0;
    this.sprite.y = 0;

    //CREATE RESOURCE SPRITE

    this.resource_sprite = "none";

    if (this.terrainResource !== "none") {
      this.resource_sprite = new PIXI.Sprite(
        resources.assets[this.terrainResource]
      );
    }

    this.resource_sprite.anchor.x = -2.5;
    this.resource_sprite.anchor.y = -3.0;

    this.container.addChild(this.sprite);

    if (this.resource_sprite !== "none")
      this.container.addChild(this.resource_sprite);

    this.container.x = this.position.x;
    this.container.y = this.position.y;

    this.temppoints = [
      this.points[0].x + 10,
      this.points[1],
      this.points[2],
      this.points[3] + 10,
      this.points[4],
      this.points[5] + 10,
      this.points[6] - 10,
      this.points[7],
      this.points[8],
      this.points[9] - 10,
      this.points[10],
      this.points[11] - 10,
    ];

    //this.container.interactive = true;
    //this.container.hitArea = new PIXI.Polygon(this.temppoints);
    // this.container.on("mouseover", () => {
    //   console.log(position);
    // });
    console.log("Pos: " + this.container.x + "," + this.container.y);
    app.stage.addChild(this.container);
    app.stage.addChild(this.tempgraph);
    //console.log(this.container.width);
  }
}
