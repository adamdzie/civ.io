const Constants = require("./Constants.js");
class NeighbourBonus {
  constructor(resourceName, terrainType) {
    this.resourceName = resourceName;
    this.terrainType = terrainType;

    this.forBuilding = {
      Membership: {
        Gold: 0,
        Population: 0,
        PopulationLimit: 0,
        Science: 0,
        Amenities: 0,
      },
      City: {
        Gold: 0,
        Population: 0,
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
        Population: 0,
        PopulationLimit: 0,
        Science: 0,
        Amenities: 0,
      },
      Harbor: {
        Gold: 0,
        Population: 0,
        PopulationLimit: 0,
        Science: 0,
        Amenities: 0,
      },
      Fishery: {
        Gold: 0,
        Population: 0,
        PopulationLimit: 0,
        Science: 0,
        Amenities: 0,
      },
    };
  }
}

module.exports = NeighbourBonus;
