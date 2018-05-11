import Model from './Model.js';

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
      callback(objetoCargado);
    })
  }

  drawSecondPLayerModel(callback){
    var playerModel = new Model('./Models/', 'car.obj', 'caralt.mtl')

    playerModel.loadModel((objetoCargado) => {
      objetoCargado.name = 'modeloPlayer2';
      callback(objetoCargado);
    })
  }
}
export default Player;
