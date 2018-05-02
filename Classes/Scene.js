import {Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  AmbientLight,
  DirectionalLight} from 'three';
import $ from 'jquery';
import Terreno from './Terrain.js';

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

    var geometry = new BoxGeometry(1,1,1);
    var material = new MeshLambertMaterial({
      color: new Color(0,0,1)
    });

    var cube1 = new Mesh(geometry, material);
    cube1.position.set(1,0,-10);
    this.camera.position.set(0,0,2);
    this.scene.add(cube1);

    material = new MeshPhongMaterial({
      color: new Color(0.5, 0.5, 0.5),
      specular: new Color(1,1,1),
      shininess: 500
    });

    var cube2 = new Mesh(geometry, material);
    cube2.position.set(0,0,0);
    this.scene.add(cube2);

    var ambiental = new AmbientLight(new Color(1,1,1), 1.0);
    var direccional = new DirectionalLight(new Color(1,1,0), 0.6);
    direccional.position.set(0,0,1);
    this.scene.add(ambiental);
    this.scene.add(direccional);
    var that = this;
    var terreno = new Terreno('./images/Erenvidor-heightmap.png');
    terreno.initialize(function(plane){
      that.scene.add(plane);
    });
  }

  render(){
    function renderinner(){
      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(renderinner);
    }
  }

  draw(container){
    console.log(this.scene);
    container.append(this.renderer.domElement)
    this.render();
  }
}

export default Escena;
