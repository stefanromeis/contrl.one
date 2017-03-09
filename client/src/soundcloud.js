import {inject}        from 'aurelia-framework';
import {I18N}          from 'aurelia-i18n';
import $               from 'jquery';

//@inject()
export class Soundcloud {
    
    constructor (){
        this.tracknumber = 0;
        this.trackList;
        this.meSC;
        this.iframeElement   = document.getElementById('sc-sc-widget');
        this.SC = SC;
        this.SC.initialize({
            client_id: "443f2da68b0ce89934a41dc950c78679",
            redirect_uri: "http://localhost:9000/dist/callback.html"
        });
        this.connected = false;
        this.active = false;
    } 
    
    attached(){
        this.SC.Widget(this.iframeElement);
    }

    connect() {
    
        var self = this;

        // initiate auth popup
        this.SC.connect().then(function() {
            return self.SC.get('/me');
        }).then(function(me) {
            self.meSC = me;
            console.log('Logged into soundcloud as ' + self.meSC.username);

            self.SC.get("/me/tracks").then(function(tracks) {
                self.trackList = tracks;
                
                var result = 'https://w.soundcloud.com/player/?url=http://soundcloud.com/' + self.meSC.username + '/' + self.trackList[self.tracknumber].permalink;
                document.getElementById('sc-widget').src = result;
                self.connected = true;               
            }); 
        });     

    }

    loadnextTrack() {
        this.tracknumber++;
        if(this.trackList[tracknumber]) {
            var result = 'https://w.soundcloud.com/player/?url=http://soundcloud.com/' + this.meSC.username + '/' + this.trackList[tracknumber].permalink;
            document.getElementById('sc-widget').src = result;
        }
        else {
            self.iframeElement.html("no more tracks available.");
        }
    }

    loadprevTrack() {
        tracknumber--;
        if(tracknumber > 0) {
            $.ajax({
                type: 'HEAD',
                url: 'https://w.soundcloud.com/player/?url=http://soundcloud.com/' + this.meSC.username + '/' + trackList[tracknumber].permalink,
            success: function() {
                loadTrack(tracknumber);
            },
            error: function() {
                tracknumber--;
                loadTrack(tracknumber);
            }
            });       
        }
    }

    loadTrack(tracknumber) {
        console.log('loaded Tracknumber: '+ tracknumber);
        var result = 'https://w.soundcloud.com/player/?url=http://soundcloud.com/' + this.meSC.username + '/' + trackList[tracknumber].permalink;
        document.getElementById('sc-widget').src = result;
    } 

}