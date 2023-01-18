import { app, Graphics } from "./App.js";
import { Hex } from "./Hex.js";

class Grid {
  constructor() {}
  initialize(width, height, edgeLength, borderWidth, map) {
    this.map = {};
    this.width = width;
    this.height = height;
    this.edgeLength = edgeLength;
    this.borderWidth = borderWidth;
    this.h = (this.edgeLength * Math.sqrt(3)) / 2;

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.map[[i, j]] = new Hex(
          map[[i, j]].position,
          map[[i, j]].edgeLength,
          map[[i, j]].borderWidth,
          map[[i, j]].points,
          map[[i, j]].terrainType,
          map[[i, j]].terrainObstacle,
          map[[i, j]].terrainResource,
          { x: i, y: j },
          map[[i, j]].building,
          map[[i, j]].hexOwner,
          map[[i, j]].whoBuilds,
          map[[i, j]].neighbours
        );
      }
    }
    console.log("GRID INITIATED");
  }
  PlaceBuilding(hexCord, building) {
    this.map[[hexCord.x, hexCord.y]].building = building;
  }
}

const singletonInstance = new Grid();

export default singletonInstance;
