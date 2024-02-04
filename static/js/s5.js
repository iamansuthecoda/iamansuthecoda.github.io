import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader';
const DRACOLoaderDecoderPath = 'https://unpkg.com/three@latest/examples/jsm/libs/draco/';

const earth = {
    model: null,
    rotationFactor: 0.003,
}

const moon = {
    model: null,
    orbitRadius: 1300,
    orbitRotationTimer: 0,
}

const ISS = {
    model: null,
    orbitRadius: 600,
    orbitRotationTimer: 0,
    orbitYPlacement: 350,
}

//Initialisation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, DOMELEMENTS.s5.clientWidth / DOMELEMENTS.s5.clientHeight, 1, 5000);
const loader = new GLTFLoader();
const dLoader = new DRACOLoader();
dLoader.setDecoderPath(DRACOLoaderDecoderPath);
loader.setDRACOLoader(dLoader);
const renderer = new THREE.WebGLRenderer({ canvas: DOMELEMENTS.s5.getElementsByTagName('canvas')[0] });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(DOMELEMENTS.s5.clientWidth, DOMELEMENTS.s5.clientHeight);

//Lighting
const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight.position.set(1, 1, 0.5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.25 );
scene.add(ambientLight);

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 600;
controls.maxDistance = 4000;
// controls.minPolarAngle = controls.maxPolarAngle = Math.PI / 2;
controls.target = new THREE.Vector3(0, 0, 0);

//Asset loading
const imgLoader = new THREE.TextureLoader();
imgLoader.load('../../assets/images/s5/space.jpg', (texture) => { scene.background = texture });

loader.load('../../assets/3Dmodels/s5/Earth_1_12756.glb', (gltf) => {
    earth.model = gltf.scene;
    earth.model.rotation.x = 0.25;
    scene.add(earth.model);
}, undefined, (err) => console.error(err));

loader.load('../../assets/3Dmodels/s5/Moon_1_3474.glb', (gltf) => {
    moon.model = gltf.scene;
    moon.model.castShadow = true;
    moon.model.scale.x = 0.25;
    moon.model.scale.y = 0.25;
    moon.model.scale.z = 0.25;
    moon.model.position.x = moon.orbitRadius;
    scene.add(moon.model);
}, undefined, (err) => console.error(err));

loader.load('../../assets/3Dmodels/s5/ISS_stationary.glb', (gltf) => {
    ISS.model = gltf.scene;
    ISS.model.scale.x = 0.5;
    ISS.model.scale.y = 0.5;
    ISS.model.scale.z = 0.5;
    ISS.model.position.x = ISS.orbitRadius;
    ISS.model.position.y = ISS.orbitYPlacement;
    scene.add(ISS.model);
}, undefined, (err) => console.error(err));

//EventListeners
DOMELEMENTS.s5.addEventListener('mousemove', e => {
    if (e.clientX < (e.target.clientWidth/2) - 75) earth.rotationFactor = (e.clientX > 150) ? -0.003 : -0.1;
    else if (e.clientX > (e.target.clientWidth/2) + 75) earth.rotationFactor = (e.clientX < (e.target.clientWidth - 150)) ? 0.003 : 0.1;
    else earth.rotationFactor = 0;

    let primitiveOrbitHeight = (700 * (e.clientY/e.target.clientHeight));
    if (primitiveOrbitHeight < 350) ISS.orbitYPlacement = 350 - primitiveOrbitHeight;
    else if (primitiveOrbitHeight > 350) ISS.orbitYPlacement = -(primitiveOrbitHeight - 350);
    else ISS.orbitYPlacement = 0;
});

//Execution
function animate() {
    requestAnimationFrame(animate);
    if (earth.model) earth.model.rotation.y += earth.rotationFactor;
    if (moon.model){
        moon.model.rotation.z += 0.01;
        moon.orbitRotationTimer += 0.005;
        moon.model.position.x = moon.orbitRadius * Math.cos(moon.orbitRotationTimer);
        moon.model.position.y = moon.orbitRadius * Math.cos(moon.orbitRotationTimer);
        moon.model.position.z = moon.orbitRadius * Math.sin(moon.orbitRotationTimer);
    }
    if (ISS.model){
        ISS.model.rotation.y += earth.rotationFactor;
        ISS.orbitRotationTimer += 0.008;
        ISS.model.position.x = ISS.orbitRadius * Math.cos(ISS.orbitRotationTimer);
        ISS.model.position.y = ISS.orbitYPlacement;
        ISS.model.position.z = ISS.orbitRadius * Math.sin(ISS.orbitRotationTimer);
    }

	controls.update();
	renderer.render(scene, camera);
}

camera.position.set(0, 0, 1550);
animate();