'use strict';

System.register(['aurelia-framework', 'services/config', 'oauth'], function (_export, _context) {
    "use strict";

    var inject, Config, oauth, _dec, _class, Authentificator;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_servicesConfig) {
            Config = _servicesConfig.Config;
        }, function (_oauth) {
            oauth = _oauth.default;
        }],
        execute: function () {
            _export('Authentificator', Authentificator = (_dec = inject(Config, oauth), _dec(_class = function () {
                function Authentificator(Config, oauth) {
                    _classCallCheck(this, Authentificator);

                    this.Config = Config;
                    this.oauth = oauth;
                    console.log(Config.twitter.port);
                    console.log('oauth' + oauth);
                }

                Authentificator.prototype.redirectToTwitterLoginPage = function redirectToTwitterLoginPage() {
                    oauth.getOAuthRequestToken(error, oauth_token, oauth_token_secret, results).then(res.cookie('oauth_token', oauth_token, { httpOnly: true })).catch(console.log('fail'));
                    return;
                };

                Authentificator.prototype.search = function search() {};

                return Authentificator;
            }()) || _class));

            _export('Authentificator', Authentificator);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2F1dGhlbnRpZmljYXRvci5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJDb25maWciLCJvYXV0aCIsIkF1dGhlbnRpZmljYXRvciIsImNvbnNvbGUiLCJsb2ciLCJ0d2l0dGVyIiwicG9ydCIsInJlZGlyZWN0VG9Ud2l0dGVyTG9naW5QYWdlIiwiZ2V0T0F1dGhSZXF1ZXN0VG9rZW4iLCJlcnJvciIsIm9hdXRoX3Rva2VuIiwib2F1dGhfdG9rZW5fc2VjcmV0IiwicmVzdWx0cyIsInRoZW4iLCJyZXMiLCJjb29raWUiLCJodHRwT25seSIsImNhdGNoIiwic2VhcmNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLGtCLG1CQUFBQSxNOztBQUNEQyxpQjs7O3VDQUdNQyxlLFdBRFpILE9BQU9DLE1BQVAsRUFBZUMsS0FBZixDO0FBRUcseUNBQWFELE1BQWIsRUFBcUJDLEtBQXJCLEVBQTRCO0FBQUE7O0FBQ3hCLHlCQUFLRCxNQUFMLEdBQWNBLE1BQWQ7QUFDQSx5QkFBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0FFLDRCQUFRQyxHQUFSLENBQVlKLE9BQU9LLE9BQVAsQ0FBZUMsSUFBM0I7QUFDQUgsNEJBQVFDLEdBQVIsQ0FBWSxVQUFVSCxLQUF0QjtBQUVIOzswQ0FFRE0sMEIseUNBQThCO0FBQzFCTiwwQkFBTU8sb0JBQU4sQ0FBMkJDLEtBQTNCLEVBQWlDQyxXQUFqQyxFQUE4Q0Msa0JBQTlDLEVBQWtFQyxPQUFsRSxFQUNLQyxJQURMLENBRVFDLElBQUlDLE1BQUosQ0FBVyxhQUFYLEVBQTBCTCxXQUExQixFQUF1QyxFQUFDTSxVQUFVLElBQVgsRUFBdkMsQ0FGUixFQUlLQyxLQUpMLENBS1FkLFFBQVFDLEdBQVIsQ0FBWSxNQUFaLENBTFI7QUFPQTtBQUNILGlCOzswQ0FFRGMsTSxxQkFBUyxDQUVSLEMiLCJmaWxlIjoic2VydmljZXMvYXV0aGVudGlmaWNhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
