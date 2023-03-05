class Enums {
  static terrain = { grass: 1, snow: 2, ocean: 3, lake: 4, mountain: 5 };
  static obstacle = { none: 0 };
  static resource = {
    none: 0,
    Potato: 1,
    Banana: 2,
    Sheep: 3,
    Coal: 4,
    Hemp: 5,
    Wheat: 6,
    Salt: 7,
    Tomato: 8,
    Fish: 9,
    Shrimp: 10,
    Crab: 11,
    Clam: 12,
    Otter: 13,
    Seal: 14,
    Penguin: 15,
    Diamond: 16,
    Marble: 17,
    Sulfur: 18,
  };
  static buildings = {
    0: "City",
    1: "Bank",
    2: "Lab",
    3: "House",
    4: "Amphitheatre",
    5: "Tower",
    6: "Exploiter",
    7: "Barracks",
  };
}

module.exports = Enums;
