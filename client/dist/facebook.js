'use strict';

System.register(['aurelia-dialog', 'aurelia-framework', 'aurelia-i18n', 'prompt'], function (_export, _context) {
    "use strict";

    var DialogService, inject, I18N, Prompt, _dec, _class, Facebook;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaDialog) {
            DialogService = _aureliaDialog.DialogService;
        }, function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaI18n) {
            I18N = _aureliaI18n.I18N;
        }, function (_prompt) {
            Prompt = _prompt.Prompt;
        }],
        execute: function () {
            _export('Facebook', Facebook = (_dec = inject(DialogService), _dec(_class = function () {
                function Facebook(dialogService) {
                    _classCallCheck(this, Facebook);

                    this.dialogService = dialogService;
                    this.active = false;
                    this.connected = false;
                    this.isLoading = true;

                    this.message = '';
                    this.place = '';
                    this.link = '';
                    this.description = '';
                    this.picture = '';
                    this.name = '';

                    this.post = {
                        name: "",
                        place: "",
                        date: ""
                    };
                    this.feed = [];
                    this.feed_post = "";
                    this.modal = false;
                    this.notifications = 0;
                    this.notificationIds = [];
                    var self = this;

                    window.fbAsyncInit = function () {
                        FB.init({
                            appId: '672920632846289',
                            xfbml: true,
                            cookie: true,
                            status: true,
                            version: 'v2.6'
                        });

                        FB.getLoginStatus(function (response) {
                            if (response.status === 'connected') {
                                self.connect();
                            } else if (response.status === 'not_authorized') {
                                console.log("Facebook Status: not authorized");
                            } else {
                                console.log("Facebook Status: connection failed", response);
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
                    var self = this;
                    FB.login(function (response) {
                        if (response.status === 'connected') {
                            self.connected = true;
                            self.getInfo();
                            self.getFeed();
                            setInterval(function () {
                                self.getFeed();
                            }, 20000);
                        } else if (response.status === 'not_authorized') {
                            console.log("Not authorized.");
                        } else {
                            console.log("You are not logged into facebook.");
                        }
                    }, { scope: 'email' });
                };

                Facebook.prototype.logout = function logout() {
                    this.isLoading = true;
                    var self = this;
                    FB.logout(function (response) {
                        if (response && !response.error) {
                            self.connected = false;
                            self.isLoading = false;
                            self.feed = [];
                        } else {
                            console.log('Facebook logout failed.');
                            self.isLoading = false;
                        }
                    });
                };

                Facebook.prototype.getInfo = function getInfo() {
                    FB.api('me', 'GET', { fields: 'name, first_name, last_name, age_range, link, gender, locale, picture, timezone, updated_time, email' }, function (response) {
                        document.getElementById('name').innerHTML = response.first_name;
                        document.getElementById('profile-img').src = "http://graph.facebook.com/" + response.id + "/picture";
                    });
                };

                Facebook.prototype.getFeed = function getFeed() {
                    this.isLoading = true;
                    var self = this;
                    FB.api("me/posts?fields=caption,link,name,message,description,shares,updated_time,from,story,comments,reactions,place,full_picture", function (response) {
                        if (response && !response.error) {
                            var tempFeed = [];
                            for (var x = 0; x < response.data.length; x++) {
                                var post = {};
                                post.id = response.data[x].id;
                                post.author = response.data[x].from.name;
                                post.date = response.data[x].updated_time.split(/-|T/);
                                if (response.data[x].place) {
                                    post.place = response.data[x].place.name;
                                }
                                if (response.data[x].full_picture) {
                                    post.picture = response.data[x].full_picture;
                                }
                                post.link = response.data[x].link;
                                post.message = response.data[x].message;
                                post.story = response.data[x].story;
                                post.discription = response.data[x].description;
                                if (response.data[x].reactions) {
                                    post.reactions = response.data[x].reactions.data.length;
                                }
                                if (response.data[x].comments) {
                                    post.comments = response.data[x].comments.data.length;
                                }

                                tempFeed.push(post);
                            }
                            if (self.feed.length > 0) {
                                if (self.feed[0].id != tempFeed[0].id) {
                                    console.log('ye');
                                    for (var x = 1; x < tempFeed.length; x++) {
                                        if (self.feed[0].id == tempFeed[x].id) {
                                            self.notifications = self.notifications + x;
                                            console.log(self.notifications);
                                            for (var i = 0; i < x; i++) {
                                                self.notificationIds.push(tempFeed[i].id);
                                                console.log('ids ', self.notificationIds);
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                            self.feed = tempFeed;

                            self.isLoading = false;
                        } else {
                            console.log('could not load fb feed ', response.error);
                            self.isLoading = false;
                        }
                    });
                };

                Facebook.prototype.openModal = function openModal(bool) {
                    this.modalOpen = bool;
                };

                Facebook.prototype.openDialog = function openDialog(model) {
                    this.dialogService.open({ viewModel: Prompt, model: model }).then(function (response) {
                        if (!response.wasCancelled) {
                            console.log('OK');
                        } else {
                            console.log('cancelled');
                        }
                        console.log(response.output);
                    });
                };

                Facebook.prototype.postOnWall = function postOnWall() {
                    var self = this;
                    FB.api('/me/feed', 'post', {
                        message: self.message,
                        place: self.place,
                        link: self.link,
                        description: self.description,
                        picture: self.picture,
                        name: self.name
                    }, function (response) {
                        if (response && !response.error) {
                            self.modalOpen = false;
                            self.getFeed();
                            self.openDialog('Post on wall successful.');
                        } else {
                            self.openDialog('Post on wall failed. You have to provide a message at least.');
                        }
                    });
                };

                Facebook.prototype.deletePost = function deletePost(id) {
                    var self = this;
                    console.log(id);
                    FB.api("/" + id + "", "DELETE", function (response) {
                        if (response && !response.error) {
                            self.setNotification(id);
                            self.getFeed();
                        }
                        if (response.error) {
                            console.log('delete ', response);
                        }
                    });
                };

                Facebook.prototype.openNewTab = function openNewTab(url, id) {
                    if (url != undefined) {
                        var win = window.open(url, '_blank');
                        win.focus();
                    }

                    this.setNotification(id);
                };

                Facebook.prototype.setNotification = function setNotification(id) {
                    if ($.inArray(id, this.notificationIds) > -1) {
                        this.notifications = this.notifications - 1;
                        this.notificationIds.splice($.inArray(id, this.notificationIds), 1);
                    }
                };

                return Facebook;
            }()) || _class));

            _export('Facebook', Facebook);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY2Vib29rLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiRmFjZWJvb2siLCJkaWFsb2dTZXJ2aWNlIiwiYWN0aXZlIiwiY29ubmVjdGVkIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsInBsYWNlIiwibGluayIsImRlc2NyaXB0aW9uIiwicGljdHVyZSIsIm5hbWUiLCJwb3N0IiwiZGF0ZSIsImZlZWQiLCJmZWVkX3Bvc3QiLCJtb2RhbCIsIm5vdGlmaWNhdGlvbnMiLCJub3RpZmljYXRpb25JZHMiLCJzZWxmIiwid2luZG93IiwiZmJBc3luY0luaXQiLCJGQiIsImluaXQiLCJhcHBJZCIsInhmYm1sIiwiY29va2llIiwic3RhdHVzIiwidmVyc2lvbiIsImdldExvZ2luU3RhdHVzIiwicmVzcG9uc2UiLCJjb25uZWN0IiwiY29uc29sZSIsImxvZyIsImQiLCJzIiwiaWQiLCJqcyIsImZqcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImRvY3VtZW50IiwibG9naW4iLCJnZXRJbmZvIiwiZ2V0RmVlZCIsInNldEludGVydmFsIiwic2NvcGUiLCJsb2dvdXQiLCJlcnJvciIsImFwaSIsImZpZWxkcyIsImlubmVySFRNTCIsImZpcnN0X25hbWUiLCJ0ZW1wRmVlZCIsIngiLCJkYXRhIiwibGVuZ3RoIiwiYXV0aG9yIiwiZnJvbSIsInVwZGF0ZWRfdGltZSIsInNwbGl0IiwiZnVsbF9waWN0dXJlIiwic3RvcnkiLCJkaXNjcmlwdGlvbiIsInJlYWN0aW9ucyIsImNvbW1lbnRzIiwicHVzaCIsImkiLCJvcGVuTW9kYWwiLCJib29sIiwibW9kYWxPcGVuIiwib3BlbkRpYWxvZyIsIm1vZGVsIiwib3BlbiIsInZpZXdNb2RlbCIsInRoZW4iLCJ3YXNDYW5jZWxsZWQiLCJvdXRwdXQiLCJwb3N0T25XYWxsIiwiZGVsZXRlUG9zdCIsInNldE5vdGlmaWNhdGlvbiIsIm9wZW5OZXdUYWIiLCJ1cmwiLCJ1bmRlZmluZWQiLCJ3aW4iLCJmb2N1cyIsIiQiLCJpbkFycmF5Iiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEseUIsa0JBQUFBLGE7O0FBQ0FDLGtCLHFCQUFBQSxNOztBQUNBQyxnQixnQkFBQUEsSTs7QUFDQUMsa0IsV0FBQUEsTTs7O2dDQUlLQyxRLFdBRlpILE9BQU9ELGFBQVAsQztBQUdHLGtDQUFhSyxhQUFiLEVBQTRCO0FBQUE7O0FBQ3hCLHlCQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLHlCQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EseUJBQUtDLFNBQUwsR0FBaUIsSUFBakI7O0FBRUEseUJBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EseUJBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EseUJBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EseUJBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSx5QkFBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSx5QkFBS0MsSUFBTCxHQUFZLEVBQVo7O0FBRUEseUJBQUtDLElBQUwsR0FBWTtBQUNSRCw4QkFBTSxFQURFO0FBRVJKLCtCQUFPLEVBRkM7QUFHUk0sOEJBQU07QUFIRSxxQkFBWjtBQUtBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EseUJBQUtDLEtBQUwsR0FBYSxLQUFiO0FBQ0EseUJBQUtDLGFBQUwsR0FBcUIsQ0FBckI7QUFDQSx5QkFBS0MsZUFBTCxHQUF1QixFQUF2QjtBQUNBLHdCQUFJQyxPQUFPLElBQVg7O0FBRUFDLDJCQUFPQyxXQUFQLEdBQXFCLFlBQVc7QUFDNUJDLDJCQUFHQyxJQUFILENBQVE7QUFDTkMsbUNBQWEsaUJBRFA7QUFFTkMsbUNBQWEsSUFGUDtBQUdOQyxvQ0FBYSxJQUhQO0FBSU5DLG9DQUFhLElBSlA7QUFLTkMscUNBQWE7QUFMUCx5QkFBUjs7QUFRQU4sMkJBQUdPLGNBQUgsQ0FBa0IsVUFBVUMsUUFBVixFQUFvQjtBQUNsQyxnQ0FBR0EsU0FBU0gsTUFBVCxLQUFvQixXQUF2QixFQUFvQztBQUVoQ1IscUNBQUtZLE9BQUw7QUFDSCw2QkFIRCxNQUlLLElBQUdELFNBQVNILE1BQVQsS0FBb0IsZ0JBQXZCLEVBQXlDO0FBQzFDSyx3Q0FBUUMsR0FBUixDQUFZLGlDQUFaO0FBQ0gsNkJBRkksTUFHQTtBQUNERCx3Q0FBUUMsR0FBUixDQUFZLG9DQUFaLEVBQWtESCxRQUFsRDtBQUNIO0FBQ0oseUJBWEQ7QUFhSCxxQkF0QkQ7O0FBd0JDLCtCQUFTSSxDQUFULEVBQVlDLENBQVosRUFBZUMsRUFBZixFQUFrQjtBQUNmLDRCQUFJQyxFQUFKO0FBQUEsNEJBQVFDLE1BQU1KLEVBQUVLLG9CQUFGLENBQXVCSixDQUF2QixFQUEwQixDQUExQixDQUFkO0FBQ0EsNEJBQUlELEVBQUVNLGNBQUYsQ0FBaUJKLEVBQWpCLENBQUosRUFBMEI7QUFBQztBQUFRO0FBQ25DQyw2QkFBS0gsRUFBRU8sYUFBRixDQUFnQk4sQ0FBaEIsQ0FBTCxDQUF5QkUsR0FBR0QsRUFBSCxHQUFRQSxFQUFSOztBQUV6QkMsMkJBQUdLLEdBQUgsR0FBUywwQ0FBVDtBQUNBSiw0QkFBSUssVUFBSixDQUFlQyxZQUFmLENBQTRCUCxFQUE1QixFQUFnQ0MsR0FBaEM7QUFDSCxxQkFQQSxFQU9DTyxRQVBELEVBT1csUUFQWCxFQU9xQixnQkFQckIsQ0FBRDtBQVVIOzttQ0FFRGQsTyxzQkFBVTtBQUNOLHdCQUFJWixPQUFPLElBQVg7QUFDQUcsdUJBQUd3QixLQUFILENBQVMsVUFBVWhCLFFBQVYsRUFBb0I7QUFDekIsNEJBQUdBLFNBQVNILE1BQVQsS0FBb0IsV0FBdkIsRUFBb0M7QUFFaENSLGlDQUFLZixTQUFMLEdBQWlCLElBQWpCO0FBQ0FlLGlDQUFLNEIsT0FBTDtBQUNBNUIsaUNBQUs2QixPQUFMO0FBQ0FDLHdDQUFZLFlBQVU7QUFDbEI5QixxQ0FBSzZCLE9BQUw7QUFDSCw2QkFGRCxFQUVHLEtBRkg7QUFJSCx5QkFURCxNQVVLLElBQUdsQixTQUFTSCxNQUFULEtBQW9CLGdCQUF2QixFQUF5QztBQUMxQ0ssb0NBQVFDLEdBQVIsQ0FBWSxpQkFBWjtBQUNILHlCQUZJLE1BR0E7QUFDREQsb0NBQVFDLEdBQVIsQ0FBWSxtQ0FBWjtBQUNIO0FBQ0oscUJBakJELEVBaUJHLEVBQUNpQixPQUFPLE9BQVIsRUFqQkg7QUFrQkgsaUI7O21DQUdEQyxNLHFCQUFTO0FBQ0wseUJBQUs5QyxTQUFMLEdBQWlCLElBQWpCO0FBQ0Esd0JBQUljLE9BQU8sSUFBWDtBQUNBRyx1QkFBRzZCLE1BQUgsQ0FBVSxVQUFTckIsUUFBVCxFQUFtQjtBQUN6Qiw0QkFBSUEsWUFBWSxDQUFDQSxTQUFTc0IsS0FBMUIsRUFBaUM7QUFDN0JqQyxpQ0FBS2YsU0FBTCxHQUFpQixLQUFqQjtBQUNBZSxpQ0FBS2QsU0FBTCxHQUFpQixLQUFqQjtBQUNBYyxpQ0FBS0wsSUFBTCxHQUFZLEVBQVo7QUFDSCx5QkFKRCxNQUtLO0FBQ0RrQixvQ0FBUUMsR0FBUixDQUFZLHlCQUFaO0FBQ0FkLGlDQUFLZCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0g7QUFDSixxQkFWRDtBQVdILGlCOzttQ0FHRDBDLE8sc0JBQVU7QUFDTnpCLHVCQUFHK0IsR0FBSCxDQUFPLElBQVAsRUFBYSxLQUFiLEVBQW9CLEVBQUNDLFFBQVEsc0dBQVQsRUFBcEIsRUFDRSxVQUFTeEIsUUFBVCxFQUFrQjtBQUNoQmUsaUNBQVNMLGNBQVQsQ0FBd0IsTUFBeEIsRUFBZ0NlLFNBQWhDLEdBQTRDekIsU0FBUzBCLFVBQXJEO0FBQ0FYLGlDQUFTTCxjQUFULENBQXdCLGFBQXhCLEVBQXVDRSxHQUF2QyxHQUE2QywrQkFBK0JaLFNBQVNNLEVBQXhDLEdBQTZDLFVBQTFGO0FBQ0gscUJBSkQ7QUFLSCxpQjs7bUNBRURZLE8sc0JBQVc7QUFDUCx5QkFBSzNDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSx3QkFBSWMsT0FBTyxJQUFYO0FBQ0FHLHVCQUFHK0IsR0FBSCxDQUNBLDRIQURBLEVBRUksVUFBVXZCLFFBQVYsRUFBb0I7QUFDaEIsNEJBQUlBLFlBQVksQ0FBQ0EsU0FBU3NCLEtBQTFCLEVBQWlDO0FBRTdCLGdDQUFJSyxXQUFXLEVBQWY7QUFDQSxpQ0FBSSxJQUFJQyxJQUFJLENBQVosRUFBZUEsSUFBSTVCLFNBQVM2QixJQUFULENBQWNDLE1BQWpDLEVBQXlDRixHQUF6QyxFQUE4QztBQUMxQyxvQ0FBSTlDLE9BQU8sRUFBWDtBQUNBQSxxQ0FBS3dCLEVBQUwsR0FBVU4sU0FBUzZCLElBQVQsQ0FBY0QsQ0FBZCxFQUFpQnRCLEVBQTNCO0FBQ0F4QixxQ0FBS2lELE1BQUwsR0FBYy9CLFNBQVM2QixJQUFULENBQWNELENBQWQsRUFBaUJJLElBQWpCLENBQXNCbkQsSUFBcEM7QUFDQUMscUNBQUtDLElBQUwsR0FBWWlCLFNBQVM2QixJQUFULENBQWNELENBQWQsRUFBaUJLLFlBQWpCLENBQThCQyxLQUE5QixDQUFvQyxLQUFwQyxDQUFaO0FBQ0Esb0NBQUdsQyxTQUFTNkIsSUFBVCxDQUFjRCxDQUFkLEVBQWlCbkQsS0FBcEIsRUFBMkI7QUFDdkJLLHlDQUFLTCxLQUFMLEdBQWF1QixTQUFTNkIsSUFBVCxDQUFjRCxDQUFkLEVBQWlCbkQsS0FBakIsQ0FBdUJJLElBQXBDO0FBQ0g7QUFDRCxvQ0FBR21CLFNBQVM2QixJQUFULENBQWNELENBQWQsRUFBaUJPLFlBQXBCLEVBQWtDO0FBQzlCckQseUNBQUtGLE9BQUwsR0FBZW9CLFNBQVM2QixJQUFULENBQWNELENBQWQsRUFBaUJPLFlBQWhDO0FBQ0g7QUFDRHJELHFDQUFLSixJQUFMLEdBQVlzQixTQUFTNkIsSUFBVCxDQUFjRCxDQUFkLEVBQWlCbEQsSUFBN0I7QUFDQUkscUNBQUtOLE9BQUwsR0FBZXdCLFNBQVM2QixJQUFULENBQWNELENBQWQsRUFBaUJwRCxPQUFoQztBQUNBTSxxQ0FBS3NELEtBQUwsR0FBYXBDLFNBQVM2QixJQUFULENBQWNELENBQWQsRUFBaUJRLEtBQTlCO0FBQ0F0RCxxQ0FBS3VELFdBQUwsR0FBbUJyQyxTQUFTNkIsSUFBVCxDQUFjRCxDQUFkLEVBQWlCakQsV0FBcEM7QUFDQSxvQ0FBR3FCLFNBQVM2QixJQUFULENBQWNELENBQWQsRUFBaUJVLFNBQXBCLEVBQStCO0FBQzNCeEQseUNBQUt3RCxTQUFMLEdBQWlCdEMsU0FBUzZCLElBQVQsQ0FBY0QsQ0FBZCxFQUFpQlUsU0FBakIsQ0FBMkJULElBQTNCLENBQWdDQyxNQUFqRDtBQUNIO0FBQ0Qsb0NBQUc5QixTQUFTNkIsSUFBVCxDQUFjRCxDQUFkLEVBQWlCVyxRQUFwQixFQUE4QjtBQUMxQnpELHlDQUFLeUQsUUFBTCxHQUFnQnZDLFNBQVM2QixJQUFULENBQWNELENBQWQsRUFBaUJXLFFBQWpCLENBQTBCVixJQUExQixDQUErQkMsTUFBL0M7QUFDSDs7QUFFREgseUNBQVNhLElBQVQsQ0FBYzFELElBQWQ7QUFFSDtBQUNELGdDQUFHTyxLQUFLTCxJQUFMLENBQVU4QyxNQUFWLEdBQW1CLENBQXRCLEVBQTBCO0FBQ3RCLG9DQUFHekMsS0FBS0wsSUFBTCxDQUFVLENBQVYsRUFBYXNCLEVBQWIsSUFBbUJxQixTQUFTLENBQVQsRUFBWXJCLEVBQWxDLEVBQXNDO0FBQ2xDSiw0Q0FBUUMsR0FBUixDQUFZLElBQVo7QUFDQSx5Q0FBSSxJQUFJeUIsSUFBSSxDQUFaLEVBQWVBLElBQUlELFNBQVNHLE1BQTVCLEVBQW9DRixHQUFwQyxFQUF5QztBQUNyQyw0Q0FBR3ZDLEtBQUtMLElBQUwsQ0FBVSxDQUFWLEVBQWFzQixFQUFiLElBQW1CcUIsU0FBU0MsQ0FBVCxFQUFZdEIsRUFBbEMsRUFBdUM7QUFDbkNqQixpREFBS0YsYUFBTCxHQUFxQkUsS0FBS0YsYUFBTCxHQUFxQnlDLENBQTFDO0FBQ0ExQixvREFBUUMsR0FBUixDQUFZZCxLQUFLRixhQUFqQjtBQUNBLGlEQUFJLElBQUlzRCxJQUFJLENBQVosRUFBZUEsSUFBSWIsQ0FBbkIsRUFBc0JhLEdBQXRCLEVBQTJCO0FBQ3ZCcEQscURBQUtELGVBQUwsQ0FBcUJvRCxJQUFyQixDQUEwQmIsU0FBU2MsQ0FBVCxFQUFZbkMsRUFBdEM7QUFDQUosd0RBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CZCxLQUFLRCxlQUF6QjtBQUNIO0FBQ0Q7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNEQyxpQ0FBS0wsSUFBTCxHQUFZMkMsUUFBWjs7QUFFQXRDLGlDQUFLZCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0gseUJBL0NELE1BZ0RLO0FBQ0QyQixvQ0FBUUMsR0FBUixDQUFZLHlCQUFaLEVBQXVDSCxTQUFTc0IsS0FBaEQ7QUFDQWpDLGlDQUFLZCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0g7QUFDSixxQkF2REw7QUF5REgsaUI7O21DQUVEbUUsUyxzQkFBVUMsSSxFQUFNO0FBQ1oseUJBQUtDLFNBQUwsR0FBaUJELElBQWpCO0FBQ0gsaUI7O21DQUVERSxVLHVCQUFXQyxLLEVBQU87QUFDaEIseUJBQUsxRSxhQUFMLENBQW1CMkUsSUFBbkIsQ0FBd0IsRUFBQ0MsV0FBVzlFLE1BQVosRUFBb0I0RSxPQUFPQSxLQUEzQixFQUF4QixFQUE0REcsSUFBNUQsQ0FBaUUsb0JBQVk7QUFDekUsNEJBQUksQ0FBQ2pELFNBQVNrRCxZQUFkLEVBQTRCO0FBQzFCaEQsb0NBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0QseUJBRkQsTUFFTztBQUNMRCxvQ0FBUUMsR0FBUixDQUFZLFdBQVo7QUFDRDtBQUNERCxnQ0FBUUMsR0FBUixDQUFZSCxTQUFTbUQsTUFBckI7QUFDSCxxQkFQRDtBQVFELGlCOzttQ0FFREMsVSx5QkFBYTtBQUNULHdCQUFJL0QsT0FBTyxJQUFYO0FBQ0FHLHVCQUFHK0IsR0FBSCxDQUNJLFVBREosRUFDZ0IsTUFEaEIsRUFDd0I7QUFDaEIvQyxpQ0FBU2EsS0FBS2IsT0FERTtBQUVoQkMsK0JBQU9ZLEtBQUtaLEtBRkk7QUFHaEJDLDhCQUFNVyxLQUFLWCxJQUhLO0FBSWhCQyxxQ0FBYVUsS0FBS1YsV0FKRjtBQUtoQkMsaUNBQVNTLEtBQUtULE9BTEU7QUFNaEJDLDhCQUFNUSxLQUFLUjtBQU5LLHFCQUR4QixFQVFFLFVBQVNtQixRQUFULEVBQW1CO0FBQ2pCLDRCQUFJQSxZQUFZLENBQUNBLFNBQVNzQixLQUExQixFQUFpQztBQUM3QmpDLGlDQUFLdUQsU0FBTCxHQUFpQixLQUFqQjtBQUNBdkQsaUNBQUs2QixPQUFMO0FBQ0E3QixpQ0FBS3dELFVBQUwsQ0FBZ0IsMEJBQWhCO0FBQ0gseUJBSkQsTUFLSztBQUNEeEQsaUNBQUt3RCxVQUFMLENBQWdCLDhEQUFoQjtBQUNIO0FBQ0oscUJBakJEO0FBa0JILGlCOzttQ0FFRFEsVSx1QkFBVy9DLEUsRUFBSTtBQUNYLHdCQUFJakIsT0FBTyxJQUFYO0FBQ0FhLDRCQUFRQyxHQUFSLENBQVlHLEVBQVo7QUFDQWQsdUJBQUcrQixHQUFILENBQ0ksTUFBSWpCLEVBQUosR0FBTyxFQURYLEVBRUksUUFGSixFQUdJLFVBQVVOLFFBQVYsRUFBb0I7QUFDaEIsNEJBQUlBLFlBQVksQ0FBQ0EsU0FBU3NCLEtBQTFCLEVBQWlDO0FBQzdCakMsaUNBQUtpRSxlQUFMLENBQXFCaEQsRUFBckI7QUFDQWpCLGlDQUFLNkIsT0FBTDtBQUNIO0FBQ0QsNEJBQUdsQixTQUFTc0IsS0FBWixFQUFtQjtBQUNmcEIsb0NBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCSCxRQUF2QjtBQUNIO0FBQ0oscUJBWEw7QUFhSCxpQjs7bUNBRUR1RCxVLHVCQUFXQyxHLEVBQUtsRCxFLEVBQUk7QUFHaEIsd0JBQUdrRCxPQUFPQyxTQUFWLEVBQXFCO0FBQ2pCLDRCQUFJQyxNQUFNcEUsT0FBT3lELElBQVAsQ0FBWVMsR0FBWixFQUFpQixRQUFqQixDQUFWO0FBQ0FFLDRCQUFJQyxLQUFKO0FBQ0g7O0FBRUQseUJBQUtMLGVBQUwsQ0FBcUJoRCxFQUFyQjtBQUNILGlCOzttQ0FFRGdELGUsNEJBQWdCaEQsRSxFQUFJO0FBQ2hCLHdCQUFHc0QsRUFBRUMsT0FBRixDQUFVdkQsRUFBVixFQUFjLEtBQUtsQixlQUFuQixJQUFzQyxDQUFDLENBQTFDLEVBQTZDO0FBQ3pDLDZCQUFLRCxhQUFMLEdBQXFCLEtBQUtBLGFBQUwsR0FBcUIsQ0FBMUM7QUFDQSw2QkFBS0MsZUFBTCxDQUFxQjBFLE1BQXJCLENBQTZCRixFQUFFQyxPQUFGLENBQVV2RCxFQUFWLEVBQWMsS0FBS2xCLGVBQW5CLENBQTdCLEVBQWtFLENBQWxFO0FBQ0g7QUFDSixpQiIsImZpbGUiOiJmYWNlYm9vay5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
