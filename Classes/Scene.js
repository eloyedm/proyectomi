import {Scene, Color, PerspectiveCamera, WebGLRenderer} from 'three';
import $ from 'jquery';

class Escena{
  constructor(alto, ancho){
    this.scene = "";
    this.camera  = "";
    this.renderer = "";
    this.alto = alto;
    this.ancho = ancho;
    this.initialize();
  }
  initialize(){
    this.renderer = new WebGLRenderer();
    this.renderer.setClearColor(new Color(0,0,0));
    this.renderer.setSize(this.ancho, this.alto);

    this.camera = new PerspectiveCamera(
      75,
      this.ancho /this.alto,
      0.1,
      100
    );
    this.scene = new Scene();
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

export default Escena;
