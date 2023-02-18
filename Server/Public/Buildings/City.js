// import { Graphics, Text, app } from "../App.js";

import Building from "./Building.js";
import Grid from "../Grid.js";
import Storage from "../Storage.js";
import { getNeighbours } from "../Utils/Functions.js";
class City extends Building {
  constructor(ownerId, hexCord, isBuilt, ownedHexes) {
    super(ownerId, hexCord, "City", isBuilt);

    this.ownedHexes = ownedHexes;

    if (this.isBuilt) {
      this.ownedHexes.forEach((hex) => {
        Grid.map[[hex.x, hex.y]].drawBorders();
      });
    }
  }
  complete() {
    super.complete();
    this.ownedHexes.forEach((hex) => {
      Grid.map[[hex.x, hex.y]].hexOwner = this.ownerId;
      //Grid.map[[hex.x, hex.y]].displayHexOwnage();
    });
    this.ownedHexes.forEach((hex) => {
      Grid.map[[hex.x, hex.y]].drawBorders();
      Grid.map[[hex.x, hex.y]].updateNeighbours();
    });
    this.markNotAbleCityHexes();
  }
  grow(growHexCord) {
    super.grow();
    Grid.map[[growHexCord.x, growHexCord.y]].hexOwner = this.ownerId;
    //Grid.map[[growHexCord.x, growHexCord.y]].displayHexOwnage();
    Grid.map[[growHexCord.x, growHexCord.y]].drawBorders();
    Grid.map[[growHexCord.x, growHexCord.y]].updateNeighbours();
  }
  markNotAbleCityHexes() {
    let neighbours = getNeighbours(Object.assign({}, this.hexCord), 3);

    neighbours.forEach((hex) => {
      //console.log(hex);
      Grid.map[[hex.x, hex.y]].canBuildCity = false;
    });
  }
}

export default City;
