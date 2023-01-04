const Constants = require("./constants.js");
const Functions = require("./Functions.js");

class Hex {
  constructor(position, edgeLength, borderWidth, hexCord) {
    this.position = position;
    this.hexCord = hexCord;
    this.edgeLength = edgeLength;
    this.borderWidth = borderWidth;
    this.h = (this.edgeLength * Math.sqrt(3)) / 2;

    this.points = [
      this.position.x - this.edgeLength,
      this.position.y,
      this.position.x - this.edgeLength / 2,
      this.position.y - this.h,
      this.position.x + this.edgeLength / 2,
      this.position.y - this.h,
      this.position.x + this.edgeLength,
      this.position.y,
      this.position.x + this.edgeLength / 2,
      this.position.y + this.h,
      this.position.x - this.edgeLength / 2,
      this.position.y + this.h,
    ];

    this.neighbours = [];

    //EVEN
    if (this.hexCord.x % 2 === 0) {
      if (Functions.existOnMap(this.hexCord.x - 1, this.hexCord.y - 1))
        this.neighbours.push({ x: this.hexCord.x - 1, y: this.hexCord.y - 1 });
      else this.neighbours.push("none");

      if (Functions.existOnMap(this.hexCord.x, this.hexCord.y - 1))
        this.neighbours.push({ x: this.hexCord.x, y: this.hexCord.y - 1 });
      else this.neighbours.push("none");

      if (Functions.existOnMap(this.hexCord.x + 1, this.hexCord.y - 1))
        this.neighbours.push({ x: this.hexCord.x + 1, y: this.hexCord.y - 1 });
      else this.neighbours.push("none");

      if (Functions.existOnMap(this.hexCord.x + 1, this.hexCord.y))
        this.neighbours.push({
          x: this.hexCord.x + 1,
          y: this.hexCord.y,
        });
      else this.neighbours.push("none");

      if (Functions.existOnMap(this.hexCord.x, this.hexCord.y + 1))
        this.neighbours.push({ x: this.hexCord.x, y: this.hexCord.y + 1 });
      else this.neighbours.push("none");

      if (Functions.existOnMap(this.hexCord.x - 1, this.hexCord.y))
        this.neighbours.push({
          x: this.hexCord.x - 1,
          y: this.hexCord.y,
        });
      else this.neighbours.push("none");
    }
    //ODD
    else if (this.hexCord.x % 2 === 1) {
      if (Functions.existOnMap(this.hexCord.x - 1, this.hexCord.y))
        this.neighbours.push({
          x: this.hexCord.x - 1,
          y: this.hexCord.y,
        });
      else this.neighbours.push("none");

      if (Functions.existOnMap(this.hexCord.x, this.hexCord.y - 1))
        this.neighbours.push({ x: this.hexCord.x, y: this.hexCord.y - 1 });
      else this.neighbours.push("none");

      if (Functions.existOnMap(this.hexCord.x + 1, this.hexCord.y))
        this.neighbours.push({
          x: this.hexCord.x + 1,
          y: this.hexCord.y,
        });
      else this.neighbours.push("none");

      if (Functions.existOnMap(this.hexCord.x + 1, this.hexCord.y + 1))
        this.neighbours.push({ x: this.hexCord.x + 1, y: this.hexCord.y + 1 });
      else this.neighbours.push("none");

      if (Functions.existOnMap(this.hexCord.x, this.hexCord.y + 1))
        this.neighbours.push({ x: this.hexCord.x, y: this.hexCord.y + 1 });
      else this.neighbours.push("none");

      if (Functions.existOnMap(this.hexCord.x - 1, this.hexCord.y + 1))
        this.neighbours.push({ x: this.hexCord.x - 1, y: this.hexCord.y + 1 });
      else this.neighbours.push("none");
    }

    this.terrainType = "grass";
    this.terrainObstacle = "none";
    this.terrainResource = "none";
  }
}

module.exports = Hex;
