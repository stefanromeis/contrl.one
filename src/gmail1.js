import {inject}     from 'aurelia-framework';
import {I18N}       from 'aurelia-i18n';
import 'js-base64';


@inject(Base64)
export class Gmail {
    constructor(Base64) {
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
            console.log('labels - ', this.data.labels);
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
          console.log('messages', this.messages);
          self.getMessage(this.messages[0].id)
          console.log('message id', this.messages[0].id);
      }); 
    }

    getMessage(id) {
      let self = this;
      $.ajax({
          url: 'https://www.googleapis.com/gmail/v1/users/me/messages/'+id,
          headers: { 'authorization': token }
      }).done(function( data ) {
          self.message = data;
          console.log('snippet', self.message);
          //deep first search for data tag
  

          // If you're going to use a different library other than js-base64,
          // you may need to replace some characters before passing it to the decoder.
            alert('ishtml');
            console.log('is html');

            var ifrm = $('#message-content');
            $('body', ifrm).html(self.getBody(self.message.payload));
          
          
          
          //console.log('html 2', html);
          //self.messageContent = html;
          //console.log(self.messageContent);
          //$('.message-content').html(html);
      }); 

    }

    getBody(message) {
        var encodedBody = '';
        if(typeof message.parts === 'undefined')
        {
          encodedBody = message.body.data;
        }
        else
        {
          encodedBody = this.getHTMLPart(message.parts);
        }
        encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
        return decodeURIComponent(escape(window.atob(encodedBody)));
      }

      getHTMLPart(arr) {
        for(var x = 0; x <= arr.length; x++)
        {
          if(typeof arr[x].parts === 'undefined')
          {
            if(arr[x].mimeType === 'text/html')
            {
              return arr[x].body.data;
            }
          }
          else
          {
            return getHTMLPart(arr[x].parts);
          }
        }
        return '';
      }


}



    