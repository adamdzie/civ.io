const Constants = require("./Constants.js");
const SAT = require("sat");
function checkWithRoomCollision(a, b) {
  if (a.constructor.name === "Vector") {
    return SAT.pointInPolygon(a, b);
  } else {
    return SAT.pointInPolygon(a.pos, b);
  }
}

function existOnMap(x, y) {
  return (
    x >= 0 && x < Constants.MAP_WIDTH && y >= 0 && y < Constants.MAP_HEIGHT
  );
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPercentageOf(number, of) {
  return Math.round((number / of) * 1000) / 10;
}

function getNeighbours(hexCord, range) {
  neighbours = [];

  for (let i = 1; i <= range; i++) {
    neighbours = neighbours.concat(getRing(hexCord, i));
  }

  return neighbours;
}

function getRing(hexCord, range) {
  let odd = hexCord.x % 2 !== 0;

  let neighbours = [];

  if (range === 1) {
    if (odd) {
      if (existOnMap(hexCord.x - 1, hexCord.y + 1))
        neighbours.push({ x: hexCord.x - 1, y: hexCord.y + 1 });
      if (existOnMap(hexCord.x, hexCord.y + 1))
        neighbours.push({ x: hexCord.x, y: hexCord.y + 1 });
      if (existOnMap(hexCord.x + 1, hexCord.y + 1))
        neighbours.push({ x: hexCord.x + 1, y: hexCord.y + 1 });
      if (existOnMap(hexCord.x + 1, hexCord.y))
        neighbours.push({ x: hexCord.x + 1, y: hexCord.y });
      if (existOnMap(hexCord.x, hexCord.y - 1))
        neighbours.push({ x: hexCord.x, y: hexCord.y - 1 });
      if (existOnMap(hexCord.x - 1, hexCord.y))
        neighbours.push({ x: hexCord.x - 1, y: hexCord.y });
    } else {
      if (existOnMap(hexCord.x - 1, hexCord.y))
        neighbours.push({ x: hexCord.x - 1, y: hexCord.y });
      if (existOnMap(hexCord.x, hexCord.y + 1))
        neighbours.push({ x: hexCord.x, y: hexCord.y + 1 });
      if (existOnMap(hexCord.x + 1, hexCord.y))
        neighbours.push({ x: hexCord.x + 1, y: hexCord.y });
      if (existOnMap(hexCord.x + 1, hexCord.y - 1))
        neighbours.push({ x: hexCord.x + 1, y: hexCord.y - 1 });
      if (existOnMap(hexCord.x, hexCord.y - 1))
        neighbours.push({ x: hexCord.x, y: hexCord.y - 1 });
      if (existOnMap(hexCord.x - 1, hexCord.y - 1))
        neighbours.push({ x: hexCord.x - 1, y: hexCord.y - 1 });
    }
    return neighbours;
  }
  let pointer = hexCord;

  //ADD TO ARRAY BORDER HEX AT TOP AND BOTTOM

  neighbours.push({ x: pointer.x, y: pointer.y - range });
  neighbours.push({ x: pointer.x, y: pointer.y + range });

  let switchY;

  if (odd) switchY = 2;
  else switchY = 1;

  //SET POINTER ON LEFT DOWN HEX OF RING

  for (let i = 1; i <= range; i++) {
    if (switchY > 1) {
      pointer.y++;
      switchY = 0;
    }
    pointer.x--;
    switchY++;
  }

  //GET HEXES ON LEFT EDGE
  let leftEdge = [];
  for (let i = 0; i < range + 1; i++) {
    leftEdge.push({ x: pointer.x, y: pointer.y - i });
  }

  //GET HEXES ON LEFT BOTTOM EDGE
  let bottomLeftEdge = [];

  for (let i = 0; i < range - 1; i++) {
    if (switchY > 1) {
      pointer.y++;
      switchY = 0;
    }
    pointer.x++;
    switchY++;

    bottomLeftEdge.push({ x: pointer.x, y: pointer.y });
  }

  //HEX MIRROR

  let rightEdge = [];
  const widthRange = range * 2;
  leftEdge.forEach((element) => {
    rightEdge.push({ x: element.x + widthRange, y: element.y });
  });

  let topLeftEdge = [];

  let heightRange = range + 1;

  bottomLeftEdge.forEach((element) => {
    topLeftEdge.push({ x: element.x, y: element.y - heightRange });
    heightRange++;
  });

  let topRightEdge = [];
  let width_x = 2;
  for (let i = topLeftEdge.length - 1; i >= 0; i--) {
    let element = topLeftEdge[i];
    topRightEdge.push({ x: element.x + width_x, y: element.y });
    width_x += 2;
  }

  width_x = 2;
  let bottomRightEdge = [];
  for (let i = bottomLeftEdge.length - 1; i >= 0; i--) {
    let element = bottomLeftEdge[i];
    bottomRightEdge.push({ x: element.x + width_x, y: element.y });
    width_x += 2;
  }

  neighbours = neighbours.concat(
    leftEdge,
    rightEdge,
    bottomLeftEdge,
    bottomRightEdge,
    topRightEdge,
    topLeftEdge
  );

  for (let i = 0; i < neighbours.length; i++) {
    if (!existOnMap(neighbours[i].x, neighbours[i].y)) delete neighbours[i];
  }

  neighbours = neighbours.filter(Object);

  return neighbours;
}

module.exports = {
  existOnMap,
  getRandomInteger,
  getPercentageOf,
  getRing,
  getNeighbours,
  checkWithRoomCollision,
};
