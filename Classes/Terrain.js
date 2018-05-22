import {
  PlaneGeometry,
  ImageUtils,
  MeshLambertMaterial,
  Mesh
} from 'three';

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
}

export default Terreno;
