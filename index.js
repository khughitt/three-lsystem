import * as THREE from "three";
import Lsystem from './src/lsystem.js'
import ABOP from './src/examples.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); 
document.body.appendChild(renderer.domElement);

// ABOP fig 1.24 (plant-like)
const lsys1 = new Lsystem({numIter: 5});

// ABOP fig 1.9a (koch curve)
var params = ABOP['1.9a'];
params.colors = ["#cdf7f6", "#8fb8de", "#9a94bc", "#9b5094", "#00bbaa"];
params.scale = 1.2;
//params.numIter = 3

const lsys2 = new Lsystem(params);

lsys1.position.set(0, 0, 0);
lsys2.position.set(0, 0, 0);

scene.add(lsys1);
scene.add(lsys2);

camera.position.z = 100;

function animate() {
  requestAnimationFrame( animate );
  lsys1.position.set(Math.cos(Math.PI * lsys1.position.x + 10), Math.cos(Math.PI * lsys1.position.y - 0.5), lsys1.position.z);
  lsys2.rotation.y += 0.02;

  renderer.render( scene, camera );
}
animate();
