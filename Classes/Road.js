import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial
} from 'three';
import $ from 'jquery';

class Pista{
  constructor(){
    this.targets = [];
    this.checkpoints = [];
  }

  createBoxes(callback){
    var that = this;
    $.ajax({
      url: "./JSON/road.json",
      success: function(data){
        var geometry = new BoxGeometry( 15, 15, 15 );
        var material = new MeshBasicMaterial( {color: 0xfff} );
        var boxes = [];
        var cube = new Mesh( geometry, material );
        console.log(data);
        console.log(data.length);
        for (var i = 0; i < data.length; i++) {
          cube.position.x = data[i].x;
          cube.position.y = data[i].y;
          cube.position.z = data[i].z;
          boxes.push(cube);
        }
        that.checkpoints = data;
        callback(boxes);
      },
      error: function(){
        console.log("no se arma");
      }
    });
  }
}
export default Pista;
