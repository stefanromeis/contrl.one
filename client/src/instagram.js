import {inject}     from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import config       from './services/authConfig';

@inject(HttpClient)
export class Instagram {

  constructor(http){
    // initialize
    this.http = http;
    this.active = false;
    this.user = {};
    this.imageCount = 10;
    this.images = [];
    this.image = {
      urlToImage : "undefined",
    };
    this.interactions = 0;
    this.tempInteractions = 0;
    this.updates = 0;
    this.firstLoad = true;
    this.api = config.providers.instagram.api;
    this.clientId = config.providers.instagram.clientId;
    this.token =  
                  localStorage.getItem('instagram.token') != null ? 
                  localStorage.getItem('instagram.token') : 
                  this.getStringFromUrl('access_token');

    if(this.token !== "undefined" && this.token != null) {
      this.signIn();
    } 

  }

  signIn() {
    let self = this;
    $.ajax({
      url: self.api +'/users/self',
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: self.token},
    }).done(function( data ) {
        self.user.username = data.data.username;
        self.user.fullname = data.data.fullname;
        self.user.profile_picture = data.data.profile_picture;
        self.user.website = data.website;
        self.user.media = data.data.counts.media;
        self.user.follows = data.data.counts.follows;
        self.user.followed_by = data.data.counts.followed_by
        self.getUserImages(data);
        setInterval(function(){
           self.getUserImages(data);
        }, 60000);
        
    });

    
  }

  getUserImages(data) {
    var self = this;
    $.ajax({
          url: self.api + '/users/self/media/recent/',
          dataType: 'jsonp',
          type: 'GET',
          data: {access_token: self.token, count: self.imageCount},
        }).done(function( data ) {
          self.interactions = 0;
          self.images = [];
          for(var x = 0; x < data.data.length; x++) {
            var image = {};
            image.urlToImage = data.data[x].images.low_resolution.url;
            image.comments = data.data[x].comments.count;
            image.likes = data.data[x].likes.count;

            self.interactions += image.comments + image.likes;

            image.link = data.data[x].link;
            self.images.push(image);
            self.loggedIn = true;

          }

          //check for updates
          if(self.firstLoad) {
            self.firstLoad = false;           
            self.tempInteractions = self.interactions;
          }
          else {
            if(self.tempInteractions != self.interactions) {
                self.updates = self.interactions - self.tempInteractions;
            }
          }

      });
  }

  signOut() {
    this.token = false;
    this.images = [];
    this.user = {};
    localStorage.removeItem('instagram.token');
    window.location.href = "#";
  }

  getStringFromUrl(str) {
    var vars = [], hash;
    if(window.location.href.includes('access_token')) {
      var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
      for(var i = 0; i < hashes.length; i++) {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
      if(vars[str].length < 80) {
          localStorage.setItem('instagram.token', vars[str]);
          return vars[str];
      }
    }
  }
  
}
