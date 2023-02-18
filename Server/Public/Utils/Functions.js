import Grid from "../Grid.js";

export function getQuantityString(value) {
  if (value <= 999) return value.toString();

  let final_string = "";
  if (value >= 1000) {
    let to_k = value / 1000;
    final_string = to_k.toString();
    if (final_string.length > 4 && to_k < 100) {
      final_string = final_string.slice(0, 4);
    } else {
      final_string = final_string.slice(0, 3);
    }
    final_string += "k";
  }
  return final_string;
}
export function getIncomeString(value) {}

export function existOnMap(x, y, width, height) {
  return x >= 0 && x < Grid.width && y >= 0 && y < Grid.height;
}

export function makeStruct(keys) {
  if (!keys) return null;
  const k = keys.split(", ");
  const count = k.length;

  /** @constructor */
  function constructor() {
    for (let i = 0; i < count; i++) this[k[i]] = arguments[i];
  }
  return constructor;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPercentageOf(number, of) {
  return Math.round((number / of) * 1000) / 10;
}

export function getNeighbours(hexCord, range) {
  let neighbours = [];

  for (let i = 1; i <= range; i++) {
    neighbours = neighbours.concat(getRing(Object.assign({}, hexCord), i));
  }

  return neighbours;
}

export function getRing(hexCord, range) {
  let odd = hexCord.x % 2 !== 0;

  let neighbours = [];
  //console.log(range);
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

  // console.log("Switch " + switchY);
  // console.log(hexCord);

  //SET POINTER ON LEFT DOWN HEX OF RING

  for (let i = 1; i <= range; i++) {
    if (switchY > 1) {
      pointer.y++;
      switchY = 0;
    }
    pointer.x--;
    switchY++;
  }

  // if (range === 3) {
  //   console.log("ON RANGE " + range);
  //   console.log(pointer);
  // }
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
  if (range === 3) {
    console.log("RING x: " + hexCord.x + " y: " + hexCord.y);
    console.log("RANGE: " + range);

    console.log(neighbours);
  }

  return neighbours;
}
