import $ from 'jquery';
import Escena from './Classes/Scene.js';

class Main{
  constructor() {
    this.initialize();
  }
  initialize(){
    var scene = new Escena(window.innerWidth, window.innerHeight);
    var container = $("#scene-container");
    scene.draw($('#scene-container'));
  }
}

new Main();
