'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'aurelia-i18n', './time', './services/authConfig'], function (_export, _context) {
  "use strict";

  var inject, HttpClient, I18N, Time, config, _dec, _class, Header;

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
    }, function (_aureliaI18n) {
      I18N = _aureliaI18n.I18N;
    }, function (_time) {
      Time = _time.Time;
    }, function (_servicesAuthConfig) {
      config = _servicesAuthConfig.default;
    }],
    execute: function () {
      _export('Header', Header = (_dec = inject(HttpClient, I18N), _dec(_class = function () {
        function Header(http, I18N) {
          _classCallCheck(this, Header);

          this.lock = new Auth0Lock(config.providers.auth0.clientId, config.providers.auth0.domain);
          this.isAuthenticated = false;


          this.http = http;
          this.i18n = I18N;
          this.TIME = new Time();
          this.date;
          this.time;
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
          this.lang = this.i18n.getLocale();
          this.attached();
        }

        Header.prototype.attached = function attached() {
          var self = this;
          setInterval(function () {
            self.time = self.TIME.time;
            self.date = self.TIME.date;
          }, 1000);
        };

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

          this.http.fetch('protected-route', {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('id_token')
            }
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            return _this.secretThing = data.text;
          });
        };

        Header.prototype.switchLanguage = function switchLanguage(lang) {
          localStorage.setItem('appLanguage', lang);
          location.reload();
        };

        return Header;
      }()) || _class));

      _export('Header', Header);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiSTE4TiIsIlRpbWUiLCJjb25maWciLCJIZWFkZXIiLCJodHRwIiwibG9jayIsIkF1dGgwTG9jayIsInByb3ZpZGVycyIsImF1dGgwIiwiY2xpZW50SWQiLCJkb21haW4iLCJpc0F1dGhlbnRpY2F0ZWQiLCJpMThuIiwiVElNRSIsImRhdGUiLCJ0aW1lIiwic2VsZiIsIm9uIiwiYXV0aFJlc3VsdCIsImdldFByb2ZpbGUiLCJpZFRva2VuIiwiZXJyb3IiLCJwcm9maWxlIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoaWRlIiwibGFuZyIsImdldExvY2FsZSIsImF0dGFjaGVkIiwic2V0SW50ZXJ2YWwiLCJsb2dpbiIsInNob3ciLCJsb2dvdXQiLCJyZW1vdmVJdGVtIiwiZ2V0U2VjcmV0VGhpbmciLCJmZXRjaCIsImhlYWRlcnMiLCJnZXRJdGVtIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInNlY3JldFRoaW5nIiwiZGF0YSIsInRleHQiLCJzd2l0Y2hMYW5ndWFnZSIsImxvY2F0aW9uIiwicmVsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBU0EsWSxxQkFBQUEsTTs7QUFDQUMsZ0IsdUJBQUFBLFU7O0FBQ0FDLFUsZ0JBQUFBLEk7O0FBQ0FDLFUsU0FBQUEsSTs7QUFDRkMsWTs7O3dCQUdNQyxNLFdBRFpMLE9BQU9DLFVBQVAsRUFBbUJDLElBQW5CLEM7QUFNQyx3QkFBWUksSUFBWixFQUFrQkosSUFBbEIsRUFBd0I7QUFBQTs7QUFBQSxlQUh4QkssSUFHd0IsR0FIakIsSUFBSUMsU0FBSixDQUFjSixPQUFPSyxTQUFQLENBQWlCQyxLQUFqQixDQUF1QkMsUUFBckMsRUFBK0NQLE9BQU9LLFNBQVAsQ0FBaUJDLEtBQWpCLENBQXVCRSxNQUF0RSxDQUdpQjtBQUFBLGVBRnhCQyxlQUV3QixHQUZOLEtBRU07OztBQUV0QixlQUFLUCxJQUFMLEdBQVlBLElBQVo7QUFDQSxlQUFLUSxJQUFMLEdBQVlaLElBQVo7QUFDQSxlQUFLYSxJQUFMLEdBQVksSUFBSVosSUFBSixFQUFaO0FBQ0EsZUFBS2EsSUFBTDtBQUNBLGVBQUtDLElBQUw7QUFDQSxjQUFJQyxPQUFPLElBQVg7QUFDQSxlQUFLWCxJQUFMLENBQVVZLEVBQVYsQ0FBYSxlQUFiLEVBQThCLFVBQUNDLFVBQUQsRUFBZ0I7QUFDNUNGLGlCQUFLWCxJQUFMLENBQVVjLFVBQVYsQ0FBcUJELFdBQVdFLE9BQWhDLEVBQXlDLFVBQUNDLEtBQUQsRUFBUUMsT0FBUixFQUFvQjtBQUMzRCxrQkFBSUQsS0FBSixFQUFXO0FBRVQ7QUFDRDs7QUFFREUsMkJBQWFDLE9BQWIsQ0FBcUIsVUFBckIsRUFBaUNOLFdBQVdFLE9BQTVDO0FBQ0FHLDJCQUFhQyxPQUFiLENBQXFCLFNBQXJCLEVBQWdDQyxLQUFLQyxTQUFMLENBQWVKLE9BQWYsQ0FBaEM7QUFDQU4sbUJBQUtMLGVBQUwsR0FBdUIsSUFBdkI7QUFDQUssbUJBQUtYLElBQUwsQ0FBVXNCLElBQVY7QUFDRCxhQVZEO0FBV0QsV0FaRDtBQWFBLGVBQUtDLElBQUwsR0FBWSxLQUFLaEIsSUFBTCxDQUFVaUIsU0FBVixFQUFaO0FBQ0EsZUFBS0MsUUFBTDtBQUNEOzt5QkFFREEsUSx1QkFBVztBQUNULGNBQUlkLE9BQU8sSUFBWDtBQUNBZSxzQkFBWSxZQUFZO0FBQ3RCZixpQkFBS0QsSUFBTCxHQUFZQyxLQUFLSCxJQUFMLENBQVVFLElBQXRCO0FBQ0FDLGlCQUFLRixJQUFMLEdBQVlFLEtBQUtILElBQUwsQ0FBVUMsSUFBdEI7QUFDRCxXQUhELEVBR0csSUFISDtBQUlELFM7O3lCQUVEa0IsSyxvQkFBUTtBQUNOLGVBQUszQixJQUFMLENBQVU0QixJQUFWO0FBQ0QsUzs7eUJBRURDLE0scUJBQVM7QUFDUFgsdUJBQWFZLFVBQWIsQ0FBd0IsU0FBeEI7QUFDQVosdUJBQWFZLFVBQWIsQ0FBd0IsVUFBeEI7QUFDQSxlQUFLeEIsZUFBTCxHQUF1QixLQUF2QjtBQUNELFM7O3lCQUVEeUIsYyw2QkFBaUI7QUFBQTs7QUFDZixlQUFLaEMsSUFBTCxDQUFVaUMsS0FBVixDQUFnQixpQkFBaEIsRUFBbUM7QUFDakNDLHFCQUFTO0FBQ1AsK0JBQWlCLFlBQVlmLGFBQWFnQixPQUFiLENBQXFCLFVBQXJCO0FBRHRCO0FBRHdCLFdBQW5DLEVBS0dDLElBTEgsQ0FLUTtBQUFBLG1CQUFZQyxTQUFTQyxJQUFULEVBQVo7QUFBQSxXQUxSLEVBTUdGLElBTkgsQ0FNUTtBQUFBLG1CQUFRLE1BQUtHLFdBQUwsR0FBbUJDLEtBQUtDLElBQWhDO0FBQUEsV0FOUjtBQU9ELFM7O3lCQUVEQyxjLDJCQUFlbEIsSSxFQUFNO0FBQ25CTCx1QkFBYUMsT0FBYixDQUFxQixhQUFyQixFQUFvQ0ksSUFBcEM7QUFDQW1CLG1CQUFTQyxNQUFUO0FBQ0QsUyIsImZpbGUiOiJoZWFkZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
