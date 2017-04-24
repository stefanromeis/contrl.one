import { inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import config from './services/authConfig';

export class Soundcloud {

    constructor() {
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

    attached() {
        this.SC.Widget(this.iframeElement);
    }

    connect() {
        var self = this;
        // initiate auth popup
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
    }

    getUpdates() {
        var self = this;
        this.SC.get("/me/tracks").then(function (tracks) {
            self.interactions = self.getInteractions(tracks);
            if (self.tempInteractions < self.interactions) {
                self.updates = self.interactions - self.tempInteractions;
            }
        });
    }

    getInteractions(tracks) {
        var count = 0;
        for (let i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            count += track.comment_count + track.favoritings_count + track.download_count;
        }
        return count;
    }

    loadNextTrack() {
        this.tracknumber++;
        this.loadTrack();
    }

    loadPrevTrack() {
        this.tracknumber--;
        this.loadTrack();
    }

    loadTrack() {
        if (this.trackList[this.tracknumber]) {
            var result = 'https://w.soundcloud.com/player/?url=http://soundcloud.com/' + this.meSC.username + '/' + this.trackList[this.tracknumber].permalink;
            document.getElementById('sc-widget').src = result;
        }
        else {
            self.iframeElement.html("no more tracks available.");
        }
    }

}