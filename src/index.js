import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

window.Webflow ||= [];
window.Webflow.push(() => {
  init();
});

function init() {
  // Texture
  // const textureLoader = new THREE.TextureLoader();
  // const texture = textureLoader.load(
  //   'https://uploads-ssl.webflow.com/64012fe0f902e932fbf98cbb/64cd5d239d7e8c0bbd574187_DuckCM.png'
  // );

  // GLTFLoader
  const glTFLoader = new GLTFLoader();

  glTFLoader.load(
    'https://uploads-ssl.webflow.com/64012fe0f902e932fbf98cbb/64cddc6d38241ed4624728a4_model2.txt',
    (glb) => {
      console.log(glb);
      const model = glb.scene;
      model.position.set(0, 1.05, -1);
      scene.add(model);
    }
  );

  // Canvas
  const canvas = document.querySelector('canvas');

  // scene
  const scene = new THREE.Scene();
  scene.backgroundColor = new THREE.Color('red');
  // size
  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // resize
  window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    renderer.setSize(size.width, size.height);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  });

  // Box.u.updateProjectionMatrix
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const materials = new THREE.MeshBasicMaterial({ map: texture });
  // const box = new THREE.Mesh(geometry, materials);
  // scene.add(box);

  // Camera
  const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
  camera.position.z = 15;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });

  renderer.setSize(size.width, size.height);
  renderer.render(scene, camera);
  renderer.setClearColor(0xffffff);
  //Light
  const light = new THREE.DirectionalLight(0xffffff, 4);
  light.position.set(2, 2, 5);
  scene.add(light);

  // Animate
  function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
