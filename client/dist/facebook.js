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
                            cookie: true,
                            status: true,
                            xfbml: false,
                            version: 'v2.9'
                        });

                        FB.getLoginStatus(function (response) {
                            if (response.status === 'connected') {
                                console.log("Facebook Status: OK");
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

                                data.date = data.updated_time.split(/-|T/);

                                tempFeed.push(data);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY2Vib29rLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiY29uZmlnIiwiRmFjZWJvb2siLCJkaWFsb2dTZXJ2aWNlIiwiYWN0aXZlIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsInBsYWNlIiwibGluayIsImRlc2NyaXB0aW9uIiwicGljdHVyZSIsIm5hbWUiLCJwb3N0IiwiZGF0ZSIsImZlZWQiLCJtb2RhbCIsIm5vdGlmaWNhdGlvbnMiLCJub3RpZmljYXRpb25JZHMiLCJhcHBJZCIsInByb3ZpZGVycyIsImZhY2Vib29rIiwic2VsZiIsIndpbmRvdyIsImZiQXN5bmNJbml0IiwiRkIiLCJpbml0IiwiY29va2llIiwic3RhdHVzIiwieGZibWwiLCJ2ZXJzaW9uIiwiZ2V0TG9naW5TdGF0dXMiLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJjb25uZWN0IiwiZCIsInMiLCJpZCIsImpzIiwiZmpzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiZG9jdW1lbnQiLCJsb2dpbiIsImNvbm5lY3RlZCIsImdldEluZm8iLCJnZXRGZWVkIiwic2V0SW50ZXJ2YWwiLCJzY29wZSIsImxvZ291dCIsImVycm9yIiwiYXBpIiwiZmllbGRzIiwiaW5uZXJIVE1MIiwiZmlyc3RfbmFtZSIsInRlbXBGZWVkIiwieCIsImRhdGEiLCJsZW5ndGgiLCJ1cGRhdGVkX3RpbWUiLCJzcGxpdCIsInB1c2giLCJpIiwib3Blbk1vZGFsIiwiYm9vbCIsIm1vZGFsT3BlbiIsIm9wZW5EaWFsb2ciLCJtb2RlbCIsIm9wZW4iLCJ2aWV3TW9kZWwiLCJ0aGVuIiwid2FzQ2FuY2VsbGVkIiwib3V0cHV0IiwicG9zdE9uV2FsbCIsImRlbGV0ZVBvc3QiLCJzZXROb3RpZmljYXRpb24iLCJvcGVuTmV3VGFiIiwidXJs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RHhCLEVBUU8sVUFBVW9CLFFBQVYsRUFBb0I7QUFDbkIsNEJBQUlBLFlBQVksQ0FBQ0EsU0FBU3VCLEtBQTFCLEVBQWlDO0FBQzdCakMsaUNBQUtnRCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0FoRCxpQ0FBSzZCLE9BQUw7QUFDQTdCLGlDQUFLaUQsVUFBTCxDQUFnQiwwQkFBaEI7QUFDSCx5QkFKRCxNQUtLO0FBQ0RqRCxpQ0FBS2lELFVBQUwsQ0FBZ0IsOERBQWhCO0FBQ0g7QUFDSixxQkFqQkw7QUFrQkgsaUI7O21DQUVEUSxVLHVCQUFXekMsRSxFQUFJO0FBQ1gsd0JBQUloQixPQUFPLElBQVg7QUFDQVcsNEJBQVFDLEdBQVIsQ0FBWUksRUFBWjtBQUNBYix1QkFBRytCLEdBQUgsQ0FDSSxNQUFNbEIsRUFBTixHQUFXLEVBRGYsRUFFSSxRQUZKLEVBR0ksVUFBVU4sUUFBVixFQUFvQjtBQUNoQiw0QkFBSUEsWUFBWSxDQUFDQSxTQUFTdUIsS0FBMUIsRUFBaUM7QUFDN0JqQyxpQ0FBSzBELGVBQUwsQ0FBcUIxQyxFQUFyQjtBQUNBaEIsaUNBQUs2QixPQUFMO0FBQ0g7QUFDRCw0QkFBSW5CLFNBQVN1QixLQUFiLEVBQW9CO0FBQ2hCdEIsb0NBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCRixRQUF2QjtBQUNIO0FBQ0oscUJBWEw7QUFhSCxpQjs7bUNBRURpRCxVLHVCQUFXQyxHLEVBQUs1QyxFLEVBQUk7QUFDaEIsd0JBQUk0QyxPQUFPQyxTQUFYLEVBQXNCO0FBQ2xCLDRCQUFJQyxNQUFNN0QsT0FBT2tELElBQVAsQ0FBWVMsR0FBWixFQUFpQixRQUFqQixDQUFWO0FBQ0FFLDRCQUFJQyxLQUFKO0FBQ0g7O0FBRUQseUJBQUtMLGVBQUwsQ0FBcUIxQyxFQUFyQjtBQUNILGlCOzttQ0FFRDBDLGUsNEJBQWdCMUMsRSxFQUFJO0FBQ2hCLHdCQUFJZ0QsRUFBRUMsT0FBRixDQUFVakQsRUFBVixFQUFjLEtBQUtwQixlQUFuQixJQUFzQyxDQUFDLENBQTNDLEVBQThDO0FBQzFDLDZCQUFLRCxhQUFMLEdBQXFCLEtBQUtBLGFBQUwsR0FBcUIsQ0FBMUM7QUFDQSw2QkFBS0MsZUFBTCxDQUFxQnNFLE1BQXJCLENBQTRCRixFQUFFQyxPQUFGLENBQVVqRCxFQUFWLEVBQWMsS0FBS3BCLGVBQW5CLENBQTVCLEVBQWlFLENBQWpFO0FBQ0g7QUFDSixpQiIsImZpbGUiOiJmYWNlYm9vay5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
