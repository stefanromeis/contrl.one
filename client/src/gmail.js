import { DialogService } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { Prompt } from 'prompt';
import config from './services/authConfig';

@inject(DialogService)

export class Gmail {
  constructor(DialogService) {
    this.dialogService = DialogService;
    this.clientId = config.providers.google.clientId;
    this.scopes = config.providers.google.scopes;
    this.api = config.providers.google.api;
    this.labels = [];
    this.label = 'INBOX';
    this.connected = false;
    this.isLoading = false;
    this.message = '';
    this.messages = '';
    this.counter = 0;
    this.mails = [];
    this.unreadMessages = 0;
    this.content = "undefined";
    this.token = localStorage.getItem('google.token') || 'undefined';
    this.data = 'undefined';

    this.modalMessage = {
      subject: "",
      from: "",
      date: ""
    };
    this.showReplyMod = true;
    if (this.token !== "undefined") {
      this.init();
    }

  }

  init() {
    let self = this;
    this.requestGmailData(self.api.get + '/users/me/labels');
    /*if(this.data !== 'undefined' && this.data.labels !== 'undefined') {
      setInterval(function(){
          self.getUnreadMessages();
      }, 10000);
      this.getLabels(this.data);
      this.getMessages(this.label);
    //}
    //else {
      //localStorage.removeItem('google.token');
      //location.reload();
    }*/

  }

  connect() {
    let self = this;
    gapi.auth.authorize(
      {
        client_id: self.clientId,
        scope: self.scopes.join(' '),
        immediate: false
      },
      handleAuthResult);
  }

  logout() {
    localStorage.removeItem('google.token');

    $('<iframe>', {
      src: 'https://accounts.google.com/logout',
      id: 'myFrame',
      frameborder: 0,
      scrolling: 'no'
    })
      .appendTo('body');

    setTimeout(location.reload(), 5000);
  }

  requestGmailData(url) {
    let self = this;
    $.ajax({
      url: url,
      headers: { 'authorization': self.token }
    }).done(function (data) {
      self.data = data;
      setInterval(function () {
        self.getUnreadMessages();
      }, 15000);
      self.getLabels(self.data);
      self.getMessages(self.label);
    })
      .fail(function () {
        self.connected = false;
      })
  }

  getLabels(data) {
    this.getUnreadMessages();
    if (this.data.labels.length > 0) {
      for (let i = 0; i < this.data.labels.length; i++) {
        let name = this.data.labels[i].name;
        if (name == 'INBOX' || name == 'SENT') {
          this.labels.push(this.data.labels[i].name);
        }
      }
    } else {
      console.log('No Labels available!');
    }
  }

  getMessages(label) {
    this.mails = [];
    this.label = label;
    this.counter = 0;

    let self = this;

    $.ajax({
      url: self.api.get + '/users/me/messages?labelIds=' + label,
      headers: { 'authorization': this.token },
    }).done(function (data) {
      self.messages = data.messages;
      self.getMessage(self.messages);
      $('.gmail-connect-btn').hide();
      self.connected = true;
    }).fail(function () {
      self.connected = false;
    });
  }


  getMessage(messages) {
    this.isLoading = true;
    let self = this;

    if (!messages[self.counter] || self.counter >= 10) {
      this.isLoading = false;
      return;
    }
    let id = messages[self.counter].id;
    self.counter++;

    $.ajax({
      url: self.api.get + '/users/me/messages/' + id,
      headers: { 'authorization': token }
    }).done(function (data) {
      var mail = {};
      mail.content = data.payload;
      mail.id = id;
      mail.from = self.getHeader(data.payload.headers, 'From').split('<')[0].replace(/"/g, '');
      mail.mailAdress = self.getHeader(data.payload.headers, 'From').split('<')[1].replace('>', '');
      mail.subject = self.getHeader(data.payload.headers, 'Subject');
      mail.date = self.getHeader(data.payload.headers, 'Date');
      mail.unread = $.inArray('UNREAD', data.labelIds) > -1;
      //console.log(mail.id + ' is ' + mail.unread);
      self.mails.push(mail);
      self.getMessage(messages);

    });

  }

  getHeader(headers, index) {
    var header = '';
    $.each(headers, function () {
      if (this.name === index) {
        header = this.value;
      }
    });
    return header;
  }

  getBody(message) {
    var encodedBody = 'Sorry, no content available...';
    if (typeof message.parts === 'undefined') {
      encodedBody = message.body.data;
    }
    else {
      encodedBody = this.getHTMLPart(message.parts);
    }
    encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    return decodeURIComponent(escape(window.atob(encodedBody)));
  }

  getHTMLPart(arr) {
    for (let x = 0; x < arr.length; x++) {
      if (typeof arr[x].parts === "undefined") {
        if (arr[x].mimeType === 'text/html') {
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

    var result = $.grep(this.mails, function (e) { return e.id == id; });

    this.modalMessage.subject = result[0].subject;
    this.modalMessage.from = result[0].from;
    this.modalMessage.date = result[0].date;
    this.modalMessage.mailAdress = result[0].mailAdress;

    var ifrm = $('#message-content')[0].contentWindow.document;
    $('body', ifrm).html(this.getBody(result[0].content));

    $('.fade')
      .attr('style', 'display: block !important; opacity: 0;')
      .animate({ opacity: 1 });
    $('.mod').attr('style', 'display:flex !important');

    this.setMessageAsRead(id);
  }

  closeModal() {

    $('.mod, .reply-mod').attr('style', 'display:none !important');
    var ifrm = $('#message-content')[0].contentWindow.document;
    $('body', ifrm).animate({
      scrollTop: 0
    }, 600);
  }

  reply() {

    var from = this.modalMessage.from;
    if (from.includes("<")) {
      from = from.substring(from.lastIndexOf("<") + 1, from.lastIndexOf(">"));
    }
    this.modalMessage.mailadress = this.modalMessage.mailAdress;
    this.modalMessage.subject = 'Re: ' + this.modalMessage.subject;

    $('.mod').attr('style', 'display:none !important');
    $('.reply-mod').attr('style', 'display:flex !important');

  }

  send() {

    let self = this;

    var mail = 'MIME-Version: 1.0\r\n' +
      'To: ' + $('#compose-to').val() + '\r\n' +
      'Subject: ' + $('#compose-subject').val() + '\r\n\r\n' +
      '' + $('#compose-message').val() + '\r\n\r\n';

    $.ajax({
      type: "POST",
      url: self.api.post + '/users/me/messages/send',
      headers: {
        'Authorization': this.token,
        'Content-Type': 'message/rfc822',
      },
      data: mail
    }).done(function () {
      self.openDialog();
    })
      .fail(function () {
        console.log('Error Sending Email');
      });

    $('.mod, .reply-mod').attr('style', 'display:none !important');

  }

  writeMail() {
    this.modalMessage = {
      subject: "",
      from: "",
      date: ""
    };
    $('.reply-mod').attr('style', 'display:flex !important');
  }

  openDialog() {
    this.dialogService.open({ viewModel: Prompt, model: 'Email successfully send.' }).then(response => {
      console.log(response);

      if (!response.wasCancelled) {
        console.log('OK');
      } else {
        console.log('cancelled');
      }
      console.log(response.output);
    });
  }

  getUnreadMessages() {
    let self = this;

    $.ajax({
      url: self.api.get + '/users/me/labels/INBOX',
      headers: { 'authorization': this.token },
    }).done(function (data) {
      if (self.unreadMessages != data.messagesUnread) {
        self.unreadMessages = data.messagesUnread;
        self.getMessages(self.label);
      }
    });
  }

  setMessageAsRead(id) {
    let self = this;

    var result = $.grep(this.mails, function (e) { return e.id == id; });
    if (result[0].unread) {
      result[0].unread = false;

      $.ajax({
        type: 'POST',
        dataType: 'json',
        headers: {
          'authorization': token,
          "Content-Type": "application/json"
        },
        url: self.api.get + '/users/me/messages/' + id + '/modify',
        data: JSON.stringify({ "removeLabelIds": ["UNREAD"] })
      })
        .done(function (data) {
          self.unreadMessages--;
        })
        .fail(function () {
          // when the Deferred is rejected.
          console.log('Setting mail as read failed!');
        })
    }

  }
}
