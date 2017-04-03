import {inject} from 'aurelia-framework';

@inject()
export class App {

  configureRouter(config, router) {
    config.title = 'contrl.one';
    config.map([
      { 
        route: ['', 'home', ':#?'], 
        name: 'home',      
        moduleId: 'home',      
        nav: true 
      },

//    { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);
    this.router = router;
  }

}
