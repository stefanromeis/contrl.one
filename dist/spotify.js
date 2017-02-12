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
                    this.token = localStorage.getItem('spotify.token');
                    this.token = this.token !== "undefined" && this.token != null ? this.token : this.getStringFromUrl('access_token');

                    if (this.token !== "undefined" && this.token != null) {
                        this.connect();
                    }
                }

                Spotify.prototype.attached = function attached() {};

                Spotify.prototype.connect = function connect() {
                    var self = this;
                    $.ajax({
                        url: 'https://api.spotify.com/v1/me/playlists',
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwb3RpZnkuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsIlNwb3RpZnkiLCJjb25uZWN0ZWQiLCJhY3RpdmUiLCJjbGllbnRJRCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldFN0cmluZ0Zyb21VcmwiLCJjb25uZWN0IiwiYXR0YWNoZWQiLCJzZWxmIiwiJCIsImFqYXgiLCJ1cmwiLCJoZWFkZXJzIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsIml0ZW1zIiwidXJpIiwicmVzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNyYyIsImVycm9yIiwiZXJyIiwic2lnbk91dCIsImltYWdlcyIsInVzZXIiLCJyZW1vdmVJdGVtIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwic3RyIiwidmFycyIsImhhc2giLCJpbmNsdWRlcyIsImhhc2hlcyIsInNsaWNlIiwiaW5kZXhPZiIsInNwbGl0IiwiaSIsImxlbmd0aCIsInB1c2giLCJzZXRJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOzs7K0JBR0tDLE87QUFFVCxtQ0FBYztBQUFBOztBQUVWLHlCQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EseUJBQUtDLE1BQUwsR0FBYyxLQUFkO0FBQ0EseUJBQUtDLFFBQUwsR0FBZ0Isa0NBQWhCO0FBQ0EseUJBQUtDLEtBQUwsR0FBYUMsYUFBYUMsT0FBYixDQUFxQixlQUFyQixDQUFiO0FBQ0EseUJBQUtGLEtBQUwsR0FBZ0IsS0FBS0EsS0FBTCxLQUFnQixXQUFoQixJQUNBLEtBQUtBLEtBQUwsSUFBZSxJQURmLEdBRUEsS0FBS0EsS0FGTCxHQUdBLEtBQUtHLGdCQUFMLENBQXNCLGNBQXRCLENBSGhCOztBQU1BLHdCQUFHLEtBQUtILEtBQUwsS0FBZSxXQUFmLElBQThCLEtBQUtBLEtBQUwsSUFBYyxJQUEvQyxFQUFxRDtBQUNqRCw2QkFBS0ksT0FBTDtBQUNIO0FBQ0o7O2tDQUVEQyxRLHVCQUFVLENBRVQsQzs7a0NBRURELE8sc0JBQVU7QUFDTix3QkFBSUUsT0FBTyxJQUFYO0FBQ0FDLHNCQUFFQyxJQUFGLENBQU87QUFDSEMsNkJBQUsseUNBREY7QUFFSEMsaUNBQVM7QUFDTCw2Q0FBaUIsWUFBWUosS0FBS047QUFEN0IseUJBRk47QUFLSFcsaUNBQVMsaUJBQVNDLFFBQVQsRUFBbUI7QUFDeEJDLG9DQUFRQyxHQUFSLENBQVksYUFBWixFQUEwQkYsU0FBU0csS0FBVCxDQUFlLENBQWYsRUFBa0JDLEdBQTVDOztBQUVBLGdDQUFJQyxNQUFNLG9DQUFrQ0wsU0FBU0csS0FBVCxDQUFlLENBQWYsRUFBa0JDLEdBQXBELEdBQXdELDJCQUF4RCxHQUFvRlYsS0FBS04sS0FBbkc7QUFDQSxnQ0FBR2tCLFNBQVNDLGNBQVQsQ0FBd0IsZ0JBQXhCLEtBQTZDLElBQWhELEVBQXNEO0FBQ2xERCx5Q0FBU0MsY0FBVCxDQUF3QixnQkFBeEIsRUFBMENDLEdBQTFDLEdBQWdESCxHQUFoRDtBQUNIO0FBQ0oseUJBWkU7QUFhSEksK0JBQU8sZUFBU0MsR0FBVCxFQUFjO0FBQ2pCVCxvQ0FBUUMsR0FBUixDQUFZLGFBQVosRUFBMkJRLEdBQTNCO0FBQ0FoQixpQ0FBS2lCLE9BQUw7QUFDSDtBQWhCRSxxQkFBUDtBQWtCSCxpQjs7a0NBRURBLE8sc0JBQVU7QUFDTix5QkFBS3ZCLEtBQUwsR0FBYSxLQUFiO0FBQ0EseUJBQUt3QixNQUFMLEdBQWMsRUFBZDtBQUNBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBeEIsaUNBQWF5QixVQUFiLENBQXdCLGVBQXhCO0FBQ0FDLDJCQUFPQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixHQUF2QjtBQUNILGlCOztrQ0FFRDFCLGdCLDZCQUFpQjJCLEcsRUFBSztBQUNsQix3QkFBSUMsT0FBTyxFQUFYO0FBQUEsd0JBQWVDLElBQWY7QUFDQSx3QkFBR0wsT0FBT0MsUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJJLFFBQXJCLENBQThCLGNBQTlCLENBQUgsRUFBa0Q7QUFDOUMsNEJBQUlDLFNBQVNQLE9BQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLENBQXFCTSxLQUFyQixDQUEyQlIsT0FBT0MsUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJPLE9BQXJCLENBQTZCLEdBQTdCLElBQW9DLENBQS9ELEVBQWtFQyxLQUFsRSxDQUF3RSxHQUF4RSxDQUFiO0FBQ0EsNkJBQUksSUFBSUMsSUFBSSxDQUFaLEVBQWVBLElBQUlKLE9BQU9LLE1BQTFCLEVBQWtDRCxHQUFsQyxFQUNBO0FBQ0lOLG1DQUFPRSxPQUFPSSxDQUFQLEVBQVVELEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBUDtBQUNBTixpQ0FBS1MsSUFBTCxDQUFVUixLQUFLLENBQUwsQ0FBVjtBQUNBRCxpQ0FBS0MsS0FBSyxDQUFMLENBQUwsSUFBZ0JBLEtBQUssQ0FBTCxDQUFoQjtBQUNIO0FBQ0QvQixxQ0FBYXdDLE9BQWIsQ0FBcUIsZUFBckIsRUFBc0NWLEtBQUtELEdBQUwsQ0FBdEM7QUFDQSwrQkFBT0MsS0FBS0QsR0FBTCxDQUFQO0FBQ0gscUJBVkQsTUFXSztBQUNELCtCQUFPLFdBQVA7QUFDSDtBQUNKLGlCIiwiZmlsZSI6InNwb3RpZnkuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
