import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
import MTLLoader from 'three-mtl-loader';

class Model{
  constructor(path, objFile, mtlFile){
    this.path = path;
    this.objFile = objFile;
    this.mtlFile = mtlFile;
    OBJLoader(THREE);
  }

  loadModel(callback){
    var mtlLoader = new MTLLoader();

    mtlLoader.setPath(this.path);
    var that = this;
    var material = this.mtlFile;
    mtlLoader.load(this.mtlFile, (material) => {
      //Este bloque de codigo solo se ejecuta cuando termine la carga del MTL
      // a esto se le llama una funcion lambda
      //nos va a devolver un parametro cuando termine
      var objLoader = new THREE.OBJLoader();
      objLoader.setPath(that.path);
      objLoader.setMaterials(material);
      objLoader.load(this.objFile, (objCargado)=> {
      //Este bloque de codigo solo se ejecuta cuando termine la carga del OBJ
      callback(objCargado);
      });
    });
  }
}

export default Model;
