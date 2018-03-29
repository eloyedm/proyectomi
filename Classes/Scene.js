import * as THREE from './../node_modules/three/build/three.min.js';
import $ from 'jquery';

class Scene{
  constructor(alto, ancho){
    this.scene = "";
    this.camera  = "";
    this.renderer = "";
    this.alto = alto;
    this.ancho = ancho;
    this.initialize();
  }
  initialize(){
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(new THREE.Color(0,0,0));
    this.renderer.setSize(this.ancho, this.alto);

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.ancho /this.alto,
      0.1,
      100
    );
    this.scene = new THREE.Scene();
  }

  render(){
    function renderinner(){
      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(renderinner);
    }
  }

  draw(container){
    console.log(container);
    console.log($);
    container.append(this.renderer.domElement)
    this.render();
  }
}

export default Scene;
