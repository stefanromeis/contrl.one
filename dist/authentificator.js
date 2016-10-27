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
                    console.log('ye');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhlbnRpZmljYXRvci5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJDb25maWciLCJBdXRoZW50aWZpY2F0b3IiLCJjb25zb2xlIiwibG9nIiwicmVkaXJlY3RUb1R3aXR0ZXJMb2dpblBhZ2UiLCJvYXV0aCIsImdldE9BdXRoUmVxdWVzdFRva2VuIiwiZXJyb3IiLCJvYXV0aF90b2tlbiIsIm9hdXRoX3Rva2VuX3NlY3JldCIsInJlc3VsdHMiLCJ0aGVuIiwicmVzIiwiY29va2llIiwiaHR0cE9ubHkiLCJjYXRjaCIsInNlYXJjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNBQyxrQixXQUFBQSxNOzs7dUNBSUtDLGUsV0FEWkYsT0FBT0MsTUFBUCxDO0FBRUcseUNBQWFBLE1BQWIsRUFBcUI7QUFBQTs7QUFDakIseUJBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBRSw0QkFBUUMsR0FBUixDQUFZSCxNQUFaO0FBQ0FFLDRCQUFRQyxHQUFSLENBQVksSUFBWjtBQUNIOzswQ0FFREMsMEIseUNBQThCO0FBQzFCQywwQkFBTUMsb0JBQU4sQ0FBMkJDLEtBQTNCLEVBQWlDQyxXQUFqQyxFQUE4Q0Msa0JBQTlDLEVBQWtFQyxPQUFsRSxFQUNLQyxJQURMLENBRVFDLElBQUlDLE1BQUosQ0FBVyxhQUFYLEVBQTBCTCxXQUExQixFQUF1QyxFQUFDTSxVQUFVLElBQVgsRUFBdkMsQ0FGUixFQUlLQyxLQUpMLENBS1FiLFFBQVFDLEdBQVIsQ0FBWSxNQUFaLENBTFI7QUFPQTtBQUNILGlCOzswQ0FFRGEsTSxxQkFBUyxDQUVSLEMiLCJmaWxlIjoiYXV0aGVudGlmaWNhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
