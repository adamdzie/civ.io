const Enums = require("./Enums.js");

class Serializer {
  static MovementInput(x, y) {
    let buffer = new ArrayBuffer(2);
    let view = new Int8Array(buffer);

    view[0] = x;
    view[1] = y;

    return buffer;
  }
  static Grid(width, height, edgeLength, map) {
    let map_size = width * height;
    let buffer_size = 6 + map_size * 4;
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
    return buffer;
  }
}

module.exports = Serializer;
