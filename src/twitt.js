import {inject}         from 'aurelia-framework';
//import {twitterFetcher} from 'services/twitterFetcher2';

 
//@inject(twitterFetcher)
export class Twitt {

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