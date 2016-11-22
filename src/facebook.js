import {inject}        from 'aurelia-framework';
import {I18N}          from 'aurelia-i18n';

export class Facebook {
    constructor () {
        this.feed_post = "";
//      Initialize and setup facebook js sdk
        window.fbAsyncInit = function() {
            FB.init({
              appId      : '672920632846289',
              xfbml      : true,
              version    : 'v2.6'
            });
            
            FB.getLoginStatus(function (response) {
                if(response.status === 'connected') {
                    //console.log("Facebook Status: OK");
                    connect();
                }
                else if(response.status === 'not_authorized') {
                    console.log("Facebook Status: not authorized");
                }
                else {
                    console.log("Facebook Status: connection failed");
                }
            });
        };
        
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
//            js.src = "//connect.facebook.net/en_US/sdk.js";
            js.src = "http://connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
    }

    connect() {
        FB.login(function (response) {
            if(response.status === 'connected') {
                console.log("We are connected to FB.");                
                getInfo();
                $('.facebook-connect-btn').hide();
            }
            else if(response.status === 'not_authorized') {
                console.log("We are not loggin in.");
            }
            else {
                console.log("You are not logged into facebook.");
            }
        }, {scope: 'email'});
    }


    logout() {
        FB.logout(function(response) {
            document.getElementById('status').innerHTML = "You are not logged into facebook.";
        });
    }

    post() {
        console.log("post");
        FB.api('me/feed', 'post', {message: 'test...'}, function(response){
            document.getElementById('feed_post').innerHTML = response.error;
            console.log(response);
        });
    }

    shareLink() {
        FB.api('me/feed', 'post', {link: 'http://virtual-elements.de'}, function(response){
            document.getElementById('status').innerHTML = response.id;
        });
    }
            
} 

    function connect() {
        FB.login(function (response) {
            if(response.status === 'connected') {
                console.log("We are connected to FB.");                
                getInfo();
                $('.facebook-connect-btn').hide();
            }
            else if(response.status === 'not_authorized') {
                console.log("We are not loggin in.");
            }
            else {
                console.log("You are not logged into facebook.");
            }
        }, {scope: 'email'});
    }
    
    function getInfo() {
        FB.api('me', 'GET', {fields: 'name, first_name, last_name, age_range, link, gender, locale, picture, timezone, updated_time, email'}
        , function(response){
//            document.getElementById('status').innerHTML = response.first_name;
//            document.getElementById('status').innerHTML += " - " + response.last_name;
//            document.getElementById('status').innerHTML += " - " + response.email;
//            document.getElementById('status').innerHTML += " - " + response.name;
//            document.getElementById('status').innerHTML += " - " + response.id;
            document.getElementById('name').innerHTML = response.name;
            document.getElementById('profile-img').src = "http://graph.facebook.com/" + response.id + "/picture";

        })
    }