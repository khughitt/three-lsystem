//
// L-system implementation
//
// KH (2021)
//
// Based on formulations discussed in:
// The Algorithmic Beauty of Plants, by Prusinkiewicz & Lindenmeyer
//
// In order to allow state of L-system to be visualized at different iterations, the
// computed state at each iteration is stored.
//
// TODO (Dec21):
// - [ ] allow custom renderer to be passed in? (instead of "2d"/"3d" string, accept a
// "turtle" obj?)

import * as THREE from "three";
import Production from './production.js';
import Turtle from './turtle.js';

/**
 * three.js procedurally generated L-system 
 *
 * @param {Object} params L-system axiom, productions, etc. parameters object,
 * including:
 *
 * - `axiom` {str} Starting L-system axiom (default: "F")
 * - `productions` {Object<string, string>} L-system productions to be applied
 *    (default: {"F": "F[+F]F[-F][F]"})
 * - `numIter` {number} Number of iterations to run (default: 5)
 * - `dist` {number} Base distance to move forward with each step (default 2.0)
 * - `alpha` {number} Initial angle in radians (default: Pi/2)
 * - `delta` {number} Base rotation amount during branching events (default: 20/180 * Pi)
 * - `origin` {array} L-system origin x,y,z (default: [-30, -60, 0])
 * - `ignore` {array} Context-sensitive L-system symbols to ignore (default: ["+", "-", "F"])
 * - `colors` {array} Colors to use for each iteration 
 *    (default: ['#b2ff70', '#94ee5d', '#86dd4b', '#79cc38', '#6bba25', '#5da913', '#4f9800'])
 * - `renderer` {string} Renderer to use (default: "2d")
 */

export default class Lsystem extends THREE.Group {
  #params;
  #productions;
  #state;

  constructor(params) {
    super()

    // default parameters (~ABOP fig 1.24)
    var defaultParams = {
      axiom: "F",
      productions: {
        "F": "F[+F]F[-F][F]"
      },
      numIter: 5,
      dist: 2,
      alpha: Math.PI / 2,
      delta: (20 / 180) * Math.PI,
      origin: [-30, -60, 0],
      ignore: ["+", "-", "F"],
      colors: ['#b2ff70', '#94ee5d', '#86dd4b', '#79cc38', '#6bba25', '#5da913', '#4f9800'],
      renderer: '2d'
    };

    this.#params = params || {};

    for (var opt in defaultParams) {
        if (defaultParams.hasOwnProperty(opt)) {
            this.#params[opt] = typeof this.#params[opt] === 'undefined' ? defaultParams[opt] : this.#params[opt];
        }
    }

    // store state at each iteration
    this.#state = [this.#params.axiom];

    // add "[" and "]" to ignore list
    this.#params.ignore.push("[")
    this.#params.ignore.push("]")

    // parse productions
    this.#productions = [];

    for (const [lhs, rhs] of Object.entries(this.#params.productions)) {
      this.#productions.push(new Production(lhs, rhs));
    }
  
    // run L-system
    this.run();

    // draw l-system, 
    const turtle = new Turtle(this.#params.origin, this.#params.alpha, this.#params.delta, this.#params.dist, this.#params.renderer);

    for (var i = this.#params.numIter - 1; i >= 0; i--) {
      let cmds = this.getState(i).split("");
      let obj = turtle.draw(cmds, this.#params.colors[i])
      obj.name = `iter-${i}`;
      this.add(obj)
    }
  }

  run(debug) {
    if (typeof debug == undefined) {
      debug = false;
    }

    for (var iter = 0; iter < this.#params.numIter; iter++) {

      let state = this.#state[this.#state.length - 1]
      let predecessors = state.split("");

      console.log(`State (i=${iter}): ${state}`)

      let successors = [];

      predecessors.forEach((predecessor, ind) => {
        // update left context
        let leftContext = "";
        let i = ind - 1;

        // get first non-ignored character to left of predecessor
        while((i >= 0) && (leftContext === "")) {
          if (!(this.#params.ignore.includes(predecessors[i]))) {
            leftContext = predecessors[i];
          }
          i = i - 1;
        }

        // update right context
        let rightContext = "";
        let j = ind + 1;

        while((j < state.length) && (rightContext === "")) {
          if (!(this.#params.ignore.includes(predecessors[j]))) {
            rightContext = predecessors[j];
          }
          j = j + 1;
        }

        // determine successor, and add to output
        let successor = this.getSuccessor(predecessor, leftContext, rightContext);

        if (debug) {
          console.log(`${ind}) ${leftContext} < ${predecessor} > ${rightContext} => ${successor}`)
        }

        successors.push(successor);
      });

      this.#state.push(successors.join(""));
    }
  }

  // TODO: handle case where multiple productions match.. 
  // - return a "priority" along with each matched successor
  // - in the end, keep the successor with the highest priority..
  getSuccessor(predecessor, leftContext, rightContext) {
    // iterate over productions
    var successor;

    this.#productions.forEach(production => {
      // for a matching production, determine successor
      if (production.matches(predecessor, leftContext, rightContext)) {
        successor = production.getSuccessor()
      }
    })

    // if nothing matches, predecessor replaces itself
    if (successor === undefined) {
      successor = predecessor
    }

    return successor
  }

  getState(ind) {
    if (ind === undefined) {
      ind = this.#state.length - 1;
    }

    return this.#state[ind];
  }
}

//global.THREE = {Lsystem: Lsystem}
