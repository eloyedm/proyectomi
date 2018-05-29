import $ from 'jquery';

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
    '</div>';

    return this.domElement;
  }
}
export default Final
