import $ from 'jquery';
import Escena from './Classes/Scene.js';
import Settings from './Classes/settings.js';
import Home from './Classes/Home.js';
import Final from './Classes/Final.js';
import Highscores from './Classes/Highscores.js';
import Start from './Classes/Start.js';
import Pause from './Classes/Pause.js';

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
    var home = new Home();
    var pause = new Pause();
    var scene = new Escena(window.innerWidth, window.innerHeight, settings.resolution, 2);
    generalContainer.append(home.view());
    if (localStorage.getItem('playerName') == null) {
      generalContainer.append(start.view());
      start.events();
    }
    else {
      $('.'+home.container).show();
    }
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
    $(generalContainer).on('goHomeStart', function(){
      $('.'+home.container).show();
      $('.'+start.container).hide();
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
      scene.initialize(1);
      var score = $('<div />', {
        id: "scoreContainer"
      });
      document.addEventListener('keydown', scene.keyDown);
      document.addEventListener('keyup', scene.keyUp);
      $(generalContainer).hide();

      scene.draw($('#scene-container'));
      $('#scene-container').append(score);
      $('#scene-container').append(pause.view());
    });
    $(generalContainer).on('letsPlayTogether', function(){
      scene.initialize(2);
      document.addEventListener('keydown', scene.keyDown);
      document.addEventListener('keyup', scene.keyUp);
      $(generalContainer).hide();
      var score = $('<div />', {
        id: "scoreContainer"
      });
      scene.draw($('#scene-container'));
      $('#scene-container').append(score);
      $('#scene-container').append(pause.view());
    })
    $(generalContainer).on('gameOver', function(e, data){
      var final = new Final(data.score);      
      if (scene.players == 2) {
        if ($('.looser-container, .winner-container').length == 0) {
          $('#scene-container').empty();
          if (data.player == 1) {
            $('#scene-container').append(final.looser(), final.winner());
          }
          else{
            $('#scene-container').append(final.looser(), final.winner());
          }
        }
      }
      else{
        if($('.final-container').length == 0){
          $('#scene-container').empty();
          $('#scene-container').append(final.view());
        }
      }

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
