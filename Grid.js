import { app, Graphics } from "./app.js";
import { Hex } from "./Hex.js";

export class Grid {
  constructor(width, height, edgeLength, borderWidth, map) {
    this.map = {};
    this.width = width;
    this.height = height;
    this.edgeLength = edgeLength;
    this.borderWidth = borderWidth;
    this.h = (this.edgeLength * Math.sqrt(3)) / 2;

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        // if (j < 3) {
        //   console.log("Cord: " + i + "," + j);
        //   console.log(map[[i, j]].points);
        // }

        this.map[[i, j]] = new Hex(
          map[[i, j]].position,
          map[[i, j]].edgeLength,
          map[[i, j]].borderWidth,
          map[[i, j]].points,
          map[[i, j]].terrainType,
          map[[i, j]].terrainObstacle,
          map[[i, j]].terrainResource,
          { x: i, y: j }
        );

        // console.log(
        //   "IN: " + i + "," + j + "  " + this.map[[i, j]].container.width
        // );
      }
    }
  }
}
