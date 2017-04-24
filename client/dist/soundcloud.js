'use strict';

System.register(['aurelia-framework', 'aurelia-i18n', './services/authConfig'], function (_export, _context) {
    "use strict";

    var inject, I18N, config, Soundcloud;

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
            _export('Soundcloud', Soundcloud = function () {
                function Soundcloud() {
                    _classCallCheck(this, Soundcloud);

                    this.tracknumber = 0;
                    this.trackList;
                    this.clientId = config.providers.soundcloud.clientId;
                    this.redirectUri = config.providers.soundcloud.redirectUri;
                    this.meSC;
                    this.iframeElement = document.getElementById('sc-sc-widget');
                    this.SC = SC;
                    this.connected = false;
                    this.active = false;
                    this.interactions = 0;
                    this.tempInteractions = 0;
                    this.updates = 0;
                    this.meUrl = '#';

                    this.SC.initialize({
                        client_id: this.clientId,
                        redirect_uri: this.redirectUri,
                        scope: 'non-expiring'
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
                        self.meUrl = me.permalink_url;
                        self.SC.get("/me/tracks").then(function (tracks) {
                            self.trackList = tracks;
                            self.loadTrack();
                            self.connected = true;

                            self.tempInteractions = self.getInteractions(self.trackList);
                            setInterval(function () {
                                self.getUpdates();
                            }, 5000);
                        });
                    });
                };

                Soundcloud.prototype.getUpdates = function getUpdates() {
                    var self = this;
                    this.SC.get("/me/tracks").then(function (tracks) {
                        self.interactions = self.getInteractions(tracks);
                        if (self.tempInteractions < self.interactions) {
                            self.updates = self.interactions - self.tempInteractions;
                        }
                    });
                };

                Soundcloud.prototype.getInteractions = function getInteractions(tracks) {
                    var count = 0;
                    for (var i = 0; i < tracks.length; i++) {
                        var track = tracks[i];
                        count += track.comment_count + track.favoritings_count + track.download_count;
                    }
                    return count;
                };

                Soundcloud.prototype.loadNextTrack = function loadNextTrack() {
                    this.tracknumber++;
                    this.loadTrack();
                };

                Soundcloud.prototype.loadPrevTrack = function loadPrevTrack() {
                    this.tracknumber--;
                    this.loadTrack();
                };

                Soundcloud.prototype.loadTrack = function loadTrack() {
                    if (this.trackList[this.tracknumber]) {
                        var result = 'https://w.soundcloud.com/player/?url=http://soundcloud.com/' + this.meSC.username + '/' + this.trackList[this.tracknumber].permalink;
                        document.getElementById('sc-widget').src = result;
                    } else {
                        self.iframeElement.html("no more tracks available.");
                    }
                };

                return Soundcloud;
            }());

            _export('Soundcloud', Soundcloud);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvdW5kY2xvdWQuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsImNvbmZpZyIsIlNvdW5kY2xvdWQiLCJ0cmFja251bWJlciIsInRyYWNrTGlzdCIsImNsaWVudElkIiwicHJvdmlkZXJzIiwic291bmRjbG91ZCIsInJlZGlyZWN0VXJpIiwibWVTQyIsImlmcmFtZUVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiU0MiLCJjb25uZWN0ZWQiLCJhY3RpdmUiLCJpbnRlcmFjdGlvbnMiLCJ0ZW1wSW50ZXJhY3Rpb25zIiwidXBkYXRlcyIsIm1lVXJsIiwiaW5pdGlhbGl6ZSIsImNsaWVudF9pZCIsInJlZGlyZWN0X3VyaSIsInNjb3BlIiwiYXR0YWNoZWQiLCJXaWRnZXQiLCJjb25uZWN0Iiwic2VsZiIsInRoZW4iLCJnZXQiLCJtZSIsInBlcm1hbGlua191cmwiLCJ0cmFja3MiLCJsb2FkVHJhY2siLCJnZXRJbnRlcmFjdGlvbnMiLCJzZXRJbnRlcnZhbCIsImdldFVwZGF0ZXMiLCJjb3VudCIsImkiLCJsZW5ndGgiLCJ0cmFjayIsImNvbW1lbnRfY291bnQiLCJmYXZvcml0aW5nc19jb3VudCIsImRvd25sb2FkX2NvdW50IiwibG9hZE5leHRUcmFjayIsImxvYWRQcmV2VHJhY2siLCJyZXN1bHQiLCJ1c2VybmFtZSIsInBlcm1hbGluayIsInNyYyIsImh0bWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFTQSxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7O0FBQ0ZDLGtCOzs7a0NBRU1DLFU7QUFFVCxzQ0FBYztBQUFBOztBQUNWLHlCQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EseUJBQUtDLFNBQUw7QUFDQSx5QkFBS0MsUUFBTCxHQUFnQkosT0FBT0ssU0FBUCxDQUFpQkMsVUFBakIsQ0FBNEJGLFFBQTVDO0FBQ0EseUJBQUtHLFdBQUwsR0FBbUJQLE9BQU9LLFNBQVAsQ0FBaUJDLFVBQWpCLENBQTRCQyxXQUEvQztBQUNBLHlCQUFLQyxJQUFMO0FBQ0EseUJBQUtDLGFBQUwsR0FBcUJDLFNBQVNDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBckI7QUFDQSx5QkFBS0MsRUFBTCxHQUFVQSxFQUFWO0FBQ0EseUJBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSx5QkFBS0MsTUFBTCxHQUFjLEtBQWQ7QUFDQSx5QkFBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUNBLHlCQUFLQyxnQkFBTCxHQUF3QixDQUF4QjtBQUNBLHlCQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLHlCQUFLQyxLQUFMLEdBQWEsR0FBYjs7QUFFQSx5QkFBS04sRUFBTCxDQUFRTyxVQUFSLENBQW1CO0FBQ2ZDLG1DQUFXLEtBQUtoQixRQUREO0FBRWZpQixzQ0FBYyxLQUFLZCxXQUZKO0FBR2ZlLCtCQUFPO0FBSFEscUJBQW5CO0FBS0g7O3FDQUVEQyxRLHVCQUFXO0FBQ1AseUJBQUtYLEVBQUwsQ0FBUVksTUFBUixDQUFlLEtBQUtmLGFBQXBCO0FBQ0gsaUI7O3FDQUVEZ0IsTyxzQkFBVTtBQUNOLHdCQUFJQyxPQUFPLElBQVg7O0FBRUEseUJBQUtkLEVBQUwsQ0FBUWEsT0FBUixHQUFrQkUsSUFBbEIsQ0FBdUIsWUFBWTtBQUMvQiwrQkFBT0QsS0FBS2QsRUFBTCxDQUFRZ0IsR0FBUixDQUFZLEtBQVosQ0FBUDtBQUNILHFCQUZELEVBRUdELElBRkgsQ0FFUSxVQUFVRSxFQUFWLEVBQWM7QUFDbEJILDZCQUFLbEIsSUFBTCxHQUFZcUIsRUFBWjtBQUNBSCw2QkFBS1IsS0FBTCxHQUFhVyxHQUFHQyxhQUFoQjtBQUNBSiw2QkFBS2QsRUFBTCxDQUFRZ0IsR0FBUixDQUFZLFlBQVosRUFBMEJELElBQTFCLENBQStCLFVBQVVJLE1BQVYsRUFBa0I7QUFDN0NMLGlDQUFLdkIsU0FBTCxHQUFpQjRCLE1BQWpCO0FBQ0FMLGlDQUFLTSxTQUFMO0FBQ0FOLGlDQUFLYixTQUFMLEdBQWlCLElBQWpCOztBQUVBYSxpQ0FBS1YsZ0JBQUwsR0FBd0JVLEtBQUtPLGVBQUwsQ0FBcUJQLEtBQUt2QixTQUExQixDQUF4QjtBQUNBK0Isd0NBQVksWUFBWTtBQUNwQlIscUNBQUtTLFVBQUw7QUFDSCw2QkFGRCxFQUVHLElBRkg7QUFHSCx5QkFURDtBQVVILHFCQWZEO0FBZ0JILGlCOztxQ0FFREEsVSx5QkFBYTtBQUNULHdCQUFJVCxPQUFPLElBQVg7QUFDQSx5QkFBS2QsRUFBTCxDQUFRZ0IsR0FBUixDQUFZLFlBQVosRUFBMEJELElBQTFCLENBQStCLFVBQVVJLE1BQVYsRUFBa0I7QUFDN0NMLDZCQUFLWCxZQUFMLEdBQW9CVyxLQUFLTyxlQUFMLENBQXFCRixNQUFyQixDQUFwQjtBQUNBLDRCQUFJTCxLQUFLVixnQkFBTCxHQUF3QlUsS0FBS1gsWUFBakMsRUFBK0M7QUFDM0NXLGlDQUFLVCxPQUFMLEdBQWVTLEtBQUtYLFlBQUwsR0FBb0JXLEtBQUtWLGdCQUF4QztBQUNIO0FBQ0oscUJBTEQ7QUFNSCxpQjs7cUNBRURpQixlLDRCQUFnQkYsTSxFQUFRO0FBQ3BCLHdCQUFJSyxRQUFRLENBQVo7QUFDQSx5QkFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlOLE9BQU9PLE1BQTNCLEVBQW1DRCxHQUFuQyxFQUF3QztBQUNwQyw0QkFBSUUsUUFBUVIsT0FBT00sQ0FBUCxDQUFaO0FBQ0FELGlDQUFTRyxNQUFNQyxhQUFOLEdBQXNCRCxNQUFNRSxpQkFBNUIsR0FBZ0RGLE1BQU1HLGNBQS9EO0FBQ0g7QUFDRCwyQkFBT04sS0FBUDtBQUNILGlCOztxQ0FFRE8sYSw0QkFBZ0I7QUFDWix5QkFBS3pDLFdBQUw7QUFDQSx5QkFBSzhCLFNBQUw7QUFDSCxpQjs7cUNBRURZLGEsNEJBQWdCO0FBQ1oseUJBQUsxQyxXQUFMO0FBQ0EseUJBQUs4QixTQUFMO0FBQ0gsaUI7O3FDQUVEQSxTLHdCQUFZO0FBQ1Isd0JBQUksS0FBSzdCLFNBQUwsQ0FBZSxLQUFLRCxXQUFwQixDQUFKLEVBQXNDO0FBQ2xDLDRCQUFJMkMsU0FBUyxnRUFBZ0UsS0FBS3JDLElBQUwsQ0FBVXNDLFFBQTFFLEdBQXFGLEdBQXJGLEdBQTJGLEtBQUszQyxTQUFMLENBQWUsS0FBS0QsV0FBcEIsRUFBaUM2QyxTQUF6STtBQUNBckMsaUNBQVNDLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUNxQyxHQUFyQyxHQUEyQ0gsTUFBM0M7QUFDSCxxQkFIRCxNQUlLO0FBQ0RuQiw2QkFBS2pCLGFBQUwsQ0FBbUJ3QyxJQUFuQixDQUF3QiwyQkFBeEI7QUFDSDtBQUNKLGlCIiwiZmlsZSI6InNvdW5kY2xvdWQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
