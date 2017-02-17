'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var Router;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('Router', Router = function () {
        function Router() {
          _classCallCheck(this, Router);
        }

        Router.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'contrl.one';
          config.map([{ route: ['', 'home', ':#?'], name: 'home', moduleId: 'home', nav: true }]);
          this.router = router;
        };

        return Router;
      }());

      _export('Router', Router);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci5qcyJdLCJuYW1lcyI6WyJSb3V0ZXIiLCJjb25maWd1cmVSb3V0ZXIiLCJjb25maWciLCJyb3V0ZXIiLCJ0aXRsZSIsIm1hcCIsInJvdXRlIiwibmFtZSIsIm1vZHVsZUlkIiwibmF2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3dCQUFhQSxNOzs7Ozt5QkFDWEMsZSw0QkFBZ0JDLE0sRUFBUUMsTSxFQUFRO0FBQzlCRCxpQkFBT0UsS0FBUCxHQUFlLFlBQWY7QUFDQUYsaUJBQU9HLEdBQVAsQ0FBVyxDQUNULEVBQUVDLE9BQU8sQ0FBQyxFQUFELEVBQUssTUFBTCxFQUFhLEtBQWIsQ0FBVCxFQUE4QkMsTUFBTSxNQUFwQyxFQUFpREMsVUFBVSxNQUEzRCxFQUF3RUMsS0FBSyxJQUE3RSxFQURTLENBQVg7QUFNQSxlQUFLTixNQUFMLEdBQWNBLE1BQWQ7QUFFRCxTIiwiZmlsZSI6InJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
