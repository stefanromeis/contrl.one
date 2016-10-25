import {inject} from 'aurelia-framework';
import {initialize} from 'aurelia-pal-browser';
import {IgService} from 'services/ig-service';
initialize();

// DI
@inject(IgService)
export class Instagram {
  heading = "Me";
  me = {};

  constructor(igService){
    // initialize
    this.igService = igService;
  }

  activate() {
    if(localStorage.getItem('token')){
      // Resolve promise
      return this.igService.me()
        .then(res => res.response.data)
        .then(me =>
          {
            // Bind to view
            this.me = me
          });
      }
  }
}
