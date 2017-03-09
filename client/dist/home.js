'use strict';

System.register(['aurelia-i18n', 'aurelia-framework', 'services/auth-service', 'services/ig-service'], function (_export, _context) {
  "use strict";

  var I18N, inject, AuthService, IgService, _createClass, _dec, _class, Welcome, UpperValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaI18n) {
      I18N = _aureliaI18n.I18N;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_servicesAuthService) {
      AuthService = _servicesAuthService.AuthService;
    }, function (_servicesIgService) {
      IgService = _servicesIgService.IgService;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('Welcome', Welcome = (_dec = inject(I18N), _dec(_class = function () {
        function Welcome(authService, igService) {
          _classCallCheck(this, Welcome);

          this.authService = authService;
          this.igService = igService;
          this.heading = 'Welcome to the Aurelia Navigation App!';
          this.firstName = 'John';
          this.lastName = 'Doe';
          this.previousValue = this.fullName;
        }

        Welcome.prototype.signin = function signin() {
          this.authService.signin();
        };

        Welcome.prototype.signout = function signout() {
          this.authService.signout();
        };

        Welcome.prototype.activate = function activate() {
          var _this = this;

          if (localStorage.getItem('token')) {
            return this.igService.recent().then(function (res) {
              return res.response.data;
            }).then(function (recent) {
              _this.recent = recent;
            });
          }
        };

        Welcome.prototype.submit = function submit() {
          this.previousValue = this.fullName;
          alert('Welcome, ' + this.fullName + '!');
        };

        Welcome.prototype.canDeactivate = function canDeactivate() {
          if (this.fullName !== this.previousValue) {
            return confirm('Are you sure you want to leave?');
          }
        };

        _createClass(Welcome, [{
          key: 'fullName',
          get: function get() {
            return this.firstName + ' ' + this.lastName;
          }
        }]);

        return Welcome;
      }()) || _class));

      _export('Welcome', Welcome);

      _export('UpperValueConverter', UpperValueConverter = function () {
        function UpperValueConverter() {
          _classCallCheck(this, UpperValueConverter);
        }

        UpperValueConverter.prototype.toView = function toView(value) {
          return value && value.toUpperCase();
        };

        return UpperValueConverter;
      }());

      _export('UpperValueConverter', UpperValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSTE4TiIsImluamVjdCIsIkF1dGhTZXJ2aWNlIiwiSWdTZXJ2aWNlIiwiV2VsY29tZSIsImF1dGhTZXJ2aWNlIiwiaWdTZXJ2aWNlIiwiaGVhZGluZyIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicHJldmlvdXNWYWx1ZSIsImZ1bGxOYW1lIiwic2lnbmluIiwic2lnbm91dCIsImFjdGl2YXRlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInJlY2VudCIsInRoZW4iLCJyZXMiLCJyZXNwb25zZSIsImRhdGEiLCJzdWJtaXQiLCJhbGVydCIsImNhbkRlYWN0aXZhdGUiLCJjb25maXJtIiwiVXBwZXJWYWx1ZUNvbnZlcnRlciIsInRvVmlldyIsInZhbHVlIiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxVLGdCQUFBQSxJOztBQUNBQyxZLHFCQUFBQSxNOztBQUVBQyxpQix3QkFBQUEsVzs7QUFDQUMsZSxzQkFBQUEsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQUdLQyxPLFdBRFpILE9BQU9ELElBQVAsQztBQUVDLHlCQUFZSyxXQUFaLEVBQXlCQyxTQUF6QixFQUFtQztBQUFBOztBQUVqQyxlQUFLRCxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLGVBQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsZUFBS0MsT0FBTCxHQUFlLHdDQUFmO0FBQ0EsZUFBS0MsU0FBTCxHQUFpQixNQUFqQjtBQUNBLGVBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxlQUFLQyxhQUFMLEdBQXFCLEtBQUtDLFFBQTFCO0FBRUQ7OzBCQUVEQyxNLHFCQUFTO0FBRVAsZUFBS1AsV0FBTCxDQUFpQk8sTUFBakI7QUFDRCxTOzswQkFFREMsTyxzQkFBVTtBQUVSLGVBQUtSLFdBQUwsQ0FBaUJRLE9BQWpCO0FBQ0QsUzs7MEJBR0RDLFEsdUJBQVc7QUFBQTs7QUFDVCxjQUFHQyxhQUFhQyxPQUFiLENBQXFCLE9BQXJCLENBQUgsRUFBaUM7QUFFL0IsbUJBQU8sS0FBS1YsU0FBTCxDQUFlVyxNQUFmLEdBQ0pDLElBREksQ0FDQztBQUFBLHFCQUFPQyxJQUFJQyxRQUFKLENBQWFDLElBQXBCO0FBQUEsYUFERCxFQUVKSCxJQUZJLENBRUMsa0JBQ0o7QUFFRSxvQkFBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0QsYUFORSxDQUFQO0FBT0M7QUFDSixTOzswQkFXREssTSxxQkFBUztBQUNQLGVBQUtaLGFBQUwsR0FBcUIsS0FBS0MsUUFBMUI7QUFDQVksOEJBQWtCLEtBQUtaLFFBQXZCO0FBQ0QsUzs7MEJBRURhLGEsNEJBQWdCO0FBQ2QsY0FBSSxLQUFLYixRQUFMLEtBQWtCLEtBQUtELGFBQTNCLEVBQTBDO0FBQ3hDLG1CQUFPZSxRQUFRLGlDQUFSLENBQVA7QUFDRDtBQUNGLFM7Ozs7OEJBYmM7QUFDYixtQkFBVSxLQUFLakIsU0FBZixTQUE0QixLQUFLQyxRQUFqQztBQUNEOzs7Ozs7OztxQ0FjVWlCLG1COzs7OztzQ0FDWEMsTSxtQkFBT0MsSyxFQUFPO0FBQ1osaUJBQU9BLFNBQVNBLE1BQU1DLFdBQU4sRUFBaEI7QUFDRCxTIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
