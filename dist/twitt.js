"use strict";

System.register(["aurelia-framework"], function (_export, _context) {
    "use strict";

    var inject, Twitt;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }],
        execute: function () {
            _export("Twitt", Twitt = function () {
                function Twitt() {
                    _classCallCheck(this, Twitt);
                }

                Twitt.prototype.search = function search() {
                    $.ajax({ url: "https://api.twitter.com/oauth/request_token",
                        error: function error(_error) {
                            console.log(_error);
                        },
                        success: function success(result) {
                            $("#div1").html(result);
                            console.log('result');
                        }
                    });
                };

                return Twitt;
            }());

            _export("Twitt", Twitt);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR3aXR0LmpzIl0sIm5hbWVzIjpbImluamVjdCIsIlR3aXR0Iiwic2VhcmNoIiwiJCIsImFqYXgiLCJ1cmwiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJzdWNjZXNzIiwicmVzdWx0IiwiaHRtbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOzs7NkJBS0tDLEs7Ozs7O2dDQUVUQyxNLHFCQUFTO0FBQ0xDLHNCQUFFQyxJQUFGLENBQU8sRUFBQ0MsS0FBSyw2Q0FBTjtBQUNIQywrQkFBTyxlQUFTQSxNQUFULEVBQWU7QUFDbEJDLG9DQUFRQyxHQUFSLENBQVlGLE1BQVo7QUFDSCx5QkFIRTtBQUlIRyxpQ0FBUyxpQkFBU0MsTUFBVCxFQUFnQjtBQUNyQlAsOEJBQUUsT0FBRixFQUFXUSxJQUFYLENBQWdCRCxNQUFoQjtBQUNBSCxvQ0FBUUMsR0FBUixDQUFZLFFBQVo7QUFDSDtBQVBFLHFCQUFQO0FBU0gsaUIiLCJmaWxlIjoidHdpdHQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
