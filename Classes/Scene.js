import {Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  Geometry,
  Mesh,
  Math,
  MeshLambertMaterial,
  MeshPhongMaterial,
  AmbientLight,
  GridHelper,
  Clock,
  Box3,
  Vector3,
  Matrix4,
  Raycaster,
  DirectionalLight} from 'three';
import $ from 'jquery';
import Terreno from './Terrain.js';
import Player from './Player.js';
import Pista from './Road.js';
import Skydome from './Skydome.js';
import Score from './Score.js';
import Powerup from './Powerup.js';
// import Particles from './Particles.js';
const autoBind = require('auto-bind');

class Escena{
  constructor(ancho, alto, quality, players){
    this.scene = "";
    this.camera  = "";
    this.cameraMulti = "";
    this.renderer = "";
    this.rendererMulti = "";
    this.alto = alto;
    this.ancho = ancho;
    this.keys = {
      'A' : false,
      'W' : false,
      'D': false,
      'S' : false
    };
    this.quality = quality;
    this.players = players;
    this.track = '';
    this.collidableMeshes = [];
    this.collidablePowers = [];
    this.score = '';
    this.particles = '';
    this.tick = 0;
    autoBind(this);
    this.initialize();
  }
  initialize(){
    this.renderer = new WebGLRenderer({
      precision: this.quality
    });
    if (this.players == 2) {
      this.rendererMulti = new WebGLRenderer({
        precision: this.quality
      })
    }
    this.renderer.setClearColor(new Color(0,0,0));
    if (this.players == 1) {
      this.renderer.setSize(this.ancho, this.alto);
    }else{
      this.renderer.setSize(this.ancho/2, this.alto);
      this.rendererMulti.setSize(this.ancho/2, this.alto);
    }

    this.clock = new Clock();
    var pista = new Pista();
    if (this.players == 1) {
      this.camera = new PerspectiveCamera(
        75,
        this.ancho /this.alto,
        0.1,
        300
      );
    }
    else{
      this.camera = new PerspectiveCamera(
        75,
        (this.ancho / 2) /this.alto,
        0.1,
        300
      );
      this.cameraMulti = new PerspectiveCamera(
        75,
        (this.ancho / 2) /this.alto,
        0.1,
        300
      )
    }
    this.scene = new Scene();

    var material = new MeshLambertMaterial({
      color: new Color(0,0,1)
    });

    material = new MeshPhongMaterial({
      color: new Color(0.5, 0.5, 0.5),
      specular: new Color(1,1,1),
      shininess: 500
    });
    var ambiental = new AmbientLight(new Color(1,1,1), 1.0);
    var direccional = new DirectionalLight(new Color(1,1,0), 0.6);
    var score = new Score();
    this.score = score;
    direccional.position.set(0,0,1);
    this.scene.add(ambiental);
    this.scene.add(direccional);
    var skydome = new Skydome();
    this.scene.add(skydome.initialize());
    var that = this;
    var terreno = new Terreno('./images/Erenvidor-heightmap.png');
    // var grid = new GridHelper(50, 10, 0xffffff, 0xffffff);
    // grid.position.y = -1;
    // this.scene.add(grid);
    var powerup = new Powerup();
    // var particles = new Particles();
    // this.scene.add(particles.particleSystem);
    // this.particles = particles;
    // console.log(this.particles);
    // terreno.initialize(function(plane){
    //   that.scene.add(plane);
    // });
    pista.createBoxes(function(boxes){
      for (var i = 0; i < boxes.length; i++) {
        that.collidableMeshes.push(boxes[i]);
        that.scene.add(boxes[i]);
      }
    })
    this.addPLayers();

    terreno.buildTrack(function(terrenoCargado){
      // terrenoCargado.scale.set(10,10,10);
      that.scene.add(terrenoCargado);
      that.track = that.scene.getObjectByName('modeloPista');
      that.collidableMeshes.push(terrenoCargado.children[0]);
      that.collidableMeshes.push(terrenoCargado.children[1]);
      console.log(terrenoCargado);
    });
    terreno.buildLandscape(function(terrenoCargado){
      that.scene.add(terrenoCargado);
    })
    powerup.spheres(function(spheres){
      for (var i = 0; i < spheres.length; i++) {
        that.scene.add(spheres[i]);
        that.collidablePowers.push(spheres[i]);
      }
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
  }

  addPLayers(){
    var player1 = new Player('UP', 'DOWN', 'LEFT', 'RIGHT', 1);
    var player2 = new Player('W', 'S', 'A', 'D', 1);
    var that = this;
    player1.drawPlayerModel((playerCargado) => {
      // that.camera.position.set(0, 5, -3);
      playerCargado.position.x = -176;
      playerCargado.position.y = 33;
      playerCargado.position.z = -10;
      // playerCargado.boost = 5;
      // playerCargado.rotation.y += 90;
      that.scene.add(playerCargado);
      // that.camera.lookAt(playerCargado.position);
    });
    if (this.players == 2) {
      player2.drawSecondPLayerModel((playerCargado) => {
        playerCargado.position.x = -180;
        playerCargado.position.y = 33;
        playerCargado.position.z = -10;
        that.scene.add(playerCargado);
      });
    }
  }

  checkCollisions(mesh){
    var originPoint = mesh.position.clone();
    for (var vertexIndex = 0; vertexIndex < mesh.children.length; vertexIndex++) {
      var localVertex = mesh.children[vertexIndex].clone();
      var globalVertex = localVertex.position.applyMatrix4(mesh.matrix);
      var directionVector = globalVertex.sub(mesh.position);

      var ray = new Raycaster(originPoint, directionVector.clone().normalize());
      var collisionResults = ray.intersectObjects(this.collidableMeshes);
      if(collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
        if(collisionResults[0].object.id == this.collidableMeshes[0].id) {
          this.collidableMeshes.splice(0,1);
          // mesh.lookAt(this.collidableMeshes[0].position)
          // mesh.position.y = collisionResults[0].point.y;
          this.removeObjectFromScene(collisionResults[0].object.name);
        }
        // if (collisionResults[0].object.name == 'Road') {
        //   console.log("tamos chocando");
        //   mesh.position.y = collisionResults[0].point.y;
        //   mesh.updateMatrix();
        // }
      }
      if (collisionResults.length > 0) {
        mesh.position.y = collisionResults[0].point.y;
      }
      collisionResults = ray.intersectObjects(this.collidablePowers);
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
        mesh.boost = 7;
      }
    }
  }

  keepCarOnTrack(player){
    var originPoint = this.track.position.clone();
    for (var vertexIndex = 0; vertexIndex < this.track.vertices.length; vertexIndex++) {
      var localVertex = this.track.vertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4(this.track.matrix);
      var directionVector = globalVertex.sub(this.track.position);
      var ray = new Raycaster(originPoint, directionVector.clone().normalize());
      var collidableTracks = [player];
      var collisionResults = ray.intersectObjects(collidableTracks);
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
        console.log("aqui pego con el terreno");
        // player.position.y = collisionResults[0].point.y;
      }

    }
  }

  render(){
    var that = this;
    console.log(this.collidableMeshes);
    function renderinner(){
      var request = requestAnimationFrame(renderinner);
      var player1 = that.scene.getObjectByName('modeloPlayer');
      var player2 = that.scene.getObjectByName('modeloPlayer2');
      var deltaTime = that.clock.getDelta();
      // var deltaParticles = that.clock.getDelta() * that.particles.spawnerOptions.timeScale;
      // that.tick += deltaParticles;
      var yaw = 0;
      var forward = 0;
      var height = 0;
      var height2 = 0;
      var yaw2 = 0;
      var forward2 = 0;
      if (that.keys["A"]) {
        yaw = 3;
      }
      else if (that.keys["D"]) {
        yaw = -3;
      }
      if (that.keys["W"]) {
        forward = -10;
      }
      else if (that.keys["S"]) {
        forward = 10;
      }
      if (that.keys["Q"]) {
        height = -5;
      }
      else if (that.keys["E"]) {
        height = 5;
      }
      if (that.keys["O"]) {
        height2 = -5;
      }
      else if (that.keys["U"]) {
        height2 = 5;
      }
      if (that.keys['K']) {
        forward2 = 10;
      }
      else if (that.keys['I']) {
        forward2 = -10;
      }
      if (that.keys['J']) {
        yaw2 = 3
      }
      else if (that.keys['L']) {
        yaw2 = -3;
      }
      if (that.keys['T']) {
        // cancelAnimationFrame(this.id);
        cancelAnimationFrame(request);
        $("#scene-container").empty();
        $(".general-container").trigger('gameOver', {score: that.score.view()});
      }
      // console.log(that.keys);

      // that.camera.rotklation.y += yaw * deltaTime;
      if (typeof player1 != "undefined") {
        player1.rotation.y += yaw * deltaTime;
        // player1.position.y -= 0.01;
        if (player1.boost > 0) {
          player1.boost -= deltaTime;
          forward2 *= 2;
        }
        player1.translateZ(forward * deltaTime);
        player1.translateY(height* deltaTime);
        var relativeCameraOffset = new Vector3(0,2,3);
        var cameraOffset = relativeCameraOffset.applyMatrix4( player1.matrixWorld );
        that.camera.position.x = cameraOffset.x;
        that.camera.position.y = cameraOffset.y;
        that.camera.position.z = cameraOffset.z;
        that.camera.lookAt(player1.position);
        // if (deltaParticles > 0) {
        //   that.particles.options.position.x = player1.position.x;
        //   that.particles.options.position.y = player1.position.y;
        //   that.particles.options.position.z = player1.position.z;
        //   for (var x = 0; x < that.particles.spawnerOptions.spawnRate; x++) {
            // that.particles.particleSystem.spawnParticle(that.particles.options);
        //   }
        // }
        // that.particles.particleSystem.update(that.tick);
        that.checkCollisions(player1);
        if (that.collidableMeshes.length == 0) {
          cancelAnimationFrame(request);
          $("#scene-container").empty();
          $(".general-container").trigger('gameOver', {score: that.score.view()});
        }
        // that.keepCarOnTrack(player1);
      }
      if (typeof player2 != "undefined") {
        player2.translateZ(forward2 * deltaTime);
        player2.rotation.y += yaw2 * deltaTime;
        if (player2.boost > 0) {
          player2.boost -= deltaTime;
          forward *= 2;
        }
        player2.translateY(height2* deltaTime);
        var relativeCameraOffset = new Vector3(0,2,3);
        var cameraOffset = relativeCameraOffset.applyMatrix4( player2.matrixWorld );
        that.cameraMulti.position.x = cameraOffset.x;
        that.cameraMulti.position.y = cameraOffset.y;
        that.cameraMulti.position.z = cameraOffset.z;
        that.cameraMulti.lookAt(player2.position);
        that.checkCollisions(player2);
        if (that.collidableMeshes.length == 0) {
          cancelAnimationFrame(request);
          $("#scene-container").empty();
          $(".general-container").trigger('gameOver', {score: that.score.view()});
        }
      }


      // that.camera.position = player1.position;
      // that.camera.translateX((forward2 * -1) * deltaTime);
      // that.camera.position.y  = player1.position.y + 2;
      // that.camera.translateY(height * deltaTime);
      // that.camera.lookAt(player1.position);
      if (typeof that.scene != "undefined" && typeof that.camera != "undefined") {
        that.renderer.render(that.scene, that.camera);
        if (that.players == 2) {
          that.rendererMulti.render(that.scene, that.cameraMulti);
        }
      }
      $("#scoreContainer").text(that.score.view());
    }
    renderinner();
  }

  removeObjectFromScene(name){
    var selectedObject = this.scene.getObjectByName(name);
    this.scene.remove(selectedObject);
  }

  draw(container){
    container.append(this.renderer.domElement)
    if (this.players == 2) {
      container.append(this.rendererMulti.domElement);
    }
    this.render();
  }
}

export default Escena;
