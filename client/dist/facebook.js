'use strict';

System.register(['aurelia-dialog', 'aurelia-framework', 'aurelia-i18n', 'prompt', './services/authConfig'], function (_export, _context) {
    "use strict";

    var DialogService, inject, I18N, Prompt, config, _dec, _class, Facebook;

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
        }, function (_servicesAuthConfig) {
            config = _servicesAuthConfig.default;
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
                    this.modal = false;
                    this.notifications = 0;
                    this.notificationIds = [];
                    this.appId = config.providers.facebook.appId;

                    var self = this;

                    window.fbAsyncInit = function () {
                        FB.init({
                            appId: self.appId,
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
                                var data = response.data[x];
                                var post = {};

                                post.id = data.id;
                                post.author = data.from.name;
                                post.date = data.updated_time.split(/-|T/);
                                if (data.place) {
                                    post.place = data.place.name;
                                }
                                if (data.full_picture) {
                                    post.picture = data.full_picture;
                                }
                                post.link = data.link;
                                post.message = data.message;
                                post.story = data.story;
                                post.discription = data.description;
                                if (data.reactions) {
                                    post.reactions = data.reactions.data.length;
                                }
                                if (data.comments) {
                                    post.comments = data.comments.data.length;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY2Vib29rLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiY29uZmlnIiwiRmFjZWJvb2siLCJkaWFsb2dTZXJ2aWNlIiwiYWN0aXZlIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsInBsYWNlIiwibGluayIsImRlc2NyaXB0aW9uIiwicGljdHVyZSIsIm5hbWUiLCJwb3N0IiwiZGF0ZSIsImZlZWQiLCJtb2RhbCIsIm5vdGlmaWNhdGlvbnMiLCJub3RpZmljYXRpb25JZHMiLCJhcHBJZCIsInByb3ZpZGVycyIsImZhY2Vib29rIiwic2VsZiIsIndpbmRvdyIsImZiQXN5bmNJbml0IiwiRkIiLCJpbml0IiwieGZibWwiLCJjb29raWUiLCJzdGF0dXMiLCJ2ZXJzaW9uIiwiZ2V0TG9naW5TdGF0dXMiLCJyZXNwb25zZSIsImNvbm5lY3QiLCJjb25zb2xlIiwibG9nIiwiZCIsInMiLCJpZCIsImpzIiwiZmpzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiZG9jdW1lbnQiLCJsb2dpbiIsImNvbm5lY3RlZCIsImdldEluZm8iLCJnZXRGZWVkIiwic2V0SW50ZXJ2YWwiLCJzY29wZSIsImxvZ291dCIsImVycm9yIiwiYXBpIiwiZmllbGRzIiwiaW5uZXJIVE1MIiwiZmlyc3RfbmFtZSIsInRlbXBGZWVkIiwieCIsImRhdGEiLCJsZW5ndGgiLCJhdXRob3IiLCJmcm9tIiwidXBkYXRlZF90aW1lIiwic3BsaXQiLCJmdWxsX3BpY3R1cmUiLCJzdG9yeSIsImRpc2NyaXB0aW9uIiwicmVhY3Rpb25zIiwiY29tbWVudHMiLCJwdXNoIiwiaSIsIm9wZW5Nb2RhbCIsImJvb2wiLCJtb2RhbE9wZW4iLCJvcGVuRGlhbG9nIiwibW9kZWwiLCJvcGVuIiwidmlld01vZGVsIiwidGhlbiIsIndhc0NhbmNlbGxlZCIsIm91dHB1dCIsInBvc3RPbldhbGwiLCJkZWxldGVQb3N0Iiwic2V0Tm90aWZpY2F0aW9uIiwib3Blbk5ld1RhYiIsInVybCIsInVuZGVmaW5lZCIsIndpbiIsImZvY3VzIiwiJCIsImluQXJyYXkiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFTQSx5QixrQkFBQUEsYTs7QUFDQUMsa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOztBQUNBQyxrQixXQUFBQSxNOztBQUNGQyxrQjs7O2dDQUdNQyxRLFdBRFpKLE9BQU9ELGFBQVAsQztBQUdHLGtDQUFZTSxhQUFaLEVBQTJCO0FBQUE7O0FBQ3ZCLHlCQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLHlCQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCLElBQWpCOztBQUVBLHlCQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLHlCQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EseUJBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EseUJBQUtDLElBQUwsR0FBWSxFQUFaOztBQUVBLHlCQUFLQyxJQUFMLEdBQVk7QUFDUkQsOEJBQU0sRUFERTtBQUVSSiwrQkFBTyxFQUZDO0FBR1JNLDhCQUFNO0FBSEUscUJBQVo7O0FBTUEseUJBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EseUJBQUtDLEtBQUwsR0FBYSxLQUFiO0FBQ0EseUJBQUtDLGFBQUwsR0FBcUIsQ0FBckI7QUFDQSx5QkFBS0MsZUFBTCxHQUF1QixFQUF2QjtBQUNBLHlCQUFLQyxLQUFMLEdBQWFqQixPQUFPa0IsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJGLEtBQXZDOztBQUVBLHdCQUFJRyxPQUFPLElBQVg7O0FBRUFDLDJCQUFPQyxXQUFQLEdBQXFCLFlBQVk7QUFDN0JDLDJCQUFHQyxJQUFILENBQVE7QUFDSlAsbUNBQU9HLEtBQUtI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
