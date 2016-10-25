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
          config.title = 'contrl.one';
          config.map([{ route: ['', 'home'], name: 'home', moduleId: 'home', nav: true }]);

          this.router = router;
        };

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJBcHAiLCJjb25maWd1cmVSb3V0ZXIiLCJjb25maWciLCJyb3V0ZXIiLCJ0aXRsZSIsIm1hcCIsInJvdXRlIiwibmFtZSIsIm1vZHVsZUlkIiwibmF2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3FCQUNhQSxHOzs7OztzQkFDWEMsZSw0QkFBZ0JDLE0sRUFBUUMsTSxFQUFRO0FBQzlCRCxpQkFBT0UsS0FBUCxHQUFlLFlBQWY7QUFDQUYsaUJBQU9HLEdBQVAsQ0FBVyxDQUNULEVBQUVDLE9BQU8sQ0FBQyxFQUFELEVBQUssTUFBTCxDQUFULEVBQXVCQyxNQUFNLE1BQTdCLEVBQTBDQyxVQUFVLE1BQXBELEVBQWlFQyxLQUFLLElBQXRFLEVBRFMsQ0FBWDs7QUFPQSxlQUFLTixNQUFMLEdBQWNBLE1BQWQ7QUFFRCxTIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
