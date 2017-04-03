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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUyLmpzIl0sIm5hbWVzIjpbIkkxOE4iLCJpbmplY3QiLCJBdXRoU2VydmljZSIsIklnU2VydmljZSIsIldlbGNvbWUiLCJhdXRoU2VydmljZSIsImlnU2VydmljZSIsImhlYWRpbmciLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInByZXZpb3VzVmFsdWUiLCJmdWxsTmFtZSIsInNpZ25pbiIsInNpZ25vdXQiLCJhY3RpdmF0ZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJyZWNlbnQiLCJ0aGVuIiwicmVzIiwicmVzcG9uc2UiLCJkYXRhIiwic3VibWl0IiwiYWxlcnQiLCJjYW5EZWFjdGl2YXRlIiwiY29uZmlybSIsIlVwcGVyVmFsdWVDb252ZXJ0ZXIiLCJ0b1ZpZXciLCJ2YWx1ZSIsInRvVXBwZXJDYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsVSxnQkFBQUEsSTs7QUFDQUMsWSxxQkFBQUEsTTs7QUFFQUMsaUIsd0JBQUFBLFc7O0FBQ0FDLGUsc0JBQUFBLFM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFHS0MsTyxXQURaSCxPQUFPRCxJQUFQLEM7QUFFQyx5QkFBWUssV0FBWixFQUF5QkMsU0FBekIsRUFBbUM7QUFBQTs7QUFFakMsZUFBS0QsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxlQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLGVBQUtDLE9BQUwsR0FBZSx3Q0FBZjtBQUNBLGVBQUtDLFNBQUwsR0FBaUIsTUFBakI7QUFDQSxlQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsZUFBS0MsYUFBTCxHQUFxQixLQUFLQyxRQUExQjtBQUVEOzswQkFFREMsTSxxQkFBUztBQUVQLGVBQUtQLFdBQUwsQ0FBaUJPLE1BQWpCO0FBQ0QsUzs7MEJBRURDLE8sc0JBQVU7QUFFUixlQUFLUixXQUFMLENBQWlCUSxPQUFqQjtBQUNELFM7OzBCQUdEQyxRLHVCQUFXO0FBQUE7O0FBQ1QsY0FBR0MsYUFBYUMsT0FBYixDQUFxQixPQUFyQixDQUFILEVBQWlDO0FBRS9CLG1CQUFPLEtBQUtWLFNBQUwsQ0FBZVcsTUFBZixHQUNKQyxJQURJLENBQ0M7QUFBQSxxQkFBT0MsSUFBSUMsUUFBSixDQUFhQyxJQUFwQjtBQUFBLGFBREQsRUFFSkgsSUFGSSxDQUVDLGtCQUNKO0FBRUUsb0JBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNELGFBTkUsQ0FBUDtBQU9DO0FBQ0osUzs7MEJBV0RLLE0scUJBQVM7QUFDUCxlQUFLWixhQUFMLEdBQXFCLEtBQUtDLFFBQTFCO0FBQ0FZLDhCQUFrQixLQUFLWixRQUF2QjtBQUNELFM7OzBCQUVEYSxhLDRCQUFnQjtBQUNkLGNBQUksS0FBS2IsUUFBTCxLQUFrQixLQUFLRCxhQUEzQixFQUEwQztBQUN4QyxtQkFBT2UsUUFBUSxpQ0FBUixDQUFQO0FBQ0Q7QUFDRixTOzs7OzhCQWJjO0FBQ2IsbUJBQVUsS0FBS2pCLFNBQWYsU0FBNEIsS0FBS0MsUUFBakM7QUFDRDs7Ozs7Ozs7cUNBY1VpQixtQjs7Ozs7c0NBQ1hDLE0sbUJBQU9DLEssRUFBTztBQUNaLGlCQUFPQSxTQUFTQSxNQUFNQyxXQUFOLEVBQWhCO0FBQ0QsUyIsImZpbGUiOiJob21lMi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
