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
                            console.log('User tracks loaded', self.trackList);

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvdW5kY2xvdWQuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsIiQiLCJTb3VuZGNsb3VkIiwidHJhY2tudW1iZXIiLCJ0cmFja0xpc3QiLCJtZVNDIiwiaWZyYW1lRWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJTQyIsImluaXRpYWxpemUiLCJjbGllbnRfaWQiLCJyZWRpcmVjdF91cmkiLCJhdHRhY2hlZCIsIldpZGdldCIsImNvbm5lY3QiLCJzZWxmIiwidGhlbiIsImdldCIsIm1lIiwiY29uc29sZSIsImxvZyIsInVzZXJuYW1lIiwidHJhY2tzIiwicmVzdWx0IiwicGVybWFsaW5rIiwic3JjIiwiaGlkZSIsImxvYWRuZXh0VHJhY2siLCJodG1sIiwibG9hZHByZXZUcmFjayIsImFqYXgiLCJ0eXBlIiwidXJsIiwic3VjY2VzcyIsImxvYWRUcmFjayIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOztBQUNEQyxhOzs7a0NBR01DLFU7QUFFVCxzQ0FBYztBQUFBOztBQUNWLHlCQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EseUJBQUtDLFNBQUw7QUFDQSx5QkFBS0MsSUFBTDtBQUNBLHlCQUFLQyxhQUFMLEdBQXVCQyxTQUFTQyxjQUFULENBQXdCLFFBQXhCLENBQXZCO0FBQ0EseUJBQUtDLEVBQUwsR0FBVUEsRUFBVjtBQUNBLHlCQUFLQSxFQUFMLENBQVFDLFVBQVIsQ0FBbUI7QUFDZkMsbUNBQVcsa0NBREk7QUFFZkMsc0NBQWM7QUFGQyxxQkFBbkI7QUFLSDs7cUNBRURDLFEsdUJBQVU7QUFDTix5QkFBS0osRUFBTCxDQUFRSyxNQUFSLENBQWUsS0FBS1IsYUFBcEI7QUFDSCxpQjs7cUNBRURTLE8sc0JBQVU7O0FBRU4sd0JBQUlDLE9BQU8sSUFBWDs7QUFHQSx5QkFBS1AsRUFBTCxDQUFRTSxPQUFSLEdBQWtCRSxJQUFsQixDQUF1QixZQUFXO0FBQzlCLCtCQUFPRCxLQUFLUCxFQUFMLENBQVFTLEdBQVIsQ0FBWSxLQUFaLENBQVA7QUFDSCxxQkFGRCxFQUVHRCxJQUZILENBRVEsVUFBU0UsRUFBVCxFQUFhO0FBQ2pCSCw2QkFBS1gsSUFBTCxHQUFZYyxFQUFaO0FBQ0FDLGdDQUFRQyxHQUFSLENBQVksK0JBQStCTCxLQUFLWCxJQUFMLENBQVVpQixRQUFyRDs7QUFFQU4sNkJBQUtQLEVBQUwsQ0FBUVMsR0FBUixDQUFZLFlBQVosRUFBMEJELElBQTFCLENBQStCLFVBQVNNLE1BQVQsRUFBaUI7QUFDNUNQLGlDQUFLWixTQUFMLEdBQWlCbUIsTUFBakI7QUFDQUgsb0NBQVFDLEdBQVIsQ0FBWSxvQkFBWixFQUFrQ0wsS0FBS1osU0FBdkM7O0FBRUEsZ0NBQUlvQixTQUFTLGdFQUFnRVIsS0FBS1gsSUFBTCxDQUFVaUIsUUFBMUUsR0FBcUYsR0FBckYsR0FBMkZOLEtBQUtaLFNBQUwsQ0FBZVksS0FBS2IsV0FBcEIsRUFBaUNzQixTQUF6STtBQUNBbEIscUNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NrQixHQUFsQyxHQUF3Q0YsTUFBeEM7QUFDQXZCLDhCQUFFLHlCQUFGLEVBQTZCMEIsSUFBN0I7QUFDSCx5QkFQRDtBQVFILHFCQWREO0FBZUgsaUI7O3FDQUVEQyxhLDRCQUFnQjtBQUNaLHlCQUFLekIsV0FBTDtBQUNBLHdCQUFHLEtBQUtDLFNBQUwsQ0FBZUQsV0FBZixDQUFILEVBQWdDO0FBQzVCLDRCQUFJcUIsU0FBUyxnRUFBZ0UsS0FBS25CLElBQUwsQ0FBVWlCLFFBQTFFLEdBQXFGLEdBQXJGLEdBQTJGLEtBQUtsQixTQUFMLENBQWVELFdBQWYsRUFBNEJzQixTQUFwSTtBQUNBbEIsaUNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NrQixHQUFsQyxHQUF3Q0YsTUFBeEM7QUFDSCxxQkFIRCxNQUlLO0FBQ0RSLDZCQUFLVixhQUFMLENBQW1CdUIsSUFBbkIsQ0FBd0IsMkJBQXhCO0FBQ0g7QUFDSixpQjs7cUNBRURDLGEsNEJBQWdCO0FBQ1ozQjtBQUNBLHdCQUFHQSxjQUFjLENBQWpCLEVBQW9CO0FBQ2hCRiwwQkFBRThCLElBQUYsQ0FBTztBQUNDQyxrQ0FBTSxNQURQO0FBRUNDLGlDQUFLLGdFQUFnRSxLQUFLNUIsSUFBTCxDQUFVaUIsUUFBMUUsR0FBcUYsR0FBckYsR0FBMkZsQixVQUFVRCxXQUFWLEVBQXVCc0IsU0FGeEg7QUFHSFMscUNBQVMsbUJBQVc7QUFDaEJDLDBDQUFVaEMsV0FBVjtBQUNILDZCQUxFO0FBTUhpQyxtQ0FBTyxpQkFBVztBQUNkakM7QUFDQWdDLDBDQUFVaEMsV0FBVjtBQUNIO0FBVEUseUJBQVA7QUFXSDtBQUNKLGlCOztxQ0FFRGdDLFMsc0JBQVVoQyxXLEVBQWE7QUFDbkJpQiw0QkFBUUMsR0FBUixDQUFZLHlCQUF3QmxCLFdBQXBDO0FBQ0Esd0JBQUlxQixTQUFTLGdFQUFnRSxLQUFLbkIsSUFBTCxDQUFVaUIsUUFBMUUsR0FBcUYsR0FBckYsR0FBMkZsQixVQUFVRCxXQUFWLEVBQXVCc0IsU0FBL0g7QUFDQWxCLDZCQUFTQyxjQUFULENBQXdCLFFBQXhCLEVBQWtDa0IsR0FBbEMsR0FBd0NGLE1BQXhDO0FBQ0gsaUIiLCJmaWxlIjoic291bmRjbG91ZC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
