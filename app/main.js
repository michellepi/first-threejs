import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(-30);
camera.position.setX(-3);


const geometry = new THREE.TorusGeometry(8, 1, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: '#e0a2ac'
});
const torus = new THREE.Mesh(geometry, material)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,8)

const ambientLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
//const controls = new OrbitControls(camera, renderer.domElement);

scene.add(torus);
scene.add(pointLight);
//scene.add(ambientLight);
//cene.add(lightHelper);
//scene.add(gridHelper);

function addStar(alpha){
  const geometry = new THREE.OctahedronGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color:0xffffff, opacity:0.5})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

//Array(200).fill().forEach(addStar);
Array(200).fill().map(() => THREE.MathUtils.randFloat(0,1)).forEach(addStar)

const moonTexture = new THREE.TextureLoader().load('assets/moon-2.jpg');
const normalTexture = new THREE.TextureLoader().load('assets/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);



function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.01;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.005;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.00002;
  camera.rotation.y = t * -0.00002;
}


document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.002;
  torus.rotation.z += 0.003;
  //controls.update();
  renderer.render(scene, camera);
}

animate()
