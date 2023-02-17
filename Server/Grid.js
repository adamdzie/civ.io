const Hex = require("./Hex.js");
const Constants = require("./Constants.js");
const Functions = require("./Functions.js");

class Grid {
  constructor(width, height, edgeLength, borderWidth) {
    //console.log(Functions.getRing({ x: 4, y: 4 }, 2));
    this.map = {};
    this.width = width;
    this.height = height;
    this.edgeLength = edgeLength;
    this.borderWidth = borderWidth;
    this.h = Math.floor((this.edgeLength * Math.sqrt(3)) / 2);
    let isOffset = false;
    let offset = 0;
    this.tempos = 10;
    // snow, desert, grass,

    //initiate map

    let isOdd = false;

    // for (let i = 0; i < this.width; i++) {
    //   if (isOffset) offset = this.h;
    //   else offset = 0;

    //   for (let j = 0; j < this.height; j++) {
    //     // if (i > 0) {
    //     this.map[[i, j]] = new Hex(
    //       {
    //         //x: i * this.edgeLength * 1.5 - 2 * i,
    //         x: i * this.edgeLength * 1.5 - i,
    //         y: j * this.h * 2 + offset,
    //       },
    //       this.edgeLength,
    //       this.borderWidth,
    //       { x: i, y: j }
    //     );
    //   }
    //   isOffset = !isOffset;
    // }

    for (let i = 0; i < this.width; i++) {
      if (isOffset) offset = this.h;
      else offset = 0;

      for (let j = 0; j < this.height; j++) {
        // if (j < 3) {
        //   console.log(
        //     "POS: " + i * this.edgeLength * 1.5 + ";" + j * this.h * 2 + offset
        //   );
        // }
        this.map[[i, j]] = new Hex(
          {
            //x: i * this.edgeLength * 1.5 - 2 * i,
            x: i * this.edgeLength * 1.5,
            y: j * this.h * 2 + offset,
          },
          this.edgeLength,
          this.borderWidth,
          { x: i, y: j }
        );
      }
      isOffset = !isOffset;
    }

    //generate snow guaranted layers

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < Constants.GUARANTED_SNOW_LAYER; j++) {
        this.map[[i, j]].terrainType = "snow";
      }
    }

    for (let i = 0; i < this.width; i++) {
      for (
        let j = this.height - 1;
        this.height - Constants.GUARANTED_SNOW_LAYER - 1 < j;
        j--
      ) {
        this.map[[i, j]].terrainType = "snow";
      }
    }

    //generate additional random snow

    let count1 = 0;

    for (
      let j = Constants.GUARANTED_SNOW_LAYER;
      j < Constants.MAX_SNOW_HEX;
      j++
    ) {
      for (let i = 0; i < this.width; i++) {
        if (
          this.findTerrainNeighborhood("snow", { x: i, y: j }, 1) * 20 >=
          Functions.getRandomInteger(1, 100)
        ) {
          count1++;
          this.map[[i, j]].terrainType = "snow";
        }
      }
    }
    let count2 = 0;
    for (
      let j = this.height - Constants.GUARANTED_SNOW_LAYER - 1;
      this.height - Constants.MAX_SNOW_HEX - 2 <= j;
      j--
    ) {
      for (let i = 0; i < this.width; i++) {
        if (
          this.findTerrainNeighborhood("snow", { x: i, y: j }, 1) * 20 >=
          Functions.getRandomInteger(1, 100)
        ) {
          count2++;
          this.map[[i, j]].terrainType = "snow";
        }
      }
    }

    //------------------//
    //Generate ocean
    //------------------//

    let oceanCount = Constants.GUARANTED_OCEAN;

    let oceanTopRandom = Math.round(
      (Constants.MAP_WIDTH * Constants.MAP_HEIGHT) / 1000
    );

    //oceanCount += Functions.getRandomInteger(0, oceanTopRandom);
    oceanCount = 2;

    for (let z = 0; z < oceanCount; z++) {
      let random_ocean_x = Functions.getRandomInteger(
        z * Math.round(Constants.MAP_WIDTH / oceanCount),
        z * Math.round(Constants.MAP_WIDTH / oceanCount) +
          Math.round(Constants.MAP_WIDTH / oceanCount)
      );
      let random_ocean_y = Functions.getRandomInteger(
        Constants.MAX_SNOW_HEX,
        Constants.MAP_HEIGHT - Constants.MAX_SNOW_HEX
      );

      this.map[[random_ocean_x, random_ocean_y]].terrainType = "ocean";
      //console.log(random_ocean_x + " " + random_ocean_y);

      let ocean_scalar = Functions.getRandomInteger(100, 120);
      while (ocean_scalar > 0) {
        let chance = 100;

        if (ocean_scalar < 10) chance = 30;

        let hex = this.map[[random_ocean_x, random_ocean_y]];

        for (let i = 0; i < 6; i++) {
          if (
            chance > Functions.getRandomInteger(1, 100) &&
            hex.neighbours[i] !== "none" &&
            this.map[[hex.neighbours[i].x, hex.neighbours[i].y]].terrainType !==
              "snow"
          )
            this.map[[hex.neighbours[i].x, hex.neighbours[i].y]].terrainType =
              "ocean";
        }

        let round = 100;
        while (round > 0) {
          let rand = Functions.getRandomInteger(0, 5);
          if (
            hex.neighbours[rand] !== "none" &&
            this.map[[hex.neighbours[rand].x, hex.neighbours[rand].y]]
              .terrainType === "ocean"
          ) {
            random_ocean_x = hex.neighbours[rand].x;
            random_ocean_y = hex.neighbours[rand].y;
            break;
          }
          round--;
        }
        ocean_scalar--;
      }
    }

    //------------------//
    //GENERATE LAKES
    //------------------//

    for (let i = 0; i < Constants.MAP_HEIGHT; i++) {
      for (let j = 0; j < Constants.MAP_WIDTH; j++) {
        if (
          this.findTerrainNeighborhood("ocean", { x: j, y: i }, 1) === 0 &&
          this.findTerrainNeighborhood("lake", { x: j, y: i }, 1) === 0
        ) {
          if (Functions.getRandomInteger(1, 100) <= Constants.LAKE_CHANCE) {
            this.map[[j, i]].terrainType = "lake";

            let lake_shake = Functions.getRandomInteger(2, 5);
            let selected_hex = this.map[[j, i]];

            while (lake_shake > 0) {
              for (let z = 0; z < 6; z++) {
                if (
                  selected_hex.neighbours[z] !== "none" &&
                  this.map[
                    [selected_hex.neighbours[z].x, selected_hex.neighbours[z].y]
                  ].terrainType !== "ocean" &&
                  this.map[
                    [selected_hex.neighbours[z].x, selected_hex.neighbours[z].y]
                  ].terrainType !== "snow" &&
                  this.map[
                    [selected_hex.neighbours[z].x, selected_hex.neighbours[z].y]
                  ].terrainType !== "lake" &&
                  this.findTerrainNeighborhood(
                    "ocean",
                    {
                      x: selected_hex.neighbours[z].x,
                      y: selected_hex.neighbours[z].y,
                    },
                    1
                  ) === 0
                ) {
                  if (
                    Functions.getRandomInteger(1, 100) <=
                    Constants.LAKE_HEX_CHANCE
                  ) {
                    this.map[
                      [
                        selected_hex.neighbours[z].x,
                        selected_hex.neighbours[z].y,
                      ]
                    ].terrainType = "lake";
                    selected_hex =
                      this.map[
                        [
                          selected_hex.neighbours[z].x,
                          selected_hex.neighbours[z].y,
                        ]
                      ];
                    break;
                  }
                }
              }
              lake_shake--;
            }
          }
        }
      }
    }

    //------------------//
    //GENERATE MOUNTAINS
    //------------------//

    for (let i = 0; i < Constants.MAP_HEIGHT; i++) {
      for (let j = 0; j < Constants.MAP_WIDTH; j++) {
        if (
          this.map[[j, i]].terrainType !== "ocean" &&
          this.map[[j, i]].terrainType !== "lake"
        ) {
          if (Functions.getRandomInteger(1, 100) <= Constants.MOUNTAIN_CHANCE) {
            this.map[[j, i]].terrainType = "mountain";

            let mountain_shake = Functions.getRandomInteger(2, 5);
            let selected_hex = this.map[[j, i]];

            while (mountain_shake > 0) {
              for (let z = 0; z < 6; z++) {
                if (
                  selected_hex.neighbours[z] !== "none" &&
                  this.map[
                    [selected_hex.neighbours[z].x, selected_hex.neighbours[z].y]
                  ].terrainType !== "ocean" &&
                  this.map[
                    [selected_hex.neighbours[z].x, selected_hex.neighbours[z].y]
                  ].terrainType !== "lake" &&
                  this.map[
                    [selected_hex.neighbours[z].x, selected_hex.neighbours[z].y]
                  ].terrainType !== "mountain"
                ) {
                  if (
                    Functions.getRandomInteger(1, 100) <=
                    Constants.MOUNTAIN_HEX_CHANCE
                  ) {
                    this.map[
                      [
                        selected_hex.neighbours[z].x,
                        selected_hex.neighbours[z].y,
                      ]
                    ].terrainType = "mountain";
                    selected_hex =
                      this.map[
                        [
                          selected_hex.neighbours[z].x,
                          selected_hex.neighbours[z].y,
                        ]
                      ];
                    break;
                  }
                }
              }
              mountain_shake--;
            }
          }
        }
      }
    }

    //------------------//
    //GENERATE RESOURCES
    //------------------//

    for (let i = 0; i < Constants.MAP_HEIGHT; i++) {
      for (let j = 0; j < Constants.MAP_WIDTH; j++) {
        if (Functions.getRandomInteger(1, 100) <= Constants.RESOURCE_CHANCE) {
          if (this.map[[j, i]].terrainType === "snow") {
            let rand = Functions.getRandomInteger(
              0,
              Constants.SNOW_RESOURCE.length - 1
            );
            this.map[[j, i]].terrainResource = Constants.SNOW_RESOURCE[rand];
          } else if (this.map[[j, i]].terrainType === "grass") {
            let rand = Functions.getRandomInteger(
              0,
              Constants.GRASS_RESOURCE.length - 1
            );
            this.map[[j, i]].terrainResource = Constants.GRASS_RESOURCE[rand];
          } else if (
            this.map[[j, i]].terrainType === "ocean" ||
            this.map[[j, i]].terrainType === "lake"
          ) {
            let rand = Functions.getRandomInteger(
              0,
              Constants.WATER_RESOURCE.length - 1
            );
            this.map[[j, i]].terrainResource = Constants.WATER_RESOURCE[rand];
          } else if (this.map[[j, i]].terrainType === "mountain") {
            let rand = Functions.getRandomInteger(
              0,
              Constants.MOUNTAIN_RESOURCE.length - 1
            );
            this.map[[j, i]].terrainResource =
              Constants.MOUNTAIN_RESOURCE[rand];
          }
        }
      }
    }

    for (let i = 0; i < Constants.MAP_HEIGHT; i++) {
      for (let j = 0; j < Constants.MAP_WIDTH; j++) {
        this.map[[i, j]].allowToMove();
      }
    }
  }

  findTerrainNeighborhood(terrainType, hexPosition, distance) {
    let counter = 0;

    if (
      hexPosition.x >= this.width ||
      hexPosition.x < 0 ||
      hexPosition.y >= this.height ||
      hexPosition.y < 0
    )
      return console.log("THIS POINT NOT EXIST ON GRID");

    if (distance === 0) return counter;

    if (distance === 1) {
      for (
        let i = hexPosition.y - distance;
        i <= hexPosition.y + distance;
        i++
      ) {
        if (i === 0) continue;
        if (Functions.existOnMap(0, i)) {
          if (this.map[[0, i]].terrainType === terrainType) counter++;
        }
      }
      //ODD
      if (hexPosition.x % 2 === 1) {
        for (let i = hexPosition.y; i <= hexPosition.y + distance; i++) {
          if (Functions.existOnMap(hexPosition.x - 1, i))
            if (this.map[[hexPosition.x - 1, i]].terrainType === terrainType)
              counter++;
          if (Functions.existOnMap(hexPosition.x + 1, i)) {
            if (this.map[[hexPosition.x + 1, i]].terrainType === terrainType)
              counter++;
          }
        }
      }

      //EVEN
      if (hexPosition.x % 2 === 0) {
        for (let i = hexPosition.y - distance; i <= hexPosition.y; i++) {
          if (Functions.existOnMap(hexPosition.x - 1, i))
            if (this.map[[hexPosition.x - 1, i]].terrainType === terrainType)
              counter++;
          if (Functions.existOnMap(hexPosition.x + 1, i))
            if (this.map[[hexPosition.x + 1, i]].terrainType === terrainType)
              counter++;
        }
      }
      return counter;
    }

    if (distance > 1) {
      //TODO FIND TERRAIN WHEN DISTANCE > 1
    }
  }
}

const singletonInstance = new Grid(
  Constants.MAP_WIDTH,
  Constants.MAP_HEIGHT,
  140,
  0
);

module.exports = singletonInstance;
