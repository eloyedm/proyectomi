import $ from 'jquery';
import Escena from './Classes/Scene.js';

class Main{
  constructor() {
    this.initialize();
    super();
  }
  initialize(){
    var scene = new Escena(window.innerWidth, window.innerHeight);
    var container = $("#scene-container");
    console.log(container);
    scene.draw($('#scene-container'));
  }
}

new Main();
