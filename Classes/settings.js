import $ from 'jquery';

class Settings {
  constructor() {
    this.sound = true;
    this.resolution = 'highp';
    this.domElement = '';
    this.eventReceiver = '.general-container';
    this.container = 'settings-container';
  }

  view(){
    this.domElement = '<div class="'+this.container+'">'+
      '<div class="sound option">'+
        '<span>Sound</span>'+
        '<div class="sound-switch">'+
          '<span game-value="true" class="active">ON</span>'+
          '<span game-value="false" >OFF</span>'+
        '</div>'+
      '</div>'+
      '<div class="volume option">'+
        '<span>Volume</span>'+
        '<div class="slidecontainer">'+
          '<input type="range" min="1" max="100" value="100" class="slider" id="myRange">'+
        '</div>'+
      '</div>'+
      '<div class="size option">'+
        '<span>Resolution</span>'+
        '<div class="resolution-options">'+
          '<span game-value="lowp">360</span>'+
          '<span game-value="mediump">720</span>'+
          '<span game-value="highp" class="active">1080</span>'+
        '</div>'+
      '</div>'+
      '<div class="exit option">'+
        '<span>Back</span>'+
      '</div>'+
    '</div>';
    return this.domElement;
  }

  events(){
    var that = this;
    $(".settings-container .sound-switch > span").click(function(){
      var parent = $(this).parent();
      parent.find("span").removeClass("active");
      $(this).addClass("active");
      that.sound = $(this).attr('game-value');
      console.log(that.sound);
      if(that.sound == 'true'){
        $('#audioPlayer')[0].play();
      }
      else{
        $('#audioPlayer')[0].pause();
      }
    })

    $(".settings-container .resolution-options > span").click(function(){
      var parent = $(this).parent();
      parent.find("span").removeClass("active");
      $(this).addClass("active");
      that.resolution = $(this).attr('game-value');
    });
    $(".settings-container .exit.option").click(function(){
      $(that.eventReceiver).trigger('goHome');
    });
    $('.settings-container .volume.option input').change(function(e){
      $('#audioPlayer')[0].volume = parseInt(this.value)/100;
    })
  }
}

export default Settings;
