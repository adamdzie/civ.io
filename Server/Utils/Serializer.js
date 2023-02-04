const Enums = require("./Enums.js");

class Serializer {
  static MovementInput(x, y) {
    let buffer = new ArrayBuffer(2);
    let view = new Int8Array(buffer);

    view[0] = x;
    view[1] = y;

    return buffer;
  }
  static Initialize(width, height, edgeLength, map, players, id) {
    let cities = [];
    let buildings = [];
    let players_length = 0;

    for (let key in players) {
      players_length++;
      for (let city_key in players[key].cities) {
        cities.push(players[key].cities[city_key]);
      }

      for (let building_key in players[key].buildings) {
        buildings.push(players[key].buildings[building_key]);
      }
    }
    let cords_length = 0;
    cities.forEach((city) => {
      cords_length += city.ownedHexes.length;
    });

    let map_size = width * height;
    let buffer_size =
      6 +
      map_size * 4 +
      4 +
      5 * cities.length +
      2 * cords_length +
      4 * buildings.length +
      1 +
      13 * players_length +
      1;

    let buffer = new ArrayBuffer(buffer_size);

    let dataview = new DataView(buffer);

    dataview.setUint16(0, width);
    dataview.setUint16(2, height);
    dataview.setUint16(4, edgeLength);

    let i = 0;
    let j = 0;
    let pointer = 6;
    while (i < width) {
      dataview.setUint8(pointer, Enums.terrain[map[[i, j]].terrainType]);
      pointer++;
      dataview.setUint8(pointer, Enums.obstacle[map[[i, j]].terrainObstacle]);
      pointer++;
      dataview.setUint8(pointer, Enums.resource[map[[i, j]].terrainResource]);
      pointer++;
      dataview.setUint8(pointer, map[[i, j]].hexOwner);
      pointer++;
      j++;
      if (j >= height) {
        j = 0;
        i++;
      }
    }

    dataview.setUint16(pointer, cities.length);
    pointer += 2;
    dataview.setUint16(pointer, buildings.length);
    pointer += 2;

    cities.forEach((city) => {
      dataview.setUint8(pointer, city.ownerId);
      pointer++;
      dataview.setUint8(pointer, city.hexCord.x);
      pointer++;
      dataview.setUint8(pointer, city.hexCord.y);
      pointer++;
      dataview.setUint8(pointer, city.isBuilt);
      pointer++;
      dataview.setUint8(pointer, city.ownedHexes.length);
      pointer++;

      city.ownedHexes.forEach((hexCord) => {
        dataview.setUint8(pointer, hexCord.x);
        pointer++;
        dataview.setUint8(pointer, hexCord.y);
        pointer++;
      });
    });

    console.log("CITIES LENGTH: " + cities.length);

    buildings.forEach((building) => {
      dataview.setUint8(pointer, building.ownerId);
      pointer++;
      dataview.setUint8(pointer, building.hexCord.x);
      pointer++;
      dataview.setUint8(pointer, building.hexCord.y);
      pointer++;
      dataview.setUint8(pointer, building.isBuilt);
      pointer++;
    });

    dataview.setUint8(pointer, players_length);
    pointer++;

    for (let key in players) {
      dataview.setUint8(pointer, players[key].id);
      pointer++;
      dataview.setFloat32(pointer, players[key].position.x);
      pointer += 4;
      dataview.setFloat32(pointer, players[key].position.y);
      pointer += 4;
      dataview.setFloat32(pointer, players[key].rotation);
      pointer += 4;
    }

    dataview.setUint8(pointer, id);
    return buffer;
  }
  static AddPlayer(id, position, rotation) {
    let buffer = new ArrayBuffer(13);

    let dataview = new DataView(buffer);

    dataview.setUint8(0, id);
    dataview.setFloat32(1, position.x);
    dataview.setFloat32(5, position.y);
    dataview.setFloat32(9, rotation);

    return buffer;
  }
  static Rotation(id, time, rotation) {
    let buffer = new ArrayBuffer(13);

    let dataview = new DataView(buffer);

    dataview.setUint8(0, id);
    dataview.setFloat64(1, time);
    dataview.setFloat32(9, rotation);
    return buffer;
  }
  static Movement(id, time, position) {
    let buffer = new ArrayBuffer(17);

    let dataview = new DataView(buffer);

    dataview.setUint8(0, id);
    dataview.setFloat64(1, time);
    dataview.setFloat32(9, position.x);
    dataview.setFloat32(13, position.y);

    return buffer;
  }
  static Build(id, type, hexCord) {
    let buffer = new ArrayBuffer(4);

    let dataview = new DataView(buffer);

    dataview.setUint8(0, id);
    dataview.setUint8(1, type);
    dataview.setUint8(2, hexCord.x);
    dataview.setUint8(3, hexCord.y);

    return buffer;
  }
  static BuildingComplete(hexCord) {
    let buffer = new ArrayBuffer(2);

    let dataview = new DataView(buffer);

    dataview.setUint8(0, hexCord.x);
    dataview.setUint8(1, hexCord.y);

    return buffer;
  }
  static CityGrow(hexCord, growHexCord) {
    let buffer = new ArrayBuffer(4);

    let dataview = new DataView(buffer);

    dataview.setUint8(0, hexCord.x);
    dataview.setUint8(1, hexCord.y);
    dataview.setUint8(2, growHexCord.x);
    dataview.setUint8(3, growHexCord.y);

    return buffer;
  }
  static Resources(gold, science, population) {
    let buffer = new ArrayBuffer(12);

    let dataview = new DataView(buffer);

    dataview.setInt32(0, gold);
    dataview.setInt32(4, science);
    dataview.setInt32(8, population);

    return buffer;
  }
  static Amenities(amenities) {
    let buffer = new ArrayBuffer(2);

    let dataview = new DataView(buffer);

    dataview.setInt16(0, amenities);

    return buffer;
  }
  static Income(income) {
    let buffer = new ArrayBuffer(4);

    let dataview = new DataView(buffer);

    dataview.setInt32(0, income);

    return buffer;
  }
}

module.exports = Serializer;
