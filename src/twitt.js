import {inject}             from 'aurelia-framework';
import {Authentificator}    from 'services/authentificator';
 
@inject(Authentificator)
export class Twitt {
    constructor (Authentificator) {
        this.Authentificator = Authentificator;
        console.log(this.Authentificator);
    }
    search() {
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