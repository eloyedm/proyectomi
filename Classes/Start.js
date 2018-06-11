import $ from 'jquery';

class Start {
  constructor() {
    this.container = 'start-container';
    this.domElement = '';
    this.eventReceiver = '.general-container';
  }

  view(){
    this.domElement = '<div class="'+this.container+'">'+
    '<div> Introduce tu nickname </div>'+
    '<input id="nickname" type="text" />'+
    '<button type="button">Enviar</button>'+
    '</div>';
    return this.domElement;
  }
  events(){
    var that = this;
    var sendButton = '.'+this.container+' button';
    $(sendButton).click(function(){
      var nickName = $("#nickname").val();
      $.ajax({
        method: 'GET',
        url: '/proyectomi/services.php',
        data: {
          action: 'newplayer',
          name: nickName
        },
        success: function(){
          console.log("este ya estaba");
          localStorage.setItem('playerName', nickName);
          $(that.eventReceiver).trigger('goHomeStart', {});
        }
      });
    });
  }
}
export default Start;
