import {inject}         from 'aurelia-framework';
import {I18N}           from 'aurelia-i18n';


@inject()

export class Gmail {
    constructor() {
        this.CLIENT_ID = '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com';
        this.SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'];
        this.API_KEY = ['AIzaSyDkNvkPgkC60vrb0OGvSwg12i0sjHANaYU'];
        this.authObj;
        this.data = undefined;
        this.labels = [];
        this.label = 'INBOX';
        this.connected = false;
        this.message = '';
        this.messages = '';
        this.content = "undefined";
        this.counter = 0;
        this.mails = [];
        this.content = "undefined";
    }

    attached() {
      this.data = gmailData;
      this.token = localStorage.getItem('gmail.token');
      

      if(this.data) {
        
        this.connected = true;
        $('.gmail-connect-btn').hide();
        this.getLabels(this.data);
        this.getMessages(this.label);
        this.getMessage();
        
      }
      else {
        location.reload()
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
      $('.modal').show();
      this.mails = [];
      this.label = label;
      let self = this;
      $.ajax({
          url: 'https://www.googleapis.com/gmail/v1/users/me/messages?labelIds='+label,
          headers: { 'authorization': this.token },
      }).done(function( data ) {
          self.messages = data.messages;
          self.counter = 0;
          self.getMessage(self.messages);
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

          self.message = data;
          //self.content = self.getBody(self.message.payload);

          var mail = {};

          mail.content = data.payload;
          //self.content = self.getBody(self.message.payload);
          //console.log('con ', self.message.payload);

          mail.id = id;
          mail.from = self.getHeader(self.message.payload.headers, 'From')
          mail.subject = self.getHeader(self.message.payload.headers, 'Subject')
          mail.date = self.getHeader(self.message.payload.headers, 'Date')

          self.mails.push(mail);
          //console.log(self.mails);
          //self.appendMessageRow(self.message)
          self.counter++;

          //var ifrm = $('#message-content')[0].contentWindow.document;
          //$('body', ifrm).html(self.getBody(data.payload));
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

    appendMessageRow(message) {
      $('.table-inbox tbody').append(
          '<tr>\
            <td>'+this.getHeader(message.payload.headers, 'From')+'</td>\
            <td>\
              <a click.delegate="this.openModal('+message.id+')" data-toggle="modal">' + this.getHeader(message.payload.headers, 'Subject') + '\
              </a>\
            </td>\
            <td>'+this.getHeader(message.payload.headers, 'Date')+'</td>\
          </tr>'
        );
    }

    openModal(id) {

      console.log('mails ', this.mails);

      var result = $.grep(this.mails, function(e){ return e.id == id; });

      console.log('res ', result);

      var ifrm = $('#message-content')[0].contentWindow.document;
      $('body', ifrm).html(this.getBody(result[0].content));

      
      $('.fade')
        .attr('style', 'display: block !important; opacity: 0;')
        .animate({opacity: 1});
      $('.mod').attr('style','display:flex !important');

    }
    closeModal() {
      $('.fade')
        .attr('style', 'display: none !important; opacity: 1;')
        .animate({opacity: 0});
      $('.mod').attr('style','display:none !important');
    }

} 