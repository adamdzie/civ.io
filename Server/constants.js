//SERVER CONSTANTS

define("TICK_RATE", 1 / 30);

define("GRID_COLOR", 0x535552);

define("DAY_TIME", 2000);
//MAP GENERATION

define("MAP_HEIGHT", 30);
define("MAP_WIDTH", 30);

define("GUARANTED_SNOW_LAYER", 2);
define("MAX_SNOW_HEX", 6);

define("GUARANTED_OCEAN", 0);

define("LAKE_CHANCE", 4);
define("LAKE_HEX_CHANCE", 10);

define("MOUNTAIN_CHANCE", 4);
define("MOUNTAIN_HEX_CHANCE", 4);

define("RESOURCE_CHANCE", 5);

//GRASS RESOURCES
define("GRASS_RESOURCE", [
  "Potato",
  "Banana",
  "Sheep",
  "Coal",
  "Hemp",
  "Wheat",
  "Salt",
  "Tomato",
]);

//WATER RESOURCES
define("WATER_RESOURCE", ["Fish", "Shrimp", "Crab", "Clam"]);

//SNOW RESOURCES

define("SNOW_RESOURCE", ["Otter", "Seal", "Penguin"]);

//MOUNTAIN RESOURCES
define("MOUNTAIN_RESOURCE", ["Diamond", "Marble", "Sulfur"]);

//TIME
define("REFRESH_INTERVAL", 2000); //MS

//BUILDINGS

define("BUILDING_WIDTH", 100);
define("BUILDING_HEIGHT", 100);

define("BUILD_TIME", 10);

define("ID_POOL_SIZE", 1000);
function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true,
  });
}
