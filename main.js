import $ from 'jquery';
import Escena from './Classes/Scene.js';
import Settings from './Classes/settings.js';
import Home from './Classes/Home.js';
import Final from './Classes/Final.js';

class Main{
  constructor() {
    this.initialize();
  }
  initialize(){
    var container = $("#scene-container");
    var generalContainer = $(".general-container");
    var settings = new Settings();
    var home = new Home;
    generalContainer.append(home.view());
    generalContainer.append(settings.view());
    home.events();
    settings.events();
    $(generalContainer).on('goSettings', function(){
      $('.'+home.container).hide();
      $('.'+settings.container).show();
    });
    $(generalContainer).on('goHome', function(){
      $('.'+home.container).show();
      $('.'+settings.container).hide();
    });
    $(generalContainer).on('letsPlay', function(){
      var scene = new Escena(window.innerWidth, window.innerHeight, settings.resolution);
      var score = $('<div />', {
        id: "scoreContainer"
      });
      document.addEventListener('keydown', scene.keyDown);
      document.addEventListener('keyup', scene.keyUp);
      $(generalContainer).hide();
      scene.draw($('#scene-container'));
      $('#scene-container').append(score);
    });

    $(generalContainer).on('gameOver', function(e, data){
      var final = new Final(data.score);
      $('#scene-container').append(final.view())
    })

    // document.addEventListener('keydown', function(event){
    //   console.log(event.keyCode);
    // });
		// document.addEventListener('keyup', function(event){
    //   console.log(event.keyCode);
    // });

  }
}

new Main();
