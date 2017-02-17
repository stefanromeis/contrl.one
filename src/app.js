import {inject} from 'aurelia-framework';
import {FetchConfig} from 'aurelia-auth';

@inject(FetchConfig )
export class App {
  
    constructor(fetchConfig){
      this.fetchConfig = fetchConfig;
    }

    activate(){
      this.fetchConfig.configure();
    }

  configureRouter(config, router) {
    config.title = 'contrl.one';
    config.map([
      { route: ['', 'home', ':#?'], name: 'home',      moduleId: 'home',      nav: true },

//    { route: 'callback',      name: 'callback',     moduleId: 'callback',     nav: false, title: 'Callback' },
//    { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);
    this.router = router;
  }

}
