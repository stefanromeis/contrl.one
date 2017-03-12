import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Time} from './time'; 

@inject(HttpClient)
export class Header {
  
  lock = new Auth0Lock('bf0m39n56Z4GdBEdpXcgJJZD8927Cgj8', 'contrl.eu.auth0.com');
  isAuthenticated = false;
  
  constructor(http){
    
    this.http = http;
    this.TIME = new Time();
    this.date;
    this.time;
    var self = this;
    this.lock.on("authenticated", (authResult) => {
      self.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        self.isAuthenticated = true;
        self.lock.hide();
      });
    });

    this.attached();
  } 

  attached () {
    let self = this;
    setInterval(function(){
        self.time = self.TIME.time;
        self.date = self.TIME.date;
    }, 1000);
  }

  login() {
    this.lock.show();   
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.isAuthenticated = false;   
  }

  getSecretThing() {
    this.http.fetch('protected-route', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      }
    })
    .then(response => response.json())
    .then(data => this.secretThing = data.text);
  }
  
}



