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
        var geometry = new BoxGeometry( 4, 2, 2 );
        var material = new MeshBasicMaterial( {
          color: 0xfff,
          opacity: 0.0,
          transparent: true
        } );
        var boxes = [];
        for (var i = 0; i < data.length; i++) {
          var cube = new Mesh( geometry, material );
          cube.position.x = data[i].x;
          cube.position.y = data[i].y;
          cube.position.z = data[i].z;
          // mesh.visible = false;
          cube.name = data[i].name;
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
