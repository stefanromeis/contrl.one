'use strict';

System.register(['aurelia-framework', 'aurelia-auth'], function (_export, _context) {
  "use strict";

  var inject, FetchConfig, _dec, _class, App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaAuth) {
      FetchConfig = _aureliaAuth.FetchConfig;
    }],
    execute: function () {
      _export('App', App = (_dec = inject(FetchConfig), _dec(_class = function () {
        function App(fetchConfig) {
          _classCallCheck(this, App);

          this.fetchConfig = fetchConfig;
        }

        App.prototype.activate = function activate() {
          this.fetchConfig.configure();
        };

        App.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'contrl.one';
          config.map([{ route: ['', 'home', ':#?'], name: 'home', moduleId: 'home', nav: true }]);
          this.router = router;
        };

        return App;
      }()) || _class));

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJGZXRjaENvbmZpZyIsIkFwcCIsImZldGNoQ29uZmlnIiwiYWN0aXZhdGUiLCJjb25maWd1cmUiLCJjb25maWd1cmVSb3V0ZXIiLCJjb25maWciLCJyb3V0ZXIiLCJ0aXRsZSIsIm1hcCIsInJvdXRlIiwibmFtZSIsIm1vZHVsZUlkIiwibmF2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsWSxxQkFBQUEsTTs7QUFDQUMsaUIsZ0JBQUFBLFc7OztxQkFHS0MsRyxXQURaRixPQUFPQyxXQUFQLEM7QUFHRyxxQkFBWUUsV0FBWixFQUF3QjtBQUFBOztBQUN0QixlQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNEOztzQkFFREMsUSx1QkFBVTtBQUNSLGVBQUtELFdBQUwsQ0FBaUJFLFNBQWpCO0FBQ0QsUzs7c0JBRUhDLGUsNEJBQWdCQyxNLEVBQVFDLE0sRUFBUTtBQUM5QkQsaUJBQU9FLEtBQVAsR0FBZSxZQUFmO0FBQ0FGLGlCQUFPRyxHQUFQLENBQVcsQ0FDVCxFQUFFQyxPQUFPLENBQUMsRUFBRCxFQUFLLE1BQUwsRUFBYSxLQUFiLENBQVQsRUFBOEJDLE1BQU0sTUFBcEMsRUFBaURDLFVBQVUsTUFBM0QsRUFBd0VDLEtBQUssSUFBN0UsRUFEUyxDQUFYO0FBTUEsZUFBS04sTUFBTCxHQUFjQSxNQUFkO0FBQ0QsUyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
