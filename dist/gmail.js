'use strict';

System.register(['aurelia-dialog', 'aurelia-framework', 'aurelia-i18n', 'prompt'], function (_export, _context) {
  "use strict";

  var DialogService, inject, I18N, Prompt, _dec, _class, Gmail;

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
    }],
    execute: function () {
      _export('Gmail', Gmail = (_dec = inject(DialogService), _dec(_class = function () {
        function Gmail(DialogService) {
          _classCallCheck(this, Gmail);

          this.dialogService = DialogService;
          this.CLIENT_ID = '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com';
          this.SCOPES = ['https://mail.google.com/', "https://www.googleapis.com/auth/calendar.readonly"];
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
          this.requestGmailData('https://www.googleapis.com/gmail/v1/users/me/labels');
          var self = this;
        };

        Gmail.prototype.connect = function connect() {
          var self = this;
          gapi.auth.authorize({
            client_id: self.CLIENT_ID,
            scope: self.SCOPES.join(' '),
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

          setTimeout(location.reload(), 2000);
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
            url: 'https://www.googleapis.com/gmail/v1/users/me/messages?labelIds=' + label,
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
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiR21haWwiLCJkaWFsb2dTZXJ2aWNlIiwiQ0xJRU5UX0lEIiwiU0NPUEVTIiwiQVBJX0tFWSIsImxhYmVscyIsImxhYmVsIiwiY29ubmVjdGVkIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsIm1lc3NhZ2VzIiwiY291bnRlciIsIm1haWxzIiwidW5yZWFkTWVzc2FnZXMiLCJjb250ZW50IiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZGF0YSIsIm1vZGFsTWVzc2FnZSIsInN1YmplY3QiLCJmcm9tIiwiZGF0ZSIsInNob3dSZXBseU1vZCIsImluaXQiLCJyZXF1ZXN0R21haWxEYXRhIiwic2VsZiIsImNvbm5lY3QiLCJnYXBpIiwiYXV0aCIsImF1dGhvcml6ZSIsImNsaWVudF9pZCIsInNjb3BlIiwiam9pbiIsImltbWVkaWF0ZSIsImhhbmRsZUF1dGhSZXN1bHQiLCJsb2dvdXQiLCJyZW1vdmVJdGVtIiwiJCIsInNyYyIsImlkIiwiZnJhbWVib3JkZXIiLCJzY3JvbGxpbmciLCJhcHBlbmRUbyIsInNldFRpbWVvdXQiLCJsb2NhdGlvbiIsInJlbG9hZCIsInVybCIsImFqYXgiLCJoZWFkZXJzIiwiZG9uZSIsInNldEludGVydmFsIiwiZ2V0VW5yZWFkTWVzc2FnZXMiLCJnZXRMYWJlbHMiLCJnZXRNZXNzYWdlcyIsImZhaWwiLCJsZW5ndGgiLCJpIiwibmFtZSIsInB1c2giLCJjb25zb2xlIiwibG9nIiwiZ2V0TWVzc2FnZSIsImhpZGUiLCJtYWlsIiwicGF5bG9hZCIsImdldEhlYWRlciIsInVucmVhZCIsImluQXJyYXkiLCJsYWJlbElkcyIsImluZGV4IiwiaGVhZGVyIiwiZWFjaCIsInZhbHVlIiwiZ2V0Qm9keSIsImVuY29kZWRCb2R5IiwicGFydHMiLCJib2R5IiwiZ2V0SFRNTFBhcnQiLCJyZXBsYWNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZXNjYXBlIiwid2luZG93IiwiYXRvYiIsImFyciIsIngiLCJtaW1lVHlwZSIsIm9wZW5NZXNzYWdlIiwicmVzdWx0IiwiZ3JlcCIsImUiLCJpZnJtIiwiY29udGVudFdpbmRvdyIsImRvY3VtZW50IiwiaHRtbCIsImF0dHIiLCJhbmltYXRlIiwib3BhY2l0eSIsInNldE1lc3NhZ2VBc1JlYWQiLCJjbG9zZU1vZGFsIiwic2Nyb2xsVG9wIiwicmVwbHkiLCJpbmNsdWRlcyIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibWFpbGFkcmVzcyIsInNlbmQiLCJ2YWwiLCJ0eXBlIiwib3BlbkRpYWxvZyIsIndyaXRlTWFpbCIsIm9wZW4iLCJ2aWV3TW9kZWwiLCJtb2RlbCIsInRoZW4iLCJyZXNwb25zZSIsIndhc0NhbmNlbGxlZCIsIm91dHB1dCIsIm1lc3NhZ2VzVW5yZWFkIiwiZGF0YVR5cGUiLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsbUIsa0JBQUFBLGE7O0FBQ0FDLFkscUJBQUFBLE07O0FBQ0FDLFUsZ0JBQUFBLEk7O0FBQ0FDLFksV0FBQUEsTTs7O3VCQUlLQyxLLFdBRlpILE9BQU9ELGFBQVAsQztBQUdHLHVCQUFZQSxhQUFaLEVBQTJCO0FBQUE7O0FBQ3ZCLGVBQUtLLGFBQUwsR0FBcUJMLGFBQXJCO0FBQ0EsZUFBS00sU0FBTCxHQUFpQiwwRUFBakI7QUFDQSxlQUFLQyxNQUFMLEdBQWMsQ0FBQywwQkFBRCxFQUNDLG1EQURELENBQWQ7QUFFQSxlQUFLQyxPQUFMLEdBQWUsQ0FBQyx5Q0FBRCxDQUFmO0FBQ0EsZUFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxlQUFLQyxLQUFMLEdBQWEsT0FBYjtBQUNBLGVBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxlQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsZUFBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxlQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsZUFBS0MsT0FB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QUFzRixvQkFBWTtBQUM5RnRELG9CQUFRQyxHQUFSLENBQVlzRCxRQUFaOztBQUVBLGdCQUFJLENBQUNBLFNBQVNDLFlBQWQsRUFBNEI7QUFDMUJ4RCxzQkFBUUMsR0FBUixDQUFZLElBQVo7QUFDRCxhQUZELE1BRU87QUFDTEQsc0JBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0Q7QUFDREQsb0JBQVFDLEdBQVIsQ0FBWXNELFNBQVNFLE1BQXJCO0FBQ0gsV0FURDtBQVVELFM7O3dCQUVEakUsaUIsZ0NBQW9CO0FBQ2xCLGNBQUkxQixPQUFPLElBQVg7O0FBRUFZLFlBQUVVLElBQUYsQ0FBTztBQUNMRCxpQkFBSywyREFEQTtBQUVMRSxxQkFBUyxFQUFFLGlCQUFpQixLQUFLbEMsS0FBeEI7QUFGSixXQUFQLEVBR0dtQyxJQUhILENBR1EsVUFBVWhDLElBQVYsRUFBaUI7QUFDdkIsZ0JBQUdRLEtBQUtiLGNBQUwsSUFBdUJLLEtBQUtvRyxjQUEvQixFQUErQztBQUM3QzVGLG1CQUFLYixjQUFMLEdBQXNCSyxLQUFLb0csY0FBM0I7QUFDQTVGLG1CQUFLNEIsV0FBTCxDQUFpQjVCLEtBQUtwQixLQUF0QjtBQUNEO0FBQ0YsV0FSRDtBQVNELFM7O3dCQUVENEYsZ0IsNkJBQWlCMUQsRSxFQUFJO0FBQ25CLGNBQUlkLE9BQU8sSUFBWDs7QUFFQSxjQUFJOEQsU0FBU2xELEVBQUVtRCxJQUFGLENBQU8sS0FBSzdFLEtBQVosRUFBbUIsVUFBUzhFLENBQVQsRUFBVztBQUFFLG1CQUFPQSxFQUFFbEQsRUFBRixJQUFRQSxFQUFmO0FBQW9CLFdBQXBELENBQWI7O0FBRUEsY0FBR2dELE9BQU8sQ0FBUCxFQUFVckIsTUFBYixFQUFxQjs7QUFFbkJxQixtQkFBTyxDQUFQLEVBQVVyQixNQUFWLEdBQW1CLEtBQW5COztBQUVBN0IsY0FBRVUsSUFBRixDQUFPO0FBQ0w0RCxvQkFBTSxNQUREO0FBRUxXLHdCQUFVLE1BRkw7QUFHTHRFLHVCQUFTLEVBQUUsaUJBQWlCbEMsS0FBbkI7QUFDRyxnQ0FBZ0Isa0JBRG5CLEVBSEo7QUFLTGdDLG1CQUFLLDJEQUF5RFAsRUFBekQsR0FBNEQsU0FMNUQ7QUFNTHRCLG9CQUFNc0csS0FBS0MsU0FBTCxDQUFlLEVBQUMsa0JBQWlCLENBQUMsUUFBRCxDQUFsQixFQUFmO0FBTkQsYUFBUCxFQVFDdkUsSUFSRCxDQVFNLFVBQVVoQyxJQUFWLEVBQWlCO0FBQ3JCUSxtQkFBS2IsY0FBTDtBQUNELGFBVkQsRUFXQzBDLElBWEQsQ0FXTSxZQUFVO0FBRWRLLHNCQUFRQyxHQUFSLENBQVksOEJBQVo7QUFDRCxhQWREO0FBZUQ7QUFFRixTIiwiZmlsZSI6ImdtYWlsLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
