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

        App.prototype.activate = function activate() {};

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJBcHAiLCJhY3RpdmF0ZSIsImNvbmZpZ3VyZVJvdXRlciIsImNvbmZpZyIsInJvdXRlciIsInRpdGxlIiwibWFwIiwicm91dGUiLCJuYW1lIiwibW9kdWxlSWQiLCJuYXYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxZLHFCQUFBQSxNOzs7cUJBR0tDLEcsV0FEWkQsUTtBQUdHLHVCQUFhO0FBQUE7QUFDWjs7c0JBRURFLFEsdUJBQVUsQ0FDVCxDOztzQkFFSEMsZSw0QkFBZ0JDLE0sRUFBUUMsTSxFQUFRO0FBQzlCRCxpQkFBT0UsS0FBUCxHQUFlLFlBQWY7QUFDQUYsaUJBQU9HLEdBQVAsQ0FBVyxDQUNULEVBQUVDLE9BQU8sQ0FBQyxFQUFELEVBQUssTUFBTCxFQUFhLEtBQWIsQ0FBVCxFQUE4QkMsTUFBTSxNQUFwQyxFQUFpREMsVUFBVSxNQUEzRCxFQUF3RUMsS0FBSyxJQUE3RSxFQURTLENBQVg7QUFNQSxlQUFLTixNQUFMLEdBQWNBLE1BQWQ7QUFDRCxTIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
