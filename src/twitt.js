import {inject}         from 'aurelia-framework';
import * as auth        from 'authentificator';
 
@inject(auth)
export class Twitt {
    constructor (auth) {
        this.auth = auth;
        console.log(this.auth);
    }
    search(auth) {
        $.ajax({url: "https://api.twitter.com/oauth/request_token", 
            error: function(error){
                console.log(error);
            },
            success: function(result){
                //$("#div1").html(result);
                console.log('result');
            }
        });
    }

}