const City = require("./Buildings/City.js");
const Bank = require("./Buildings/Bank.js");
const Lab = require("./Buildings/Lab.js");
const House = require("./Buildings/House.js");
const Amphitheatre = require("./Buildings/Amphitheatre.js");
const Grid = require("./Grid.js");
const { sendToAll, sendToClient } = require("./Utils/Socket-io.js");
const Serializer = require("./Utils/Serializer.js");
const IDManager = require("./Utils/IDManager.js");
class Player {
  constructor(_x, _y, radius, move_speed, screenCenter, id) {
    this.initiated = false;
    this.id = id;
    this.position = { x: _x, y: _y };
    this.radius = radius;
    this.move_speed = move_speed;
    this.move_vector = { x: 0, y: 0 };
    this.isMoving = false;
    this.isRotating = false;
    this.mouse_position = { x: 0, y: 0 };
    this.rotation = 0;
    this.lastAngle = this.rotation;
    this.rotationThreshold = 0.1;
    this.screenCenter = { x: screenCenter.x, y: screenCenter.y };

    this.gold = 0;
    this.goldIncome = 0;
    this.science = 0;
    this.scienceIncome = 0;
    this.population = 0;
    this.populationIncome = 0;
    this.amenities = 0;

    this.cities = {};
    this.buildings = {};
  }

  update(delta) {
    this.updateMovement(delta);
    console.log(this.position);
  }
  day_update() {
    this.refreshResources();
  }
  refreshResources() {
    this.gold += this.goldIncome;
    this.science += this.scienceIncome;
    this.population += this.populationIncome;
  }
  move() {
    if (this.move_vector.x === 0 && this.move_vector.y === 0) {
      this.isMoving = false;
      return;
    }
    this.position.x += this.move_vector.x * this.move_speed;
    this.position.y += this.move_vector.y * this.move_speed;
  }
  rotate() {
    //console.log("MOUSE POS: " + this.mouse_position.x);
    //console.log("SCREEN POS: " + this.screenCenter.x);
    let a = {
      x: this.mouse_position.x - this.screenCenter.x,
      y: this.mouse_position.y - this.screenCenter.y,
    };
    //console.log(this.mouse_position.x + "," + this.mouse_position.y);

    let b = { x: 10, y: 0 };

    let angle =
      (a.x * b.x + a.y * b.y) /
      (Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2)) *
        Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2)));

    let good_angle = Math.acos(angle);

    if (this.screenCenter.y > this.mouse_position.y) good_angle *= -1;

    this.rotation = good_angle;
  }

  setIsMoving() {
    if (!(this.move_vector.x === 0 && this.move_vector.y === 0))
      this.isMoving = true;
  }
  setIsRotating() {
    this.isRotating = true;
  }
  build(hexCord, type) {
    Grid.map[[hexCord.x, hexCord.y]].building = type;
    if (type === 0) {
      this.cities[[hexCord.x, hexCord.y]] = new City(this.id, hexCord);
    } else if (type === 1) {
      this.buildings[[hexCord.x, hexCord.y]] = new Bank(this.id, hexCord);
    } else if (type === 2) {
      this.buildings[[hexCord.x, hexCord.y]] = new Lab(this.id, hexCord);
    } else if (type === 3) {
      this.buildings[[hexCord.x, hexCord.y]] = new House(this.id, hexCord);
    } else if (type === 4) {
      this.buildings[[hexCord.x, hexCord.y]] = new Amphitheatre(
        this.id,
        hexCord
      );
    }

    //console.log(this.buildings[[hexCord.x, hexCord.y]].hexCord);
  }
  amenitiesChangeCallback() {
    let _data = Serializer.Amenities(this.amenities);
    sendToClient("amenities", IDManager.ids[this.id], _data);
  }
  goldIncomeChangeCallback() {
    let _data = Serializer.Income(this.goldIncome);
    sendToClient("goldIncome", IDManager.ids[this.id], _data);
  }
  scienceIncomeChangeCallback() {
    let _data = Serializer.Income(this.scienceIncome);
    sendToClient("scienceIncome", IDManager.ids[this.id], _data);
  }
  populationIncomeChangeCallback() {
    let _data = Serializer.Income(this.populationIncome);
    sendToClient("populationIncome", IDManager.ids[this.id], _data);
  }
}

module.exports = Player;
