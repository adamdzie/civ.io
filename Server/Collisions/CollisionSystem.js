//NOTE: MAY BY UPGRADED TO AABB TREE

const Grid = require("../Grid.js");
const CollisionRoom = require("./CollisionRoom.js");
const SAT = require("sat");
const Functions = require("../Functions.js");
class CollisionSystem {
  constructor() {
    this.collisionRooms = {};
    this.active_rooms = {};
    this.pairs_to_check = {};

    for (let i = 0; i < Grid.width; i++) {
      for (let j = 0; j < Grid.height; j++) {
        this.collisionRooms[[i, j]] = new CollisionRoom(
          Grid.map[[i, j]].neighbours,
          Grid.map[[i, j]].collider
        );
        this.addStaticToRoom({ x: i, y: j }, Grid.map[[i, j]]);
      }
    }
  }
  Update() {
    let time1 = Date.now();
    this.CheckObjectsInRooms();
    this.GetPossibleCollisions();
    this.CheckCollisions();
    let time2 = Date.now();

    //console.log("TIME: " + (time2 - time1));
  }
  addToRoom(roomCord, obj) {
    this.collisionRooms[[roomCord.x, roomCord.y]].active_room = true;
    this.collisionRooms[[roomCord.x, roomCord.y]].Add(obj);
    this.active_rooms[[roomCord.x, roomCord.y]] =
      this.collisionRooms[[roomCord.x, roomCord.y]];
  }
  removeFromRoom(key, obj) {
    this.collisionRooms[key].active_room = this.collisionRooms[key].Remove(obj);

    if (!this.collisionRooms[key].active_room) {
      delete this.active_rooms[key];
    }
  }
  addStaticToRoom(roomCord, obj) {
    this.collisionRooms[[roomCord.x, roomCord.y]].AddStaticObject(obj);
  }
  removeStaticFromRoom(key, obj) {
    this.collisionRooms[key].RemoveStaticObject(obj);
  }
  CheckObjectsInRooms() {
    for (let key in this.active_rooms) {
      for (let s_key in this.active_rooms[key].objects) {
        if (
          Functions.checkWithRoomCollision(
            this.active_rooms[key].objects[s_key].collider,
            this.active_rooms[key].collider
          ) === false
        ) {
          for (let z = 0; z < this.active_rooms[key].neighbours.length; z++) {
            let cord = this.active_rooms[key].neighbours[z];
            if (cord !== "none") {
              if (
                Functions.checkWithRoomCollision(
                  this.active_rooms[key].objects[s_key].collider,
                  this.collisionRooms[[cord.x, cord.y]].collider
                )
              ) {
                this.addToRoom(cord, this.collisionRooms[key].objects[s_key]);
                this.removeFromRoom(
                  key,
                  this.collisionRooms[key].objects[s_key]
                );

                break;
              }
            }
          }
        }
      }
    }
  }
  GetPossibleCollisions() {
    this.pairs_to_check = {};
    this.room_checked = {};
    for (let key in this.active_rooms) {
      for (let s_key in this.collisionRooms[key].objects) {
        // this.collisionRooms[key].objects[s_key].IsCollide(
        //   this.collisionRooms[key].hex
        // );
        for (let local_key in this.collisionRooms[key].objects) {
          if (local_key === s_key) continue;

          if (s_key > local_key) {
            if (this.pairs_to_check[[local_key, s_key]] != null) continue;
            this.pairs_to_check[[local_key, s_key]] = {
              obj_1: this.collisionRooms[key].objects[s_key],
              obj_2: this.collisionRooms[key].objects[local_key],
            };
          } else {
            if (this.pairs_to_check[[s_key, local_key]] != null) continue;
            this.pairs_to_check[[s_key, local_key]] = {
              obj_1: this.collisionRooms[key].objects[local_key],
              obj_2: this.collisionRooms[key].objects[s_key],
            };
          }
        }
        for (let local_key in this.collisionRooms[key].static_objects) {
          if (s_key > local_key) {
            if (this.pairs_to_check[[local_key, s_key]] != null) continue;
            this.pairs_to_check[[local_key, s_key]] = {
              obj_1: this.collisionRooms[key].objects[s_key],
              obj_2: this.collisionRooms[key].static_objects[local_key],
            };
          } else {
            if (this.pairs_to_check[[s_key, local_key]] != null) continue;
            this.pairs_to_check[[s_key, local_key]] = {
              obj_1: this.collisionRooms[key].static_objects[local_key],
              obj_2: this.collisionRooms[key].objects[s_key],
            };
          }
        }

        for (let i = 0; i < this.collisionRooms[key].neighbours.length; i++) {
          if (this.collisionRooms[key].neighbours[i] !== "none") {
            let cord = this.collisionRooms[key].neighbours[i];
            if (
              this.room_checked[[cord.x, cord.y]] != true ||
              this.collisionRooms[[cord.x, cord.y]].active_room === false
            ) {
              //console.log("ERR");
            } else {
              for (let local_key in this.collisionRooms[[cord.x, cord.y]]
                .objects) {
                if (s_key > local_key) {
                  this.pairs_to_check[[local_key, s_key]] = {
                    obj_1: this.collisionRooms[key].objects[s_key],
                    obj_2:
                      this.collisionRooms[[cord.x, cord.y]].objects[local_key],
                  };
                } else {
                  this.pairs_to_check[[s_key, local_key]] = {
                    obj_1:
                      this.collisionRooms[[cord.x, cord.y]].objects[local_key],
                    obj_2: this.collisionRooms[key].objects[s_key],
                  };
                }
              }
            }
            for (let local_key in this.collisionRooms[[cord.x, cord.y]]
              .static_objects) {
              if (s_key > local_key) {
                this.pairs_to_check[[local_key, s_key]] = {
                  obj_1: this.collisionRooms[key].objects[s_key],
                  obj_2:
                    this.collisionRooms[[cord.x, cord.y]].static_objects[
                      local_key
                    ],
                };
              } else {
                this.pairs_to_check[[s_key, local_key]] = {
                  obj_1:
                    this.collisionRooms[[cord.x, cord.y]].static_objects[
                      local_key
                    ],
                  obj_2: this.collisionRooms[key].objects[s_key],
                };
              }
            }
          }
        }
      }
      this.room_checked[key] = true;
    }
  }
  CheckCollisions() {
    for (let key in this.pairs_to_check) {
      if (
        Functions.checkCollision(
          this.pairs_to_check[key].obj_1.collider,
          this.pairs_to_check[key].obj_2.collider
        )
      ) {
        this.pairs_to_check[key].obj_1.IsCollide(
          this.pairs_to_check[key].obj_2
        );
        this.pairs_to_check[key].obj_2.IsCollide(
          this.pairs_to_check[key].obj_1
        );
      }
    }
  }
}

const singletonInstance = new CollisionSystem();
module.exports = singletonInstance;
