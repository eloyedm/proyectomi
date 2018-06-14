class Pause {
  constructor() {
    this.domElement = '';
  }

  view(){
    console.log("si viene por el pause");
    this.domElement = '<div id="pauseContainer">'+
      '<div class="pauseNotice">'+
        '<span>PAUSE</span>'+
        '<span id="quit"><a href="/">SALIR</a></span>'+
      '</div>'+
    '</div>';
    return this.domElement;
  }
}

export default Pause;
