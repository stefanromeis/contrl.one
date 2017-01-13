import {DialogService}  from 'aurelia-dialog';
import {inject}         from 'aurelia-framework';
import {I18N}           from 'aurelia-i18n';
import {Prompt}         from 'prompt';

@inject(DialogService)

export class Gmail {
    constructor(dialogService) {
        this.dialogService = dialogService;
        this.CLIENT_ID = '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com';
        this.SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'];
        this.API_KEY = ['AIzaSyDkNvkPgkC60vrb0OGvSwg12i0sjHANaYU'];
        this.labels = [];
        this.label = 'INBOX';
        this.connected = false;
        this.message = '';
        this.messages = '';
        this.counter = 0;
        this.mails = [];
        this.content = "undefined";
        this.token = localStorage.getItem('gmail.token') || 'undefined';
        console.log(this.token);
        console.log(gmailData);
        this.data = gmailData;
        this.modalMessage = {
          subject: "",
          from: "",
          date: ""
       };
       this.showReplyMod = true;
       if(this.token !== 'undefined') {
          this.attached(); 
       }
    }

    attached () {
      if(this.data !== 'undefined' && this.data.labels !== 'undefined') {
        this.connected = true;
        this.getLabels(this.data);
        this.getMessages(this.label);
      }
      else {
        location.reload();
      }     
    }

    connect() {
      gapi.auth.authorize(
          {
          client_id: this.CLIENT_ID, 
          scope: this.SCOPES.join(' '),
          immediate: false
          },
        handleAuthResult); 
    }
    
    getLabels(data) {
      if (this.data.labels.length > 0) {
        for (let i = 0; i < this.data.labels.length; i++) {
          let name = this.data.labels[i].name;
          if( name == 'INBOX' || name == 'SENT') {
            //console.log('labels - ', this.data.labels);
            this.labels.push(this.data.labels[i].name);
          }
        }
      } else {
          console.log('No Labels available!');
      }
    }

    getMessages(label) {
      //$('.table-inbox tbody').empty();
      console.log('ask for it');
      this.mails = [];
      this.label = label;
      let self = this;
      this.counter = 0;
      $.ajax({
          url: 'https://www.googleapis.com/gmail/v1/users/me/messages?labelIds='+label,
          headers: { 'authorization': this.token },
      }).done(function( data ) {
          self.messages = data.messages;
          self.getMessage(self.messages);
          $('.gmail-connect-btn').hide();
          console.log('get it');
      });
    }


    getMessage(messages) {
      let self = this;
      if (!self.messages[self.counter] || self.counter >= 10) {
          return;
      }

      let id = messages[self.counter].id;

      $.ajax({
          url: 'https://www.googleapis.com/gmail/v1/users/me/messages/'+id,
          headers: { 'authorization': token }
      }).done(function( data ) {

          var mail = {};
          mail.content = data.payload;
          mail.id = id;
          mail.from = self.getHeader(data.payload.headers, 'From')
          mail.subject = self.getHeader(data.payload.headers, 'Subject')
          mail.date = self.getHeader(data.payload.headers, 'Date')

          self.mails.push(mail);
          self.counter++;
          self.getMessage(messages);
      }); 

    }

    getHeader(headers, index) {
      var header = '';
      $.each(headers, function(){
        if(this.name === index){
          header = this.value;
        }
      });
      return header;
    }

    getBody(message) {
        var encodedBody = '';
        if(typeof message.parts === 'undefined') {
          encodedBody = message.body.data;
        }
        else {
          encodedBody = this.getHTMLPart(message.parts);
        }
        encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
        return decodeURIComponent(escape(window.atob(encodedBody)));
    }
      
    getHTMLPart(arr) {
        for(let x = 0; x <= arr.length; x++) {
          if(typeof arr[x].parts === "undefined") {
            if(arr[x].mimeType === 'text/html') {
              return arr[x].body.data;
            }
          }
          else {
            return this.getHTMLPart(arr[x].parts);
          }
        }
        return '';
    }

    openMessage(id) {

      var result = $.grep(this.mails, function(e){ return e.id == id; });

      this.modalMessage.subject = result[0].subject;
      console.log(this.modalMessage.subject);
      this.modalMessage.from = result[0].from;
      this.modalMessage.date = result[0].date;

      var ifrm = $('#message-content')[0].contentWindow.document;
      $('body', ifrm).html(this.getBody(result[0].content));
      
      $('.fade')
        .attr('style', 'display: block !important; opacity: 0;')
        .animate({opacity: 1});
      $('.mod').attr('style','display:flex !important');

    }

    closeModal() {
      $('.mod, .reply-mod').attr('style','display:none !important');
      var ifrm = $('#message-content')[0].contentWindow.document;
      $('body', ifrm).animate({
        scrollTop: 0
      }, 600);
    }

    reply() {

      var from = this.modalMessage.from;
      if(from.includes("<")) {
        from = from.substring(from.lastIndexOf("<")+1,from.lastIndexOf(">"));
      }
      this.modalMessage.mailadress = from;
      this.modalMessage.subject = 'Re: ' + this.modalMessage.subject;

      $('.mod').attr('style','display:none !important');
      $('.reply-mod').attr('style','display:flex !important');

    }

    send () {

      let self = this;

      var mail =  'MIME-Version: 1.0\r\n'+
                  'To: '+$('#compose-to').val()+'\r\n'+
                  'Subject: '+$('#compose-subject').val()+'\r\n\r\n'+

                  ''+$('#compose-message').val()+'\r\n\r\n';

      $.ajax({
        type: "POST",
        url: "https://www.googleapis.com/upload/gmail/v1/users/me/messages/send",
        headers: {
          'Authorization': this.token,
          'Content-Type': 'message/rfc822',
        },
        data: mail

      }).done(function() {  
        self.openModal();
      })
      .fail(function() {
        console.log('Error Sending Email');
      });

      $('.mod, .reply-mod').attr('style','display:none !important');

    }

    writeMail () {
      this.modalMessage = {
        subject: "",
        from: "",
        date: ""
      };
      $('.reply-mod').attr('style','display:flex !important');
    }

    openModal() {
      this.dialogService.open({viewModel: Prompt, model: 'Email successfully send.' }).then(response => {
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
