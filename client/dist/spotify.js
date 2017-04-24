'use strict';

System.register(['aurelia-framework', 'aurelia-i18n', './services/authConfig'], function (_export, _context) {
    "use strict";

    var inject, I18N, config, Spotify;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaI18n) {
            I18N = _aureliaI18n.I18N;
        }, function (_servicesAuthConfig) {
            config = _servicesAuthConfig.default;
        }],
        execute: function () {
            _export('Spotify', Spotify = function () {
                function Spotify() {
                    _classCallCheck(this, Spotify);

                    this.connected = false;
                    this.active = false;
                    this.api = config.providers.spotify.api;
                    this.clientId = config.providers.spotify.clientId;
                    this.token = localStorage.getItem('spotify.token');
                    this.token = this.token !== "undefined" && this.token != null ? this.token : this.getStringFromUrl('access_token');
                }

                Spotify.prototype.attached = function attached() {
                    if (this.token !== "undefined" && this.token != null) {
                        this.connect();
                    }
                };

                Spotify.prototype.connect = function connect() {
                    var self = this;
                    $.ajax({
                        url: self.api + '/me/playlists',
                        headers: {
                            'Authorization': 'Bearer ' + self.token
                        },
                        success: function success(response) {
                            console.log('spotify me ', response.items[0].uri);

                            var res = "https://embed.spotify.com/?uri=" + response.items[0].uri + "&theme=white&accessToken=" + self.token;
                            if (document.getElementById('spotify-widget') != null) {
                                document.getElementById('spotify-widget').src = res;
                            }
                        },
                        error: function error(err) {
                            console.log('spotify me ', err);
                            self.signOut();
                        }
                    });
                };

                Spotify.prototype.signOut = function signOut() {
                    this.token = false;
                    this.images = [];
                    this.user = {};
                    localStorage.removeItem('spotify.token');
                    window.location.href = "#";
                };

                Spotify.prototype.getStringFromUrl = function getStringFromUrl(str) {
                    var vars = [],
                        hash;
                    if (window.location.href.includes('access_token')) {
                        var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
                        for (var i = 0; i < hashes.length; i++) {
                            hash = hashes[i].split('=');
                            vars.push(hash[0]);
                            vars[hash[0]] = hash[1];
                        }
                        localStorage.setItem('spotify.token', vars[str]);
                        return vars[str];
                    } else {
                        return 'undefined';
                    }
                };

                return Spotify;
            }());

            _export('Spotify', Spotify);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwb3RpZnkuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsImNvbmZpZyIsIlNwb3RpZnkiLCJjb25uZWN0ZWQiLCJhY3RpdmUiLCJhcGkiLCJwcm92aWRlcnMiLCJzcG90aWZ5IiwiY2xpZW50SWQiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJnZXRTdHJpbmdGcm9tVXJsIiwiYXR0YWNoZWQiLCJjb25uZWN0Iiwic2VsZiIsIiQiLCJhamF4IiwidXJsIiwiaGVhZGVycyIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJpdGVtcyIsInVyaSIsInJlcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzcmMiLCJlcnJvciIsImVyciIsInNpZ25PdXQiLCJpbWFnZXMiLCJ1c2VyIiwicmVtb3ZlSXRlbSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInN0ciIsInZhcnMiLCJoYXNoIiwiaW5jbHVkZXMiLCJoYXNoZXMiLCJzbGljZSIsImluZGV4T2YiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVNBLGtCLHFCQUFBQSxNOztBQUNBQyxnQixnQkFBQUEsSTs7QUFDRkMsa0I7OzsrQkFHTUMsTztBQUVULG1DQUFjO0FBQUE7O0FBRVYseUJBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSx5QkFBS0MsTUFBTCxHQUFjLEtBQWQ7QUFDQSx5QkFBS0MsR0FBTCxHQUFXSixPQUFPSyxTQUFQLENBQWlCQyxPQUFqQixDQUF5QkYsR0FBcEM7QUFDQSx5QkFBS0csUUFBTCxHQUFnQlAsT0FBT0ssU0FBUCxDQUFpQkMsT0FBakIsQ0FBeUJDLFFBQXpDO0FBQ0EseUJBQUtDLEtBQUwsR0FBYUMsYUFBYUMsT0FBYixDQUFxQixlQUFyQixDQUFiO0FBQ0EseUJBQUtGLEtBQUwsR0FBYSxLQUFLQSxLQUFMLEtBQWUsV0FBZixJQUNULEtBQUtB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
