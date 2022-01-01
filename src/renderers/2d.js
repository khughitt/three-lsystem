//
// 2D Turtle Renderer
// KH (Sep21)
//
import * as THREE from "three";

export default class Turtle2DRenderer {
  #camera;
  #lineWidth;
  #renderer;
  #scene;

  constructor(scale) {
    // three.js setup
    //this.#renderer = new THREE.WebGLRenderer();
    //this.#renderer.setSize(window.innerWidth, window.innerHeight); 
    //document.body.appendChild(this.#renderer.domElement);

    // camera
    // this.#camera = new THREE.PerspectiveCamera(
    //   75, window.innerWidth / window.innerHeight, 1, 500
    // );
    // this.#camera.position.set(0, 0, 100);
    // this.#camera.lookAt(0, 0, 0);

    // scene
    //this.#scene = new THREE.Scene();

    // parent obj
    this.#scene = new THREE.Object3D();

    // styles
    this.#lineWidth = 1.2;

    if (scale !== undefined) {
      this.#lineWidth = this.#lineWidth * scale;
    }
  }

  moveForward(from, to, color) {
    let points = [new THREE.Vector3(...from),
                  new THREE.Vector3(...to)]; 
    let geom = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
      color: color,
      linewidth: this.#lineWidth
    });

    let mesh = new THREE.Line(geom, material);
    this.#scene.add(mesh);
  }

  // returned generated object
  get() {
    return this.#scene; 
  }
  // render() {
  //   // this.#renderer.render(this.#scene, this.#camera);
  //   this.#renderer.render(this.#scene, this.#camera);
  // }
}
