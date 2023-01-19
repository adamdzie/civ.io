const Constants = require("../Constants.js");
const Functions = require("../Functions.js");
const Grid = require("../Grid.js");
const { sendToAll } = require("../Utils/Socket-io.js");
const Storage = require("../Storage.js");

class Building {
  constructor(ownerId, hexCord, type) {
    this.ownerId = ownerId;
    this.hexCord = hexCord;
    this.type = type;

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
    console.log(
      Storage.PlayerList[this.ownerId].buildings[
        [this.hexCord.x, this.hexCord.y]
      ].isBuilt
    );
    sendToAll("Building_complete", this.hexCord);
    //console.log(this);
  }
  SendBuild() {}
}

module.exports = Building;
