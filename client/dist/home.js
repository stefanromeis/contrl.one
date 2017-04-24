'use strict';

System.register(['aurelia-i18n', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var I18N, inject, _createClass, _dec, _class, Welcome, UpperValueConverter;

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
        function Welcome() {
          _classCallCheck(this, Welcome);

          this.heading = 'Welcome to the Aurelia Navigation App!';
          this.firstName = 'John';
          this.lastName = 'Doe';
          this.previousValue = this.fullName;
        }

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSTE4TiIsImluamVjdCIsIldlbGNvbWUiLCJoZWFkaW5nIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJwcmV2aW91c1ZhbHVlIiwiZnVsbE5hbWUiLCJhY3RpdmF0ZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJpZ1NlcnZpY2UiLCJyZWNlbnQiLCJ0aGVuIiwicmVzIiwicmVzcG9uc2UiLCJkYXRhIiwic3VibWl0IiwiYWxlcnQiLCJjYW5EZWFjdGl2YXRlIiwiY29uZmlybSIsIlVwcGVyVmFsdWVDb252ZXJ0ZXIiLCJ0b1ZpZXciLCJ2YWx1ZSIsInRvVXBwZXJDYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsVSxnQkFBQUEsSTs7QUFDQUMsWSxxQkFBQUEsTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQUtLQyxPLFdBRFpELE9BQU9ELElBQVAsQztBQUVDLDJCQUFjO0FBQUE7O0FBR1osZUFBS0csT0FBTCxHQUFlLHdDQUFmO0FBQ0EsZUFBS0MsU0FBTCxHQUFpQixNQUFqQjtBQUNBLGVBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxlQUFLQyxhQUFMLEdBQXFCLEtBQUtDLFFBQTFCO0FBRUQ7OzBCQUdEQyxRLHVCQUFXO0FBQUE7O0FBQ1QsY0FBR0MsYUFBYUMsT0FBYixDQUFxQixPQUFyQixDQUFILEVBQWlDO0FBRS9CLG1CQUFPLEtBQUtDLFNBQUwsQ0FBZUMsTUFBZixHQUNKQyxJQURJLENBQ0M7QUFBQSxxQkFBT0MsSUFBSUMsUUFBSixDQUFhQyxJQUFwQjtBQUFBLGFBREQsRUFFSkgsSUFGSSxDQUVDLGtCQUNKO0FBRUUsb0JBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNELGFBTkUsQ0FBUDtBQU9DO0FBQ0osUzs7MEJBV0RLLE0scUJBQVM7QUFDUCxlQUFLWCxhQUFMLEdBQXFCLEtBQUtDLFFBQTFCO0FBQ0FXLDhCQUFrQixLQUFLWCxRQUF2QjtBQUNELFM7OzBCQUVEWSxhLDRCQUFnQjtBQUNkLGNBQUksS0FBS1osUUFBTCxLQUFrQixLQUFLRCxhQUEzQixFQUEwQztBQUN4QyxtQkFBT2MsUUFBUSxpQ0FBUixDQUFQO0FBQ0Q7QUFDRixTOzs7OzhCQWJjO0FBQ2IsbUJBQVUsS0FBS2hCLFNBQWYsU0FBNEIsS0FBS0MsUUFBakM7QUFDRDs7Ozs7Ozs7cUNBY1VnQixtQjs7Ozs7c0NBQ1hDLE0sbUJBQU9DLEssRUFBTztBQUNaLGlCQUFPQSxTQUFTQSxNQUFNQyxXQUFOLEVBQWhCO0FBQ0QsUyIsImZpbGUiOiJob21lLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
