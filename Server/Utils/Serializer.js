class Serializer {
  static MovementInput(x, y) {
    let buffer = new ArrayBuffer(2);
    let view = new Int8Array(buffer);

    view[0] = x;
    view[1] = y;

    return buffer;
  }
}

module.exports = Serializer;
