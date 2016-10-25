'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch'], function (_export, _context) {
  "use strict";

  var inject, HttpClient, _dec, _class, Users;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_fetch) {}],
    execute: function () {
      _export('Users', Users = (_dec = inject(HttpClient), _dec(_class = function () {
        function Users(http) {
          _classCallCheck(this, Users);

          this.heading = 'Github Users';
          this.users = [];

          http.configure(function (config) {
            config.useStandardConfiguration().withBaseUrl('https://api.github.com/');
          });

          this.http = http;
        }

        Users.prototype.activate = function activate() {
          var _this = this;

          return this.http.fetch('users').then(function (response) {
            return response.json();
          }).then(function (users) {
            return _this.users = users;
          });
        };

        return Users;
      }()) || _class));

      _export('Users', Users);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJzLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkh0dHBDbGllbnQiLCJVc2VycyIsImh0dHAiLCJoZWFkaW5nIiwidXNlcnMiLCJjb25maWd1cmUiLCJjb25maWciLCJ1c2VTdGFuZGFyZENvbmZpZ3VyYXRpb24iLCJ3aXRoQmFzZVVybCIsImFjdGl2YXRlIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsWSxxQkFBQUEsTTs7QUFDQUMsZ0IsdUJBQUFBLFU7Ozt1QkFJS0MsSyxXQURaRixPQUFPQyxVQUFQLEM7QUFLQyx1QkFBWUUsSUFBWixFQUFrQjtBQUFBOztBQUFBLGVBSGxCQyxPQUdrQixHQUhSLGNBR1E7QUFBQSxlQUZsQkMsS0FFa0IsR0FGVixFQUVVOztBQUNoQkYsZUFBS0csU0FBTCxDQUFlLGtCQUFVO0FBQ3ZCQyxtQkFDR0Msd0JBREgsR0FFR0MsV0FGSCxDQUVlLHlCQUZmO0FBR0QsV0FKRDs7QUFNQSxlQUFLTixJQUFMLEdBQVlBLElBQVo7QUFDRDs7d0JBRURPLFEsdUJBQVc7QUFBQTs7QUFDVCxpQkFBTyxLQUFLUCxJQUFMLENBQVVRLEtBQVYsQ0FBZ0IsT0FBaEIsRUFDSkMsSUFESSxDQUNDO0FBQUEsbUJBQVlDLFNBQVNDLElBQVQsRUFBWjtBQUFBLFdBREQsRUFFSkYsSUFGSSxDQUVDO0FBQUEsbUJBQVMsTUFBS1AsS0FBTCxHQUFhQSxLQUF0QjtBQUFBLFdBRkQsQ0FBUDtBQUdELFMiLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
