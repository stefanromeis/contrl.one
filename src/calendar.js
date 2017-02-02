import {inject}       from 'aurelia-framework';
import {I18N}         from 'aurelia-i18n';

var jQ = $;

export class Calendar {
    constructor () {
      this.SCOPES = ['https://mail.google.com/', 
                    'https://www.googleapis.com/auth/calendar.readonly'];
      this.CLIENT_ID = '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com';
      this.token = localStorage.getItem('google.token') || 'undefined';
      this.connected = false;
      this.isLoading = false;
      this.calData = [];
      this.notifications = 0;
      this.count = "";
    }
    
    attached () {
        let self = this;
        if(this.token !== "undefined") {
            this.connected = true;

            this.getCalendarList();
            setInterval(function(){
                self.getCalendarList();
            }, 3000);
        }
    }
         
    connect() {
      gapi.auth.authorize(
          {
          client_id: this.CLIENT_ID, 
          scope: this.SCOPES.join(' '),
          immediate: false
          },
        this.handleAuthResult); 
    }

    getCalendarList() {
        let self = this;
        $.ajax({
            url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&singleEvents=true',
            headers: { 'authorization': this.token },
        }).done(function( data ) {
            self.calData = [];
            for(var x = 0; x < data.items.length; x++) {
                let cData = {};
                cData.summary = data.items[x].summary;
                cData.creator = data.items[x].creator.displayName;
                cData.htmlLink = data.items[x].htmlLink;
                cData.id = data.items[x].id;
                if(data.items[x].start.dateTime) {
                    cData.start = data.items[x].start.dateTime.split(/-|T/);
                }
                if(data.items[x].start.date) {
                    cData.start = data.items[x].start.date.split(/-|T/);
                }
                self.calData.push(cData);
            }
            let count = self.calData.length;
            if(count > self.count && self.count != "") {
                console.log('yop');
                self.notifications = self.notifications + count - self.count;
                self.count = count;
            }
            else {
                console.log('yep');
                self.count = count;
            }
            self.connected = true;
        }).fail(function() {
            self.connected = false;
        });
    }
}
    
