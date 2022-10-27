import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
const centre_pos = [-12, 0, -10]

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(-30);
camera.position.setX(-3);
camera.position.setY(-1);
scene.background = new THREE.TextureLoader().load('assets/stars_milky_way.jpg');

const pointLight = new THREE.PointLight({color:0xffffff, decay:2});
scene.add(pointLight);
pointLight.position.set(centre_pos[0], centre_pos[1], centre_pos[2]);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)
//const controls = new OrbitControls(camera, renderer.domElement);
//const controls = new OrbitControls(camera, renderer.domElement);

function addStar(alpha){
  const geometry = new THREE.OctahedronGeometry(0.3);
  const material = new THREE.MeshStandardMaterial({color:0xffffff, opacity:alpha})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloat(-100, 100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().map(() => THREE.MathUtils.randFloat(0,1)).forEach(addStar)

const sunTexture = new THREE.TextureLoader().load('assets/sun.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshBasicMaterial({
    //emissive: 0xffffff,
    map: sunTexture,
  })
);
scene.add(sun);
sun.position.set(centre_pos[0], centre_pos[1], centre_pos[2])

const earthTexture = new THREE.TextureLoader().load('assets/earth_daymap.jpg');
const normalTexture = new THREE.TextureLoader().load('assets/earth_normal_map.jpg');
const earthGeometry = new THREE.SphereGeometry(1.2, 32, 32);
earthGeometry.translate(10, 0, 10)
const earth = new THREE.Mesh(
  earthGeometry,
  new THREE.MeshBasicMaterial({
    //emissive: 0xffffff,
    map: earthTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);
earth.position.setZ(-10);
earth.position.setX(-5);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0;
  earth.rotation.y += 0.05;
  earth.rotation.z += 0;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}


document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);

  /*torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;
  cube.rotation.z += 0.02;*/
  
  //controls.update();
  renderer.render(scene, camera);
}

animate()

