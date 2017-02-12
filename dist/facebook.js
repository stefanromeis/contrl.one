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
                            console.log("We are not loggin in.");
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
                    var json = {
                        'name': 'test'
                    };
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
                    console.log('url', url);
                    console.log('id', id);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY2Vib29rLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiRmFjZWJvb2siLCJkaWFsb2dTZXJ2aWNlIiwiYWN0aXZlIiwiY29ubmVjdGVkIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsInBsYWNlIiwibGluayIsImRlc2NyaXB0aW9uIiwicGljdHVyZSIsIm5hbWUiLCJwb3N0IiwiZGF0ZSIsImZlZWQiLCJmZWVkX3Bvc3QiLCJtb2RhbCIsIm5vdGlmaWNhdGlvbnMiLCJub3RpZmljYXRpb25JZHMiLCJzZWxmIiwid2luZG93IiwiZmJBc3luY0luaXQiLCJGQiIsImluaXQiLCJhcHBJZCIsInhmYm1sIiwiY29va2llIiwic3RhdHVzIiwidmVyc2lvbiIsImdldExvZ2luU3RhdHVzIiwicmVzcG9uc2UiLCJjb25uZWN0IiwiY29uc29sZSIsImxvZyIsImQiLCJzIiwiaWQiLCJqcyIsImZqcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImRvY3VtZW50IiwibG9naW4iLCJnZXRJbmZvIiwiZ2V0RmVlZCIsInNldEludGVydmFsIiwic2NvcGUiLCJsb2dvdXQiLCJlcnJvciIsImFwaSIsImZpZWxkcyIsImlubmVySFRNTCIsImZpcnN0X25hbWUiLCJqc29uIiwidGVtcEZlZWQiLCJ4IiwiZGF0YSIsImxlbmd0aCIsImF1dGhvciIsImZyb20iLCJ1cGRhdGVkX3RpbWUiLCJzcGxpdCIsImZ1bGxfcGljdHVyZSIsInN0b3J5IiwiZGlzY3JpcHRpb24iLCJyZWFjdGlvbnMiLCJjb21tZW50cyIsInB1c2giLCJpIiwib3Blbk1vZGFsIiwiYm9vbCIsIm1vZGFsT3BlbiIsIm9wZW5EaWFsb2ciLCJtb2RlbCIsIm9wZW4iLCJ2aWV3TW9kZWwiLCJ0aGVuIiwid2FzQ2FuY2VsbGVkIiwib3V0cHV0IiwicG9zdE9uV2FsbCIsImRlbGV0ZVBvc3QiLCJzZXROb3RpZmljYXRpb24iLCJvcGVuTmV3VGFiIiwidXJsIiwidW5kZWZpbmVkIiwid2luIiwiZm9jdXMiLCIkIiwiaW5BcnJheSIsInNwbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLHlCLGtCQUFBQSxhOztBQUNBQyxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7O0FBQ0FDLGtCLFdBQUFBLE07OztnQ0FJS0MsUSxXQUZaSCxPQUFPRCxhQUFQLEM7QUFHRyxrQ0FBYUssYUFBYixFQUE0QjtBQUFBOztBQUN4Qix5QkFBS0EsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSx5QkFBS0MsTUFBTCxHQUFjLEtBQWQ7QUFDQSx5QkFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCLElBQWpCOztBQUVBLHlCQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLHlCQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EseUJBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EseUJBQUtDLElBQUwsR0FBWSxFQUFaOztBQUVBLHlCQUFLQyxJQUFMLEdBQVk7QUFDUkQsOEJBQU0sRUFERTtBQUVSSiwrQkFBTyxFQUZDO0FBR1JNLDhCQUFNO0FBSEUscUJBQVo7QUFLQSx5QkFBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSx5QkFBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNBLHlCQUFLQyxLQUFMLEdBQWEsS0FBYjtBQUNBLHlCQUFLQyxhQUFMLEdBQXFCLENBQXJCO0FBQ0EseUJBQUtDLGVBQUwsR0FBdUIsRUFBdkI7QUFDQSx3QkFBSUMsT0FBTyxJQUFYOztBQUVBQywyQkFBT0MsV0FBUCxHQUFxQixZQUFXO0FBQzVCQywyQkFBR0MsSUFBSCxDQUFRO0FBQ05DLG1DQUFhLGlCQURQO0FBRU5DLG1DQUFhLElBRlA7QUFHTkMsb0NBQWEs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QUtYLElBSFM7QUFJcEJDLHFDQUFhVSxLQUFLVixXQUpFO0FBS3BCQyxpQ0FBU1MsS0FBS1QsT0FMTTtBQU1wQkMsOEJBQU1RLEtBQUtSO0FBTlMscUJBRHhCLEVBUUUsVUFBU21CLFFBQVQsRUFBbUI7QUFDakIsNEJBQUlBLFlBQVksQ0FBQ0EsU0FBU3NCLEtBQTFCLEVBQWlDO0FBQzdCakMsaUNBQUt3RCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0F4RCxpQ0FBSzZCLE9BQUw7QUFDQTdCLGlDQUFLeUQsVUFBTCxDQUFnQiwwQkFBaEI7QUFDSCx5QkFKRCxNQUtLO0FBQ0R6RCxpQ0FBS3lELFVBQUwsQ0FBZ0IsOERBQWhCO0FBQ0g7QUFDSixxQkFqQkQ7QUFrQkgsaUI7O21DQUVEUSxVLHVCQUFXaEQsRSxFQUFJO0FBQ1gsd0JBQUlqQixPQUFPLElBQVg7QUFDQWEsNEJBQVFDLEdBQVIsQ0FBWUcsRUFBWjtBQUNBZCx1QkFBRytCLEdBQUgsQ0FDSSxNQUFJakIsRUFBSixHQUFPLEVBRFgsRUFFSSxRQUZKLEVBR0ksVUFBVU4sUUFBVixFQUFvQjtBQUNoQiw0QkFBSUEsWUFBWSxDQUFDQSxTQUFTc0IsS0FBMUIsRUFBaUM7QUFDN0JqQyxpQ0FBS2tFLGVBQUwsQ0FBcUJqRCxFQUFyQjtBQUNBakIsaUNBQUs2QixPQUFMO0FBQ0g7QUFDRCw0QkFBR2xCLFNBQVNzQixLQUFaLEVBQW1CO0FBQ2ZwQixvQ0FBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJILFFBQXZCO0FBQ0g7QUFDSixxQkFYTDtBQWFILGlCOzttQ0FFRHdELFUsdUJBQVdDLEcsRUFBS25ELEUsRUFBSTtBQUNoQkosNEJBQVFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1Cc0QsR0FBbkI7QUFDQXZELDRCQUFRQyxHQUFSLENBQVksSUFBWixFQUFrQkcsRUFBbEI7QUFDQSx3QkFBR21ELE9BQU9DLFNBQVYsRUFBcUI7QUFDakIsNEJBQUlDLE1BQU1yRSxPQUFPMEQsSUFBUCxDQUFZUyxHQUFaLEVBQWlCLFFBQWpCLENBQVY7QUFDQUUsNEJBQUlDLEtBQUo7QUFDSDs7QUFFRCx5QkFBS0wsZUFBTCxDQUFxQmpELEVBQXJCO0FBQ0gsaUI7O21DQUVEaUQsZSw0QkFBZ0JqRCxFLEVBQUk7QUFDaEIsd0JBQUd1RCxFQUFFQyxPQUFGLENBQVV4RCxFQUFWLEVBQWMsS0FBS2xCLGVBQW5CLElBQXNDLENBQUMsQ0FBMUMsRUFBNkM7QUFDekMsNkJBQUtELGFBQUwsR0FBcUIsS0FBS0EsYUFBTCxHQUFxQixDQUExQztBQUNBLDZCQUFLQyxlQUFMLENBQXFCMkUsTUFBckIsQ0FBNkJGLEVBQUVDLE9BQUYsQ0FBVXhELEVBQVYsRUFBYyxLQUFLbEIsZUFBbkIsQ0FBN0IsRUFBa0UsQ0FBbEU7QUFDSDtBQUNKLGlCIiwiZmlsZSI6ImZhY2Vib29rLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
