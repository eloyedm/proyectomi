import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial
} from 'three';
import $ from 'jquery';

class Pista{
  constructor(){
    $.getJSON("JSON/road.json", function(data){
      this.checkpoints = data;
      console.log("por aqui anda la pista");
      console.log(this.checkpoints);
    });
  }
}
export default Pista;
