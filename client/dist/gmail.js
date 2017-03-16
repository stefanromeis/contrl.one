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

          if (!messages[self.counter] || self.counter >= 10) {
            this.isLoading = false;
            return;
          }
          var id = messages[self.counter].id;
          self.counter++;

          $.ajax({
            url: 'https://www.googleapis.com/gmail/v1/users/me/messages/' + id,
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
              headers: {
                'authorization': token,
                "Content-Type": "application/json"
              },
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiR21haWwiLCJkaWFsb2dTZXJ2aWNlIiwiQ0xJRU5UX0lEIiwiU0NPUEVTIiwiQVBJX0tFWSIsImxhYmVscyIsImxhYmVsIiwiY29ubmVjdGVkIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsIm1lc3NhZ2VzIiwiY291bnRlciIsIm1haWxzIiwidW5yZWFkTWVzc2FnZXMiLCJjb250ZW50IiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZGF0YSIsIm1vZGFsTWVzc2FnZSIsInN1YmplY3QiLCJmcm9tIiwiZGF0ZSIsInNob3dSZXBseU1vZCIsImluaXQiLCJyZXF1ZXN0R21haWxEYXRhIiwic2VsZiIsImNvbm5lY3QiLCJnYXBpIiwiYXV0aCIsImF1dGhvcml6ZSIsImNsaWVudF9pZCIsInNjb3BlIiwiam9pbiIsImltbWVkaWF0ZSIsImhhbmRsZUF1dGhSZXN1bHQiLCJsb2dvdXQiLCJyZW1vdmVJdGVtIiwiJCIsInNyYyIsImlkIiwiZnJhbWVib3JkZXIiLCJzY3JvbGxpbmciLCJhcHBlbmRUbyIsInNldFRpbWVvdXQiLCJsb2NhdGlvbiIsInJlbG9hZCIsInVybCIsImFqYXgiLCJoZWFkZXJzIiwiZG9uZSIsInNldEludGVydmFsIiwiZ2V0VW5yZWFkTWVzc2FnZXMiLCJnZXRMYWJlbHMiLCJnZXRNZXNzYWdlcyIsImZhaWwiLCJsZW5ndGgiLCJpIiwibmFtZSIsInB1c2giLCJjb25zb2xlIiwibG9nIiwiZ2V0TWVzc2FnZSIsImhpZGUiLCJtYWlsIiwicGF5bG9hZCIsImdldEhlYWRlciIsInNwbGl0IiwicmVwbGFjZSIsInVucmVhZCIsImluQXJyYXkiLCJsYWJlbElkcyIsImluZGV4IiwiaGVhZGVyIiwiZWFjaCIsInZhbHVlIiwiZ2V0Qm9keSIsImVuY29kZWRCb2R5IiwicGFydHMiLCJib2R5IiwiZ2V0SFRNTFBhcnQiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlc2NhcGUiLCJ3aW5kb3ciLCJhdG9iIiwiYXJyIiwieCIsIm1pbWVUeXBlIiwib3Blbk1lc3NhZ2UiLCJyZXN1bHQiLCJncmVwIiwiZSIsImlmcm0iLCJjb250ZW50V2luZG93IiwiZG9jdW1lbnQiLCJodG1sIiwiYXR0ciIsImFuaW1hdGUiLCJvcGFjaXR5Iiwic2V0TWVzc2FnZUFzUmVhZCIsImNsb3NlTW9kYWwiLCJzY3JvbGxUb3AiLCJyZXBseSIsImluY2x1ZGVzIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJtYWlsYWRyZXNzIiwic2VuZCIsInZhbCIsInR5cGUiLCJvcGVuRGlhbG9nIiwid3JpdGVNYWlsIiwib3BlbiIsInZpZXdNb2RlbCIsIm1vZGVsIiwidGhlbiIsInJlc3BvbnNlIiwid2FzQ2FuY2VsbGVkIiwib3V0cHV0IiwibWVzc2FnZXNVbnJlYWQiLCJkYXRhVHlwZSIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxtQixrQkFBQUEsYTs7QUFDQUMsWSxxQkFBQUEsTTs7QUFDQUMsVSxnQkFBQUEsSTs7QUFDQUMsWSxXQUFBQSxNOzs7dUJBSUtDLEssV0FGWkgsT0FBT0QsYUFBUCxDO0FBR0csdUJBQVlBLGFBQVosRUFBMkI7QUFBQTs7QUFDdkIsZUFBS0ssYUFBTCxHQUFxQkwsYUFBckI7QUFDQSxlQUFLTSxTQUFMLEdBQWlCLDBFQUFqQjtBQUNBLGVBQUtDLE1BQUwsR0FBYyxDQUFDLDBCQUFELEVBQ0MsbURBREQsQ0FBZDtBQUVBLGVBQUtDLE9BQUwsR0FBZSxDQUFDLHlDQUFELENBQWY7QUFDQSxlQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGVBQUtDLEtBQUwsR0FBYSxPQUFiO0FBQ0EsZUFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGVBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxlQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLGVBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxl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K0csSUFBbkIsQ0FBd0IsRUFBQ0MsV0FBV2xILE1BQVosRUFBb0JtSCxPQUFPLDBCQUEzQixFQUF4QixFQUFpRkMsSUFBakYsQ0FBc0Ysb0JBQVk7QUFDOUZ2RCxvQkFBUUMsR0FBUixDQUFZdUQsUUFBWjs7QUFFQSxnQkFBSSxDQUFDQSxTQUFTQyxZQUFkLEVBQTRCO0FBQzFCekQsc0JBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0QsYUFGRCxNQUVPO0FBQ0xELHNCQUFRQyxHQUFSLENBQVksV0FBWjtBQUNEO0FBQ0RELG9CQUFRQyxHQUFSLENBQVl1RCxTQUFTRSxNQUFyQjtBQUNILFdBVEQ7QUFVRCxTOzt3QkFFRGxFLGlCLGdDQUFvQjtBQUNsQixjQUFJMUIsT0FBTyxJQUFYOztBQUVBWSxZQUFFVSxJQUFGLENBQU87QUFDTEQsaUJBQUssMkRBREE7QUFFTEUscUJBQVMsRUFBRSxpQkFBaUIsS0FBS2xDLEtBQXhCO0FBRkosV0FBUCxFQUdHbUMsSUFISCxDQUdRLFVBQVVoQyxJQUFWLEVBQWlCO0FBQ3ZCLGdCQUFHUSxLQUFLYixjQUFMLElBQXVCSyxLQUFLcUcsY0FBL0IsRUFBK0M7QUFDN0M3RixtQkFBS2IsY0FBTCxHQUFzQkssS0FBS3FHLGNBQTNCO0FBQ0E3RixtQkFBSzRCLFdBQUwsQ0FBaUI1QixLQUFLcEIsS0FBdEI7QUFDRDtBQUNGLFdBUkQ7QUFTRCxTOzt3QkFFRDZGLGdCLDZCQUFpQjNELEUsRUFBSTtBQUNuQixjQUFJZCxPQUFPLElBQVg7O0FBRUEsY0FBSStELFNBQVNuRCxFQUFFb0QsSUFBRixDQUFPLEtBQUs5RSxLQUFaLEVBQW1CLFVBQVMrRSxDQUFULEVBQVc7QUFBRSxtQkFBT0EsRUFBRW5ELEVBQUYsSUFBUUEsRUFBZjtBQUFvQixXQUFwRCxDQUFiO0FBQ0EsY0FBR2lELE9BQU8sQ0FBUCxFQUFVcEIsTUFBYixFQUFxQjtBQUNuQm9CLG1CQUFPLENBQVAsRUFBVXBCLE1BQVYsR0FBbUIsS0FBbkI7O0FBRUEvQixjQUFFVSxJQUFGLENBQU87QUFDTDZELG9CQUFNLE1BREQ7QUFFTFcsd0JBQVUsTUFGTDtBQUdMdkUsdUJBQVM7QUFDRyxpQ0FBaUJsQyxLQURwQjtBQUVHLGdDQUFnQjtBQUZuQixlQUhKO0FBT0xnQyxtQkFBSywyREFBeURQLEVBQXpELEdBQTRELFNBUDVEO0FBUUx0QixvQkFBTXVHLEtBQUtDLFNBQUwsQ0FBZSxFQUFDLGtCQUFpQixDQUFDLFFBQUQsQ0FBbEIsRUFBZjtBQVJELGFBQVAsRUFVQ3hFLElBVkQsQ0FVTSxVQUFVaEMsSUFBVixFQUFpQjtBQUNyQlEsbUJBQUtiLGNBQUw7QUFDRCxhQVpELEVBYUMwQyxJQWJELENBYU0sWUFBVTtBQUVkSyxzQkFBUUMsR0FBUixDQUFZLDhCQUFaO0FBQ0QsYUFoQkQ7QUFpQkQ7QUFFRixTIiwiZmlsZSI6ImdtYWlsLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
