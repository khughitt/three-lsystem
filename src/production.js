//
// L-System Production Class
//
// Example Usage:
//
//  Production("F", "FF-FF")                     # Deterministic
//  Production("F", {"F-F": 0.6, "F+F": 0.4})    # Stochastic
//  Production("A < F > B", "1")                 # Context-sensitive
//
export default class Production {
  #predecessor;
  #leftContext;
  #rightContext;
  #successor;

  constructor(predecessor, successor) {
    this.#leftContext = ""
    this.#rightContext = ""

    // extract left & right context requirements, if present..
    if (predecessor.includes("<")) {
      let lhsParts = predecessor.split("<")

      this.#leftContext = lhsParts[0].trim()
      predecessor = lhsParts[1].trim()
    }

    if (predecessor.includes(">")) {
      let rhsParts = predecessor.split(">")

      this.#rightContext = rhsParts[1].trim()
      predecessor = rhsParts[0].trim()
    }

    this.#predecessor = predecessor.trim()

    this.#successor = successor;

    // if the successor is a simple string, corresponding to a simple deterministic
    // rule, then nothing else needs to be parsed for this production
    if (typeof successor === "string") {
      return;
    }

    // for stochastic l-systems, convert individual production probabilities to
    // probability ranges, in order to make assigning a production easier at run-time..

    // first, check to make sure probabilities sum to 1..
    const probs = Object.values(successor)

    let probTotal = probs.reduce((a, b) => a + b, 0);

    if (probTotal !== 1) {
      throw("Stochastic L-system probabilities don't sum to 1!")
    }

    // next, convert probabilities to probability ranges in (0, 1]
    let successors = Object.keys(successor)

    let lowerBound = 0
    let upperBound = probs[0];

    for (var i = 0; i < probs.length; i++) {
      this.#successor[successors[i]] = [lowerBound, upperBound]

      lowerBound = upperBound;
      upperBound = upperBound + probs[i + 1];
    }
  }

  getPredecessor() {
    return this.#predecessor
  }

  getSuccessor() {
    // deterministic L-system
    if (typeof this.#successor === "string") {
      return this.#successor;
    } else if (typeof this.#successor === "object") {
      // stochastic L-system 
      let randVal = Math.random()

      // iterate over probability ranges associated with possible successors,
      // and choose the one that matches the random uniform value samples above..
      for (const [production, probs] of Object.entries(this.#successor)) {
        if (randVal > probs[0] && randVal <= probs[1]) {
          return production
        }
      }
    }
  }

  matches(predecessor, leftContext, rightContext) {
    return (
      (this.#predecessor === predecessor) &&
      (this.#leftContext === "" || this.#leftContext === leftContext) &&
      (this.#rightContext === "" || this.#rightContext === rightContext)
    )
  }

  toString() {
    let txt = ""

    if (this.#leftContext !== "") {
      txt = text + `${this.#leftContext} < `
    }

    txt = txt + this.#predecessor;

    if (this.#rightContext !== "") {
      txt = txt + ` > ${this.#rightContext}`
    }

    return `Production: ${txt}`;
  }
}
