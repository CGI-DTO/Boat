import * as THREE from 'three';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

class PatiEntity {

  isLoaded = false;

  constructor(scene){
    // https://www.youtube.com/watch?v=6LA8vEB47Nk&ab_channel=DirkTeucher
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/Boat/Assets/Pati/Pati.glb', (gltf) => {
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


      // Animation
      this.nextQt = new THREE.Quaternion();
      this.prevQt = new THREE.Quaternion();
    });
  }

  // Should have a dt?
  setOrientationFromAccelerometer = function(acc){
    if (!this.isLoaded)
      return;
      
    this.root;
    // First check magnitude
    let mag = Math.sqrt(acc.x*acc.x + acc.y*acc.y + acc.z*acc.z);
    // if (mag > 10.2)
    //   return;
    // Normalize values
    let accNorm = new THREE.Vector3(acc.x/mag, acc.y/mag, acc.z/mag);
    // Up vector
    let magCustomUp = Math.sqrt(acc.x*acc.x + acc.z*acc.z);
    // Side vector
    let magCustomSide = Math.sqrt(acc.y*acc.y + acc.z*acc.z);
    // TODO MEMORY LEAK
    let mx = new THREE.Matrix4().lookAt(new THREE.Vector3(0, -acc.y / magCustomSide, acc.z / magCustomSide),new THREE.Vector3(0,0,0),new THREE.Vector3(-acc.x/magCustomUp, acc.z/magCustomUp, 0));
    let qt = new THREE.Quaternion().setFromRotationMatrix(mx);
    // Copy quaternions
    this.nextQt.set(qt.x, qt.y, qt.z, qt.w);
    this.prevQt.set(this.root.quaternion.x, this.root.quaternion.y, this.root.quaternion.z, this.root.quaternion.w);
    
    // Timestamps
    // First iteration
    if (this.nextTmst == undefined){
      this.nextTmst = new Date();
      return;
    }
    // Update timestamps
    this.prevTmst = new Date(this.nextTmst.getTime());
    this.nextTmst = new Date();
  }


  // Update rotation
  update = function(dt){
    if (this.nextTmst == undefined || this.prevTmst == undefined)
      return;


    let currentDate = new Date();
    // Get timespan
    let timeSpan = this.nextTmst.getTime() - this.prevTmst.getTime();
    // One step behind (use the n-1 and n-2 samples)
    let currentTmst = currentDate.getTime() - timeSpan;
    // Interpolation value
    let intValue = 1 - (this.nextTmst.getTime() - currentTmst)/timeSpan;
    // Clamp interpolation
    intValue = Math.min(intValue, 1);
    // Apply rotation
    // https://threejs.org/docs/#api/en/math/Quaternion

    this.root.quaternion.slerpQuaternions(this.prevQt, this.nextQt, intValue);
  }

  
}

export { PatiEntity }