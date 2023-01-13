import { Graphics, Text, map, app } from "../App";

export class Building {
  constructor(ownerId, hexCord, hexPosition, width, height) {
    this.ownerId = ownerId;
    this.hexCord = hexCord;
    this.hexPosition = hexPosition;

    this.hexWidth = map.map[[0, 0]].edgeLength * 2;
    this.hexHeight = map.map[[0, 0]].h * 2;

    this.width = width;
    this.height = height;
  }
}
