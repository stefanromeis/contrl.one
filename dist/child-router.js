'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var ChildRouter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('ChildRouter', ChildRouter = function () {
        function ChildRouter() {
          _classCallCheck(this, ChildRouter);

          this.heading = 'Child Router';
        }

        ChildRouter.prototype.configureRouter = function configureRouter(config, router) {
          config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users' }, { route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }]);

          this.router = router;
        };

        return ChildRouter;
      }());

      _export('ChildRouter', ChildRouter);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoaWxkLXJvdXRlci5qcyJdLCJuYW1lcyI6WyJDaGlsZFJvdXRlciIsImhlYWRpbmciLCJjb25maWd1cmVSb3V0ZXIiLCJjb25maWciLCJyb3V0ZXIiLCJtYXAiLCJyb3V0ZSIsIm5hbWUiLCJtb2R1bGVJZCIsIm5hdiIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzZCQUFhQSxXOzs7O2VBQ1hDLE8sR0FBVSxjOzs7OEJBRVZDLGUsNEJBQWdCQyxNLEVBQVFDLE0sRUFBUTtBQUM5QkQsaUJBQU9FLEdBQVAsQ0FBVyxDQUNULEVBQUVDLE9BQU8sQ0FBQyxFQUFELEVBQUssU0FBTCxDQUFULEVBQTBCQyxNQUFNLFNBQWhDLEVBQWlEQyxVQUFVLFNBQTNELEVBQTRFQyxLQUFLLElBQWpGLEVBQXVGQyxPQUFPLFNBQTlGLEVBRFMsRUFFVCxFQUFFSixPQUFPLE9BQVQsRUFBMEJDLE1BQU0sT0FBaEMsRUFBaURDLFVBQVUsT0FBM0QsRUFBNEVDLEtBQUssSUFBakYsRUFBdUZDLE9BQU8sY0FBOUYsRUFGUyxFQUdULEVBQUVKLE9BQU8sY0FBVCxFQUEwQkMsTUFBTSxjQUFoQyxFQUFpREMsVUFBVSxjQUEzRCxFQUE0RUMsS0FBSyxJQUFqRixFQUF1RkMsT0FBTyxjQUE5RixFQUhTLENBQVg7O0FBTUEsZUFBS04sTUFBTCxHQUFjQSxNQUFkO0FBQ0QsUyIsImZpbGUiOiJjaGlsZC1yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
