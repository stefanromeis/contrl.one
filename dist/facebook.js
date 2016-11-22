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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY2Vib29rLmpzIl0sIm5hbWVzIjpbImNvbm5lY3QiLCJGQiIsImxvZ2luIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwiZ2V0SW5mbyIsIiQiLCJoaWRlIiwic2NvcGUiLCJhcGkiLCJmaWVsZHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwibmFtZSIsInNyYyIsImlkIiwiaW5qZWN0IiwiSTE4TiIsIkZhY2Vib29rIiwiZmVlZF9wb3N0Iiwid2luZG93IiwiZmJBc3luY0luaXQiLCJpbml0IiwiYXBwSWQiLCJ4ZmJtbCIsInZlcnNpb24iLCJnZXRMb2dpblN0YXR1cyIsImQiLCJzIiwianMiLCJmanMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwibG9nb3V0IiwicG9zdCIsIm1lc3NhZ2UiLCJlcnJvciIsInNoYXJlTGluayIsImxpbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUE4RUksYUFBU0EsT0FBVCxHQUFtQjtBQUNmQyxXQUFHQyxLQUFILENBQVMsVUFBVUMsUUFBVixFQUFvQjtBQUN6QixnQkFBR0EsU0FBU0MsTUFBVCxLQUFvQixXQUF2QixFQUFvQztBQUNoQ0Msd0JBQVFDLEdBQVIsQ0FBWSx5QkFBWjtBQUNBQztBQUNBQyxrQkFBRSx1QkFBRixFQUEyQkMsSUFBM0I7QUFDSCxhQUpELE1BS0ssSUFBR04sU0FBU0MsTUFBVCxLQUFvQixnQkFBdkIsRUFBeUM7QUFDMUNDLHdCQUFRQyxHQUFSLENBQVksdUJBQVo7QUFDSCxhQUZJLE1BR0E7QUFDREQsd0JBQVFDLEdBQVIsQ0FBWSxtQ0FBWjtBQUNIO0FBQ0osU0FaRCxFQVlHLEVBQUNJLE9BQU8sT0FBUixFQVpIO0FBYUg7O0FBRUQsYUFBU0gsT0FBVCxHQUFtQjtBQUNmTixXQUFHVSxHQUFILENBQU8sSUFBUCxFQUFhLEtBQWIsRUFBb0IsRUFBQ0MsUUFBUSxzR0FBVCxFQUFwQixFQUNFLFVBQVNULFFBQVQsRUFBa0I7QUFNaEJVLHFCQUFTQyxjQUFULENBQXdCLE1BQXhCLEVBQWdDQyxTQUFoQyxHQUE0Q1osU0FBU2EsSUFBckQ7QUFDQUgscUJBQVNDLGNBQVQsQ0FBd0IsYUFBeEIsRUFBdUNHLEdBQXZDLEdBQTZDLCtCQUErQmQsU0FBU2UsRUFBeEMsR0FBNkMsVUFBMUY7QUFFSCxTQVZEO0FBV0g7OztBQTFHR0Msa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOzs7Z0NBRUtDLFE7QUFDVCxvQ0FBZTtBQUFBOztBQUNYLHlCQUFLQyxTQUFMLEdBQWlCLEVBQWpCOztBQUVBQywyQkFBT0MsV0FBUCxHQUFxQixZQUFXO0FBQzVCdkIsMkJBQUd3QixJQUFILENBQVE7QUFDTkMsbUNBQWEsaUJBRFA7QUFFTkMsbUNBQWEsSUFGUDtBQUdOQyxxQ0FBYTtBQUhQLHlCQUFSOztBQU1BM0IsMkJBQUc0QixjQUFILENBQWtCLFVBQVUxQixRQUFWLEVBQW9CO0FBQ2xDLGdDQUFHQSxTQUFTQyxNQUFULEtBQW9CLFdBQXZCLEVBQW9DO0FBRWhDSjtBQUNILDZCQUhELE1BSUssSUFBR0csU0FBU0MsTUFBVCxLQUFvQixnQkFBdkIsRUFBeUM7QUFDMUNDLHdDQUFRQyxHQUFSLENBQVksaUNBQVo7QUFDSCw2QkFGSSxNQUdBO0FBQ0RELHdDQUFRQyxHQUFSLENBQVksb0NBQVo7QUFDSDtBQUNKLHlCQVhEO0FBWUgscUJBbkJEOztBQXFCQywrQkFBU3dCLENBQVQsRUFBWUMsQ0FBWixFQUFlYixFQUFmLEVBQWtCO0FBQ2YsNEJBQUljLEVBQUo7QUFBQSw0QkFBUUMsTUFBTUgsRUFBRUksb0JBQUYsQ0FBdUJILENBQXZCLEVBQTBCLENBQTFCLENBQWQ7QUFDQSw0QkFBSUQsRUFBRWhCLGNBQUYsQ0FBaUJJLEVBQWpCLENBQUosRUFBMEI7QUFBQztBQUFRO0FBQ25DYyw2QkFBS0YsRUFBRUssYUFBRixDQUFnQkosQ0FBaEIsQ0FBTCxDQUF5QkMsR0FBR2QsRUFBSCxHQUFRQSxFQUFSOztBQUV6QmMsMkJBQUdmLEdBQUgsR0FBUywwQ0FBVDtBQUNBZ0IsNEJBQUlHLFVBQUosQ0FBZUMsWUFBZixDQUE0QkwsRUFBNUIsRUFBZ0NDLEdBQWhDO0FBQ0gscUJBUEEsRUFPQ3BCLFFBUEQsRUFPVyxRQVBYLEVBT3FCLGdCQVByQixDQUFEO0FBU0g7O21DQUVEYixPLHNCQUFVO0FBQ05DLHVCQUFHQyxLQUFILENBQVMsVUFBVUMsUUFBVixFQUFvQjtBQUN6Qiw0QkFBR0EsU0FBU0MsTUFBVCxLQUFvQixXQUF2QixFQUFvQztBQUNoQ0Msb0NBQVFDLEdBQVIsQ0FBWSx5QkFBWjtBQUNBQztBQUNBQyw4QkFBRSx1QkFBRixFQUEyQkMsSUFBM0I7QUFDSCx5QkFKRCxNQUtLLElBQUdOLFNBQVNDLE1BQVQsS0FBb0IsZ0JBQXZCLEVBQXlDO0FBQzFDQyxvQ0FBUUMsR0FBUixDQUFZLHVCQUFaO0FBQ0gseUJBRkksTUFHQTtBQUNERCxvQ0FBUUMsR0FBUixDQUFZLG1DQUFaO0FBQ0g7QUFDSixxQkFaRCxFQVlHLEVBQUNJLE9BQU8sT0FBUixFQVpIO0FBYUgsaUI7O21DQUdENEIsTSxxQkFBUztBQUNMckMsdUJBQUdxQyxNQUFILENBQVUsVUFBU25DLFFBQVQsRUFBbUI7QUFDekJVLGlDQUFTQyxjQUFULENBQXdCLFFBQXhCLEVBQWtDQyxTQUFsQyxHQUE4QyxtQ0FBOUM7QUFDSCxxQkFGRDtBQUdILGlCOzttQ0FFRHdCLEksbUJBQU87QUFDSGxDLDRCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBTCx1QkFBR1UsR0FBSCxDQUFPLFNBQVAsRUFBa0IsTUFBbEIsRUFBMEIsRUFBQzZCLFNBQVMsU0FBVixFQUExQixFQUFnRCxVQUFTckMsUUFBVCxFQUFrQjtBQUM5RFUsaUNBQVNDLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNDLFNBQXJDLEdBQWlEWixTQUFTc0MsS0FBMUQ7QUFDQXBDLGdDQUFRQyxHQUFSLENBQVlILFFBQVo7QUFDSCxxQkFIRDtBQUlILGlCOzttQ0FFRHVDLFMsd0JBQVk7QUFDUnpDLHVCQUFHVSxHQUFILENBQU8sU0FBUCxFQUFrQixNQUFsQixFQUEwQixFQUFDZ0MsTUFBTSw0QkFBUCxFQUExQixFQUFnRSxVQUFTeEMsUUFBVCxFQUFrQjtBQUM5RVUsaUNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NDLFNBQWxDLEdBQThDWixTQUFTZSxFQUF2RDtBQUNILHFCQUZEO0FBR0gsaUIiLCJmaWxlIjoiZmFjZWJvb2suanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
