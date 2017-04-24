export class App {

  configureRouter(config, router) {
    config.title = 'Contrl.One';
    config.map([
      {
        route: ['', ':?'],
        moduleId: 'home',
      },
    ]);
    this.router = router;
  }
}