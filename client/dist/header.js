'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', './time'], function (_export, _context) {
  "use strict";

  var inject, HttpClient, Time, _dec, _class, Header;

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
    }, function (_time) {
      Time = _time.Time;
    }],
    execute: function () {
      _export('Header', Header = (_dec = inject(HttpClient), _dec(_class = function () {
        function Header(http) {
          _classCallCheck(this, Header);

          this.lock = new Auth0Lock('bf0m39n56Z4GdBEdpXcgJJZD8927Cgj8', 'contrl.eu.auth0.com');
          this.isAuthenticated = false;


          this.http = http;
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

        return Header;
      }()) || _class));

      _export('Header', Header);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiVGltZSIsIkhlYWRlciIsImh0dHAiLCJsb2NrIiwiQXV0aDBMb2NrIiwiaXNBdXRoZW50aWNhdGVkIiwiVElNRSIsImRhdGUiLCJ0aW1lIiwic2VsZiIsIm9uIiwiYXV0aFJlc3VsdCIsImdldFByb2ZpbGUiLCJpZFRva2VuIiwiZXJyb3IiLCJwcm9maWxlIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoaWRlIiwiYXR0YWNoZWQiLCJzZXRJbnRlcnZhbCIsImxvZ2luIiwic2hvdyIsImxvZ291dCIsInJlbW92ZUl0ZW0iLCJnZXRTZWNyZXRUaGluZyIsImZldGNoIiwiaGVhZGVycyIsImdldEl0ZW0iLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwic2VjcmV0VGhpbmciLCJkYXRhIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLFkscUJBQUFBLE07O0FBQ0FDLGdCLHVCQUFBQSxVOztBQUNBQyxVLFNBQUFBLEk7Ozt3QkFHS0MsTSxXQURaSCxPQUFPQyxVQUFQLEM7QUFNQyx3QkFBWUcsSUFBWixFQUFpQjtBQUFBOztBQUFBLGVBSGpCQyxJQUdpQixHQUhWLElBQUlDLFNBQUosQ0FBYyxrQ0FBZCxFQUFrRCxxQkFBbEQsQ0FHVTtBQUFBLGVBRmpCQyxlQUVpQixHQUZDLEtBRUQ7OztBQUVmLGVBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNBLGVBQUtJLElBQUwsR0FBWSxJQUFJTixJQUFKLEVBQVo7QUFDQSxlQUFLTyxJQUFMO0FBQ0EsZUFBS0MsSUFBTDtBQUNBLGNBQUlDLE9BQU8sSUFBWDtBQUNBLGVBQUtOLElBQUwsQ0FBVU8sRUFBVixDQUFhLGVBQWIsRUFBOEIsVUFBQ0MsVUFBRCxFQUFnQjtBQUM1Q0YsaUJBQUtOLElBQUwsQ0FBVVMsVUFBVixDQUFxQkQsV0FBV0UsT0FBaEMsRUFBeUMsVUFBQ0MsS0FBRCxFQUFRQyxPQUFSLEVBQW9CO0FBQzNELGtCQUFJRCxLQUFKLEVBQVc7QUFFVDtBQUNEOztBQUVERSwyQkFBYUMsT0FBYixDQUFxQixVQUFyQixFQUFpQ04sV0FBV0UsT0FBNUM7QUFDQUcsMkJBQWFDLE9BQWIsQ0FBcUIsU0FBckIsRUFBZ0NDLEtBQUtDLFNBQUwsQ0FBZUosT0FBZixDQUFoQztBQUNBTixtQkFBS0osZUFBTCxHQUF1QixJQUF2QjtBQUNBSSxtQkFBS04sSUFBTCxDQUFVaUIsSUFBVjtBQUNELGFBVkQ7QUFXRCxXQVpEOztBQWNBLGVBQUtDLFFBQUw7QUFDRDs7eUJBRURBLFEsdUJBQVk7QUFDVixjQUFJWixPQUFPLElBQVg7QUFDQWEsc0JBQVksWUFBVTtBQUNsQmIsaUJBQUtELElBQUwsR0FBWUMsS0FBS0gsSUFBTCxDQUFVRSxJQUF0QjtBQUNBQyxpQkFBS0YsSUFBTCxHQUFZRSxLQUFLSCxJQUFMLENBQVVDLElBQXRCO0FBQ0gsV0FIRCxFQUdHLElBSEg7QUFJRCxTOzt5QkFFRGdCLEssb0JBQVE7QUFDTixlQUFLcEIsSUFBTCxDQUFVcUIsSUFBVjtBQUNELFM7O3lCQUVEQyxNLHFCQUFTO0FBQ1BULHVCQUFhVSxVQUFiLENBQXdCLFNBQXhCO0FBQ0FWLHVCQUFhVSxVQUFiLENBQXdCLFVBQXhCO0FBQ0EsZUFBS3JCLGVBQUwsR0FBdUIsS0FBdkI7QUFDRCxTOzt5QkFFRHNCLGMsNkJBQWlCO0FBQUE7O0FBQ2YsZUFBS3pCLElBQUwsQ0FBVTBCLEtBQVYsQ0FBZ0IsaUJBQWhCLEVBQW1DO0FBQ2pDQyxxQkFBUztBQUNQLCtCQUFpQixZQUFZYixhQUFhYyxPQUFiLENBQXFCLFVBQXJCO0FBRHRCO0FBRHdCLFdBQW5DLEVBS0NDLElBTEQsQ0FLTTtBQUFBLG1CQUFZQyxTQUFTQyxJQUFULEVBQVo7QUFBQSxXQUxOLEVBTUNGLElBTkQsQ0FNTTtBQUFBLG1CQUFRLE1BQUtHLFdBQUwsR0FBbUJDLEtBQUtDLElBQWhDO0FBQUEsV0FOTjtBQU9ELFMiLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
