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

    }

    redirectToTwitterLoginPage () {
        oauth.getOAuthRequestToken(error,oauth_token, oauth_token_secret, results)
            .then(
                res.cookie('oauth_token', oauth_token, {httpOnly: true})
            )
            .catch(
                console.log('fail')
            );
        return;
    }

    search() {

    }

}