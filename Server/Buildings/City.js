const Building = require("./Building.js");
const Grid = require("../Grid.js");
const { sendToAll } = require("../Utils/Socket-io.js");
const Functions = require("../Functions.js");
const Sender = require("../Utils/Sender.js");
const Serializer = require("../Utils/Serializer.js");

class City extends Building {
  constructor(ownerId, hexCord) {
    super(ownerId, hexCord, 0, 1, 1, 1, 3);
    this.ownedHexes = [hexCord];
    this.time_growth = 20000;
    this.ownedHexes = this.ownedHexes.concat(
      Functions.getNeighbours(hexCord, 1)
    );
    this.first_ring = [];
    this.second_ring = [];

    this.SendBuild();
  }
  BuildingComplete() {
    super.BuildingComplete();

    this.ownedHexes.forEach((hex) => {
      Grid.map[[hex.x, hex.y]].hexOwner = this.ownerId;
    });
    this.MarkNotAbleCityHexes();
    this.initialize();
    this.StartGrowing();
  }
  SendBuild() {
    let _data = Serializer.Build(this.ownerId, this.type, this.hexCord);
    sendToAll("build", _data);
  }
  initialize() {
    let cords = Object.assign({}, this.hexCord);
    this.first_ring = Functions.getRing(cords, 2);
    cords = Object.assign({}, this.hexCord);
    this.second_ring = Functions.getRing(cords, 3);
    console.log("LENG " + this.second_ring.length);
  }
  StartGrowing() {
    super.StartGrowing();
    console.log("IN START GROWING: " + this.hexCord.x + "," + this.hexCord.y);
    this._cityGrow = setInterval(() => {
      if (this.first_ring.length > 0) {
        let hexToGrow = Functions.getRandomInteger(
          0,
          this.first_ring.length - 1
        );
        let growHexCord = this.first_ring[hexToGrow];

        this.ownedHexes.push(growHexCord);
        Grid.map[[growHexCord.x, growHexCord.y]].ownerId = this.ownerId;

        let data = Serializer.CityGrow(this.hexCord, growHexCord);

        sendToAll("city_grow", data);

        delete this.first_ring[hexToGrow];
        this.first_ring = this.first_ring.filter(Object);
      } else if (this.second_ring.length > 0) {
        let hexToGrow = Functions.getRandomInteger(
          0,
          this.second_ring.length - 1
        );
        let growHexCord = this.second_ring[hexToGrow];

        this.ownedHexes.push(growHexCord);
        Grid.map[[growHexCord.x, growHexCord.y]].ownerId = this.ownerId;

        let data = Serializer.CityGrow(this.hexCord, growHexCord);

        sendToAll("city_grow", data);

        delete this.second_ring[hexToGrow];
        this.second_ring = this.second_ring.filter(Object);
      } else {
        clearInterval(this._cityGrow);
        this._cityGrow = null;
      }
    }, this.time_growth);
  }
  MarkNotAbleCityHexes() {
    let neighbours = Functions.getNeighbours(
      Object.assign({}, this.hexCord),
      3
    );
    neighbours.forEach((hexCord) => {
      Grid.map[[hexCord.x, hexCord.y]].canBuildCity = false;
    });
  }
}

module.exports = City;
