import {inject}        from 'aurelia-framework';
import {I18N}          from 'aurelia-i18n';

//@inject()
export class Spotify {
    
    constructor (){

        this.connected = false;
        this.active = false;
        this.clientID = '3f25006f76cd43a8a52b1452e949b697';
        this.token = localStorage.getItem('spotify.token') !== "undefined" && 
            localStorage.getItem('spotify.token') != null ? 
            localStorage.getItem('spotify.token') : 
            this.getStringFromUrl('access_token');

        console.log('token ' , this.token);
        if(this.token !== "undefined" && this.token != null) {
            this.connect();
        }
    } 
    
    attached(){
         //this.connect()
    }

    connect() {
        var self = this;
        $.ajax({
            url: 'https://api.spotify.com/v1/me/tracks',
            headers: {
                'Authorization': 'Bearer ' + this.token
            },
            success: function(response) {
                console.log('spotify me ', response);
            }
        });
    }

    signOut() {
        this.token = false;
        this.images = [];
        this.user = {};
        localStorage.removeItem('spotify.token');
        window.location.href = "#";
    }

    getStringFromUrl(str) {
        var vars = [], hash;
        if(window.location.href.includes('access_token')) {
            var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            localStorage.setItem('spotify.token', vars[str]);
            return vars[str];
        }
        else {
            return 'undefined';
        }
    }


}