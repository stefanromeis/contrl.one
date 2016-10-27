'use strict';

System.register(['aurelia-framework', 'services/authentificator'], function (_export, _context) {
    "use strict";

    var inject, Authentificator, _dec, _class, Twitt;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_servicesAuthentificator) {
            Authentificator = _servicesAuthentificator.Authentificator;
        }],
        execute: function () {
            _export('Twitt', Twitt = (_dec = inject(Authentificator), _dec(_class = function () {
                function Twitt(Authentificator) {
                    _classCallCheck(this, Twitt);

                    this.Authentificator = Authentificator;
                    console.log(this.Authentificator);
                }

                Twitt.prototype.search = function search() {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR3aXR0LmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkF1dGhlbnRpZmljYXRvciIsIlR3aXR0IiwiY29uc29sZSIsImxvZyIsInNlYXJjaCIsIiQiLCJhamF4IiwidXJsIiwiZXJyb3IiLCJzdWNjZXNzIiwicmVzdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLDJCLDRCQUFBQSxlOzs7NkJBR0tDLEssV0FEWkYsT0FBT0MsZUFBUCxDO0FBRUcsK0JBQWFBLGVBQWIsRUFBOEI7QUFBQTs7QUFDMUIseUJBQUtBLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0FFLDRCQUFRQyxHQUFSLENBQVksS0FBS0gsZUFBakI7QUFDSDs7Z0NBQ0RJLE0scUJBQVM7QUFDTEMsc0JBQUVDLElBQUYsQ0FBTyxFQUFDQyxLQUFLLDZDQUFOO0FBQ0hDLCtCQUFPLGVBQVNBLE1BQVQsRUFBZTtBQUNsQk4sb0NBQVFDLEdBQVIsQ0FBWUssTUFBWjtBQUNILHlCQUhFO0FBSUhDLGlDQUFTLGlCQUFTQyxNQUFULEVBQWdCO0FBRXJCUixvQ0FBUUMsR0FBUixDQUFZLFFBQVo7QUFDSDtBQVBFLHFCQUFQO0FBU0gsaUIiLCJmaWxlIjoidHdpdHQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
