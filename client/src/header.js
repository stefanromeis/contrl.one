import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { I18N } from 'aurelia-i18n';
import { Time } from './time';
import config from './services/authConfig';

@inject(HttpClient, I18N)
export class Header {

  lock = new Auth0Lock(config.providers.auth0.clientId, config.providers.auth0.domain);
  isAuthenticated = false;

  constructor(http, I18N) {

    this.http = http;
    this.i18n = I18N;
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
    this.lang = this.i18n.getLocale();
    this.attached();
  }

  attached() {
    let self = this;
    setInterval(function () {
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

  switchLanguage(lang) {
    localStorage.setItem('appLanguage', lang);
    location.reload();
  }
}



