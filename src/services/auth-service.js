// src/auth-service.js

// Import Auth0
import Auth0 from 'auth0';

export class AuthService {
  constructor() {
    // Initialize Auth0
    this.auth0 = new Auth0({
      domain:       'contrl.eu.auth0.com',
      clientID:     'bf0m39n56Z4GdBEdpXcgJJZD8927Cgj8',
      callbackURL:  'http://localhost:9000/#/',
      callbackOnLocationHash: true
    });
}

  signin() {
    //Keep a copy of 'original' this
    const _this = this;
    // Login with IG
    this.auth0.login({
      connection: 'instagram',
      popup: true
    },
    function(err, profile) {
      if (err) {
        alert("something went wrong: " + err.message);
        return;
      }
      // Use ID token to get Instagram user profile
      _this.auth0.getProfile(profile.idToken, function (err, profile) {
        if(err) {
          alert(err);
          return;
        }
        localStorage.setItem('token', profile.identities[0].access_token);
      });
    });
  }

  signout() {
    localStorage.removeItem('token');
  }

}