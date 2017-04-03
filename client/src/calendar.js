import {DialogService}  from 'aurelia-dialog';
import {inject}         from 'aurelia-framework';
import {I18N}           from 'aurelia-i18n';
import {Prompt}         from 'prompt';

@inject(DialogService)
export class Calendar {
    constructor (DialogService) {
        this.dialogService = DialogService;
        this.SCOPES = ['https://mail.google.com/', 
                        'https://www.googleapis.com/auth/calendar'];
        this.CLIENT_ID = '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com';
        this.token = localStorage.getItem('google.token') || 'undefined';
        this.connected = false;
        this.isLoading = false;
        this.calData = [];
        this.notifications = 0;
        this.count = "";
        this.modalOpen = false;
      
    }
    
    attached () {
        let self = this;
        if(this.token !== "undefined") {
            this.connected = true;

            this.getCalendarList();
            setInterval(function(){
                self.getCalendarList();
            }, 20000);
        }

        //this.createEntry();
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
            headers: { 'authorization': self.token },
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
        }).fail(function() {
            console.log('Could not load calendar list.');
            self.connected = false;
        });
    }

    openModal() {
        this.modalOpen = true;
    }

    closeModal() {
        this.modalOpen = false;
    }

    createEntry () {
        let self = this;
        let sDate = this.startDate.split(".");
        let eDate = this.endDate.split(".");

        let startDate = sDate[2]+'-'+sDate[1]+'-'+sDate[0]+'T'+this.startTime+':00+01:00';
        let endDate = eDate[2]+'-'+eDate[1]+'-'+eDate[0]+'T'+this.endTime+':00+01:00';
        
        console.log('startDate', startDate);
        console.log('endDate', endDate);
        //let date = "2015-05-28T17:00:00-07:00";

        let data = {
            "summary": this.summary,
            "location": this.location,
            "description": this.description,
            "start": {
                "dateTime": startDate
            },
            "end": {
                "dateTime": endDate 
            }
        };

        $.ajax({
            type: "POST",
            url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: { 'authorization': self.token },
        }).done(function( data ) {
            console.log(data);
            self.modalOpen = false;
            self.openDialog();
        }).fail(function(err) {
            console.log(err);
        });
    }

    openDialog() {
      this.dialogService.open({viewModel: Prompt, model: 'Creating new entry in calendar successful.' }).then(response => {
          console.log(response);
      
          if (!response.wasCancelled) {
            console.log('OK');
          } else {
            console.log('cancelled');
          }
          console.log(response.output);
      });
    }

}
    
