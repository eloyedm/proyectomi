import {Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  AmbientLight,
  GridHelper,
  Clock,
  DirectionalLight} from 'three';
import $ from 'jquery';
import Terreno from './Terrain.js';

class Escena{
  constructor(ancho, alto){
    this.scene = "";
    this.camera  = "";
    this.renderer = "";
    this.alto = alto;
    this.ancho = ancho;
    this.keys = {
      'A' : false,
      'W' : false,
      'D': false,
      'S' : false
    };
    this.initialize();
  }
  initialize(){
    this.renderer = new WebGLRenderer();
    this.renderer.setClearColor(new Color(0,0,0));
    this.renderer.setSize(this.ancho, this.alto);
    this.clock = new Clock();

    this.camera = new PerspectiveCamera(
      75,
      this.ancho /this.alto,
      0.1,
      100
    );
    this.scene = new Scene();

    var material = new MeshLambertMaterial({
      color: new Color(0,0,1)
    });

    this.camera.position.set(0,0,2);

    material = new MeshPhongMaterial({
      color: new Color(0.5, 0.5, 0.5),
      specular: new Color(1,1,1),
      shininess: 500
    });
    var ambiental = new AmbientLight(new Color(1,1,1), 1.0);
    var direccional = new DirectionalLight(new Color(1,1,0), 0.6);
    direccional.position.set(0,0,1);
    this.scene.add(ambiental);
    this.scene.add(direccional);
    var that = this;
    var terreno = new Terreno('./images/Erenvidor-heightmap.png');
    var grid = new GridHelper(50, 10, 0xffffff, 0xffffff);
    grid.position.y = -1;
    this.scene.add(grid);
    terreno.initialize(function(plane){

      that.scene.add(plane);
    });
  }

  addObjectToScene(object){
    this.scene.add(object);
  }

  keyUp(event){
    this.keys[String.fromCharCode(event.keyCode)] = false;
  }

  keyDown(event){
    this.keys[String.fromCharCode(event.keyCode)] = true;
    console.log(this.keys);
  }
  render(){
    var that = this;
    function renderinner(){
      requestAnimationFrame(renderinner);

      var deltaTime = that.clock.getDelta();
      var yaw = 0;
      var forward = 0;
      var height = 0;
      if (that.keys["A"]) {
        yaw = 5;
      } else if (that.keys["D"]) {
        yaw = -5;
      }
      if (that.keys["W"]) {
        forward = -20;
      } else if (that.keys["S"]) {
        forward = 20;
      }
      if (that.keys["Q"]) {
        height = -5;
      } else if (that.keys["E"]) {
        height = 5;
      }
      // console.log(that.keys);

      that.camera.rotation.y += yaw * deltaTime;
      that.camera.translateZ(forward * deltaTime);
      that.camera.translateY(height * deltaTime);

      that.renderer.render(that.scene, that.camera);
    }
    renderinner();
  }

  draw(container){
    container.append(this.renderer.domElement)
    this.render();
  }
}

export default Escena;
