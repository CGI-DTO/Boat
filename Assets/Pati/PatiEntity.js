import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

class PatiEntity {

  isLoaded = false;

  constructor(scene){
    // https://www.youtube.com/watch?v=6LA8vEB47Nk&ab_channel=DirkTeucher
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/Ocean/Assets/Pati/Pati.glb', (gltf) => {
      // GLTF scene
      const root = gltf.scene;
      // Fix frustrum culling
      root.children[0].frustumCulled = false;

      scene.add(root);

      this.root = root;

      // Material AO
      let mesh = root.children[0];
      let material = mesh.material;    

      root.scale.x = 2;
      root.scale.y = 2;
      root.scale.z = 2;
      

      this.isLoaded = true;

    });
  }
}

export { PatiEntity }