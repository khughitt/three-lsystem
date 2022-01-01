//
// A simple three.js turtle implementation
// KH (Aug 25, 2021)
//
// Commands:
//
// F  move forward a step of length $d$
// f  move foward a step of length $d$ without drawing a line
// +  turn left by angle $\delta$
// -  turn right by angle $\delta$
// [  push current state onto stack
// ]  pop current state onto stack
//
import Turtle2DRenderer from './renderers/2d.js'
import Turtle3DRenderer from './renderers/3d.js'

export default class Turtle {
  #pos;
  #alpha;
  #delta;
  #dist;
  #color;
  #renderer;
  #scale;
  #scaledDist;
  #state;
  #n;

  constructor(pos, alpha, delta, dist, renderer, scale) {
    // set starting position and angle
    this.#pos = pos;
    this.#alpha = alpha;
    this.#delta = delta;
    this.#dist = dist;
    this.#scale = scale;
    this.#color = 0x00bbaa;
    this.#state = [];
    this.#n = 0;

    if (this.#scale === undefined) {
      this.#scale = 1.0;
    } 
    this.#scaledDist = this.#dist * this.#scale;

    if (renderer === "2d") {
      this.#renderer = new Turtle2DRenderer(this.#scale);
    } else if (renderer === "3d") {
      this.#renderer = new Turtle3DRenderer(this.#scale);
    }
  }

  // move foward, drawing a line
  moveForward() {
    let nextPos = this.#pos.slice();

    nextPos[0] = nextPos[0] + Math.cos(this.#alpha) * this.#scaledDist;
    nextPos[1] = nextPos[1] + Math.sin(this.#alpha) * this.#scaledDist;

    // question: is color needed in this file? or can it be moved downstream to the
    // renderer?..
    // think about alt renederers..
    this.#renderer.moveForward(this.#pos, nextPos, this.#color)
    this.#n += 1;

    this.#pos = nextPos;
  }

  moveForwardInvis() {
    this.#pos[0] = this.#pos[0] + Math.cos(this.#alpha) * this.#scaledDist;
    this.#pos[1] = this.#pos[1] + Math.sin(this.#alpha) * this.#scaledDist;
  }

  pushState() {
    this.#state.push({
      "pos": this.#pos,
      "alpha": this.#alpha
    });
  }

  popState() {
    let state = this.#state.pop();
    this.#pos = state.pos;
    this.#alpha = state.alpha;
  }

  turnLeft() {
    this.#alpha = (this.#alpha + this.#delta);
  }

  turnRight() {
    this.#alpha = (this.#alpha - this.#delta);
  }

  prod(letter) {
    switch(letter) {
      case "F":
        this.moveForward();
        break;
      case "f":
        this.moveForwardInvis();
        break;
      case "+":
        this.turnLeft();
        break;
      case "-":
        this.turnRight();
        break;
      case "[":
        this.pushState();
        break;
      case "]":
        this.popState();
        break;
      default:
        // default: ignore..
        break;
    }
  }

  reset() {
    // TODO: move to renderer, or?..
    //this.#meshes = [];
    this.#n = 0;
  }

  draw(cmds, color) {
    this.reset();

    if (color === undefined) {
      color = 0x00bbaa;
    }
    this.#color = color;

    cmds.forEach(cmd => {
      this.prod(cmd);
    });
    
    //this.#renderer.render()
    return this.#renderer.get()
  }
}
