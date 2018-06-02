import {
  PlaneGeometry,
  ImageUtils,
  MeshLambertMaterial,
  Mesh,
  Vector3,
  DoubleSided,
} from 'three';
import Model from './Model.js';

class Terreno{
  constructor(imagen){
    this.heightmap = imagen;
  }

  initialize(callback){
    var img = new Image();
    var that = this;
    img.onload = function() {
      var data = that.getHeightData(img);
      var geometry = new PlaneGeometry(10,10,9,9);
      var texture = ImageUtils.loadTexture(that.heightmap);
      var material = new MeshLambertMaterial({map: texture});
      var plane = new Mesh(geometry, material);
      for (var i = 0; i < plane.geometry.vertices.length; i++) {
        plane.geometry.vertices[i].z = data[i];
      }
      plane.name= "terreno";
      callback(plane);
    }
    img.src = this.heightmap;
  }

  getHeightData(img, scale){
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    var context = canvas.getContext('2d');
    var size = img.width * img.height;
    var data = new Float32Array( size );
    context.drawImage(img, 0, 0);

    for(var i = 0; i < size; i++){
      data[i] = 0;
    }
    var imgd = context.getImageData(0,0, img.width, img.height);
    var pix = imgd.data;
    var j = 0;
    for (var i = 0; i < pix.length; i+=4) {
      var all = pix[i]+pix[i+1]+pix[i+2];
      data[j++]= all/(12*scale);
    }

    return data;
  }

  buildTrack(callback){
    var tackModel = new Model('./Models/', 'Track.obj', 'Track.mtl');
    tackModel.loadModel((objetoCargado) => {
      objetoCargado.name = 'modeloPista';
      objetoCargado.position.x = 0;
      objetoCargado.position.y = 1;
      objetoCargado.position.z = 0;
      objetoCargado.vertices = [];
      objetoCargado.children[0].material.side = DoubleSided;
      var vertice = new Vector3();
      for (var i = 0; i < objetoCargado.children[0].geometry.attributes.position.array.length; i+=3) {
        vertice.x = objetoCargado.children[0].geometry.attributes.position.array[i];
        vertice.y = objetoCargado.children[0].geometry.attributes.position.array[i+1];
        vertice.z = objetoCargado.children[0].geometry.attributes.position.array[i+2];
        objetoCargado.vertices.push(vertice.clone());
      }
      // var geometry = new BoxGeometry( 3, 3, 3 );
      // var material = new MeshBasicMaterial( {color: 0xffffff} );
      // var cube = new Mesh( geometry, material );
      // cube.position.x = 0;
      // cube.position.y = 0;
      // cube.position.z = 0;
      // objetoCargado.add(cube);
      callback(objetoCargado);
    })
  }
  buildLandscape(callback){
    var tackModel = new Model('./Models/', 'TrackTerrain.obj', 'TrackTerrain.mtl');
    tackModel.loadModel((objetoCargado) => {
      objetoCargado.name = 'modeloPaisaje';
      objetoCargado.position.x = 0;
      objetoCargado.position.y = 1;
      objetoCargado.position.z = 0;
      objetoCargado.vertices = [];

      var vertice = new Vector3();
      for (var i = 0; i < objetoCargado.children[0].geometry.attributes.position.array.length; i+=3) {
        vertice.x = objetoCargado.children[0].geometry.attributes.position.array[i];
        vertice.y = objetoCargado.children[0].geometry.attributes.position.array[i+1];
        vertice.z = objetoCargado.children[0].geometry.attributes.position.array[i+2];
        objetoCargado.vertices.push(vertice.clone());
      }
      // var geometry = new BoxGeometry( 3, 3, 3 );
      // var material = new MeshBasicMaterial( {color: 0xffffff} );
      // var cube = new Mesh( geometry, material );
      // cube.position.x = 0;
      // cube.position.y = 0;
      // cube.position.z = 0;
      // objetoCargado.add(cube);
      callback(objetoCargado);
    })
  }
}

export default Terreno;
