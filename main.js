import $ from 'jquery';
import Escena from './Classes/Scene.js';
import Settings from './Classes/settings.js';
import Home from './Classes/Home.js';
import Final from './Classes/Final.js';
import Highscores from './Classes/Highscores.js';
import Start from './Classes/Start.js';

class Main{
  constructor() {
    this.initialize();
  }
  initialize(){
    var container = $("#scene-container");
    var generalContainer = $(".general-container");
    var start = new Start();
    var settings = new Settings();
    var highscores = new Highscores();
    var home = new Home;
    generalContainer.append(start.view());
    generalContainer.append(home.view());
    generalContainer.append(settings.view());
    generalContainer.append(highscores.view());
    home.events();
    settings.events();
    highscores.events();
    $(generalContainer).on('goSettings', function(){
      $('.'+home.container).hide();
      $('.'+settings.container).show();
    });
    $(generalContainer).on('goHome', function(){
      $('.'+home.container).show();
      $('.'+settings.container).hide();
    });
    $(generalContainer).on('goHomeFH', function(){
      $('.'+home.container).show();
      $('.'+highscores.container).hide();
    });
    $(generalContainer).on('goHighscores', function(){
      $('.'+home.container).hide();
      $('.'+highscores.container).show();
    });
    $(generalContainer).on('letsPlay', function(){
      var scene = new Escena(window.innerWidth, window.innerHeight, settings.resolution, 1);
      var score = $('<div />', {
        id: "scoreContainer"
      });
      document.addEventListener('keydown', scene.keyDown);
      document.addEventListener('keyup', scene.keyUp);
      $(generalContainer).hide();

      scene.draw($('#scene-container'));
      $('#scene-container').append(score);
    });
    $(generalContainer).on('letsPlayTogether', function(){
      var scene = new Escena(window.innerWidth, window.innerHeight, settings.resolution, 2);
      document.addEventListener('keydown', scene.keyDown);
      document.addEventListener('keyup', scene.keyUp);
      $(generalContainer).hide();
      scene.draw($('#scene-container'));
      $('#scene-container').append(score);
    })
    $(generalContainer).on('gameOver', function(e, data){
      var final = new Final(data.score);
      $('#scene-container').append(final.view());
      final.addSharers();
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
