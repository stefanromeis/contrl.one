import {inject}         from 'aurelia-framework';
import {Config}         from 'services/config';
import oauth            from 'oauth';

@inject(Config, oauth)
export class Authentificator {
    constructor (Config, oauth) {
        this.Config = Config;
        this.oauth = oauth;
        console.log(Config.twitter.port);
        console.log('oauth' + oauth);

        this.tauth = new oauth.OAuth(
            Config.twitter.request_token_url,
            Config.twitter.access_token_url,
            Config.twitter.consumer_key,
            Config.twitter.consumer_secret,
            Config.twitter.oauth_version,
            Config.twitter.oauth_callback,
            Config.twitter.oauth_signature,
        );

        this.redirectToTwitterLoginPage();
        console.log(this.tauth);
    }

    redirectToTwitterLoginPage() {
        var self = this;
        return new Promise((resolve, reject) => {
            self.tauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
                console.log('error');
                if (error) {
                    console.log(error);
                    reject("Auth failed!" + new Error(msg));
                } else {
                    console.log('yeah');
                    resolve.cookie('oauth_token', oauth_token, {httpOnly: true});
                }
            });
        })
    }

}