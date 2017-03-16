'use strict';

System.register(['aurelia-framework', 'aurelia-i18n', 'jquery'], function (_export, _context) {
    "use strict";

    var inject, I18N, $, Soundcloud;

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
        }, function (_jquery) {
            $ = _jquery.default;
        }],
        execute: function () {
            _export('Soundcloud', Soundcloud = function () {
                function Soundcloud() {
                    _classCallCheck(this, Soundcloud);

                    this.tracknumber = 0;
                    this.trackList;
                    this.meSC;
                    this.iframeElement = document.getElementById('sc-sc-widget');
                    this.SC = SC;
                    this.SC.initialize({
                        client_id: "443f2da68b0ce89934a41dc950c78679",
                        redirect_uri: "http://localhost:9000/dist/callback.html"
                    });
                    this.connected = false;
                    this.active = false;
                }

                Soundcloud.prototype.attached = function attached() {
                    this.SC.Widget(this.iframeElement);
                };

                Soundcloud.prototype.connect = function connect() {

                    var self = this;

                    this.SC.connect().then(function () {
                        return self.SC.get('/me');
                    }).then(function (me) {
                        self.meSC = me;
                        console.log('Logged into soundcloud as ' + self.meSC.username);

                        self.SC.get("/me/tracks").then(function (tracks) {
                            self.trackList = tracks;

                            var result = 'https://w.soundcloud.com/player/?url=http://soundcloud.com/' + self.meSC.username + '/' + self.trackList[self.tracknumber].permalink;
                            document.getElementById('sc-widget').src = result;
                            self.connected = true;
                        });
                    });
                };

                Soundcloud.prototype.loadnextTrack = function loadnextTrack() {
                    this.tracknumber++;
                    if (this.trackList[tracknumber]) {
                        var result = 'https://w.soundcloud.com/player/?url=http://soundcloud.com/' + this.meSC.username + '/' + this.trackList[tracknumber].permalink;
                        document.getElementById('sc-widget').src = result;
                    } else {
                        self.iframeElement.html("no more tracks available.");
                    }
                };

                Soundcloud.prototype.loadprevTrack = function loadprevTrack() {
                    tracknumber--;
                    if (tracknumber > 0) {
                        $.ajax({
                            type: 'HEAD',
                            url: 'https://w.soundcloud.com/player/?url=http://soundcloud.com/' + this.meSC.username + '/' + trackList[tracknumber].permalink,
                            success: function success() {
                                loadTrack(tracknumber);
                            },
                            error: function error() {
                                tracknumber--;
                                loadTrack(tracknumber);
                            }
                        });
                    }
                };

                Soundcloud.prototype.loadTrack = function loadTrack(tracknumber) {
                    console.log('loaded Tracknumber: ' + tracknumber);
                    var result = 'https://w.soundcloud.com/player/?url=http://soundcloud.com/' + this.meSC.username + '/' + trackList[tracknumber].permalink;
                    document.getElementById('sc-widget').src = result;
                };

                return Soundcloud;
            }());

            _export('Soundcloud', Soundcloud);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvdW5kY2xvdWQuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsIiQiLCJTb3VuZGNsb3VkIiwidHJhY2tudW1iZXIiLCJ0cmFja0xpc3QiLCJtZVNDIiwiaWZyYW1lRWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJTQyIsImluaXRpYWxpemUiLCJjbGllbnRfaWQiLCJyZWRpcmVjdF91cmkiLCJjb25uZWN0ZWQiLCJhY3RpdmUiLCJhdHRhY2hlZCIsIldpZGdldCIsImNvbm5lY3QiLCJzZWxmIiwidGhlbiIsImdldCIsIm1lIiwiY29uc29sZSIsImxvZyIsInVzZXJuYW1lIiwidHJhY2tzIiwicmVzdWx0IiwicGVybWFsaW5rIiwic3JjIiwibG9hZG5leHRUcmFjayIsImh0bWwiLCJsb2FkcHJldlRyYWNrIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJzdWNjZXNzIiwibG9hZFRyYWNrIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7O0FBQ0RDLGE7OztrQ0FHTUMsVTtBQUVULHNDQUFjO0FBQUE7O0FBQ1YseUJBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSx5QkFBS0MsU0FBTDtBQUNBLHlCQUFLQyxJQUFMO0FBQ0EseUJBQUtDLGFBQUwsR0FBdUJDLFNBQVNDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBdkI7QUFDQSx5QkFBS0MsRUFBTCxHQUFVQSxFQUFWO0FBQ0EseUJBQUtBLEVBQUwsQ0FBUUMsVUFBUixDQUFtQjtBQUNmQyxtQ0FBVyxrQ0FESTtBQUVmQyxzQ0FBYztBQUZDLHFCQUFuQjtBQUlBLHlCQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EseUJBQUtDLE1BQUwsR0FBYyxLQUFkO0FBRUg7O3FDQUVEQyxRLHVCQUFVO0FBQ04seUJBQUtOLEVBQUwsQ0FBUU8sTUFBUixDQUFlLEtBQUtWLGFBQXBCO0FBQ0gsaUI7O3FDQUVEVyxPLHNCQUFVOztBQUVOLHdCQUFJQyxPQUFPLElBQVg7O0FBR0EseUJBQUtULEVBQUwsQ0FBUVEsT0FBUixHQUFrQkUsSUFBbEIsQ0FBdUIsWUFBVztBQUM5QiwrQkFBT0QsS0FBS1QsRUFBTCxDQUFRVyxHQUFSLENBQVksS0FBWixDQUFQO0FBQ0gscUJBRkQsRUFFR0QsSUFGSCxDQUVRLFVBQVNFLEVBQVQsRUFBYTtBQUNqQkgsNkJBQUtiLElBQUwsR0FBWWdCLEVBQVo7QUFDQUMsZ0NBQVFDLEdBQVIsQ0FBWSwrQkFBK0JMLEtBQUtiLElBQUwsQ0FBVW1CLFFBQXJEOztBQUVBTiw2QkFBS1QsRUFBTCxDQUFRVyxHQUFSLENBQVksWUFBWixFQUEwQkQsSUFBMUIsQ0FBK0IsVUFBU00sTUFBVCxFQUFpQjtBQUM1Q1AsaUNBQUtkLFNBQUwsR0FBaUJxQixNQUFqQjs7QUFFQSxnQ0FBSUMsU0FBUyxnRUFBZ0VSLEtBQUtiLElBQUwsQ0FBVW1CLFFBQTFFLEdBQXFGLEdBQXJGLEdBQTJGTixLQUFLZCxTQUFMLENBQWVjLEtBQUtmLFdBQXBCLEVBQWlDd0IsU0FBekk7QUFDQXBCLHFDQUFTQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDb0IsR0FBckMsR0FBMkNGLE1BQTNDO0FBQ0FSLGlDQUFLTCxTQUFMLEdBQWlCLElBQWpCO0FBQ0gseUJBTkQ7QUFPSCxxQkFiRDtBQWVILGlCOztxQ0FFRGdCLGEsNEJBQWdCO0FBQ1oseUJBQUsxQixXQUFMO0FBQ0Esd0JBQUcsS0FBS0MsU0FBTCxDQUFlRCxXQUFmLENBQUgsRUFBZ0M7QUFDNUIsNEJBQUl1QixTQUFTLGdFQUFnRSxLQUFLckIsSUFBTCxDQUFVbUIsUUFBMUUsR0FBcUYsR0FBckYsR0FBMkYsS0FBS3BCLFNBQUwsQ0FBZUQsV0FBZixFQUE0QndCLFNBQXBJO0FBQ0FwQixpQ0FBU0MsY0FBVCxDQUF3QixXQUF4QixFQUFxQ29CLEdBQXJDLEdBQTJDRixNQUEzQztBQUNILHFCQUhELE1BSUs7QUFDRFIsNkJBQUtaLGFBQUwsQ0FBbUJ3QixJQUFuQixDQUF3QiwyQkFBeEI7QUFDSDtBQUNKLGlCOztxQ0FFREMsYSw0QkFBZ0I7QUFDWjVCO0FBQ0Esd0JBQUdBLGNBQWMsQ0FBakIsRUFBb0I7QUFDaEJGLDBCQUFFK0IsSUFBRixDQUFPO0FBQ0hDLGtDQUFNLE1BREg7QUFFSEMsaUNBQUssZ0VBQWdFLEtBQUs3QixJQUFMLENBQVVtQixRQUExRSxHQUFxRixHQUFyRixHQUEyRnBCLFVBQVVELFdBQVYsRUFBdUJ3QixTQUZwSDtBQUdQUSxxQ0FBUyxtQkFBVztBQUNoQkMsMENBQVVqQyxXQUFWO0FBQ0gsNkJBTE07QUFNUGtDLG1DQUFPLGlCQUFXO0FBQ2RsQztBQUNBaUMsMENBQVVqQyxXQUFWO0FBQ0g7QUFUTSx5QkFBUDtBQVdIO0FBQ0osaUI7O3FDQUVEaUMsUyxzQkFBVWpDLFcsRUFBYTtBQUNuQm1CLDRCQUFRQyxHQUFSLENBQVkseUJBQXdCcEIsV0FBcEM7QUFDQSx3QkFBSXVCLFNBQVMsZ0VBQWdFLEtBQUtyQixJQUFMLENBQVVtQixRQUExRSxHQUFxRixHQUFyRixHQUEyRnBCLFVBQVVELFdBQVYsRUFBdUJ3QixTQUEvSDtBQUNBcEIsNkJBQVNDLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNvQixHQUFyQyxHQUEyQ0YsTUFBM0M7QUFDSCxpQiIsImZpbGUiOiJzb3VuZGNsb3VkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
