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

                    this.tauth = new oauth.OAuth(Config.twitter.request_token_url, Config.twitter.access_token_url, Config.twitter.consumer_key, Config.twitter.consumer_secret, Config.twitter.oauth_version, Config.twitter.oauth_callback, Config.twitter.oauth_signature);

                    this.redirectToTwitterLoginPage();
                    console.log(this.tauth);
                }

                Authentificator.prototype.redirectToTwitterLoginPage = function redirectToTwitterLoginPage() {
                    var self = this;
                    return new Promise(function (resolve, reject) {
                        self.tauth.getOAuthRequestToken(function (error, oauth_token, oauth_token_secret, results) {
                            console.log('error');
                            if (error) {
                                console.log(error);
                                reject("Auth failed!" + new Error(msg));
                            } else {
                                console.log('yeah');
                                resolve.cookie('oauth_token', oauth_token, { httpOnly: true });
                            }
                        });
                    });
                };

                return Authentificator;
            }()) || _class));

            _export('Authentificator', Authentificator);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2F1dGhlbnRpZmljYXRvci5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJDb25maWciLCJvYXV0aCIsIkF1dGhlbnRpZmljYXRvciIsImNvbnNvbGUiLCJsb2ciLCJ0d2l0dGVyIiwicG9ydCIsInRhdXRoIiwiT0F1dGgiLCJyZXF1ZXN0X3Rva2VuX3VybCIsImFjY2Vzc190b2tlbl91cmwiLCJjb25zdW1lcl9rZXkiLCJjb25zdW1lcl9zZWNyZXQiLCJvYXV0aF92ZXJzaW9uIiwib2F1dGhfY2FsbGJhY2siLCJvYXV0aF9zaWduYXR1cmUiLCJyZWRpcmVjdFRvVHdpdHRlckxvZ2luUGFnZSIsInNlbGYiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldE9BdXRoUmVxdWVzdFRva2VuIiwiZXJyb3IiLCJvYXV0aF90b2tlbiIsIm9hdXRoX3Rva2VuX3NlY3JldCIsInJlc3VsdHMiLCJFcnJvciIsIm1zZyIsImNvb2tpZSIsImh0dHBPbmx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLGtCLG1CQUFBQSxNOztBQUNEQyxpQjs7O3VDQUdNQyxlLFdBRFpILE9BQU9DLE1BQVAsRUFBZUMsS0FBZixDO0FBRUcseUNBQWFELE1BQWIsRUFBcUJDLEtBQXJCLEVBQTRCO0FBQUE7O0FBQ3hCLHlCQUFLRCxNQUFMLEdBQWNBLE1BQWQ7QUFDQSx5QkFBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0FFLDRCQUFRQyxHQUFSLENBQVlKLE9BQU9LLE9BQVAsQ0FBZUMsSUFBM0I7QUFDQUgsNEJBQVFDLEdBQVIsQ0FBWSxVQUFVSCxLQUF0Qjs7QUFFQSx5QkFBS00sS0FBTCxHQUFhLElBQUlOLE1BQU1PLEtBQVYsQ0FDVFIsT0FBT0ssT0FBUCxDQUFlSSxpQkFETixFQUVUVCxPQUFPSyxPQUFQLENBQWVLLGdCQUZOLEVBR1RWLE9BQU9LLE9BQVAsQ0FBZU0sWUFITixFQUlUWCxPQUFPSyxPQUFQLENBQWVPLGVBSk4sRUFLVFosT0FBT0ssT0FBUCxDQUFlUSxhQUxOLEVBTVRiLE9BQU9LLE9BQVAsQ0FBZVMsY0FOTixFQU9UZCxPQUFPSyxPQUFQLENBQWVVLGVBUE4sQ0FBYjs7QUFVQSx5QkFBS0MsMEJBQUw7QUFDQWIsNEJBQVFDLEdBQVIsQ0FBWSxLQUFLRyxLQUFqQjtBQUNIOzswQ0FFRFMsMEIseUNBQTZCO0FBQ3pCLHdCQUFJQyxPQUFPLElBQVg7QUFDQSwyQkFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDSCw2QkFBS1YsS0FBTCxDQUFXYyxvQkFBWCxDQUFnQyxVQUFTQyxLQUFULEVBQWdCQyxXQUFoQixFQUE2QkMsa0JBQTdCLEVBQWlEQyxPQUFqRCxFQUEwRDtBQUN0RnRCLG9DQUFRQyxHQUFSLENBQVksT0FBWjtBQUNBLGdDQUFJa0IsS0FBSixFQUFXO0FBQ1BuQix3Q0FBUUMsR0FBUixDQUFZa0IsS0FBWjtBQUNBRix1Q0FBTyxpQkFBaUIsSUFBSU0sS0FBSixDQUFVQyxHQUFWLENBQXhCO0FBQ0gsNkJBSEQsTUFHTztBQUNIeEIsd0NBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FlLHdDQUFRUyxNQUFSLENBQWUsYUFBZixFQUE4QkwsV0FBOUIsRUFBMkMsRUFBQ00sVUFBVSxJQUFYLEVBQTNDO0FBQ0g7QUFDSix5QkFURDtBQVVILHFCQVhNLENBQVA7QUFZSCxpQiIsImZpbGUiOiJzZXJ2aWNlcy9hdXRoZW50aWZpY2F0b3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
