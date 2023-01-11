import { Graphics, Text, map, app } from "../app";

export class Building {
  constructor(ownerId, hexCord, hexPosition) {
    this.ownerId = ownerId;
    this.hexCord = hexCord;
    this.hexPosition = hexPosition;

    this.hexWidth = map.map[[0, 0]].edgeLength * 2;
    this.hexHeight = map.map[[0, 0]].h * 2;
  }
}
