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
                    this.feed_post = "";
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY2Vib29rLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiY29uZmlnIiwiRmFjZWJvb2siLCJkaWFsb2dTZXJ2aWNlIiwiYWN0aXZlIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsInBsYWNlIiwibGluayIsImRlc2NyaXB0aW9uIiwicGljdHVyZSIsIm5hbWUiLCJwb3N0IiwiZGF0ZSIsImZlZWQiLCJmZWVkX3Bvc3QiLCJtb2RhbCIsIm5vdGlmaWNhdGlvbnMiLCJub3RpZmljYXRpb25JZHMiLCJhcHBJZCIsInByb3ZpZGVycyIsImZhY2Vib29rIiwic2VsZiIsIndpbmRvdyIsImZiQXN5bmNJbml0IiwiRkIiLCJpbml0IiwieGZibWwiLCJjb29raWUiLCJzdGF0dXMiLCJ2ZXJzaW9uIiwiZ2V0TG9naW5TdGF0dXMiLCJyZXNwb25zZSIsImNvbm5lY3QiLCJjb25zb2xlIiwibG9nIiwiZCIsInMiLCJpZCIsImpzIiwiZmpzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiZG9jdW1lbnQiLCJsb2dpbiIsImNvbm5lY3RlZCIsImdldEluZm8iLCJnZXRGZWVkIiwic2V0SW50ZXJ2YWwiLCJzY29wZSIsImxvZ291dCIsImVycm9yIiwiYXBpIiwiZmllbGRzIiwiaW5uZXJIVE1MIiwiZmlyc3RfbmFtZSIsInRlbXBGZWVkIiwieCIsImRhdGEiLCJsZW5ndGgiLCJhdXRob3IiLCJmcm9tIiwidXBkYXRlZF90aW1lIiwic3BsaXQiLCJmdWxsX3BpY3R1cmUiLCJzdG9yeSIsImRpc2NyaXB0aW9uIiwicmVhY3Rpb25zIiwiY29tbWVudHMiLCJwdXNoIiwiaSIsIm9wZW5Nb2RhbCIsImJvb2wiLCJtb2RhbE9wZW4iLCJvcGVuRGlhbG9nIiwibW9kZWwiLCJvcGVuIiwidmlld01vZGVsIiwidGhlbiIsIndhc0NhbmNlbGxlZCIsIm91dHB1dCIsInBvc3RPbldhbGwiLCJkZWxldGVQb3N0Iiwic2V0Tm90aWZpY2F0aW9uIiwib3Blbk5ld1RhYiIsInVybCIsInVuZGVmaW5lZCIsIndpbiIsImZvY3VzIiwiJCIsImluQXJyYXkiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSx5QixrQkFBQUEsYTs7QUFDQUMsa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOztBQUNBQyxrQixXQUFBQSxNOztBQUNEQyxrQjs7O2dDQUdNQyxRLFdBRFpKLE9BQU9ELGFBQVAsQztBQUdHLGtDQUFhTSxhQUFiLEVBQTRCO0FBQUE7O0FBQ3hCLHlCQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNBLHlCQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCLElBQWpCOztBQUVBLHlCQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLHlCQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EseUJBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EseUJBQUtDLElBQUwsR0FBWSxFQUFaOztBQUVBLHlCQUFLQyxJQUFMLEdBQVk7QUFDUkQsOEJBQU0sRUFERTtBQUVSSiwrQkFBTyxFQUZDO0FBR1JNLDhCQUFNO0FBSEUscUJBQVo7O0FBTUEseUJBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EseUJBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSx5QkFBS0MsS0FBTCxHQUFhLEtBQWI7QUFDQSx5QkFBS0MsYUFBTCxHQUFxQixDQUFyQjtBQUNBLHlCQUFLQyxlQUFMLEdBQXVCLEVBQXZCO0FBQ0EseUJBQUtDLEtBQUwsR0FBYWxCLE9BQU9tQixTQUFQLENBQWlCQyxRQUFqQixDQUEwQkYsS0FBdkM7O0FBRUEsd0JBQUlHLE9BQU8sSUFBWDs7QUFFQUMsMkJBQU9DLFdBQVAsR0FBcUIsWUFBVztB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S2hCLE9BREU7QUFFaEJDLCtCQUFPZSxLQUFLZixLQUZJO0FBR2hCQyw4QkFBTWMsS0FBS2QsSUFISztBQUloQkMscUNBQWFhLEtBQUtiLFdBSkY7QUFLaEJDLGlDQUFTWSxLQUFLWixPQUxFO0FBTWhCQyw4QkFBTVcsS0FBS1g7QUFOSyxxQkFEeEIsRUFRRSxVQUFTcUIsUUFBVCxFQUFtQjtBQUNqQiw0QkFBSUEsWUFBWSxDQUFDQSxTQUFTdUIsS0FBMUIsRUFBaUM7QUFDN0JqQyxpQ0FBS3VELFNBQUwsR0FBaUIsS0FBakI7QUFDQXZELGlDQUFLNkIsT0FBTDtBQUNBN0IsaUNBQUt3RCxVQUFMLENBQWdCLDBCQUFoQjtBQUNILHlCQUpELE1BS0s7QUFDRHhELGlDQUFLd0QsVUFBTCxDQUFnQiw4REFBaEI7QUFDSDtBQUNKLHFCQWpCRDtBQWtCSCxpQjs7bUNBRURRLFUsdUJBQVdoRCxFLEVBQUk7QUFDWCx3QkFBSWhCLE9BQU8sSUFBWDtBQUNBWSw0QkFBUUMsR0FBUixDQUFZRyxFQUFaO0FBQ0FiLHVCQUFHK0IsR0FBSCxDQUNJLE1BQUlsQixFQUFKLEdBQU8sRUFEWCxFQUVJLFFBRkosRUFHSSxVQUFVTixRQUFWLEVBQW9CO0FBQ2hCLDRCQUFJQSxZQUFZLENBQUNBLFNBQVN1QixLQUExQixFQUFpQztBQUM3QmpDLGlDQUFLaUUsZUFBTCxDQUFxQmpELEVBQXJCO0FBQ0FoQixpQ0FBSzZCLE9BQUw7QUFDSDtBQUNELDRCQUFHbkIsU0FBU3VCLEtBQVosRUFBbUI7QUFDZnJCLG9DQUFRQyxHQUFSLENBQVksU0FBWixFQUF1QkgsUUFBdkI7QUFDSDtBQUNKLHFCQVhMO0FBYUgsaUI7O21DQUVEd0QsVSx1QkFBV0MsRyxFQUFLbkQsRSxFQUFJO0FBR2hCLHdCQUFHbUQsT0FBT0MsU0FBVixFQUFxQjtBQUNqQiw0QkFBSUMsTUFBTXBFLE9BQU95RCxJQUFQLENBQVlTLEdBQVosRUFBaUIsUUFBakIsQ0FBVjtBQUNBRSw0QkFBSUMsS0FBSjtBQUNIOztBQUVELHlCQUFLTCxlQUFMLENBQXFCakQsRUFBckI7QUFDSCxpQjs7bUNBRURpRCxlLDRCQUFnQmpELEUsRUFBSTtBQUNoQix3QkFBR3VELEVBQUVDLE9BQUYsQ0FBVXhELEVBQVYsRUFBYyxLQUFLcEIsZUFBbkIsSUFBc0MsQ0FBQyxDQUExQyxFQUE2QztBQUN6Qyw2QkFBS0QsYUFBTCxHQUFxQixLQUFLQSxhQUFMLEdBQXFCLENBQTFDO0FBQ0EsNkJBQUtDLGVBQUwsQ0FBcUI2RSxNQUFyQixDQUE2QkYsRUFBRUMsT0FBRixDQUFVeEQsRUFBVixFQUFjLEtBQUtwQixlQUFuQixDQUE3QixFQUFrRSxDQUFsRTtBQUNIO0FBQ0osaUIiLCJmaWxlIjoiZmFjZWJvb2suanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
