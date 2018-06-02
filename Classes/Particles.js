import * as THREE from 'three';
import particleFire from 'three-particle-fire';
// import Particles as ParticleSystem from 'threejs-particle-shader';
class Particles {
  constructor() {
    particleFire.install({ THREE: THREE });
  }
  setUp(camera, height){
    var fireRadius = 0.4;
    var fireHeight = 2;
    var particleCount = 800;

    var geometry0 = new particleFire.Geometry(fireRadius, fireHeight, particleCount);
    var material0 = new particleFire.Material({ color: 0x4286f4});
    material0.setPerspective(camera.fov, height);
    var particleFireMesh = new THREE.Points( geometry0, material0 );
    console.log(particleFireMesh);
    return particleFireMesh
  }

}
export default Particles;
