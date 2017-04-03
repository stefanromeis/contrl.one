import {DialogService}  from 'aurelia-dialog';
import {inject}         from 'aurelia-framework';
import {I18N}           from 'aurelia-i18n';
import {Prompt}         from 'prompt';

@inject(DialogService)

export class Facebook {
    constructor (dialogService) {
        this.dialogService = dialogService;
        this.active = false;
        this.connected = false;
        this.isLoading = true;

        this.message = '';
        this.place = '';
        this.link = '';
        this.description = '';
        this.picture = '';
        this.name = '';

        this.post = {
            name: "",
            place: "",
            date: ""
        }
        
        this.feed = [];
        this.feed_post = "";
        this.modal = false;
        this.notifications = 0;
        this.notificationIds = [];  
        let self = this;

        window.fbAsyncInit = function() {
            FB.init({
              appId      : '672920632846289',
              xfbml      : true,
              cookie     : true,
              status     : true, 
              version    : 'v2.6'
            });
            
            FB.getLoginStatus(function (response) {
                if(response.status === 'connected') {
                    //console.log("Facebook Status: OK");
                    self.connect();
                }
                else if(response.status === 'not_authorized') {
                    console.log("Facebook Status: not authorized");
                }
                else {
                    console.log("Facebook Status: connection failed", response);
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
        let self = this;
        FB.login(function (response) {
            if(response.status === 'connected') {
                //console.log("We are connected to FB."); 
                self.connected = true;            
                self.getInfo();
                self.getFeed();
                setInterval(function(){
                    self.getFeed();
                }, 20000);

            }
            else if(response.status === 'not_authorized') {
                console.log("Not authorized.");
            }
            else {
                console.log("You are not logged into facebook.");
            }
        }, {scope: 'email'});
    }


    logout() {
        this.isLoading = true;
        let self = this;
        FB.logout(function(response) {
            if (response && !response.error) {
                self.connected = false;
                self.isLoading = false;
                self.feed = [];
            }
            else {
                console.log('Facebook logout failed.');
                self.isLoading = false;
            }
        });
    }


    getInfo() {
        FB.api('me', 'GET', {fields: 'name, first_name, last_name, age_range, link, gender, locale, picture, timezone, updated_time, email'}
        , function(response){
            document.getElementById('name').innerHTML = response.first_name;
            document.getElementById('profile-img').src = "http://graph.facebook.com/" + response.id + "/picture";
        })
    }

    getFeed () {
        this.isLoading = true;
        let self = this;
        FB.api(
        "me/posts?fields=caption,link,name,message,description,shares,updated_time,from,story,comments,reactions,place,full_picture",
            function (response) {
                if (response && !response.error) {
                    //console.log('res ', response);
                    let tempFeed = [];
                    for(var x = 0; x < response.data.length; x++) {
                        let post = {};
                        post.id = response.data[x].id;
                        post.author = response.data[x].from.name;
                        post.date = response.data[x].updated_time.split(/-|T/);
                        if(response.data[x].place) {
                            post.place = response.data[x].place.name;
                        }                        
                        if(response.data[x].full_picture) {
                            post.picture = response.data[x].full_picture;
                        }
                        post.link = response.data[x].link;
                        post.message = response.data[x].message;
                        post.story = response.data[x].story;
                        post.discription = response.data[x].description;
                        if(response.data[x].reactions) {
                            post.reactions = response.data[x].reactions.data.length;
                        }                           
                        if(response.data[x].comments) {
                            post.comments = response.data[x].comments.data.length;
                        }

                        tempFeed.push(post);

                    }
                    if(self.feed.length > 0 ) {
                        if(self.feed[0].id != tempFeed[0].id) {
                            console.log('ye');
                            for(var x = 1; x < tempFeed.length; x++) {
                                if(self.feed[0].id == tempFeed[x].id ) {
                                    self.notifications = self.notifications + x;
                                    console.log(self.notifications);
                                    for(let i = 0; i < x; i++) {
                                        self.notificationIds.push(tempFeed[i].id);
                                        console.log('ids ', self.notificationIds);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    self.feed = tempFeed;

                    self.isLoading = false;
                }
                else {
                    console.log('could not load fb feed ', response.error);
                    self.isLoading = false;
                }
            }
        );
    }

    openModal(bool) {
        this.modalOpen = bool;
    }

    openDialog(model) {
      this.dialogService.open({viewModel: Prompt, model: model }).then(response => {
          if (!response.wasCancelled) {
            console.log('OK');
          } else {
            console.log('cancelled');
          }
          console.log(response.output);
      });
    }

    postOnWall() {
        let self = this;
        FB.api(
            '/me/feed', 'post', {
                message: self.message,
                place: self.place,
                link: self.link,
                description: self.description,
                picture: self.picture,
                name: self.name
        },function(response) {
            if (response && !response.error) {
                self.modalOpen = false;
                self.getFeed();
                self.openDialog('Post on wall successful.');
            }
            else {
                self.openDialog('Post on wall failed. You have to provide a message at least.');
            }
        });
    }

    deletePost(id) {
        let self = this;
        console.log(id);
        FB.api(
            "/"+id+"",
            "DELETE",
            function (response) {
                if (response && !response.error) {
                    self.setNotification(id);
                    self.getFeed();
                }
                if(response.error) {
                    console.log('delete ', response);
                }
            }
        );
    }

    openNewTab(url, id) {
        //console.log('url', url);
        //console.log('id', id);
        if(url != undefined) {
            let win = window.open(url, '_blank');
            win.focus();
        }

        this.setNotification(id);
    }

    setNotification(id) {
        if($.inArray(id, this.notificationIds) > -1) {
            this.notifications = this.notifications - 1;
            this.notificationIds.splice( $.inArray(id, this.notificationIds), 1 );
        }
    }
    
}


          