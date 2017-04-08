'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, _dec, _class, App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      _export('App', App = (_dec = inject(), _dec(_class = function () {
        function App() {
          _classCallCheck(this, App);
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'contrl.one';
          config.map([{
            route: ['', 'home', ':#?'],
            name: 'home',
            moduleId: 'home'
          }]);
          this.router = router;
        };

        return App;
      }()) || _class));

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJBcHAiLCJjb25maWd1cmVSb3V0ZXIiLCJjb25maWciLCJyb3V0ZXIiLCJ0aXRsZSIsIm1hcCIsInJvdXRlIiwibmFtZSIsIm1vZHVsZUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsWSxxQkFBQUEsTTs7O3FCQUdLQyxHLFdBRFpELFE7Ozs7O3NCQUdDRSxlLDRCQUFnQkMsTSxFQUFRQyxNLEVBQVE7QUFDOUJELGlCQUFPRSxLQUFQLEdBQWUsWUFBZjtBQUNBRixpQkFBT0csR0FBUCxDQUFXLENBQ1Q7QUFDRUMsbUJBQU8sQ0FBQyxFQUFELEVBQUssTUFBTCxFQUFhLEtBQWIsQ0FEVDtBQUVFQyxrQkFBTSxNQUZSO0FBR0VDLHNCQUFVO0FBSFosV0FEUyxDQUFYO0FBU0EsZUFBS0wsTUFBTCxHQUFjQSxNQUFkO0FBQ0QsUyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
