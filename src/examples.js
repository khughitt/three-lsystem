//
// Example L-Systems from:
// Algorithmic Beauty of Plants
// By Przemysław Prusinkiewicz, Aristid Lindenmayer
//
const ABOP = {
  // Fig 1.9a
  "1.9a": {
    n: 4,
    dist: 1,
    axiom: "F-F-F-F",
    alpha: Math.PI / 2,
    delta: Math.PI / 2,
    origin: [-50, 30, 0],
    ignore: [],
    productions: {
      "F": "FF-F-F-F-F-F+F",
      "-": "-",
      "+": "+"
    }
  },

  // Fig 1.9b
  "1.9b": {
    n: 4,
    dist: 1.25,
    axiom: "F-F-F-F",
    alpha: Math.PI / 2,
    delta: Math.PI / 2,
    origin: [-50, -40, 0],
    ignore: [],
    productions: {
      "F": "FF-F-F-F-FF",
      "-": "-",
      "+": "+"
    }
  },
  // Fig 1.24b
  "1.24b": {
    n: 5,
    dist: 2,
    axiom: "F",
    alpha: Math.PI / 2,
    delta: (20 / 180) * Math.PI,
    origin: [-30, -60, 0],
    ignore: [],
    productions: {
      "F": "F[+F]F[-F][F]",
      "-": "-",
      "+": "+",
      "[": "[",
      "]": "]"
    }
  },

  // Fig 1.27
  // Simple stochastic L-system
  "1.27": {
    n: 5,
    dist: 1.8,
    axiom: "F",
    alpha: Math.PI / 2,
    delta: (20 / 180) * Math.PI,
    origin: [-30, -60, 0],
    ignore: [],
    productions: {
      "F": {
        "F[+F]F[-F]F": 0.33,
        "F[+F]F": 0.33,
        "F[-F]F":0.34
      },
      "-": "-",
      "+": "+",
      "[": "[",
      "]": "]"
    }
  },

  //
  // Context-sensitive L-systems
  //

  // Fig 1.31a
  "1.31a": {
    n: 30,
    dist: 1,
    axiom: "F1F1F1",
    alpha: Math.PI / 2,
    delta: (22.5 / 180) * Math.PI,
    origin: [-30, -60, 0],
    ignore: ["+", "-", "F"],
    productions: {
      "0 < 0 > 0": "0",
      "0 < 0 > 1": "1[+F1F1]",
      "0 < 1 > 0": "1",
      "0 < 1 > 1": "1",
      "1 < 0 > 0": "0",
      "1 < 0 > 1": "1F1",
      "1 < 1 > 0": "0",
      "1 < 1 > 1": "0",
      "+": "-",
      "-": "+"
    }
  },

  "1.31b": {
    n: 30,
    dist: 1,
    axiom: "F1F1F1",
    alpha: Math.PI / 2,
    delta: (22.5 / 180) * Math.PI,
    origin: [-30, -60, 0],
    ignore: ["+", "-", "F"],
    productions: {
      "0 < 0 > 0": "1",
      "0 < 0 > 1": "1[-F1F1]",
      "0 < 1 > 0": "1",
      "0 < 1 > 1": "1",
      "1 < 0 > 0": "0",
      "1 < 0 > 1": "1F1",
      "1 < 1 > 0": "1",
      "1 < 1 > 1": "0",
      "+": "-",
      "-": "+"
    }
  },

  "1.31c": {
    n: 26,
    dist: 1,
    axiom: "F1F1F1",
    alpha: Math.PI / 2,
    delta: (25.75 / 180) * Math.PI,
    origin: [-30, -60, 0],
    ignore: ["+", "-", "F"],
    productions: {
      "0 < 0 > 0": "0",
      "0 < 0 > 1": "1",
      "0 < 1 > 0": "0",
      "0 < 1 > 1": "1[+F1F1]",
      "1 < 0 > 0": "0",
      "1 < 0 > 1": "1F1",
      "1 < 1 > 0": "0",
      "1 < 1 > 1": "0",
      "+": "-",
      "-": "+",
    }
  }
};

export default ABOP;
