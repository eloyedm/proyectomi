import {
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial
} from 'three';
import $ from 'jquery';

class Player{
  constructor(forward, back, left, right){
    this.forwardKey = forward;
    this.backKey = back;
    this.leftKey = left;
    this.rightKey = right;
    this.initialize();
  }
  initialize(){

  }
}
