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
            mail.mailAdress = self.getHeader(data.payload.headers, 'From').split('<')[1].replace('>', '');
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
          this.modalMessage.mailAdress = result[0].mailAdress;

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
          this.modalMessage.mailadress = this.modalMessage.mailAdress;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiY29uZmlnIiwiR21haWwiLCJkaWFsb2dTZXJ2aWNlIiwiY2xpZW50SWQiLCJwcm92aWRlcnMiLCJnb29nbGUiLCJzY29wZXMiLCJhcGkiLCJsYWJlbHMiLCJsYWJlbCIsImNvbm5lY3RlZCIsImlzTG9hZGluZyIsIm1lc3NhZ2UiLCJtZXNzYWdlcyIsImNvdW50ZXIiLCJtYWlscyIsInVucmVhZE1lc3NhZ2VzIiwiY29udGVudCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImRhdGEiLCJtb2RhbE1lc3NhZ2UiLCJzdWJqZWN0IiwiZnJvbSIsImRhdGUiLCJzaG93UmVwbHlNb2QiLCJpbml0Iiwic2VsZiIsInJlcXVlc3RHbWFpbERhdGEiLCJnZXQiLCJjb25uZWN0IiwiZ2FwaSIsImF1dGgiLCJhdXRob3JpemUiLCJjbGllbnRfaWQiLCJzY29wZSIsImpvaW4iLCJpbW1lZGlhdGUiLCJoYW5kbGVBdXRoUmVzdWx0IiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsIiQiLCJzcmMiLCJpZCIsImZyYW1lYm9yZGVyIiwic2Nyb2xsaW5nIiwiYXBwZW5kVG8iLCJzZXRUaW1lb3V0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ1cmwiLCJhamF4IiwiaGVhZGVycyIsImRvbmUiLCJzZXRJbnRlcnZhbCIsImdldFVucmVhZE1lc3NhZ2VzIiwiZ2V0TGFiZWxzIiwiZ2V0TWVzc2FnZXMiLCJmYWlsIiwibGVuZ3RoIiwiaSIsIm5hbWUiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsImdldE1lc3NhZ2UiLCJoaWRlIiwibWFpbCIsInBheWxvYWQiLCJnZXRIZWFkZXIiLCJzcGxpdCIsInJlcGxhY2UiLCJtYWlsQWRyZXNzIiwidW5yZWFkIiwiaW5BcnJheSIsImxhYmVsSWRzIiwiaW5kZXgiLCJoZWFkZXIiLCJlYWNoIiwidmFsdWUiLCJnZXRCb2R5IiwiZW5jb2RlZEJvZHkiLCJwYXJ0cyIsImJvZHkiLCJnZXRIVE1MUGFydCIsImRlY29kZVVSSUNvbXBvbmVudCIsImVzY2FwZSIsIndpbmRvdyIsImF0b2IiLCJhcnIiLCJ4IiwibWltZVR5cGUiLCJvcGVuTWVzc2FnZSIsInJlc3VsdCIsImdyZXAiLCJlIiwiaWZybSIsImNvbnRlbnRXaW5kb3ciLCJkb2N1bWVudCIsImh0bWwiLCJhdHRyIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJzZXRNZXNzYWdlQXNSZWFkIiwiY2xvc2VNb2RhbCIsInNjcm9sbFRvcCIsInJlcGx5IiwiaW5jbHVkZXMiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsIm1haWxhZHJlc3MiLCJzZW5kIiwidmFsIiwidHlwZSIsInBvc3QiLCJvcGVuRGlhbG9nIiwid3JpdGVNYWlsIiwib3BlbiIsInZpZXdNb2RlbCIsIm1vZGVsIiwidGhlbiIsInJlc3BvbnNlIiwid2FzQ2FuY2VsbGVkIiwib3V0cHV0IiwibWVzc2FnZXNVbnJlYWQiLCJkYXRhVHlwZSIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFTQSxtQixrQkFBQUEsYTs7QUFDQUMsWSxxQkFBQUEsTTs7QUFDQUMsVSxnQkFBQUEsSTs7QUFDQUMsWSxXQUFBQSxNOztBQUNGQyxZOzs7dUJBSU1DLEssV0FGWkosT0FBT0QsYUFBUCxDO0FBR0MsdUJBQVlBLGFBQVosRUFBMkI7QUFBQTs7QUFDekIsZUFBS00sYUFBTCxHQUFxQk4sYUFBckI7QUFDQSxlQUFLTyxRQUFMLEdBQWdCSCxPQUFPSSxTQUFQLENBQWlCQyxNQUFqQixDQUF3QkYsUUFBeEM7QUFDQSxlQUFLRyxNQUFMLEdBQWNOLE9BQU9JLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCQyxNQUF0QztBQUNBLGVBQUtDLEdBQUwsR0FBV1AsT0FBT0ksU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0JFLEdBQW5DO0FBQ0EsZUFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxlQUFLQyxLQUFMLEdB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
