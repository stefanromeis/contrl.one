'use strict';

System.register(['aurelia-dialog', 'aurelia-framework', 'aurelia-i18n', 'prompt'], function (_export, _context) {
  "use strict";

  var DialogService, inject, I18N, Prompt, _dec, _class, Gmail, accessToken, config;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function getUserInfo() {
    $.ajax({
      url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + accessToken,
      data: null,
      success: function success(response) {
        console.log('We have gotten info back....');
        console.log(response);
        $('#user').html(response.name);
      },
      dataType: "jsonp"
    });
  }
  return {
    setters: [function (_aureliaDialog) {
      DialogService = _aureliaDialog.DialogService;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaI18n) {
      I18N = _aureliaI18n.I18N;
    }, function (_prompt) {
      Prompt = _prompt.Prompt;
    }],
    execute: function () {
      _export('Gmail', Gmail = (_dec = inject(DialogService), _dec(_class = function () {
        function Gmail(dialogService) {
          _classCallCheck(this, Gmail);

          this.dialogService = dialogService;
          this.CLIENT_ID = '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com';
          this.SCOPES = ['https://mail.google.com/'];
          this.API_KEY = ['AIzaSyDkNvkPgkC60vrb0OGvSwg12i0sjHANaYU'];
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
          this.token = localStorage.getItem('gmail.token') || 'undefined';
          this.data = gmailData || 'undefined';
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

        Gmail.prototype.init = function init() {

          var self = this;
          if (this.data !== 'undefined' && this.data.labels !== 'undefined') {
            this.connected = true;
            setInterval(function () {
              self.getUnreadMessages();
            }, 10000);
            this.getLabels(this.data);
            this.getMessages(this.label);
          } else {
            location.reload();
          }
        };

        Gmail.prototype.connect = function connect() {
          gapi.auth.authorize({
            client_id: this.CLIENT_ID,
            scope: this.SCOPES.join(' '),
            immediate: false
          }, handleAuthResult);
        };

        Gmail.prototype.getLabels = function getLabels(data) {
          this.getUnreadMessages();
          if (this.data.labels.length > 0) {
            for (var i = 0; i < this.data.labels.length; i++) {
              var name = this.data.labels[i].name;
              if (name == 'INBOX' || name == 'SENT') {
                this.labels.push(this.data.labels[i].name);
              }
            }
          } else {
            console.log('No Labels available!');
          }
        };

        Gmail.prototype.getMessages = function getMessages(label) {
          this.mails = [];
          this.label = label;
          this.counter = 0;

          var self = this;

          $.ajax({
            url: 'https://www.googleapis.com/gmail/v1/users/me/messages?labelIds=' + label,
            headers: { 'authorization': this.token }
          }).done(function (data) {
            self.messages = data.messages;
            self.getMessage(self.messages);
            $('.gmail-connect-btn').hide();
          });
        };

        Gmail.prototype.getMessage = function getMessage(messages) {
          this.isLoading = true;
          var self = this;

          if (!self.messages[self.counter] || self.counter >= 10) {
            this.isLoading = false;
            return;
          }
          var id = messages[self.counter].id;

          $.ajax({
            url: 'https://www.googleapis.com/gmail/v1/users/me/messages/' + id,
            headers: { 'authorization': token }
          }).done(function (data) {

            var mail = {};
            mail.content = data.payload;
            mail.id = id;
            mail.from = self.getHeader(data.payload.headers, 'From');
            mail.subject = self.getHeader(data.payload.headers, 'Subject');
            mail.date = self.getHeader(data.payload.headers, 'Date');
            mail.unread = $.inArray('UNREAD', data.labelIds) > -1;
            self.mails.push(mail);
            self.counter++;
            self.getMessage(messages);
          });
        };

        Gmail.prototype.getHeader = function getHeader(headers, index) {
          var header = '';
          $.each(headers, function () {
            if (this.name === index) {
              header = this.value;
            }
          });
          return header;
        };

        Gmail.prototype.getBody = function getBody(message) {
          var encodedBody = '';
          if (typeof message.parts === 'undefined') {
            encodedBody = message.body.data;
          } else {
            encodedBody = this.getHTMLPart(message.parts);
          }
          encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
          return decodeURIComponent(escape(window.atob(encodedBody)));
        };

        Gmail.prototype.getHTMLPart = function getHTMLPart(arr) {
          for (var x = 0; x <= arr.length; x++) {
            if (typeof arr[x].parts === "undefined") {
              if (arr[x].mimeType === 'text/html') {
                return arr[x].body.data;
              }
            } else {
              return this.getHTMLPart(arr[x].parts);
            }
          }
          return '';
        };

        Gmail.prototype.openMessage = function openMessage(id) {

          var result = $.grep(this.mails, function (e) {
            return e.id == id;
          });

          this.modalMessage.subject = result[0].subject;
          this.modalMessage.from = result[0].from;
          this.modalMessage.date = result[0].date;

          var ifrm = $('#message-content')[0].contentWindow.document;
          $('body', ifrm).html(this.getBody(result[0].content));

          $('.fade').attr('style', 'display: block !important; opacity: 0;').animate({ opacity: 1 });
          $('.mod').attr('style', 'display:flex !important');

          this.setMessageAsRead(id);
        };

        Gmail.prototype.closeModal = function closeModal() {

          $('.mod, .reply-mod').attr('style', 'display:none !important');
          var ifrm = $('#message-content')[0].contentWindow.document;
          $('body', ifrm).animate({
            scrollTop: 0
          }, 600);
        };

        Gmail.prototype.reply = function reply() {

          var from = this.modalMessage.from;
          if (from.includes("<")) {
            from = from.substring(from.lastIndexOf("<") + 1, from.lastIndexOf(">"));
          }
          this.modalMessage.mailadress = from;
          this.modalMessage.subject = 'Re: ' + this.modalMessage.subject;

          $('.mod').attr('style', 'display:none !important');
          $('.reply-mod').attr('style', 'display:flex !important');
        };

        Gmail.prototype.send = function send() {

          var self = this;

          var mail = 'MIME-Version: 1.0\r\n' + 'To: ' + $('#compose-to').val() + '\r\n' + 'Subject: ' + $('#compose-subject').val() + '\r\n\r\n' + '' + $('#compose-message').val() + '\r\n\r\n';

          $.ajax({
            type: "POST",
            url: "https://www.googleapis.com/upload/gmail/v1/users/me/messages/send",
            headers: {
              'Authorization': this.token,
              'Content-Type': 'message/rfc822'
            },
            data: mail

          }).done(function () {
            self.openDialog();
          }).fail(function () {
            console.log('Error Sending Email');
          });

          $('.mod, .reply-mod').attr('style', 'display:none !important');
        };

        Gmail.prototype.writeMail = function writeMail() {
          this.modalMessage = {
            subject: "",
            from: "",
            date: ""
          };
          $('.reply-mod').attr('style', 'display:flex !important');
        };

        Gmail.prototype.openDialog = function openDialog() {
          this.dialogService.open({ viewModel: Prompt, model: 'Email successfully send.' }).then(function (response) {
            console.log(response);

            if (!response.wasCancelled) {
              console.log('OK');
            } else {
              console.log('cancelled');
            }
            console.log(response.output);
          });
        };

        Gmail.prototype.getUnreadMessages = function getUnreadMessages() {
          var self = this;

          $.ajax({
            url: 'https://www.googleapis.com/gmail/v1/users/me/labels/INBOX',
            headers: { 'authorization': this.token }
          }).done(function (data) {
            if (self.unreadMessages != data.messagesUnread) {
              self.unreadMessages = data.messagesUnread;
              self.getMessages(self.label);
            }
          });
        };

        Gmail.prototype.setMessageAsRead = function setMessageAsRead(id) {
          var self = this;

          var result = $.grep(this.mails, function (e) {
            return e.id == id;
          });

          if (result[0].unread) {

            result[0].unread = false;

            $.ajax({
              type: 'POST',
              dataType: 'json',
              headers: { 'authorization': token,
                "Content-Type": "application/json" },
              url: 'https://www.googleapis.com/gmail/v1/users/me/messages/' + id + '/modify',
              data: JSON.stringify({ "removeLabelIds": ["UNREAD"] })
            }).done(function (data) {
              self.unreadMessages--;
            }).fail(function () {
              console.log('Setting mail as read failed!');
            });
          }
        };

        return Gmail;
      }()) || _class));

      _export('Gmail', Gmail);

      config = {
        'client_id': '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/userinfo.profile'
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbImdldFVzZXJJbmZvIiwiJCIsImFqYXgiLCJ1cmwiLCJhY2Nlc3NUb2tlbiIsImRhdGEiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwiaHRtbCIsIm5hbWUiLCJkYXRhVHlwZSIsIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiR21haWwiLCJkaWFsb2dTZXJ2aWNlIiwiQ0xJRU5UX0lEIiwiU0NPUEVTIiwiQVBJX0tFWSIsImxhYmVscyIsImxhYmVsIiwiY29ubmVjdGVkIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsIm1lc3NhZ2VzIiwiY291bnRlciIsIm1haWxzIiwidW5yZWFkTWVzc2FnZXMiLCJjb250ZW50IiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZ21haWxEYXRhIiwibW9kYWxNZXNzYWdlIiwic3ViamVjdCIsImZyb20iLCJkYXRlIiwic2hvd1JlcGx5TW9kIiwiaW5pdCIsInNlbGYiLCJzZXRJbnRlcnZhbCIsImdldFVucmVhZE1lc3NhZ2VzIiwiZ2V0TGFiZWxzIiwiZ2V0TWVzc2FnZXMiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbm5lY3QiLCJnYXBpIiwiYXV0aCIsImF1dGhvcml6ZSIsImNsaWVudF9pZCIsInNjb3BlIiwiam9pbiIsImltbWVkaWF0ZSIsImhhbmRsZUF1dGhSZXN1bHQiLCJsZW5ndGgiLCJpIiwicHVzaCIsImhlYWRlcnMiLCJkb25lIiwiZ2V0TWVzc2FnZSIsImhpZGUiLCJpZCIsIm1haWwiLCJwYXlsb2FkIiwiZ2V0SGVhZGVyIiwidW5yZWFkIiwiaW5BcnJheSIsImxhYmVsSWRzIiwiaW5kZXgiLCJoZWFkZXIiLCJlYWNoIiwidmFsdWUiLCJnZXRCb2R5IiwiZW5jb2RlZEJvZHkiLCJwYXJ0cyIsImJvZHkiLCJnZXRIVE1MUGFydCIsInJlcGxhY2UiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlc2NhcGUiLCJ3aW5kb3ciLCJhdG9iIiwiYXJyIiwieCIsIm1pbWVUeXBlIiwib3Blbk1lc3NhZ2UiLCJyZXN1bHQiLCJncmVwIiwiZSIsImlmcm0iLCJjb250ZW50V2luZG93IiwiZG9jdW1lbnQiLCJhdHRyIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJzZXRNZXNzYWdlQXNSZWFkIiwiY2xvc2VNb2RhbCIsInNjcm9sbFRvcCIsInJlcGx5IiwiaW5jbHVkZXMiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsIm1haWxhZHJlc3MiLCJzZW5kIiwidmFsIiwidHlwZSIsIm9wZW5EaWFsb2ciLCJmYWlsIiwid3JpdGVNYWlsIiwib3BlbiIsInZpZXdNb2RlbCIsIm1vZGVsIiwidGhlbiIsIndhc0NhbmNlbGxlZCIsIm91dHB1dCIsIm1lc3NhZ2VzVW5yZWFkIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQStTQSxXQUFTQSxXQUFULEdBQXVCO0FBQ25CQyxNQUFFQyxJQUFGLENBQU87QUFDSEMsV0FBSyxnRUFBZ0VDLFdBRGxFO0FBRUhDLFlBQU0sSUFGSDtBQUdIQyxlQUFTLGlCQUFTQyxRQUFULEVBQW1CO0FBQ3hCQyxnQkFBUUMsR0FBUixDQUFZLDhCQUFaO0FBQ0FELGdCQUFRQyxHQUFSLENBQVlGLFFBQVo7QUFDQU4sVUFBRSxPQUFGLEVBQVdTLElBQVgsQ0FBZ0JILFNBQVNJLElBQXpCO0FBRUgsT0FSRTtBQVNIQyxnQkFBVTtBQVRQLEtBQVA7QUFXSDs7O0FBM1RPQyxtQixrQkFBQUEsYTs7QUFDQUMsWSxxQkFBQUEsTTs7QUFDQUMsVSxnQkFBQUEsSTs7QUFDQUMsWSxXQUFBQSxNOzs7dUJBSUtDLEssV0FGWkgsT0FBT0QsYUFBUCxDO0FBR0csdUJBQVlLLGFBQVosRUFBMkI7QUFBQTs7QUFDdkIsZUFBS0EsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxlQUFLQyxTQUFMLEdBQWlCLDBFQUFqQjtBQUNBLGVBQUtDLE1BQUwsR0FBYyxDQUFFLDBCQUFGLENBQWQ7QUFD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
