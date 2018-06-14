import $ from 'jquery';

class Highscores{
  constructor(){
    this.domElement = '';
    this.eventReceiver = '.general-container';
    this.container = 'highscores-container';
  }

  view(){
    var selectString = '.'+this.container+' .scores';
    var serviceUrl = '/';
    // var serviceUrl = '/proyectomi/';
    $.ajax({
      method: "GET",
      url: serviceUrl+'services.php',
      data: {
        action: 'scores'
      },
      success: function(data){
        for (var i = 0; i < data.length; i++) {
          var scoreItem = $("<div />",{
            class: 'score'
          });
          var scoreNum = $('<div />',{
            class: 'quantity',
            text: data[i].score
          });
          var scoreName = $('<div />',{
            class: 'playerName',
            text: data[i].name
          });
          scoreItem.append(scoreNum, scoreName);
          $(selectString).append(scoreItem);
        }
      }
    });
    this.domElement = '<div class="'+this.container+'">'+
    '<div class="scores"></div>'+
    '<div class="exit option"><span>Back</span></div>'+
    '</div>';
    return this.domElement;
  }
  events(){
    var that = this;
    $(".highscores-container .exit.option").click(function(){
      $(that.eventReceiver).trigger('goHomeFH');
    })
  }
}
export default Highscores;
