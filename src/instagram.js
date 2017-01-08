import {inject} from 'aurelia-framework';

// DI
@inject()
export class Instagram {
  heading = "Me";
  me = {};
  

  constructor(){
    // initialize
    this.active = false;
  }

  activate() {

  }
}
