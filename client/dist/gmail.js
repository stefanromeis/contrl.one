'use strict';

System.register(['aurelia-dialog', 'aurelia-framework', 'aurelia-i18n', 'prompt', './services/authConfig'], function (_export, _context) {
  "use strict";

  var DialogService, inject, I18N, Prompt, config, _dec, _class, Gmail;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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
    }, function (_servicesAuthConfig) {
      config = _servicesAuthConfig.default;
    }],
    execute: function () {
      _export('Gmail', Gmail = (_dec = inject(DialogService), _dec(_class = function () {
        function Gmail(DialogService) {
          _classCallCheck(this, Gmail);

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

        Gmail.prototype.init = function init() {
          var self = this;
          this.requestGmailData(self.api.get + '/users/me/labels');
        };

        Gmail.prototype.connect = function connect() {
          var self = this;
          gapi.auth.authorize({
            client_id: self.clientId,
            scope: self.scopes.join(' '),
            immediate: false
          }, handleAuthResult);
        };

        Gmail.prototype.logout = function logout() {
          localStorage.removeItem('google.token');

          $('<iframe>', {
            src: 'https://accounts.google.com/logout',
            id: 'myFrame',
            frameborder: 0,
            scrolling: 'no'
          }).appendTo('body');

          setTimeout(location.reload(), 5000);
        };

        Gmail.prototype.requestGmailData = function requestGmailData(url) {
          var self = this;
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
          }).fail(function () {
            self.connected = false;
          });
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
            url: self.api.get + '/users/me/messages?labelIds=' + label,
            headers: { 'authorization': this.token }
          }).done(function (data) {
            self.messages = data.messages;
            self.getMessage(self.messages);
            $('.gmail-connect-btn').hide();
            self.connected = true;
          }).fail(function () {
            self.connected = false;
          });
        };

        Gmail.prototype.getMessage = function getMessage(messages) {
          this.isLoading = true;
          var self = this;

          if (!messages[self.counter] || self.counter >= 10) {
            this.isLoading = false;
            return;
          }
          var id = messages[self.counter].id;
          self.counter++;

          $.ajax({
            url: self.api.get + '/users/me/messages/' + id,
            headers: { 'authorization': token }
          }).done(function (data) {
            var mail = {};
            mail.content = data.payload;
            mail.id = id;
            mail.from = self.getHeader(data.payload.headers, 'From').split('<')[0].replace(/"/g, '');
            mail.subject = self.getHeader(data.payload.headers, 'Subject');
            mail.date = self.getHeader(data.payload.headers, 'Date');
            mail.unread = $.inArray('UNREAD', data.labelIds) > -1;

            self.mails.push(mail);
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
          var encodedBody = 'Sorry, no content available...';
          if (typeof message.parts === 'undefined') {
            encodedBody = message.body.data;
          } else {
            encodedBody = this.getHTMLPart(message.parts);
          }
          encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
          return decodeURIComponent(escape(window.atob(encodedBody)));
        };

        Gmail.prototype.getHTMLPart = function getHTMLPart(arr) {
          for (var x = 0; x < arr.length; x++) {
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
            url: self.api.post + '/users/me/messages/send',
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
            url: self.api.get + '/users/me/labels/INBOX',
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
              headers: {
                'authorization': token,
                "Content-Type": "application/json"
              },
              url: self.api.get + '/users/me/messages/' + id + '/modify',
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
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiY29uZmlnIiwiR21haWwiLCJkaWFsb2dTZXJ2aWNlIiwiY2xpZW50SWQiLCJwcm92aWRlcnMiLCJnb29nbGUiLCJzY29wZXMiLCJhcGkiLCJsYWJlbHMiLCJsYWJlbCIsImNvbm5lY3RlZCIsImlzTG9hZGluZyIsIm1lc3NhZ2UiLCJtZXNzYWdlcyIsImNvdW50ZXIiLCJtYWlscyIsInVucmVhZE1lc3NhZ2VzIiwiY29udGVudCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImRhdGEiLCJtb2RhbE1lc3NhZ2UiLCJzdWJqZWN0IiwiZnJvbSIsImRhdGUiLCJzaG93UmVwbHlNb2QiLCJpbml0Iiwic2VsZiIsInJlcXVlc3RHbWFpbERhdGEiLCJnZXQiLCJjb25uZWN0IiwiZ2FwaSIsImF1dGgiLCJhdXRob3JpemUiLCJjbGllbnRfaWQiLCJzY29wZSIsImpvaW4iLCJpbW1lZGlhdGUiLCJoYW5kbGVBdXRoUmVzdWx0IiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsIiQiLCJzcmMiLCJpZCIsImZyYW1lYm9yZGVyIiwic2Nyb2xsaW5nIiwiYXBwZW5kVG8iLCJzZXRUaW1lb3V0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ1cmwiLCJhamF4IiwiaGVhZGVycyIsImRvbmUiLCJzZXRJbnRlcnZhbCIsImdldFVucmVhZE1lc3NhZ2VzIiwiZ2V0TGFiZWxzIiwiZ2V0TWVzc2FnZXMiLCJmYWlsIiwibGVuZ3RoIiwiaSIsIm5hbWUiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsImdldE1lc3NhZ2UiLCJoaWRlIiwibWFpbCIsInBheWxvYWQiLCJnZXRIZWFkZXIiLCJzcGxpdCIsInJlcGxhY2UiLCJ1bnJlYWQiLCJpbkFycmF5IiwibGFiZWxJZHMiLCJpbmRleCIsImhlYWRlciIsImVhY2giLCJ2YWx1ZSIsImdldEJvZHkiLCJlbmNvZGVkQm9keSIsInBhcnRzIiwiYm9keSIsImdldEhUTUxQYXJ0IiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZXNjYXBlIiwid2luZG93IiwiYXRvYiIsImFyciIsIngiLCJtaW1lVHlwZSIsIm9wZW5NZXNzYWdlIiwicmVzdWx0IiwiZ3JlcCIsImUiLCJpZnJtIiwiY29udGVudFdpbmRvdyIsImRvY3VtZW50IiwiaHRtbCIsImF0dHIiLCJhbmltYXRlIiwib3BhY2l0eSIsInNldE1lc3NhZ2VBc1JlYWQiLCJjbG9zZU1vZGFsIiwic2Nyb2xsVG9wIiwicmVwbHkiLCJpbmNsdWRlcyIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibWFpbGFkcmVzcyIsInNlbmQiLCJ2YWwiLCJ0eXBlIiwicG9zdCIsIm9wZW5EaWFsb2ciLCJ3cml0ZU1haWwiLCJvcGVuIiwidmlld01vZGVsIiwibW9kZWwiLCJ0aGVuIiwicmVzcG9uc2UiLCJ3YXNDYW5jZWxsZWQiLCJvdXRwdXQiLCJtZXNzYWdlc1VucmVhZCIsImRhdGFUeXBlIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVNBLG1CLGtCQUFBQSxhOztBQUNBQyxZLHFCQUFBQSxNOztBQUNBQyxVLGdCQUFBQSxJOztBQUNBQyxZLFdBQUFBLE07O0FBQ0ZDLFk7Ozt1QkFJTUMsSyxXQUZaSixPQUFPRCxhQUFQLEM7QUFHQyx1QkFBWUEsYUFBWixFQUEyQjtBQUFBOztBQUN6QixlQUFLTSxhQUFMLEdBQXFCTixhQUFyQjtBQUNBLGVBQUtPLFFBQUwsR0FBZ0JILE9BQU9JLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCRixRQUF4QztBQUNBLGVBQUtHLE1BQUwsR0FBY04sT0FBT0ksU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0JDLE1BQXRDO0FBQ0EsZUFBS0MsR0FBTCxHQUFXUCxPQUFPSSxTQUFQLENBQWlCQyxNQUFqQixDQUF3QkUsR0FBbkM7QUFDQSxlQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGVBQUtDLEtBQUwsR0FBYSxPQUFiO0FBQ0Es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
