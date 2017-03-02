'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client'], function (_export, _context) {
  "use strict";

  var inject, HttpClient, _dec, _class, Header;

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
    }],
    execute: function () {
      _export('Header', Header = (_dec = inject(HttpClient), _dec(_class = function () {
        function Header(http) {
          _classCallCheck(this, Header);

          this.lock = new Auth0Lock('bf0m39n56Z4GdBEdpXcgJJZD8927Cgj8', 'contrl.eu.auth0.com');
          this.isAuthenticated = false;


          this.http = http;
          var self = this;
          this.lock.on("authenticated", function (authResult) {
            self.lock.getProfile(authResult.idToken, function (error, profile) {
              if (error) {
                return;
              }

              localStorage.setItem('id_token', authResult.idToken);
              localStorage.setItem('profile', JSON.stringify(profile));
              self.isAuthenticated = true;
              self.lock.hide();
            });
          });
        }

        Header.prototype.login = function login() {
          this.lock.show();
        };

        Header.prototype.logout = function logout() {
          localStorage.removeItem('profile');
          localStorage.removeItem('id_token');
          this.isAuthenticated = false;
        };

        Header.prototype.getSecretThing = function getSecretThing() {
          var _this = this;

          this.http.fetch('/api/protected-route', {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('id_token')
            }
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            return _this.secretThing = data.text;
          });
        };

        return Header;
      }()) || _class));

      _export('Header', Header);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiSGVhZGVyIiwiaHR0cCIsImxvY2siLCJBdXRoMExvY2siLCJpc0F1dGhlbnRpY2F0ZWQiLCJzZWxmIiwib24iLCJhdXRoUmVzdWx0IiwiZ2V0UHJvZmlsZSIsImlkVG9rZW4iLCJlcnJvciIsInByb2ZpbGUiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImhpZGUiLCJsb2dpbiIsInNob3ciLCJsb2dvdXQiLCJyZW1vdmVJdGVtIiwiZ2V0U2VjcmV0VGhpbmciLCJmZXRjaCIsImhlYWRlcnMiLCJnZXRJdGVtIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInNlY3JldFRoaW5nIiwiZGF0YSIsInRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxZLHFCQUFBQSxNOztBQUNBQyxnQix1QkFBQUEsVTs7O3dCQUdLQyxNLFdBRFpGLE9BQU9DLFVBQVAsQztBQU1DLHdCQUFZRSxJQUFaLEVBQWlCO0FBQUE7O0FBQUEsZUFIakJDLElBR2lCLEdBSFYsSUFBSUMsU0FBSixDQUFjLGtDQUFkLEVBQWtELHFCQUFsRCxDQUdVO0FBQUEsZUFGakJDLGVBRWlCLEdBRkMsS0FFRDs7O0FBRWYsZUFBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsY0FBSUksT0FBTyxJQUFYO0FBQ0EsZUFBS0gsSUFBTCxDQUFVSSxFQUFWLENBQWEsZUFBYixFQUE4QixVQUFDQyxVQUFELEVBQWdCO0FBQzVDRixpQkFBS0gsSUFBTCxDQUFVTSxVQUFWLENBQXFCRCxXQUFXRSxPQUFoQyxFQUF5QyxVQUFDQyxLQUFELEVBQVFDLE9BQVIsRUFBb0I7QUFDM0Qsa0JBQUlELEtBQUosRUFBVztBQUVUO0FBQ0Q7O0FBRURFLDJCQUFhQyxPQUFiLENBQXFCLFVBQXJCLEVBQWlDTixXQUFXRSxPQUE1QztBQUNBRywyQkFBYUMsT0FBYixDQUFxQixTQUFyQixFQUFnQ0MsS0FBS0MsU0FBTCxDQUFlSixPQUFmLENBQWhDO0FBQ0FOLG1CQUFLRCxlQUFMLEdBQXVCLElBQXZCO0FBQ0FDLG1CQUFLSCxJQUFMLENBQVVjLElBQVY7QUFDRCxhQVZEO0FBV0QsV0FaRDtBQWNEOzt5QkFFREMsSyxvQkFBUTtBQUNOLGVBQUtmLElBQUwsQ0FBVWdCLElBQVY7QUFDRCxTOzt5QkFFREMsTSxxQkFBUztBQUNQUCx1QkFBYVEsVUFBYixDQUF3QixTQUF4QjtBQUNBUix1QkFBYVEsVUFBYixDQUF3QixVQUF4QjtBQUNBLGVBQUtoQixlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsUzs7eUJBRURpQixjLDZCQUFpQjtBQUFBOztBQUNmLGVBQUtwQixJQUFMLENBQVVxQixLQUFWLENBQWdCLHNCQUFoQixFQUF3QztBQUN0Q0MscUJBQVM7QUFDUCwrQkFBaUIsWUFBWVgsYUFBYVksT0FBYixDQUFxQixVQUFyQjtBQUR0QjtBQUQ2QixXQUF4QyxFQUtDQyxJQUxELENBS007QUFBQSxtQkFBWUMsU0FBU0MsSUFBVCxFQUFaO0FBQUEsV0FMTixFQU1DRixJQU5ELENBTU07QUFBQSxtQkFBUSxNQUFLRyxXQUFMLEdBQW1CQyxLQUFLQyxJQUFoQztBQUFBLFdBTk47QUFPRCxTIiwiZmlsZSI6ImhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
