import $ from 'jquery';
import Scene from './Classes/Scene.js';
window.jQuery = $;
window.$ = $;
class Main{
  constructor() {
    this.initialize();
  }
  initialize(){
    var scene = new Scene(window.innerWidth, window.innerHeight);
    var container = $("#scene-container");
    console.log(container);
    scene.draw($('#scene-container'));
  }
}

new Main();
