import {
  Color,
  BoxGeometry,
  Mesh} from 'three';

class Terreno{
  constructor(imagen){
    this.heightmap = imagen;
    this.initialize();
  }
}
