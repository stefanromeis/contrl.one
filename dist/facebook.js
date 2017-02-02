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
                function Facebook(DialogService) {
                    _classCallCheck(this, Facebook);

                    this.dialogService = DialogService;
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
                            console.log("We are connected to FB.");
                            self.connected = true;
                            self.getInfo();
                            self.getFeed();
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
                        document.getElementById('name').innerHTML = response.name;
                        document.getElementById('profile-img').src = "http://graph.facebook.com/" + response.id + "/picture";
                    });
                };

                Facebook.prototype.getFeed = function getFeed() {
                    this.isLoading = true;
                    var self = this;
                    FB.api("me/posts?fields=caption,link,name,message,description,shares,updated_time,from,story,comments,reactions,place,full_picture", function (response) {
                        if (response && !response.error) {
                            self.feed = [];
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
                                self.feed.push(post);
                            }
                            self.isLoading = false;
                        } else {
                            console.log('could not load fb feed ', response.error);
                            self.isLoading = false;
                        }
                    });
                };

                Facebook.prototype.openModal = function openModal() {
                    this.modalOpen = true;
                };

                Facebook.prototype.closeModal = function closeModal() {
                    this.modalOpen = false;
                };

                Facebook.prototype.openSuccessDialog = function openSuccessDialog() {
                    this.dialogService.open({ viewModel: Prompt, model: 'Post on wall successfull.' }).then(function (response) {
                        if (!response.wasCancelled) {
                            console.log('OK');
                        } else {
                            console.log('cancelled');
                        }
                        console.log(response.output);
                    });
                };

                Facebook.prototype.openFailDialog = function openFailDialog() {
                    this.dialogService.open({ viewModel: Prompt, model: 'Post on wall failed. You have to provide a message at least.' }).then(function (response) {
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
                            console.log(response);
                            self.modalOpen = false;
                            self.getFeed();
                            self.openSuccessDialog();
                        } else {
                            self.openFailDialog();
                        }
                    });
                };

                Facebook.prototype.deletePost = function deletePost(id) {
                    var self = this;
                    FB.api("/" + id + "", "DELETE", function (response) {
                        if (response && !response.error) {
                            console.log('deleted');
                            self.getFeed();
                        }
                    });
                };

                return Facebook;
            }()) || _class));

            _export('Facebook', Facebook);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY2Vib29rLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiRmFjZWJvb2siLCJkaWFsb2dTZXJ2aWNlIiwiYWN0aXZlIiwiY29ubmVjdGVkIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsInBsYWNlIiwibGluayIsImRlc2NyaXB0aW9uIiwicGljdHVyZSIsIm5hbWUiLCJwb3N0IiwiZGF0ZSIsImZlZWQiLCJmZWVkX3Bvc3QiLCJtb2RhbCIsInNlbGYiLCJ3aW5kb3ciLCJmYkFzeW5jSW5pdCIsIkZCIiwiaW5pdCIsImFwcElkIiwieGZibWwiLCJjb29raWUiLCJzdGF0dXMiLCJ2ZXJzaW9uIiwiZ2V0TG9naW5TdGF0dXMiLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJjb25uZWN0IiwiZCIsInMiLCJpZCIsImpzIiwiZmpzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiZG9jdW1lbnQiLCJsb2dpbiIsImdldEluZm8iLCJnZXRGZWVkIiwic2NvcGUiLCJsb2dvdXQiLCJlcnJvciIsImFwaSIsImZpZWxkcyIsImlubmVySFRNTCIsIngiLCJkYXRhIiwibGVuZ3RoIiwiYXV0aG9yIiwiZnJvbSIsInVwZGF0ZWRfdGltZSIsInNwbGl0IiwiZnVsbF9waWN0dXJlIiwic3RvcnkiLCJkaXNjcmlwdGlvbiIsInJlYWN0aW9ucyIsImNvbW1lbnRzIiwicHVzaCIsIm9wZW5Nb2RhbCIsIm1vZGFsT3BlbiIsImNsb3NlTW9kYWwiLCJvcGVuU3VjY2Vzc0RpYWxvZyIsIm9wZW4iLCJ2aWV3TW9kZWwiLCJtb2RlbCIsInRoZW4iLCJ3YXNDYW5jZWxsZWQiLCJvdXRwdXQiLCJvcGVuRmFpbERpYWxvZyIsInBvc3RPbldhbGwiLCJkZWxldGVQb3N0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7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
