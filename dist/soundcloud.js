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
                    this.iframeElement = document.getElementById('widget');
                    this.SC = SC;
                    this.SC.initialize({
                        client_id: "443f2da68b0ce89934a41dc950c78679",
                        redirect_uri: "http://localhost:9000/dist/callback.html"
                    });
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
                            document.getElementById('widget').src = result;
                            $('.soundcloud-connect-btn').hide();
                        });
                    });
                };

                Soundcloud.prototype.loadnextTrack = function loadnextTrack() {
                    this.tracknumber++;
                    if (this.trackList[tracknumber]) {
                        var result = 'https://w.soundcloud.com/player/?url=http://soundcloud.com/' + this.meSC.username + '/' + this.trackList[tracknumber].permalink;
                        document.getElementById('widget').src = result;
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
                    document.getElementById('widget').src = result;
                };

                return Soundcloud;
            }());

            _export('Soundcloud', Soundcloud);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvdW5kY2xvdWQuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsIiQiLCJTb3VuZGNsb3VkIiwidHJhY2tudW1iZXIiLCJ0cmFja0xpc3QiLCJtZVNDIiwiaWZyYW1lRWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJTQyIsImluaXRpYWxpemUiLCJjbGllbnRfaWQiLCJyZWRpcmVjdF91cmkiLCJhdHRhY2hlZCIsIldpZGdldCIsImNvbm5lY3QiLCJzZWxmIiwidGhlbiIsImdldCIsIm1lIiwiY29uc29sZSIsImxvZyIsInVzZXJuYW1lIiwidHJhY2tzIiwicmVzdWx0IiwicGVybWFsaW5rIiwic3JjIiwiaGlkZSIsImxvYWRuZXh0VHJhY2siLCJodG1sIiwibG9hZHByZXZUcmFjayIsImFqYXgiLCJ0eXBlIiwidXJsIiwic3VjY2VzcyIsImxvYWRUcmFjayIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOztBQUNEQyxhOzs7a0NBR01DLFU7QUFFVCxzQ0FBYztBQUFBOztBQUNWLHlCQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EseUJBQUtDLFNBQUw7QUFDQSx5QkFBS0MsSUFBTDtBQUNBLHlCQUFLQyxhQUFMLEdBQXVCQyxTQUFTQyxjQUFULENBQXdCLFFBQXhCLENBQXZCO0FBQ0EseUJBQUtDLEVBQUwsR0FBVUEsRUFBVjtBQUNBLHlCQUFLQSxFQUFMLENBQVFDLFVBQVIsQ0FBbUI7QUFDZkMsbUNBQVcsa0NBREk7QUFFZkMsc0NBQWM7QUFGQyxxQkFBbkI7QUFLSDs7cUNBRURDLFEsdUJBQVU7QUFDTix5QkFBS0osRUFBTCxDQUFRSyxNQUFSLENBQWUsS0FBS1IsYUFBcEI7QUFDSCxpQjs7cUNBRURTLE8sc0JBQVU7O0FBRU4sd0JBQUlDLE9BQU8sSUFBWDs7QUFHQSx5QkFBS1AsRUFBTCxDQUFRTSxPQUFSLEdBQWtCRSxJQUFsQixDQUF1QixZQUFXO0FBQzlCLCtCQUFPRCxLQUFLUCxFQUFMLENBQVFTLEdBQVIsQ0FBWSxLQUFaLENBQVA7QUFDSCxxQkFGRCxFQUVHRCxJQUZILENBRVEsVUFBU0UsRUFBVCxFQUFhO0FBQ2pCSCw2QkFBS1gsSUFBTCxHQUFZYyxFQUFaO0FBQ0FDLGdDQUFRQyxHQUFSLENBQVksK0JBQStCTCxLQUFLWCxJQUFMLENBQVVpQixRQUFyRDs7QUFFQU4sNkJBQUtQLEVBQUwsQ0FBUVMsR0FBUixDQUFZLFlBQVosRUFBMEJELElBQTFCLENBQStCLFVBQVNNLE1BQVQsRUFBaUI7QUFDNUNQLGlDQUFLWixTQUFMLEdBQWlCbUIsTUFBakI7O0FBRUEsZ0NBQUlDLFNBQVMsZ0VBQWdFUixLQUFLWCxJQUFMLENBQVVpQixRQUExRSxHQUFxRixHQUFyRixHQUEyRk4sS0FBS1osU0FBTCxDQUFlWSxLQUFLYixXQUFwQixFQUFpQ3NCLFNBQXpJO0FBQ0FsQixxQ0FBU0MsY0FBVCxDQUF3QixRQUF4QixFQUFrQ2tCLEdBQWxDLEdBQXdDRixNQUF4QztBQUNBdkIsOEJBQUUseUJBQUYsRUFBNkIwQixJQUE3QjtBQUNILHlCQU5EO0FBT0gscUJBYkQ7QUFlSCxpQjs7cUNBRURDLGEsNEJBQWdCO0FBQ1oseUJBQUt6QixXQUFMO0FBQ0Esd0JBQUcsS0FBS0MsU0FBTCxDQUFlRCxXQUFmLENBQUgsRUFBZ0M7QUFDNUIsNEJBQUlxQixTQUFTLGdFQUFnRSxLQUFLbkIsSUFBTCxDQUFVaUIsUUFBMUUsR0FBcUYsR0FBckYsR0FBMkYsS0FBS2xCLFNBQUwsQ0FBZUQsV0FBZixFQUE0QnNCLFNBQXBJO0FBQ0FsQixpQ0FBU0MsY0FBVCxDQUF3QixRQUF4QixFQUFrQ2tCLEdBQWxDLEdBQXdDRixNQUF4QztBQUNILHFCQUhELE1BSUs7QUFDRFIsNkJBQUtWLGFBQUwsQ0FBbUJ1QixJQUFuQixDQUF3QiwyQkFBeEI7QUFDSDtBQUNKLGlCOztxQ0FFREMsYSw0QkFBZ0I7QUFDWjNCO0FBQ0Esd0JBQUdBLGNBQWMsQ0FBakIsRUFBb0I7QUFDaEJGLDBCQUFFOEIsSUFBRixDQUFPO0FBQ0NDLGtDQUFNLE1BRFA7QUFFQ0MsaUNBQUssZ0VBQWdFLEtBQUs1QixJQUFMLENBQVVpQixRQUExRSxHQUFxRixHQUFyRixHQUEyRmxCLFVBQVVELFdBQVYsRUFBdUJzQixTQUZ4SDtBQUdIUyxxQ0FBUyxtQkFBVztBQUNoQkMsMENBQVVoQyxXQUFWO0FBQ0gsNkJBTEU7QUFNSGlDLG1DQUFPLGlCQUFXO0FBQ2RqQztBQUNBZ0MsMENBQVVoQyxXQUFWO0FBQ0g7QUFURSx5QkFBUDtBQVdIO0FBQ0osaUI7O3FDQUVEZ0MsUyxzQkFBVWhDLFcsRUFBYTtBQUNuQmlCLDRCQUFRQyxHQUFSLENBQVkseUJBQXdCbEIsV0FBcEM7QUFDQSx3QkFBSXFCLFNBQVMsZ0VBQWdFLEtBQUtuQixJQUFMLENBQVVpQixRQUExRSxHQUFxRixHQUFyRixHQUEyRmxCLFVBQVVELFdBQVYsRUFBdUJzQixTQUEvSDtBQUNBbEIsNkJBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NrQixHQUFsQyxHQUF3Q0YsTUFBeEM7QUFDSCxpQiIsImZpbGUiOiJzb3VuZGNsb3VkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
