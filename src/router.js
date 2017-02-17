export class Router {
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