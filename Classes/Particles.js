import * as THREE from 'three';
import { ParticleSystem } from 'three-gpu-particle-system';
// import Particles as ParticleSystem from 'threejs-particle-shader';
class Particles {
  constructor() {
    this.particleSystem = '';
    this.options = {
      position: new THREE.Vector3(),
      positionRandomness: .3,
      velocity: new THREE.Vector3(),
      velocityRandomness: .5,
      color: 0xaa88ff,
      colorRandomness: .5,
      turbulence: .5,
      lifetime: 2,
      size: 5,
      sizeRandomness: 1,
      smoothPosition: null
    };
    this.spawnerOptions = {
      spawnRate: 15000,
      horizontalSpeed: 1.5,
      verticalSpeed: 1.35,
      timeScale: 1
    };
    // GPUps(THREE);
    // this.particleSystem = new THREE.GPUParticleSystem({
    //   maxParticles: 10000
    // });

    console.log(typeof GPUps);
  }
}
export default Particles;
