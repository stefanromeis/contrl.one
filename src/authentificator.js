import {inject}         from 'aurelia-framework';
import {Config}         from 'config';

@inject(Config)
export class Authentificator {
    constructor (Config) {
        this.Config = Config;
        console.log(Config);
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
        $.ajax({url: "https://api.twitter.com/oauth/request_token", 
            error: function(error){
                console.log(error);
            },
            success: function(result){
                $("#div1").html(result);
                console.log('result');
            }
        });
    }

}