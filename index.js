import * as THREE from "three";
import Lsystem from './src/lsystem.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); 
document.body.appendChild(renderer.domElement);

const lsys = new Lsystem();

scene.add(lsys);

camera.position.z = 100;

function animate() {
  requestAnimationFrame( animate );
  lsys.rotation.x += 0.01;
  lsys.rotation.y += 0.01;
  renderer.render( scene, camera );
}
animate();
