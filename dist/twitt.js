'use strict';

System.register(['aurelia-framework', 'authentificator'], function (_export, _context) {
    "use strict";

    var inject, auth, _dec, _class, Twitt;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_authentificator) {
            auth = _authentificator;
        }],
        execute: function () {
            _export('Twitt', Twitt = (_dec = inject(auth), _dec(_class = function () {
                function Twitt(auth) {
                    _classCallCheck(this, Twitt);

                    this.auth = auth;
                    console.log(this.auth);
                }

                Twitt.prototype.search = function search(auth) {
                    $.ajax({ url: "https://api.twitter.com/oauth/request_token",
                        error: function error(_error) {
                            console.log(_error);
                        },
                        success: function success(result) {
                            console.log('result');
                        }
                    });
                };

                return Twitt;
            }()) || _class));

            _export('Twitt', Twitt);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR3aXR0LmpzIl0sIm5hbWVzIjpbImluamVjdCIsImF1dGgiLCJUd2l0dCIsImNvbnNvbGUiLCJsb2ciLCJzZWFyY2giLCIkIiwiYWpheCIsInVybCIsImVycm9yIiwic3VjY2VzcyIsInJlc3VsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNJQyxnQjs7OzZCQUdDQyxLLFdBRFpGLE9BQU9DLElBQVAsQztBQUVHLCtCQUFhQSxJQUFiLEVBQW1CO0FBQUE7O0FBQ2YseUJBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBRSw0QkFBUUMsR0FBUixDQUFZLEtBQUtILElBQWpCO0FBQ0g7O2dDQUNESSxNLG1CQUFPSixJLEVBQU07QUFDVEssc0JBQUVDLElBQUYsQ0FBTyxFQUFDQyxLQUFLLDZDQUFOO0FBQ0hDLCtCQUFPLGVBQVNBLE1BQVQsRUFBZTtBQUNsQk4sb0NBQVFDLEdBQVIsQ0FBWUssTUFBWjtBQUNILHlCQUhFO0FBSUhDLGlDQUFTLGlCQUFTQyxNQUFULEVBQWdCO0FBRXJCUixvQ0FBUUMsR0FBUixDQUFZLFFBQVo7QUFDSDtBQVBFLHFCQUFQO0FBU0gsaUIiLCJmaWxlIjoidHdpdHQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
