import {
  SphereGeometry,
  TextureLoader,
  MeshPhongMaterial,
  Mesh,
  BackSide
} from 'three';
class Skydome {
  constructor() {
    this.texture = './../images/Erenvidor-heightmap.png';
  }
  initialize(callback){
    var skyGeo = new SphereGeometry(100, 25, 25);
    var loader = new TextureLoader(),
    texture = loader.load(this.texture);
    var material = new MeshPhongMaterial({
      map: texture
    });

    var sky = new Mesh(skyGeo, material);
    sky.name = "skydome";
    sky.material.side = BackSide;
    return sky;
  }
}

export default Skydome;
