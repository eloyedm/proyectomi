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
      '<span> YOUR SCORE: </span>'+
      '<div class"finalScore">'+this.score+'</div>'+
      '<span> BETTER LUCK NEXT TIME </span>'+
      '<div class="sharers">'+
        '<div class="twitter-share">'+
          '<span>Twitter</span>'+
        '</div>'+
        '<div class="facebook-share">'+
          '<div class="fb-share-button" data-href="https://localhost/proyectomi" data-layout="button" data-size="small" data-mobile-iframe="false"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flocalhost%2Fproyectomi&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Compartir</a></div>'+
        '</div>'+
      '</div>'+
    '</div>';

    return this.domElement;
  }

  addSharers(){
    console.log(VanillaSharing);
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
  }
}
export default Final
