'use strict';

System.register(['aurelia-framework', 'aurelia-i18n'], function (_export, _context) {
    "use strict";

    var inject, I18N, Spotify;

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
        }],
        execute: function () {
            _export('Spotify', Spotify = function () {
                function Spotify() {
                    _classCallCheck(this, Spotify);

                    this.connected = false;
                    this.active = false;
                    this.clientID = '3f25006f76cd43a8a52b1452e949b697';
                    this.token = localStorage.getItem('spotify.token') !== "undefined" && localStorage.getItem('spotify.token') != null ? localStorage.getItem('spotify.token') : this.getStringFromUrl('access_token');

                    console.log('token ', this.token);
                    if (this.token !== "undefined" && this.token != null) {
                        this.connect();
                    }
                }

                Spotify.prototype.attached = function attached() {};

                Spotify.prototype.connect = function connect() {
                    var self = this;
                    $.ajax({
                        url: 'https://api.spotify.com/v1/me/tracks',
                        headers: {
                            'Authorization': 'Bearer ' + this.token
                        },
                        success: function success(response) {
                            console.log('spotify me ', response);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwb3RpZnkuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsIlNwb3RpZnkiLCJjb25uZWN0ZWQiLCJhY3RpdmUiLCJjbGllbnRJRCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldFN0cmluZ0Zyb21VcmwiLCJjb25zb2xlIiwibG9nIiwiY29ubmVjdCIsImF0dGFjaGVkIiwic2VsZiIsIiQiLCJhamF4IiwidXJsIiwiaGVhZGVycyIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInNpZ25PdXQiLCJpbWFnZXMiLCJ1c2VyIiwicmVtb3ZlSXRlbSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInN0ciIsInZhcnMiLCJoYXNoIiwiaW5jbHVkZXMiLCJoYXNoZXMiLCJzbGljZSIsImluZGV4T2YiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNBQyxnQixnQkFBQUEsSTs7OytCQUdLQyxPO0FBRVQsbUNBQWM7QUFBQTs7QUFFVix5QkFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLHlCQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUNBLHlCQUFLQyxRQUFMLEdBQWdCLGtDQUFoQjtBQUNBLHlCQUFLQyxLQUFMLEdBQWFDLGFBQWFDLE9BQWIsQ0FBcUIsZUFBckIsTUFBMEMsV0FBMUMsSUFDVEQsYUFBYUMsT0FBYixDQUFxQixlQUFyQixLQUF5QyxJQURoQyxHQUVURCxhQUFhQyxPQUFiLENBQXFCLGVBQXJCLENBRlMsR0FHVCxLQUFLQyxnQkFBTCxDQUFzQixjQUF0QixDQUhKOztBQUtBQyw0QkFBUUMsR0FBUixDQUFZLFFBQVosRUFBdUIsS0FBS0wsS0FBNUI7QUFDQSx3QkFBRyxLQUFLQSxLQUFMLEtBQWUsV0FBZixJQUE4QixLQUFLQSxLQUFMLElBQWMsSUFBL0MsRUFBcUQ7QUFDakQsNkJBQUtNLE9BQUw7QUFDSDtBQUNKOztrQ0FFREMsUSx1QkFBVSxDQUVULEM7O2tDQUVERCxPLHNCQUFVO0FBQ04sd0JBQUlFLE9BQU8sSUFBWDtBQUNBQyxzQkFBRUMsSUFBRixDQUFPO0FBQ0hDLDZCQUFLLHNDQURGO0FBRUhDLGlDQUFTO0FBQ0wsNkNBQWlCLFlBQVksS0FBS1o7QUFEN0IseUJBRk47QUFLSGEsaUNBQVMsaUJBQVNDLFFBQVQsRUFBbUI7QUFDeEJWLG9DQUFRQyxHQUFSLENBQVksYUFBWixFQUEyQlMsUUFBM0I7QUFDSDtBQVBFLHFCQUFQO0FBU0gsaUI7O2tDQUVEQyxPLHNCQUFVO0FBQ04seUJBQUtmLEtBQUwsR0FBYSxLQUFiO0FBQ0EseUJBQUtnQixNQUFMLEdBQWMsRUFBZDtBQUNBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBaEIsaUNBQWFpQixVQUFiLENBQXdCLGVBQXhCO0FBQ0FDLDJCQUFPQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixHQUF2QjtBQUNILGlCOztrQ0FFRGxCLGdCLDZCQUFpQm1CLEcsRUFBSztBQUNsQix3QkFBSUMsT0FBTyxFQUFYO0FBQUEsd0JBQWVDLElBQWY7QUFDQSx3QkFBR0wsT0FBT0MsUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJJLFFBQXJCLENBQThCLGNBQTlCLENBQUgsRUFBa0Q7QUFDOUMsNEJBQUlDLFNBQVNQLE9BQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLENBQXFCTSxLQUFyQixDQUEyQlIsT0FBT0MsUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJPLE9BQXJCLENBQTZCLEdBQTdCLElBQW9DLENBQS9ELEVBQWtFQyxLQUFsRSxDQUF3RSxHQUF4RSxDQUFiO0FBQ0EsNkJBQUksSUFBSUMsSUFBSSxDQUFaLEVBQWVBLElBQUlKLE9BQU9LLE1BQTFCLEVBQWtDRCxHQUFsQyxFQUNBO0FBQ0lOLG1DQUFPRSxPQUFPSSxDQUFQLEVBQVVELEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBUDtBQUNBTixpQ0FBS1MsSUFBTCxDQUFVUixLQUFLLENBQUwsQ0FBVjtBQUNBRCxpQ0FBS0MsS0FBSyxDQUFMLENBQUwsSUFBZ0JBLEtBQUssQ0FBTCxDQUFoQjtBQUNIO0FBQ0R2QixxQ0FBYWdDLE9BQWIsQ0FBcUIsZUFBckIsRUFBc0NWLEtBQUtELEdBQUwsQ0FBdEM7QUFDQSwrQkFBT0MsS0FBS0QsR0FBTCxDQUFQO0FBQ0gscUJBVkQsTUFXSztBQUNELCtCQUFPLFdBQVA7QUFDSDtBQUNKLGlCIiwiZmlsZSI6InNwb3RpZnkuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
