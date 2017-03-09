'use strict';

System.register(['aurelia-dialog', 'aurelia-framework', 'aurelia-i18n', 'prompt', 'services/api'], function (_export, _context) {
    "use strict";

    var DialogService, inject, I18N, Prompt, Api, _dec, _class, Facebook;

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
        }, function (_servicesApi) {
            Api = _servicesApi.Api;
        }],
        execute: function () {
            _export('Facebook', Facebook = (_dec = inject(DialogService, Api), _dec(_class = function () {
                function Facebook(dialogService, Api) {
                    _classCallCheck(this, Facebook);

                    this.dialogService = dialogService;
                    this.api = Api;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY2Vib29rLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiQXBpIiwiRmFjZWJvb2siLCJkaWFsb2dTZXJ2aWNlIiwiYXBpIiwiYWN0aXZlIiwiY29ubmVjdGVkIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsInBsYWNlIiwibGluayIsImRlc2NyaXB0aW9uIiwicGljdHVyZSIsIm5hbWUiLCJwb3N0IiwiZGF0ZSIsImZlZWQiLCJmZWVkX3Bvc3QiLCJtb2RhbCIsIm5vdGlmaWNhdGlvbnMiLCJub3RpZmljYXRpb25JZHMiLCJzZWxmIiwid2luZG93IiwiZmJBc3luY0luaXQiLCJGQiIsImluaXQiLCJhcHBJZCIsInhmYm1sIiwiY29va2llIiwic3RhdHVzIiwidmVyc2lvbiIsImdldExvZ2luU3RhdHVzIiwicmVzcG9uc2UiLCJjb25uZWN0IiwiY29uc29sZSIsImxvZyIsImQiLCJzIiwiaWQiLCJqcyIsImZqcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImRvY3VtZW50IiwibG9naW4iLCJnZXRJbmZvIiwiZ2V0RmVlZCIsInNldEludGVydmFsIiwic2NvcGUiLCJsb2dvdXQiLCJlcnJvciIsImZpZWxkcyIsImlubmVySFRNTCIsImZpcnN0X25hbWUiLCJ0ZW1wRmVlZCIsIngiLCJkYXRhIiwibGVuZ3RoIiwiYXV0aG9yIiwiZnJvbSIsInVwZGF0ZWRfdGltZSIsInNwbGl0IiwiZnVsbF9waWN0dXJlIiwic3RvcnkiLCJkaXNjcmlwdGlvbiIsInJlYWN0aW9ucyIsImNvbW1lbnRzIiwicHVzaCIsImkiLCJvcGVuTW9kYWwiLCJib29sIiwibW9kYWxPcGVuIiwib3BlbkRpYWxvZyIsIm1vZGVsIiwib3BlbiIsInZpZXdNb2RlbCIsInRoZW4iLCJ3YXNDYW5jZWxsZWQiLCJvdXRwdXQiLCJwb3N0T25XYWxsIiwiZGVsZXRlUG9zdCIsInNldE5vdGlmaWNhdGlvbiIsIm9wZW5OZXdUYWIiLCJ1cmwiLCJ1bmRlZmluZWQiLCJ3aW4iLCJmb2N1cyIsIiQiLCJpbkFycmF5Iiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEseUIsa0JBQUFBLGE7O0FBQ0FDLGtCLHFCQUFBQSxNOztBQUNBQyxnQixnQkFBQUEsSTs7QUFDQUMsa0IsV0FBQUEsTTs7QUFDQUMsZSxnQkFBQUEsRzs7O2dDQUlLQyxRLFdBRlpKLE9BQU9ELGFBQVAsRUFBc0JJLEdBQXRCLEM7QUFHRyxrQ0FBYUUsYUFBYixFQUE0QkYsR0FBNUIsRUFBaUM7QUFBQTs7QUFDN0IseUJBQUtFLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EseUJBQUtDLEdBQUwsR0FBV0gsR0FBWDtBQUNBLHlCQUFLSSxNQUFMLEdBQWMsS0FBZDtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EseUJBQUtDLFNBQUwsR0FBaUIsSUFBakI7O0FBRUEseUJBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EseUJBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EseUJBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EseUJBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSx5QkFBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSx5QkFBS0MsSUFBTCxHQUFZLEVBQVo7O0FBRUEseUJBQUtDLElBQUwsR0FBWTtBQUNSRCw4QkFBTSxFQURFO0FBRVJKLCtCQUFPLEVBRkM7QUFHUk0sOEJBQU07QUFIRSxxQkFBWjtBQUtBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EseUJBQUtDLEtBQUwsR0FBYSxLQUFiO0FBQ0EseUJBQUtDLGFBQUwsR0FBcUIsQ0FBckI7QUFDQSx5QkFBS0MsZUFBTCxHQUF1QixFQUF2QjtBQUNBLHdCQUFJQyxPQUFPLElBQVg7O0FBRUFDLDJCQUFPQyxXQUFQLEdBQXFCLFlBQVc7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QU9ZLEtBQUtaLEtBRlE7QUFHcEJDLDhCQUFNVyxLQUFLWCxJQUhTO0FBSXBCQyxxQ0FBYVUsS0FBS1YsV0FKRTtBQUtwQkMsaUNBQVNTLEtBQUtULE9BTE07QUFNcEJDLDhCQUFNUSxLQUFLUjtBQU5TLHFCQUR4QixFQVFFLFVBQVNtQixRQUFULEVBQW1CO0FBQ2pCLDRCQUFJQSxZQUFZLENBQUNBLFNBQVNzQixLQUExQixFQUFpQztBQUM3QmpDLGlDQUFLc0QsU0FBTCxHQUFpQixLQUFqQjtBQUNBdEQsaUNBQUs2QixPQUFMO0FBQ0E3QixpQ0FBS3VELFVBQUwsQ0FBZ0IsMEJBQWhCO0FBQ0gseUJBSkQsTUFLSztBQUNEdkQsaUNBQUt1RCxVQUFMLENBQWdCLDhEQUFoQjtBQUNIO0FBQ0oscUJBakJEO0FBa0JILGlCOzttQ0FFRFEsVSx1QkFBVzlDLEUsRUFBSTtBQUNYLHdCQUFJakIsT0FBTyxJQUFYO0FBQ0FhLDRCQUFRQyxHQUFSLENBQVlHLEVBQVo7QUFDQWQsdUJBQUdwQixHQUFILENBQ0ksTUFBSWtDLEVBQUosR0FBTyxFQURYLEVBRUksUUFGSixFQUdJLFVBQVVOLFFBQVYsRUFBb0I7QUFDaEIsNEJBQUlBLFlBQVksQ0FBQ0EsU0FBU3NCLEtBQTFCLEVBQWlDO0FBQzdCakMsaUNBQUtnRSxlQUFMLENBQXFCL0MsRUFBckI7QUFDQWpCLGlDQUFLNkIsT0FBTDtBQUNIO0FBQ0QsNEJBQUdsQixTQUFTc0IsS0FBWixFQUFtQjtBQUNmcEIsb0NBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCSCxRQUF2QjtBQUNIO0FBQ0oscUJBWEw7QUFhSCxpQjs7bUNBRURzRCxVLHVCQUFXQyxHLEVBQUtqRCxFLEVBQUk7QUFDaEJKLDRCQUFRQyxHQUFSLENBQVksS0FBWixFQUFtQm9ELEdBQW5CO0FBQ0FyRCw0QkFBUUMsR0FBUixDQUFZLElBQVosRUFBa0JHLEVBQWxCO0FBQ0Esd0JBQUdpRCxPQUFPQyxTQUFWLEVBQXFCO0FBQ2pCLDRCQUFJQyxNQUFNbkUsT0FBT3dELElBQVAsQ0FBWVMsR0FBWixFQUFpQixRQUFqQixDQUFWO0FBQ0FFLDRCQUFJQyxLQUFKO0FBQ0g7O0FBRUQseUJBQUtMLGVBQUwsQ0FBcUIvQyxFQUFyQjtBQUNILGlCOzttQ0FFRCtDLGUsNEJBQWdCL0MsRSxFQUFJO0FBQ2hCLHdCQUFHcUQsRUFBRUMsT0FBRixDQUFVdEQsRUFBVixFQUFjLEtBQUtsQixlQUFuQixJQUFzQyxDQUFDLENBQTFDLEVBQTZDO0FBQ3pDLDZCQUFLRCxhQUFMLEdBQXFCLEtBQUtBLGFBQUwsR0FBcUIsQ0FBMUM7QUFDQSw2QkFBS0MsZUFBTCxDQUFxQnlFLE1BQXJCLENBQTZCRixFQUFFQyxPQUFGLENBQVV0RCxFQUFWLEVBQWMsS0FBS2xCLGVBQW5CLENBQTdCLEVBQWtFLENBQWxFO0FBQ0g7QUFDSixpQiIsImZpbGUiOiJmYWNlYm9vay5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
