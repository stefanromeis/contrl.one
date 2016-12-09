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
          var bodyData = search('data', self.message);
         
          var html  = Base64.decode(bodyData);
          
          html = html.split('�', 1)
          //var html = Base64.decode(bodyData);
          html = html[0];
          console.log('1', html);

          // If you're going to use a different library other than js-base64,
          // you may need to replace some characters before passing it to the decoder.
          if(html.includes('</html>')) {
            //alert('ishtml');
            console.log('is html');
            //$('#message-content').html(html);
            //self.messageContent = html;
            var ifrm = $('#message-content')[0].contentWindow.document;
            $('body', ifrm).html(html);
          }
          else {
            alert('nohtml');
            console.log('no html');
            html = html.replace(/\r\n|\r|\n/g, '<br />')

            var ifrm = $('#message-content')[0].contentWindow.document;
            $('body', ifrm).html(html);
            //self.messageContent = html;
          }
          
          //console.log('html 2', html);
          //self.messageContent = html;
          //console.log(self.messageContent);
          //$('.message-content').html(html);
      }); 

      //deep first search
      let search = (needle, haystack, found = []) => {
        Object.keys(haystack).forEach((key) => {
          if(key === needle){
            found.push(haystack[key]);
            return found;
          }
          if(typeof haystack[key] === 'object'){
            search(needle, haystack[key], found);
          }
        });
        return found;
      };

    }


}



    