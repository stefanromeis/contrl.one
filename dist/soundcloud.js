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
                    this.connected = false;
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
                            self.connected = true;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvdW5kY2xvdWQuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsIiQiLCJTb3VuZGNsb3VkIiwidHJhY2tudW1iZXIiLCJ0cmFja0xpc3QiLCJtZVNDIiwiaWZyYW1lRWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJTQyIsImluaXRpYWxpemUiLCJjbGllbnRfaWQiLCJyZWRpcmVjdF91cmkiLCJjb25uZWN0ZWQiLCJhdHRhY2hlZCIsIldpZGdldCIsImNvbm5lY3QiLCJzZWxmIiwidGhlbiIsImdldCIsIm1lIiwiY29uc29sZSIsImxvZyIsInVzZXJuYW1lIiwidHJhY2tzIiwicmVzdWx0IiwicGVybWFsaW5rIiwic3JjIiwibG9hZG5leHRUcmFjayIsImh0bWwiLCJsb2FkcHJldlRyYWNrIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJzdWNjZXNzIiwibG9hZFRyYWNrIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7O0FBQ0RDLGE7OztrQ0FHTUMsVTtBQUVULHNDQUFjO0FBQUE7O0FBQ1YseUJBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSx5QkFBS0MsU0FBTDtBQUNBLHlCQUFLQyxJQUFMO0FBQ0EseUJBQUtDLGFBQUwsR0FBdUJDLFNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBdkI7QUFDQSx5QkFBS0MsRUFBTCxHQUFVQSxFQUFWO0FBQ0EseUJBQUtBLEVBQUwsQ0FBUUMsVUFBUixDQUFtQjtBQUNmQyxtQ0FBVyxrQ0FESTtBQUVmQyxzQ0FBYztBQUZDLHFCQUFuQjtBQUlBLHlCQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0g7O3FDQUVEQyxRLHVCQUFVO0FBQ04seUJBQUtMLEVBQUwsQ0FBUU0sTUFBUixDQUFlLEtBQUtULGFBQXBCO0FBQ0gsaUI7O3FDQUVEVSxPLHNCQUFVOztBQUVOLHdCQUFJQyxPQUFPLElBQVg7O0FBR0EseUJBQUtSLEVBQUwsQ0FBUU8sT0FBUixHQUFrQkUsSUFBbEIsQ0FBdUIsWUFBVztBQUM5QiwrQkFBT0QsS0FBS1IsRUFBTCxDQUFRVSxHQUFSLENBQVksS0FBWixDQUFQO0FBQ0gscUJBRkQsRUFFR0QsSUFGSCxDQUVRLFVBQVNFLEVBQVQsRUFBYTtBQUNqQkgsNkJBQUtaLElBQUwsR0FBWWUsRUFBWjtBQUNBQyxnQ0FBUUMsR0FBUixDQUFZLCtCQUErQkwsS0FBS1osSUFBTCxDQUFVa0IsUUFBckQ7O0FBRUFOLDZCQUFLUixFQUFMLENBQVFVLEdBQVIsQ0FBWSxZQUFaLEVBQTBCRCxJQUExQixDQUErQixVQUFTTSxNQUFULEVBQWlCO0FBQzVDUCxpQ0FBS2IsU0FBTCxHQUFpQm9CLE1BQWpCOztBQUVBLGdDQUFJQyxTQUFTLGdFQUFnRVIsS0FBS1osSUFBTCxDQUFVa0IsUUFBMUUsR0FBcUYsR0FBckYsR0FBMkZOLEtBQUtiLFNBQUwsQ0FBZWEsS0FBS2QsV0FBcEIsRUFBaUN1QixTQUF6STtBQUNBbkIscUNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NtQixHQUFsQyxHQUF3Q0YsTUFBeEM7QUFDQVIsaUNBQUtKLFNBQUwsR0FBaUIsSUFBakI7QUFDSCx5QkFORDtBQU9ILHFCQWJEO0FBZUgsaUI7O3FDQUVEZSxhLDRCQUFnQjtBQUNaLHlCQUFLekIsV0FBTDtBQUNBLHdCQUFHLEtBQUtDLFNBQUwsQ0FBZUQsV0FBZixDQUFILEVBQWdDO0FBQzVCLDRCQUFJc0IsU0FBUyxnRUFBZ0UsS0FBS3BCLElBQUwsQ0FBVWtCLFFBQTFFLEdBQXFGLEdBQXJGLEdBQTJGLEtBQUtuQixTQUFMLENBQWVELFdBQWYsRUFBNEJ1QixTQUFwSTtBQUNBbkIsaUNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NtQixHQUFsQyxHQUF3Q0YsTUFBeEM7QUFDSCxxQkFIRCxNQUlLO0FBQ0RSLDZCQUFLWCxhQUFMLENBQW1CdUIsSUFBbkIsQ0FBd0IsMkJBQXhCO0FBQ0g7QUFDSixpQjs7cUNBRURDLGEsNEJBQWdCO0FBQ1ozQjtBQUNBLHdCQUFHQSxjQUFjLENBQWpCLEVBQW9CO0FBQ2hCRiwwQkFBRThCLElBQUYsQ0FBTztBQUNDQyxrQ0FBTSxNQURQO0FBRUNDLGlDQUFLLGdFQUFnRSxLQUFLNUIsSUFBTCxDQUFVa0IsUUFBMUUsR0FBcUYsR0FBckYsR0FBMkZuQixVQUFVRCxXQUFWLEVBQXVCdUIsU0FGeEg7QUFHSFEscUNBQVMsbUJBQVc7QUFDaEJDLDBDQUFVaEMsV0FBVjtBQUNILDZCQUxFO0FBTUhpQyxtQ0FBTyxpQkFBVztBQUNkakM7QUFDQWdDLDBDQUFVaEMsV0FBVjtBQUNIO0FBVEUseUJBQVA7QUFXSDtBQUNKLGlCOztxQ0FFRGdDLFMsc0JBQVVoQyxXLEVBQWE7QUFDbkJrQiw0QkFBUUMsR0FBUixDQUFZLHlCQUF3Qm5CLFdBQXBDO0FBQ0Esd0JBQUlzQixTQUFTLGdFQUFnRSxLQUFLcEIsSUFBTCxDQUFVa0IsUUFBMUUsR0FBcUYsR0FBckYsR0FBMkZuQixVQUFVRCxXQUFWLEVBQXVCdUIsU0FBL0g7QUFDQW5CLDZCQUFTQyxjQUFULENBQXdCLFFBQXhCLEVBQWtDbUIsR0FBbEMsR0FBd0NGLE1BQXhDO0FBQ0gsaUIiLCJmaWxlIjoic291bmRjbG91ZC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
