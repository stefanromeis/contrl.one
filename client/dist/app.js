'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('App', App = function () {
        function App() {
          _classCallCheck(this, App);
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'Contrl.One';
          config.map([{
            route: ['', ':?'],
            moduleId: 'home'
          }]);
          this.router = router;
        };

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJBcHAiLCJjb25maWd1cmVSb3V0ZXIiLCJjb25maWciLCJyb3V0ZXIiLCJ0aXRsZSIsIm1hcCIsInJvdXRlIiwibW9kdWxlSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQWFBLEc7Ozs7O3NCQUVYQyxlLDRCQUFnQkMsTSxFQUFRQyxNLEVBQVE7QUFDOUJELGlCQUFPRSxLQUFQLEdBQWUsWUFBZjtBQUNBRixpQkFBT0csR0FBUCxDQUFXLENBQ1Q7QUFDRUMsbUJBQU8sQ0FBQyxFQUFELEVBQUssSUFBTCxDQURUO0FBRUVDLHNCQUFVO0FBRlosV0FEUyxDQUFYO0FBTUEsZUFBS0osTUFBTCxHQUFjQSxNQUFkO0FBQ0QsUyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
