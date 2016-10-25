'use strict';

System.register(['aurelia-framework', 'aurelia-i18n'], function (_export, _context) {
    "use strict";

    var inject, I18N, Facebook;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function connect() {
        FB.login(function (response) {
            if (response.status === 'connected') {
                console.log("We are connected to FB.");
                getInfo();
                $('.facebook-connect-btn').hide();
            } else if (response.status === 'not_authorized') {
                console.log("We are not loggin in.");
            } else {
                console.log("You are not logged into facebook.");
            }
        }, { scope: 'email' });
    }

    function getInfo() {
        FB.api('me', 'GET', { fields: 'name, first_name, last_name, age_range, link, gender, locale, picture, timezone, updated_time, email' }, function (response) {
            document.getElementById('name').innerHTML = response.name;
            document.getElementById('profile-img').src = "http://graph.facebook.com/" + response.id + "/picture";
        });
    }
    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaI18n) {
            I18N = _aureliaI18n.I18N;
        }],
        execute: function () {
            _export('Facebook', Facebook = function () {
                function Facebook() {
                    _classCallCheck(this, Facebook);

                    this.feed_post = "";

                    window.fbAsyncInit = function () {
                        FB.init({
                            appId: '672920632846289',
                            xfbml: true,
                            version: 'v2.6'
                        });

                        FB.getLoginStatus(function (response) {
                            if (response.status === 'connected') {
                                console.log("Facebook Status: OK");
                                connect();
                            } else if (response.status === 'not_authorized') {
                                console.log("Facebook Status: not authorized");
                            } else {
                                console.log("Facebook Status: connection failed");
                            }
                        });
                    };

                    (function (d, s, id) {
                        var js,
                            fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {
                            return;
                        }
                        js = d.createElement(s);js.id = id;

                        js.src = "http://connect.facebook.net/en_US/all.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    })(document, 'script', 'facebook-jssdk');
                }

                Facebook.prototype.connect = function connect() {
                    FB.login(function (response) {
                        if (response.status === 'connected') {
                            console.log("We are connected to FB.");
                            getInfo();
                            $('.facebook-connect-btn').hide();
                        } else if (response.status === 'not_authorized') {
                            console.log("We are not loggin in.");
                        } else {
                            console.log("You are not logged into facebook.");
                        }
                    }, { scope: 'email' });
                };

                Facebook.prototype.logout = function logout() {
                    FB.logout(function (response) {
                        document.getElementById('status').innerHTML = "You are not logged into facebook.";
                    });
                };

                Facebook.prototype.post = function post() {
                    console.log("post");
                    FB.api('me/feed', 'post', { message: 'test...' }, function (response) {
                        document.getElementById('feed_post').innerHTML = response.error;
                        console.log(response);
                    });
                };

                Facebook.prototype.shareLink = function shareLink() {
                    FB.api('me/feed', 'post', { link: 'http://virtual-elements.de' }, function (response) {
                        document.getElementById('status').innerHTML = response.id;
                    });
                };

                return Facebook;
            }());

            _export('Facebook', Facebook);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY2Vib29rLmpzIl0sIm5hbWVzIjpbImNvbm5lY3QiLCJGQiIsImxvZ2luIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwiZ2V0SW5mbyIsIiQiLCJoaWRlIiwic2NvcGUiLCJhcGkiLCJmaWVsZHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwibmFtZSIsInNyYyIsImlkIiwiaW5qZWN0IiwiSTE4TiIsIkZhY2Vib29rIiwiZmVlZF9wb3N0Iiwid2luZG93IiwiZmJBc3luY0luaXQiLCJpbml0IiwiYXBwSWQiLCJ4ZmJtbCIsInZlcnNpb24iLCJnZXRMb2dpblN0YXR1cyIsImQiLCJzIiwianMiLCJmanMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwibG9nb3V0IiwicG9zdCIsIm1lc3NhZ2UiLCJlcnJvciIsInNoYXJlTGluayIsImxpbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUErRUksYUFBU0EsT0FBVCxHQUFtQjtBQUNmQyxXQUFHQyxLQUFILENBQVMsVUFBVUMsUUFBVixFQUFvQjtBQUN6QixnQkFBR0EsU0FBU0MsTUFBVCxLQUFvQixXQUF2QixFQUFvQztBQUNoQ0Msd0JBQVFDLEdBQVIsQ0FBWSx5QkFBWjtBQUNBQztBQUNBQyxrQkFBRSx1QkFBRixFQUEyQkMsSUFBM0I7QUFDSCxhQUpELE1BS0ssSUFBR04sU0FBU0MsTUFBVCxLQUFvQixnQkFBdkIsRUFBeUM7QUFDMUNDLHdCQUFRQyxHQUFSLENBQVksdUJBQVo7QUFDSCxhQUZJLE1BR0E7QUFDREQsd0JBQVFDLEdBQVIsQ0FBWSxtQ0FBWjtBQUNIO0FBQ0osU0FaRCxFQVlHLEVBQUNJLE9BQU8sT0FBUixFQVpIO0FBYUg7O0FBRUQsYUFBU0gsT0FBVCxHQUFtQjtBQUNmTixXQUFHVSxHQUFILENBQU8sSUFBUCxFQUFhLEtBQWIsRUFBb0IsRUFBQ0MsUUFBUSxzR0FBVCxFQUFwQixFQUNFLFVBQVNULFFBQVQsRUFBa0I7QUFNaEJVLHFCQUFTQyxjQUFULENBQXdCLE1BQXhCLEVBQWdDQyxTQUFoQyxHQUE0Q1osU0FBU2EsSUFBckQ7QUFDQUgscUJBQVNDLGNBQVQsQ0FBd0IsYUFBeEIsRUFBdUNHLEdBQXZDLEdBQTZDLCtCQUErQmQsU0FBU2UsRUFBeEMsR0FBNkMsVUFBMUY7QUFFSCxTQVZEO0FBV0g7OztBQTNHR0Msa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOzs7Z0NBRUtDLFE7QUFDVCxvQ0FBZTtBQUFBOztBQUNYLHlCQUFLQyxTQUFMLEdBQWlCLEVBQWpCOztBQUVBQywyQkFBT0MsV0FBUCxHQUFxQixZQUFXO0FBQzVCdkIsMkJBQUd3QixJQUFILENBQVE7QUFDTkMsbUNBQWEsaUJBRFA7QUFFTkMsbUNBQWEsSUFGUDtBQUdOQyxxQ0FBYTtBQUhQLHlCQUFSOztBQU1BM0IsMkJBQUc0QixjQUFILENBQWtCLFVBQVUxQixRQUFWLEVBQW9CO0FBQ2xDLGdDQUFHQSxTQUFTQyxNQUFULEtBQW9CLFdBQXZCLEVBQW9DO0FBQ2hDQyx3Q0FBUUMsR0FBUixDQUFZLHFCQUFaO0FBQ0FOO0FBQ0gsNkJBSEQsTUFJSyxJQUFHRyxTQUFTQyxNQUFULEtBQW9CLGdCQUF2QixFQUF5QztBQUMxQ0Msd0NBQVFDLEdBQVIsQ0FBWSxpQ0FBWjtBQUNILDZCQUZJLE1BR0E7QUFDREQsd0NBQVFDLEdBQVIsQ0FBWSxvQ0FBWjtBQUNIO0FBQ0oseUJBWEQ7QUFZSCxxQkFuQkQ7O0FBcUJDLCtCQUFTd0IsQ0FBVCxFQUFZQyxDQUFaLEVBQWViLEVBQWYsRUFBa0I7QUFDZiw0QkFBSWMsRUFBSjtBQUFBLDRCQUFRQyxNQUFNSCxFQUFFSSxvQkFBRixDQUF1QkgsQ0FBdkIsRUFBMEIsQ0FBMUIsQ0FBZDtBQUNBLDRCQUFJRCxFQUFFaEIsY0FBRixDQUFpQkksRUFBakIsQ0FBSixFQUEwQjtBQUFDO0FBQVE7QUFDbkNjLDZCQUFLRixFQUFFSyxhQUFGLENBQWdCSixDQUFoQixDQUFMLENBQXlCQyxHQUFHZCxFQUFILEdBQVFBLEVBQVI7O0FBRXpCYywyQkFBR2YsR0FBSCxHQUFTLDBDQUFUO0FBQ0FnQiw0QkFBSUcsVUFBSixDQUFlQyxZQUFmLENBQTRCTCxFQUE1QixFQUFnQ0MsR0FBaEM7QUFDSCxxQkFQQSxFQU9DcEIsUUFQRCxFQU9XLFFBUFgsRUFPcUIsZ0JBUHJCLENBQUQ7QUFTSDs7bUNBRURiLE8sc0JBQVU7QUFDTkMsdUJBQUdDLEtBQUgsQ0FBUyxVQUFVQyxRQUFWLEVBQW9CO0FBQ3pCLDRCQUFHQSxTQUFTQyxNQUFULEtBQW9CLFdBQXZCLEVBQW9DO0FBQ2hDQyxvQ0FBUUMsR0FBUixDQUFZLHlCQUFaO0FBQ0FDO0FBQ0FDLDhCQUFFLHVCQUFGLEVBQTJCQyxJQUEzQjtBQUNILHlCQUpELE1BS0ssSUFBR04sU0FBU0MsTUFBVCxLQUFvQixnQkFBdkIsRUFBeUM7QUFDMUNDLG9DQUFRQyxHQUFSLENBQVksdUJBQVo7QUFDSCx5QkFGSSxNQUdBO0FBQ0RELG9DQUFRQyxHQUFSLENBQVksbUNBQVo7QUFDSDtBQUNKLHFCQVpELEVBWUcsRUFBQ0ksT0FBTyxPQUFSLEVBWkg7QUFhSCxpQjs7bUNBSUQ0QixNLHFCQUFTO0FBQ0xyQyx1QkFBR3FDLE1BQUgsQ0FBVSxVQUFTbkMsUUFBVCxFQUFtQjtBQUN6QlUsaUNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NDLFNBQWxDLEdBQThDLG1DQUE5QztBQUNILHFCQUZEO0FBR0gsaUI7O21DQUVEd0IsSSxtQkFBTztBQUNIbEMsNEJBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FMLHVCQUFHVSxHQUFILENBQU8sU0FBUCxFQUFrQixNQUFsQixFQUEwQixFQUFDNkIsU0FBUyxTQUFWLEVBQTFCLEVBQWdELFVBQVNyQyxRQUFULEVBQWtCO0FBQzlEVSxpQ0FBU0MsY0FBVCxDQUF3QixXQUF4QixFQUFxQ0MsU0FBckMsR0FBaURaLFNBQVNzQyxLQUExRDtBQUNBcEMsZ0NBQVFDLEdBQVIsQ0FBWUgsUUFBWjtBQUNILHFCQUhEO0FBSUgsaUI7O21DQUVEdUMsUyx3QkFBWTtBQUNSekMsdUJBQUdVLEdBQUgsQ0FBTyxTQUFQLEVBQWtCLE1BQWxCLEVBQTBCLEVBQUNnQyxNQUFNLDRCQUFQLEVBQTFCLEVBQWdFLFVBQVN4QyxRQUFULEVBQWtCO0FBQzlFVSxpQ0FBU0MsY0FBVCxDQUF3QixRQUF4QixFQUFrQ0MsU0FBbEMsR0FBOENaLFNBQVNlLEVBQXZEO0FBQ0gscUJBRkQ7QUFHSCxpQiIsImZpbGUiOiJmYWNlYm9vay5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
