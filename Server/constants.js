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
define("ID_POOL_COLLIDER_SIZE", 200000);

//RESOURCES BONUSES

define("RESOURCE_BONUS", {
  Potato: {
    Membership: {
      Gold: 0,
      Population: 2,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
    Bank: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
    Lab: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
    House: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
    Amphitheatre: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
    Farm: {
      Gold: 0,
      Population: 1,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
  },
  Banana: {
    Membership: {
      Gold: 0,
      Population: 2,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
    Farm: {
      Gold: 0,
      Population: 1,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
  },
  Sheep: {
    Membership: {
      Gold: 0,
      Population: 2,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
    Lab: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 1,
      Amenities: 0,
    },
    House: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 100,
      Science: 0,
      Amenities: 0,
    },
  },
  Coal: {
    Membership: {
      Gold: 2,
      Population: 0,
      PopulationLimit: 0,
      Science: 2,
      Amenities: 0,
    },
    Lab: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 1,
      Amenities: 0,
    },
    Bank: {
      Gold: 1,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
  },
  Hemp: {
    Membership: {
      Gold: 1,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 1,
    },
    Bank: {
      Gold: 1,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
  },
  Wheat: {
    Membership: {
      Gold: 0,
      Population: 2,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 1,
    },
    Farm: {
      Gold: 0,
      Population: 1,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
  },
  Salt: {
    Membership: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 2,
    },
    Amphitheatre: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 1,
    },
  },
  Tomato: {
    Membership: {
      Gold: 0,
      Population: 1,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 1,
    },
    Farm: {
      Gold: 0,
      Population: 1,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
  },
  Fish: {
    Membership: {
      Gold: 0,
      Population: 2,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 1,
    },
    Harbor: {
      Gold: 1,
      Population: 1,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
    Fishery: {
      Gold: 0,
      Population: 1,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
  },
  Shrimp: {
    Membership: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 3,
    },
    Harbor: {
      Gold: 0,
      Population: 1,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 1,
    },
    Fishery: {
      Gold: 0,
      Population: 1,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
  },
  Crab: {
    Membership: {
      Gold: 1,
      Population: 0,
      PopulationLimit: 0,
      Science: 1,
      Amenities: 0,
    },
    Harbor: {
      Gold: 1,
      Population: 0,
      PopulationLimit: 0,
      Science: 1,
      Amenities: 0,
    },
    Fishery: {
      Gold: 0,
      Population: 1,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
  },
  Clam: {
    Membership: {
      Gold: 0,
      Population: 1,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 1,
    },
    Harbor: {
      Gold: 0,
      Population: 1,
      PopulationLimit: 0,
      Science: 1,
      Amenities: 0,
    },
    Fishery: {
      Gold: 0,
      Population: 1,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
  },
  Otter: {
    Membership: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 3,
    },
    Lab: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 1,
      Amenities: 0,
    },
  },
  Seal: {
    Membership: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 3,
    },
    Bank: {
      Gold: 1,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
  },
  Penguin: {
    Membership: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 3,
    },
    Amphitheatre: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 1,
    },
  },
  Diamond: {
    Membership: {
      Gold: 4,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
    Bank: {
      Gold: 2,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 0,
    },
  },
  Marble: {
    Membership: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 0,
      Amenities: 4,
    },
    House: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 200,
      Science: 0,
      Amenities: 0,
    },
  },
  Sulfur: {
    Membership: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 4,
      Amenities: 0,
    },
    Lab: {
      Gold: 0,
      Population: 0,
      PopulationLimit: 0,
      Science: 2,
      Amenities: 0,
    },
  },
});

function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true,
  });
}
