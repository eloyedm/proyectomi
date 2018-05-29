import Model from './Model.js';
import {
  BoxGeometry,
  Mesh,
  TextureLoader,
  MeshPhongMaterial
} from 'three';
import $ from 'jquery';

class Powerup {
  constructor() {
    this.basePowerup = '';
    this.texture = './images/wood.jpg';
    this.initialize();
  }
  initialize(){
    var crateModel = new Model('./Models/', 'crate.obj', 'crate.mtl');
    this.basePowerup = crateModel;
  }
  buildPowers(callback){
    // this.basePowerup.loadModel((objetoCargado) => {
    //   callback(objetoCargado);
    // });
  }
  spheres(callback){
    var geometry = new BoxGeometry( 1, 1, 1 );
    var loader = new TextureLoader(),
    texture = loader.load('./images/wood.jpg');
    var material = new MeshPhongMaterial({
      map: texture
    });
    var sphere = new Mesh( geometry, material );
    var spheres = [];
    $.ajax({
      url: "./JSON/objects.json",
      success: function(data){        
        for (var i = 0; i < data.length; i++) {
          var instanceSphere = sphere.clone();
          instanceSphere.position.x = data[i].x;
          instanceSphere.position.y = data[i].y;
          instanceSphere.position.z = data[i].z;
          spheres.push(instanceSphere);
        }
        callback(spheres);
      }
    })
    return sphere;
  }
}
export default Powerup;
