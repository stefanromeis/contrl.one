'use strict';

System.register(['aurelia-framework', 'config'], function (_export, _context) {
    "use strict";

    var inject, Config, _dec, _class, Authentificator;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_config) {
            Config = _config.Config;
        }],
        execute: function () {
            _export('Authentificator', Authentificator = (_dec = inject(Config), _dec(_class = function () {
                function Authentificator(Config) {
                    _classCallCheck(this, Authentificator);

                    this.Config = Config;
                    console.log(Config);
                }

                Authentificator.prototype.redirectToTwitterLoginPage = function redirectToTwitterLoginPage() {
                    oauth.getOAuthRequestToken(error, oauth_token, oauth_token_secret, results).then(res.cookie('oauth_token', oauth_token, { httpOnly: true })).catch(console.log('fail'));
                    return;
                };

                Authentificator.prototype.search = function search() {
                    $.ajax({ url: "https://api.twitter.com/oauth/request_token",
                        error: function (_error) {
                            function error(_x) {
                                return _error.apply(this, arguments);
                            }

                            error.toString = function () {
                                return _error.toString();
                            };

                            return error;
                        }(function (error) {
                            console.log(error);
                        }),
                        success: function success(result) {
                            $("#div1").html(result);
                            console.log('result');
                        }
                    });
                };

                return Authentificator;
            }()) || _class));

            _export('Authentificator', Authentificator);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhlbnRpZmljYXRvci5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJDb25maWciLCJBdXRoZW50aWZpY2F0b3IiLCJjb25zb2xlIiwibG9nIiwicmVkaXJlY3RUb1R3aXR0ZXJMb2dpblBhZ2UiLCJvYXV0aCIsImdldE9BdXRoUmVxdWVzdFRva2VuIiwiZXJyb3IiLCJvYXV0aF90b2tlbiIsIm9hdXRoX3Rva2VuX3NlY3JldCIsInJlc3VsdHMiLCJ0aGVuIiwicmVzIiwiY29va2llIiwiaHR0cE9ubHkiLCJjYXRjaCIsInNlYXJjaCIsIiQiLCJhamF4IiwidXJsIiwic3VjY2VzcyIsInJlc3VsdCIsImh0bWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsa0IsV0FBQUEsTTs7O3VDQUdLQyxlLFdBRFpGLE9BQU9DLE1BQVAsQztBQUVHLHlDQUFhQSxNQUFiLEVBQXFCO0FBQUE7O0FBQ2pCLHlCQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDQUUsNEJBQVFDLEdBQVIsQ0FBWUgsTUFBWjtBQUNIOzswQ0FFREksMEIseUNBQThCO0FBQzFCQywwQkFBTUMsb0JBQU4sQ0FBMkJDLEtBQTNCLEVBQWlDQyxXQUFqQyxFQUE4Q0Msa0JBQTlDLEVBQWtFQyxPQUFsRSxFQUNLQyxJQURMLENBRVFDLElBQUlDLE1BQUosQ0FBVyxhQUFYLEVBQTBCTCxXQUExQixFQUF1QyxFQUFDTSxVQUFVLElBQVgsRUFBdkMsQ0FGUixFQUlLQyxLQUpMLENBS1FiLFFBQVFDLEdBQVIsQ0FBWSxNQUFaLENBTFI7QUFPQTtBQUNILGlCOzswQ0FFRGEsTSxxQkFBUztBQUNMQyxzQkFBRUMsSUFBRixDQUFPLEVBQUNDLEtBQUssNkNBQU47QUFDSFo7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsMEJBQU8sVUFBU0EsS0FBVCxFQUFlO0FBQ2xCTCxvQ0FBUUMsR0FBUixDQUFZSSxLQUFaO0FBQ0gseUJBRkQsQ0FERztBQUlIYSxpQ0FBUyxpQkFBU0MsTUFBVCxFQUFnQjtBQUNyQkosOEJBQUUsT0FBRixFQUFXSyxJQUFYLENBQWdCRCxNQUFoQjtBQUNBbkIsb0NBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0g7QUFQRSxxQkFBUDtBQVNILGlCIiwiZmlsZSI6ImF1dGhlbnRpZmljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
