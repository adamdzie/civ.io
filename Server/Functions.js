const Constants = require("./constants.js");

function existOnMap(x, y) {
  return (
    x >= 0 && x < Constants.MAP_WIDTH && y >= 0 && y < Constants.MAP_HEIGHT
  );
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  existOnMap,
  getRandomInteger,
};
