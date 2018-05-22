import Model from './Model.js';
import {
  Mesh,
  BoxGeometry,
  MeshBasicMaterial
} from 'three';
class Player{
  constructor(forward, back, left, right, number){
    this.forwardKey = forward;
    this.backKey = back;
    this.leftKey = left;
    this.rightKey = right;
    this.playerModel = '';
    this.number = '';
    this.initialize();
  }
  initialize(){

  }

  drawPlayerModel(callback){
    var playerModel = new Model('./Models/', 'car.obj', 'car.mtl')

    playerModel.loadModel((objetoCargado) => {
      objetoCargado.name = 'modeloPlayer';
      objetoCargado.position.x = 0;
      objetoCargado.position.y = 1;
      objetoCargado.position.z = 0;
      var geometry = new BoxGeometry( 1, 1, 1 );
      var material = new MeshBasicMaterial( {color: 0xffffff} );
      var cube = new Mesh( geometry, material );
      cube.position.x = 0;
      cube.position.y = 0;
      cube.position.z = 0;
      objetoCargado.add(cube);
      callback(objetoCargado);
    })
  }

  drawSecondPLayerModel(callback){
    var playerModel = new Model('./Models/', 'car.obj', 'caralt.mtl')

    playerModel.loadModel((objetoCargado) => {
      objetoCargado.name = 'modeloPlayer2';
      objetoCargado.position.x = 0;
      objetoCargado.position.y = 1;
      objetoCargado.position.z = 0;
      callback(objetoCargado);
    })
  }
}
export default Player;
