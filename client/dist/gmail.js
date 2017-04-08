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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiR21haWwiLCJkaWFsb2dTZXJ2aWNlIiwiQ0xJRU5UX0lEIiwiU0NPUEVTIiwiQVBJX0tFWSIsImxhYmVscyIsImxhYmVsIiwiY29ubmVjdGVkIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsIm1lc3NhZ2VzIiwiY291bnRlciIsIm1haWxzIiwidW5yZWFkTWVzc2FnZXMiLCJjb250ZW50IiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZGF0YSIsIm1vZGFsTWVzc2FnZSIsInN1YmplY3QiLCJmcm9tIiwiZGF0ZSIsInNob3dSZXBseU1vZCIsImluaXQiLCJyZXF1ZXN0R21haWxEYXRhIiwic2VsZiIsImNvbm5lY3QiLCJnYXBpIiwiYXV0aCIsImF1dGhvcml6ZSIsImNsaWVudF9pZCIsInNjb3BlIiwiam9pbiIsImltbWVkaWF0ZSIsImhhbmRsZUF1dGhSZXN1bHQiLCJsb2dvdXQiLCJyZW1vdmVJdGVtIiwiJCIsInNyYyIsImlkIiwiZnJhbWVib3JkZXIiLCJzY3JvbGxpbmciLCJhcHBlbmRUbyIsInNldFRpbWVvdXQiLCJsb2NhdGlvbiIsInJlbG9hZCIsInVybCIsImFqYXgiLCJoZWFkZXJzIiwiZG9uZSIsInNldEludGVydmFsIiwiZ2V0VW5yZWFkTWVzc2FnZXMiLCJnZXRMYWJlbHMiLCJnZXRNZXNzYWdlcyIsImZhaWwiLCJsZW5ndGgiLCJpIiwibmFtZSIsInB1c2giLCJjb25zb2xlIiwibG9nIiwiZ2V0TWVzc2FnZSIsImhpZGUiLCJtYWlsIiwicGF5bG9hZCIsImdldEhlYWRlciIsInNwbGl0IiwicmVwbGFjZSIsInVucmVhZCIsImluQXJyYXkiLCJsYWJlbElkcyIsImluZGV4IiwiaGVhZGVyIiwiZWFjaCIsInZhbHVlIiwiZ2V0Qm9keSIsImVuY29kZWRCb2R5IiwicGFydHMiLCJib2R5IiwiZ2V0SFRNTFBhcnQiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlc2NhcGUiLCJ3aW5kb3ciLCJhdG9iIiwiYXJyIiwieCIsIm1pbWVUeXBlIiwib3Blbk1lc3NhZ2UiLCJyZXN1bHQiLCJncmVwIiwiZSIsImlmcm0iLCJjb250ZW50V2luZG93IiwiZG9jdW1lbnQiLCJodG1sIiwiYXR0ciIsImFuaW1hdGUiLCJvcGFjaXR5Iiwic2V0TWVzc2FnZUFzUmVhZCIsImNsb3NlTW9kYWwiLCJzY3JvbGxUb3AiLCJyZXBseSIsImluY2x1ZGVzIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJtYWlsYWRyZXNzIiwic2VuZCIsInZhbCIsInR5cGUiLCJvcGVuRGlhbG9nIiwid3JpdGVNYWlsIiwib3BlbiIsInZpZXdNb2RlbCIsIm1vZGVsIiwidGhlbiIsInJlc3BvbnNlIiwid2FzQ2FuY2VsbGVkIiwib3V0cHV0IiwibWVzc2FnZXNVbnJlYWQiLCJkYXRhVHlwZSIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxtQixrQkFBQUEsYTs7QUFDQUMsWSxxQkFBQUEsTTs7QUFDQUMsVSxnQkFBQUEsSTs7QUFDQUMsWSxXQUFBQSxNOzs7dUJBSUtDLEssV0FGWkgsT0FBT0QsYUFBUCxDO0FBR0csdUJBQVlBLGFBQVosRUFBMkI7QUFBQTs7QUFDdkIsZUFBS0ssYUFBTCxHQUFxQkwsYUFBckI7QUFDQSxlQUFLTSxTQUFMLEdBQWlCLDBFQUFqQjtBQUNBLGVBQUtDLE1BQUwsR0FBYyxDQUFDLDBCQUFELEVBQ0MsbURBREQsQ0FBZDtBQUVBLGVBQUtDLE9BQUwsR0FBZSxDQUFDLHlDQUFELENBQWY7QUFDQSxlQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGVBQUtDLEtBQUwsR0FBYSxPQUFiO0FBQ0EsZUFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGVBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxlQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLGVBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxl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QitHLElBQW5CLENBQXdCLEVBQUNDLFdBQVdsSCxNQUFaLEVBQW9CbUgsT0FBTywwQkFBM0IsRUFBeEIsRUFBaUZDLElBQWpGLENBQXNGLG9CQUFZO0FBQzlGdkQsb0JBQVFDLEdBQVIsQ0FBWXVELFFBQVo7O0FBRUEsZ0JBQUksQ0FBQ0EsU0FBU0MsWUFBZCxFQUE0QjtBQUMxQnpELHNCQUFRQyxHQUFSLENBQVksSUFBWjtBQUNELGFBRkQsTUFFTztBQUNMRCxzQkFBUUMsR0FBUixDQUFZLFdBQVo7QUFDRDtBQUNERCxvQkFBUUMsR0FBUixDQUFZdUQsU0FBU0UsTUFBckI7QUFDSCxXQVREO0FBVUQsUzs7d0JBRURsRSxpQixnQ0FBb0I7QUFDbEIsY0FBSTFCLE9BQU8sSUFBWDs7QUFFQVksWUFBRVUsSUFBRixDQUFPO0FBQ0xELGlCQUFLLDJEQURBO0FBRUxFLHFCQUFTLEVBQUUsaUJBQWlCLEtBQUtsQyxLQUF4QjtBQUZKLFdBQVAsRUFHR21DLElBSEgsQ0FHUSxVQUFVaEMsSUFBVixFQUFpQjtBQUN2QixnQkFBR1EsS0FBS2IsY0FBTCxJQUF1QkssS0FBS3FHLGNBQS9CLEVBQStDO0FBQzdDN0YsbUJBQUtiLGNBQUwsR0FBc0JLLEtBQUtxRyxjQUEzQjtBQUNBN0YsbUJBQUs0QixXQUFMLENBQWlCNUIsS0FBS3BCLEtBQXRCO0FBQ0Q7QUFDRixXQVJEO0FBU0QsUzs7d0JBRUQ2RixnQiw2QkFBaUIzRCxFLEVBQUk7QUFDbkIsY0FBSWQsT0FBTyxJQUFYOztBQUVBLGNBQUkrRCxTQUFTbkQsRUFBRW9ELElBQUYsQ0FBTyxLQUFLOUUsS0FBWixFQUFtQixVQUFTK0UsQ0FBVCxFQUFXO0FBQUUsbUJBQU9BLEVBQUVuRCxFQUFGLElBQVFBLEVBQWY7QUFBb0IsV0FBcEQsQ0FBYjtBQUNBLGNBQUdpRCxPQUFPLENBQVAsRUFBVXBCLE1BQWIsRUFBcUI7QUFDbkJvQixtQkFBTyxDQUFQLEVBQVVwQixNQUFWLEdBQW1CLEtBQW5COztBQUVBL0IsY0FBRVUsSUFBRixDQUFPO0FBQ0w2RCxvQkFBTSxNQUREO0FBRUxXLHdCQUFVLE1BRkw7QUFHTHZFLHVCQUFTO0FBQ0csaUNBQWlCbEMsS0FEcEI7QUFFRyxnQ0FBZ0I7QUFGbkIsZUFISjtBQU9MZ0MsbUJBQUssMkRBQXlEUCxFQUF6RCxHQUE0RCxTQVA1RDtBQVFMdEIsb0JBQU11RyxLQUFLQyxTQUFMLENBQWUsRUFBQyxrQkFBaUIsQ0FBQyxRQUFELENBQWxCLEVBQWY7QUFSRCxhQUFQLEVBVUN4RSxJQVZELENBVU0sVUFBVWhDLElBQVYsRUFBaUI7QUFDckJRLG1CQUFLYixjQUFMO0FBQ0QsYUFaRCxFQWFDMEMsSUFiRCxDQWFNLFlBQVU7QUFFZEssc0JBQVFDLEdBQVIsQ0FBWSw4QkFBWjtBQUNELGFBaEJEO0FBaUJEO0FBRUYsUyIsImZpbGUiOiJnbWFpbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
