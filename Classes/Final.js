import $ from 'jquery';
import * as VanillaSharing from 'vanilla-sharing';

class Final {
  constructor(score) {
    this.domElement = '';
    this.eventReceiver = '.general-container';
    this.container = 'final-container';
    this.score = score;
  }

  view(){
    this.domElement = '<div class="final-container">'+
      '<span> YOUR SCORE </span>'+
      '<div class="finalScore">'+this.score+'</div>'+
      '<span id="highscoreNotice"> NEW HIGHSCORE </span>'+
      '<span id="scoreNotice"> BETTER LUCK NEXT TIME </span>'+
      '<div class="sharers">'+
        '<div class="twitter-share">'+
          '<span>Twitter</span>'+
        '</div>'+
        '<div class="facebook-share">'+
          '<div class="fb-share-button" data-href="https://localhost/proyectomi" data-layout="button" data-size="small" data-mobile-iframe="false"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flocalhost%2Fproyectomi&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Compartir</a></div>'+
        '</div>'+
      '</div>'+
      '<div class="retry"><a href="/">RETRY</a></div>'+
    '</div>';

    return this.domElement;
  }

  addSharers(){
    $(".twitter-share").click(function(){
      VanillaSharing.tw({
        url: window.location.href,
        title: 'Acabo de jugar Web Racers'
      });
    })
    // $('.facebook-share').click(function(){
    //   console.log("si me picaste");
    //   VanillaSharing.fbShare({
    //     url: window.location.href,
    //     redirectUri: window.location.href,
    //     fbAppId: '1256136544478956'
    //   });
    // })
    this.checkScores();
  }

  checkScores(){
    var score = this.score;
    var playerName = localStorage.getItem('playerName');
    var serviceUrl = '/';
    // var serviceUrl = '/proyectomi/';
    $.ajax({
      method: "GET",
      url: serviceUrl+'services.php',
      data: {
        action: 'checkScores',
        score: score,
        name: playerName
      },
      success: function(data){
        if (data.status) {
          $('#highscoreNotice').show();
        }
        else{
          $('#scoreNotice').show();
        }
      }
    })
  }
}
export default Final
