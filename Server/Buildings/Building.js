const Constants = require("../Constants.js");
const Functions = require("../Functions.js");
const Grid = require("../Grid.js");
const { sendToAll } = require("../Utils/Socket-io.js");
const Storage = require("../Storage.js");
const Sender = require("../Utils/Sender.js");
const Serializer = require("../Utils/Serializer.js");

class Building {
  constructor(
    ownerId,
    hexCord,
    type,
    goldIncome,
    scienceIncome,
    populationIncome,
    amenities
  ) {
    this.ownerId = ownerId;
    this.hexCord = hexCord;
    this.type = type;

    //SET INCOME

    this.goldIncome = goldIncome;
    this.scienceIncome = scienceIncome;
    this.populationIncome = populationIncome;
    this.amenities = amenities;

    //this.hexWidth = map.map[[0, 0]].edgeLength * 2;
    //this.hexHeight = map.map[[0, 0]].h * 2;

    this.width = Constants.BUILDING_WIDTH;
    this.height = Constants.BUILDING_HEIGHT;

    this.isBuilt = false;

    let buildingCompletePercentage = 0;

    let buildTime = Constants.BUILD_TIME;

    let addPercent = Functions.getPercentageOf(
      Constants.REFRESH_INTERVAL / 1000,
      buildTime
    );

    let _buildInterval = setInterval(() => {
      if (buildingCompletePercentage + addPercent >= 100)
        buildingCompletePercentage = 100;

      if (buildingCompletePercentage === 100) {
        clearInterval(_buildInterval);
        this.BuildingComplete();
        return;
      }

      buildingCompletePercentage += addPercent;
    }, Constants.REFRESH_INTERVAL);
  }
  BuildingComplete() {
    this.isBuilt = true;

    //const cords = Object.assign({}, this.hexCord);
    let buffer = Serializer.BuildingComplete(this.hexCord);
    sendToAll("Building_complete", buffer);

    Storage.PlayerList[this.ownerId].goldIncome += this.goldIncome;
    if (this.goldIncome !== 0)
      Storage.PlayerList[this.ownerId].goldIncomeChangeCallback();
    Storage.PlayerList[this.ownerId].scienceIncome += this.scienceIncome;
    if (this.scienceIncome !== 0)
      Storage.PlayerList[this.ownerId].scienceIncomeChangeCallback();
    Storage.PlayerList[this.ownerId].populationIncome += this.populationIncome;
    if (this.populationIncome !== 0)
      Storage.PlayerList[this.ownerId].populationIncomeChangeCallback();
    Storage.PlayerList[this.ownerId].amenities += this.amenities;

    if (this.amenities !== 0)
      Storage.PlayerList[this.ownerId].amenitiesChangeCallback();
  }
  SendBuild() {}
  StartGrowing() {}
}

module.exports = Building;
