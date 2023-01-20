class Deserializer {
  static MovementInput(buffer) {
    let view = new Int8Array(buffer);

    return { x: view[0], y: view[1] };
  }
}
export default Deserializer;
