const Constants = require("./Constants.js");
const Functions = require("./Functions.js");
var SAT = require("sat");
const IDManager = require("./Utils/IDManager.js");
class Hex {
  constructor(position, edgeLength, borderWidth, hexCord) {
    this.position = position;
    this.hexCord = hexCord;
    this.edgeLength = edgeLength;
    this.borderWidth = borderWidth;
    this.h = (this.edgeLength * Math.sqrt(3)) / 2;
    this.canBuildCity = true;

    this.points = this.setPoints();

    this.neighbours = [];

    this.setNeighbours();

    this.collider = new SAT.Polygon(new SAT.Vector(0, 0), [
      new SAT.Vector(this.points[0], this.points[1]),
      new SAT.Vector(this.points[2], this.points[3]),
      new SAT.Vector(this.points[4], this.points[5]),
      new SAT.Vector(this.points[6], this.points[7]),
      new SAT.Vector(this.points[8], this.points[9]),
      new SAT.Vector(this.points[10], this.points[11]),
    ]);

    this.terrainType = "grass";
    this.allowMove = true;
    this.terrainObstacle = "none";
    this.terrainResource = "none";
    this.building = "none";
    this.hexOwner = 0;
    this.colliderId = IDManager.getColliderId();
  }

  setNeighbours() {
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
  }
  setPoints() {
    return [
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
  }
  allowToMove() {
    if (
      this.terrainType === "ocean" ||
      this.terrainType === "mountain" ||
      this.terrainType === "lake"
    ) {
      this.allowMove = false;
    }
  }
  IsCollide() {}
}

module.exports = Hex;

// this.points = [
//   this.position.x - this.edgeLength,
//   this.position.y,
//   this.position.x - this.edgeLength / 2,
//   this.position.y - this.h,
//   this.position.x + this.edgeLength / 2,
//   this.position.y - this.h,
//   this.position.x + this.edgeLength,
//   this.position.y,
//   this.position.x + this.edgeLength / 2,
//   this.position.y + this.h,
//   this.position.x - this.edgeLength / 2,
//   this.position.y + this.h,
// ];
