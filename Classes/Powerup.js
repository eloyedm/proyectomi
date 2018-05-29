import Model from './Model.js';
class Powerup {
  constructor() {
    this.basePowerup = '';
  }
  initialize(){
    var crateModel = new Model('./Models/', 'crate.obj', 'crate.mtl');
    this.basePowerup = crateModel;
  }
  buildPowers(callback);
}
export default Powerup
