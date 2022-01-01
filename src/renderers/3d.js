//
// 3D Turtle Renderer
// KH (Sep21)
//
import * as THREE from "three";
import { OrbitControls } from 'three-stdlib/controls/OrbitControls'

export default class Turtle3DRenderer {
  #camera;
  #controls;
  #renderer;
  #lineWidth;
  #scene;

  constructor() {
    // three.js setup
    this.#renderer = new THREE.WebGLRenderer();
    this.#renderer.setSize(window.innerWidth, window.innerHeight); 
    document.body.appendChild(this.#renderer.domElement);

    // scene
    this.#scene = new THREE.Scene();

    // camera
    this.#camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 1, 500
    );
    this.#camera.position.set(0, 0, 100);
    this.#camera.lookAt(0, 0, 0);
    
    // orbit controls
    this.#controls = new OrbitControls(this.#camera, 
                                       this.#renderer.domElement );

    this.#controls.addEventListener( 'change', ()=>{
      this.#renderer.render(this.#scene, this.#camera)
    } );
    this.#controls.update()

    // styles
    this.#lineWidth = 1.2;

    if (scale !== undefined) {
      this.#lineWidth = this.#lineWidth * scale;
    }
  }

  moveForward(from, to, color) {
    // compute direction vector
    let v1 = new THREE.Vector3(from[0], from[1], from[2])
    let v2 = new THREE.Vector3(to[0], to[1], to[2])

    let vdelt = v2.clone().sub(v1);

    var geom = new THREE.CylinderGeometry(0.1, 0.1, v1.distanceTo(v2), 8, 8);

    const material = new THREE.LineBasicMaterial({
      color: color,
      linewidth: this.#lineWidth
    });

    var mesh = new THREE.Mesh(geom, material);

    var axis = new THREE.Vector3(0, 1, 0);
    mesh.quaternion.setFromUnitVectors(axis, vdelt.clone().normalize());

    //mesh.position.set(...v2.toArray())
    mesh.position.set(...v2.multiplyScalar(0.8).toArray())

    this.#scene.add(mesh);
  }

  render() {
    this.#renderer.render(this.#scene, this.#camera);
    this.#controls.update();
  }
}
