const SAT = require("sat");
const Functions = require("../Functions.js");
class CollisionRoom {
  constructor(neighbours, collider) {
    this.active_room = false;
    this.neighbours = neighbours;
    this.collider = collider;
    //this.hex = hex;
    this.objects = {};
    this.static_objects = {};
  }
  Add(obj) {
    this.objects[obj.colliderId] = obj;
    return true;
  }
  AddStaticObject(obj) {
    this.static_objects[obj.colliderId] = obj;
  }
  Remove(obj) {
    delete this.objects[obj.colliderId];
    if (!this.isActive()) this.active_room = false;
    return this.active_room;
  }
  RemoveStaticObject(obj) {
    delete this.static_objects[obj.colliderId];
  }
  isActive() {
    return Object.keys(this.objects).length > 0;
  }
}

module.exports = CollisionRoom;
