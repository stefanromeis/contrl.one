'use strict';

System.register(['auth0'], function (_export, _context) {
  "use strict";

  var Auth0, AuthService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_auth) {
      Auth0 = _auth.default;
    }],
    execute: function () {
      _export('AuthService', AuthService = function () {
        function AuthService() {
          _classCallCheck(this, AuthService);

          this.auth0 = new Auth0({
            domain: 'contrl.eu.auth0.com',
            clientID: 'bf0m39n56Z4GdBEdpXcgJJZD8927Cgj8',
            callbackURL: 'http://localhost:9000/#/',
            callbackOnLocationHash: true
          });
        }

        AuthService.prototype.signin = function signin() {
          var _this = this;

          this.auth0.login({
            connection: 'instagram',
            popup: true
          }, function (err, profile) {
            if (err) {
              alert("something went wrong: " + err.message);
              return;
            }

            _this.auth0.getProfile(profile.idToken, function (err, profile) {
              if (err) {
                alert(err);
                return;
              }
              localStorage.setItem('token', profile.identities[0].access_token);
            });
          });
        };

        AuthService.prototype.signout = function signout() {
          localStorage.removeItem('token');
        };

        return AuthService;
      }());

      _export('AuthService', AuthService);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2F1dGgtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJBdXRoMCIsIkF1dGhTZXJ2aWNlIiwiYXV0aDAiLCJkb21haW4iLCJjbGllbnRJRCIsImNhbGxiYWNrVVJMIiwiY2FsbGJhY2tPbkxvY2F0aW9uSGFzaCIsInNpZ25pbiIsIl90aGlzIiwibG9naW4iLCJjb25uZWN0aW9uIiwicG9wdXAiLCJlcnIiLCJwcm9maWxlIiwiYWxlcnQiLCJtZXNzYWdlIiwiZ2V0UHJvZmlsZSIsImlkVG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiaWRlbnRpdGllcyIsImFjY2Vzc190b2tlbiIsInNpZ25vdXQiLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFHT0EsVzs7OzZCQUVNQyxXO0FBQ1gsK0JBQWM7QUFBQTs7QUFFWixlQUFLQyxLQUFMLEdBQWEsSUFBSUYsS0FBSixDQUFVO0FBQ3JCRyxvQkFBYyxxQkFETztBQUVyQkMsc0JBQWMsa0NBRk87QUFHckJDLHlCQUFjLDBCQUhPO0FBSXJCQyxvQ0FBd0I7QUFKSCxXQUFWLENBQWI7QUFNSDs7OEJBRUNDLE0scUJBQVM7QUFFUCxjQUFNQyxRQUFRLElBQWQ7O0FBRUEsZUFBS04sS0FBTCxDQUFXTyxLQUFYLENBQWlCO0FBQ2ZDLHdCQUFZLFdBREc7QUFFZkMsbUJBQU87QUFGUSxXQUFqQixFQUlBLFVBQVNDLEdBQVQsRUFBY0MsT0FBZCxFQUF1QjtBQUNyQixnQkFBSUQsR0FBSixFQUFTO0FBQ1BFLG9CQUFNLDJCQUEyQkYsSUFBSUcsT0FBckM7QUFDQTtBQUNEOztBQUVEUCxrQkFBTU4sS0FBTixDQUFZYyxVQUFaLENBQXVCSCxRQUFRSSxPQUEvQixFQUF3QyxVQUFVTCxHQUFWLEVBQWVDLE9BQWYsRUFBd0I7QUFDOUQsa0JBQUdELEdBQUgsRUFBUTtBQUNORSxzQkFBTUYsR0FBTjtBQUNBO0FBQ0Q7QUFDRE0sMkJBQWFDLE9BQWIsQ0FBcUIsT0FBckIsRUFBOEJOLFFBQVFPLFVBQVIsQ0FBbUIsQ0FBbkIsRUFBc0JDLFlBQXBEO0FBQ0QsYUFORDtBQU9ELFdBakJEO0FBa0JELFM7OzhCQUVEQyxPLHNCQUFVO0FBQ1JKLHVCQUFhSyxVQUFiLENBQXdCLE9BQXhCO0FBQ0QsUyIsImZpbGUiOiJzZXJ2aWNlcy9hdXRoLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
