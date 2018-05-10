import $ from 'jquery';
import Escena from './Classes/Scene.js';

class Main{
  constructor() {
    this.initialize();
  }
  initialize(){
    var scene = new Escena(window.innerWidth, window.innerHeight);
    document.addEventListener('keydown', scene.keyDown);
		document.addEventListener('keyup', scene.keyUp);
    // document.addEventListener('keydown', function(event){
    //   console.log(event.keyCode);
    // });
		// document.addEventListener('keyup', function(event){
    //   console.log(event.keyCode);
    // });
    var container = $("#scene-container");
    scene.draw($('#scene-container'));
  }
}

new Main();
