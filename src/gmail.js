import {inject}     from 'aurelia-framework';
import {I18N}       from 'aurelia-i18n';
import 'js-base64';


@inject(Base64)
export class Gmail {
    constructor(Base64dal) {
        this.CLIENT_ID = '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com';
        this.SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'];
        this.API_KEY = ['AIzaSyDkNvkPgkC60vrb0OGvSwg12i0sjHANaYU'];
        this.authObj;
        this.data = undefined;
        this.labels = [];
        this.label = 'INBOX';
        this.connected = false;
        this.message = '';
        this.Base64 = Base64;
        console.log('bsae64: ', this.base64);
        this.messageContent = '...';

        this.content = {
            from: "from",
            subject: "sub",
            data: "MailContent",
            date: "date"
        };
        this.showModal = true;
    }

    attached () {
      this.data = gmailData;
      this.token = localStorage.getItem('gmail.token');

      if(this.data) {
        this.connected = true;
        $('.gmail-connect-btn').hide();
        this.getLabels(this.data);
        this.getMessages(this.label);
        this.getMessage(this.messages[0].id);
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
      $('.gmail-connect-btn').hide();
      return false;
    }
    
    getLabels(data) {
      if (this.data.labels.length > 0) {
        for (let i = 0; i < this.data.labels.length; i++) {
          let name = this.data.labels[i].name;
          if( name == 'INBOX' || name == 'SENT') {
            this.labels.push(this.data.labels[i].name);
          }
        }
      } else {
          console.log('No Labels available!');
      }
    }

    getMessages(label) {
      this.label = label;
      let self = this;
      $.ajax({
          url: 'https://www.googleapis.com/gmail/v1/users/me/messages?labelIds='+label,
          headers: { 'authorization': this.token }
      }).done(function( data ) {
          this.messages = data.messages;
          //console.log('messages', this.messages);
          self.getMessage(this.messages[0].id)
          //console.log('message id', this.messages[0].id);
      }); 
    }

    getMessage(id) {
      let self = this;
      $.ajax({
          url: 'https://www.googleapis.com/gmail/v1/users/me/messages/'+id,

          headers: { 'authorization': token }
      }).done(function( data ) {
          self.message = data;
          //console.log('snippet', self.message);
          if(self.message.payload.parts) {
            var bodyData = self.message.payload.parts[0].body.data;
          }
          else {
            var bodyData = self.message.payload.body.data;
          }
          // Simplified code: you'd need to check for multipart.

          var html = Base64.decode(bodyData).replace(/\r\n|\r|\n/g, '<br />').replace(/!important/g, ' ');
          // If you're going to use a different library other than js-base64,
          // you may need to replace some characters before passing it to the decoder.
          //console.log('html ', html.replace(/\r\n|\r|\n/g, '<br />'));
          self.content.data = html;
          console.log(self.content.data);
          //console.log(self.messageContent);
         // $('.message-content').html(html);
      }); 
    }
}



    