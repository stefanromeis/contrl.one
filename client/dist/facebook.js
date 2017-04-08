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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY2Vib29rLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiRmFjZWJvb2siLCJkaWFsb2dTZXJ2aWNlIiwiYWN0aXZlIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsInBsYWNlIiwibGluayIsImRlc2NyaXB0aW9uIiwicGljdHVyZSIsIm5hbWUiLCJwb3N0IiwiZGF0ZSIsImZlZWQiLCJmZWVkX3Bvc3QiLCJtb2RhbCIsIm5vdGlmaWNhdGlvbnMiLCJub3RpZmljYXRpb25JZHMiLCJzZWxmIiwid2luZG93IiwiZmJBc3luY0luaXQiLCJGQiIsImluaXQiLCJhcHBJZCIsInhmYm1sIiwiY29va2llIiwic3RhdHVzIiwidmVyc2lvbiIsImdldExvZ2luU3RhdHVzIiwicmVzcG9uc2UiLCJjb25uZWN0IiwiY29uc29sZSIsImxvZyIsImQiLCJzIiwiaWQiLCJqcyIsImZqcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImRvY3VtZW50IiwibG9naW4iLCJjb25uZWN0ZWQiLCJnZXRJbmZvIiwiZ2V0RmVlZCIsInNldEludGVydmFsIiwic2NvcGUiLCJsb2dvdXQiLCJlcnJvciIsImFwaSIsImZpZWxkcyIsImlubmVySFRNTCIsImZpcnN0X25hbWUiLCJ0ZW1wRmVlZCIsIngiLCJkYXRhIiwibGVuZ3RoIiwiYXV0aG9yIiwiZnJvbSIsInVwZGF0ZWRfdGltZSIsInNwbGl0IiwiZnVsbF9waWN0dXJlIiwic3RvcnkiLCJkaXNjcmlwdGlvbiIsInJlYWN0aW9ucyIsImNvbW1lbnRzIiwicHVzaCIsImkiLCJvcGVuTW9kYWwiLCJib29sIiwibW9kYWxPcGVuIiwib3BlbkRpYWxvZyIsIm1vZGVsIiwib3BlbiIsInZpZXdNb2RlbCIsInRoZW4iLCJ3YXNDYW5jZWxsZWQiLCJvdXRwdXQiLCJwb3N0T25XYWxsIiwiZGVsZXRlUG9zdCIsInNldE5vdGlmaWNhdGlvbiIsIm9wZW5OZXdUYWIiLCJ1cmwiLCJ1bmRlZmluZWQiLCJ3aW4iLCJmb2N1cyIsIiQiLCJpbkFycmF5Iiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEseUIsa0JBQUFBLGE7O0FBQ0FDLGtCLHFCQUFBQSxNOztBQUNBQyxnQixnQkFBQUEsSTs7QUFDQUMsa0IsV0FBQUEsTTs7O2dDQUdLQyxRLFdBRFpILE9BQU9ELGFBQVAsQztBQUdHLGtDQUFhSyxhQUFiLEVBQTRCO0FBQUE7O0FBQ3hCLHlCQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLHlCQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCLElBQWpCOztBQUVBLHlCQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLHlCQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EseUJBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EseUJBQUtDLElBQUwsR0FBWSxFQUFaOztBQUVBLHlCQUFLQyxJQUFMLEdBQVk7QUFDUkQsOEJBQU0sRUFERTtBQUVSSiwrQkFBTyxFQUZDO0FBR1JNLDhCQUFNO0FBSEUscUJBQVo7O0FBTUEseUJBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EseUJBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSx5QkFBS0MsS0FBTCxHQUFhLEtBQWI7QUFDQSx5QkFBS0MsYUFBTCxHQUFxQixDQUFyQjtBQUNBLHlCQUFLQyxlQUFMLEdBQXVCLEVBQXZCO0FBQ0Esd0JBQUlDLE9BQU8sSUFBWDs7QUFFQUMsMkJBQU9DLFdBQVAsR0FBcUIsWUFBVztBQUM1QkMsMkJBQUdDLElBQUgsQ0FBUTtBQUNOQyxtQ0FBYSxpQkFEUDtBQUVOQyxtQ0FBYSxJQUZQO0FBR05DLG9DQUFhLElBSFA7QUFJTkMsb0NBQWEsSUFKUDtBQUtOQyxxQ0FBYTtB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TVEsS0FBS1I7QUFOSyxxQkFEeEIsRUFRRSxVQUFTbUIsUUFBVCxFQUFtQjtBQUNqQiw0QkFBSUEsWUFBWSxDQUFDQSxTQUFTdUIsS0FBMUIsRUFBaUM7QUFDN0JsQyxpQ0FBS3dELFNBQUwsR0FBaUIsS0FBakI7QUFDQXhELGlDQUFLOEIsT0FBTDtBQUNBOUIsaUNBQUt5RCxVQUFMLENBQWdCLDBCQUFoQjtBQUNILHlCQUpELE1BS0s7QUFDRHpELGlDQUFLeUQsVUFBTCxDQUFnQiw4REFBaEI7QUFDSDtBQUNKLHFCQWpCRDtBQWtCSCxpQjs7bUNBRURRLFUsdUJBQVdoRCxFLEVBQUk7QUFDWCx3QkFBSWpCLE9BQU8sSUFBWDtBQUNBYSw0QkFBUUMsR0FBUixDQUFZRyxFQUFaO0FBQ0FkLHVCQUFHZ0MsR0FBSCxDQUNJLE1BQUlsQixFQUFKLEdBQU8sRUFEWCxFQUVJLFFBRkosRUFHSSxVQUFVTixRQUFWLEVBQW9CO0FBQ2hCLDRCQUFJQSxZQUFZLENBQUNBLFNBQVN1QixLQUExQixFQUFpQztBQUM3QmxDLGlDQUFLa0UsZUFBTCxDQUFxQmpELEVBQXJCO0FBQ0FqQixpQ0FBSzhCLE9BQUw7QUFDSDtBQUNELDRCQUFHbkIsU0FBU3VCLEtBQVosRUFBbUI7QUFDZnJCLG9DQUFRQyxHQUFSLENBQVksU0FBWixFQUF1QkgsUUFBdkI7QUFDSDtBQUNKLHFCQVhMO0FBYUgsaUI7O21DQUVEd0QsVSx1QkFBV0MsRyxFQUFLbkQsRSxFQUFJO0FBR2hCLHdCQUFHbUQsT0FBT0MsU0FBVixFQUFxQjtBQUNqQiw0QkFBSUMsTUFBTXJFLE9BQU8wRCxJQUFQLENBQVlTLEdBQVosRUFBaUIsUUFBakIsQ0FBVjtBQUNBRSw0QkFBSUMsS0FBSjtBQUNIOztBQUVELHlCQUFLTCxlQUFMLENBQXFCakQsRUFBckI7QUFDSCxpQjs7bUNBRURpRCxlLDRCQUFnQmpELEUsRUFBSTtBQUNoQix3QkFBR3VELEVBQUVDLE9BQUYsQ0FBVXhELEVBQVYsRUFBYyxLQUFLbEIsZUFBbkIsSUFBc0MsQ0FBQyxDQUExQyxFQUE2QztBQUN6Qyw2QkFBS0QsYUFBTCxHQUFxQixLQUFLQSxhQUFMLEdBQXFCLENBQTFDO0FBQ0EsNkJBQUtDLGVBQUwsQ0FBcUIyRSxNQUFyQixDQUE2QkYsRUFBRUMsT0FBRixDQUFVeEQsRUFBVixFQUFjLEtBQUtsQixlQUFuQixDQUE3QixFQUFrRSxDQUFsRTtBQUNIO0FBQ0osaUIiLCJmaWxlIjoiZmFjZWJvb2suanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
