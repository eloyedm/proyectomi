import $ from 'jquery';

class Home {
  constructor() {
    this.domElement = '';
    this.eventReceiver = '.general-container';
    this.container = 'options-container';
  }

  view(){
    this.domElement = '<div class="gameTitle">'+
    '<h1> Web Racer </h1>'+
    '</div>'+
    '<div class="'+this.container+'">'+
      '<div class="start option active">'+
        '<div class="arrow-right"></div>'+
        '<span>Start</span>'+
      '</div>'+
      '<div class="multi option">'+
        '<div class="arrow-right"></div>'+
        '<span>Multiplayer</span>'+
      '</div>'+
      '<div class="settings option">'+
        '<div class="arrow-right"></div>'+
        '<span>Settings</span>'+
      '</div>'+
      '<div class="exit option">'+
        '<div class="arrow-right"></div>'+
        '<span>Exit</span>'+
      '</div>'+
    '</div>';
    return this.domElement;
  }

  events(){
    var that = this;
    $('.options-container .start.option').click(function(){
      $(that.eventReceiver).trigger('letsPlay', {});
    });
    $('.options-container .multi.option').click(function(){
      $(that.eventReceiver).trigger('letsPlayTogether', {});
    });
    $('.options-container .settings.option').click(function(){
      $(that.eventReceiver).trigger('goSettings', {});
    })
  }
}
export default Home;
