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
        function Gmail(dialogService) {
          _classCallCheck(this, Gmail);

          this.dialogService = dialogService;
          this.CLIENT_ID = '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com';
          this.SCOPES = ['https://mail.google.com/'];
          this.API_KEY = ['AIzaSyDkNvkPgkC60vrb0OGvSwg12i0sjHANaYU'];
          this.labels = [];
          this.label = 'INBOX';
          this.connected = false;
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
            this.attached();
          }
        }

        Gmail.prototype.attached = function attached() {
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
          var self = this;
          this.counter = 0;
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
          var self = this;

          if (!self.messages[self.counter] || self.counter >= 10) {
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
            self.openModal();
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

        Gmail.prototype.openModal = function openModal() {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiR21haWwiLCJkaWFsb2dTZXJ2aWNlIiwiQ0xJRU5UX0lEIiwiU0NPUEVTIiwiQVBJX0tFWSIsImxhYmVscyIsImxhYmVsIiwiY29ubmVjdGVkIiwibWVzc2FnZSIsIm1lc3NhZ2VzIiwiY291bnRlciIsIm1haWxzIiwidW5yZWFkTWVzc2FnZXMiLCJjb250ZW50IiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZGF0YSIsImdtYWlsRGF0YSIsIm1vZGFsTWVzc2FnZSIsInN1YmplY3QiLCJmcm9tIiwiZGF0ZSIsInNob3dSZXBseU1vZCIsImF0dGFjaGVkIiwic2VsZiIsInNldEludGVydmFsIiwiZ2V0VW5yZWFkTWVzc2FnZXMiLCJnZXRMYWJlbHMiLCJnZXRNZXNzYWdlcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29ubmVjdCIsImdhcGkiLCJhdXRoIiwiYXV0aG9yaXplIiwiY2xpZW50X2lkIiwic2NvcGUiLCJqb2luIiwiaW1tZWRpYXRlIiwiaGFuZGxlQXV0aFJlc3VsdCIsImxlbmd0aCIsImkiLCJuYW1lIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCIkIiwiYWpheCIsInVybCIsImhlYWRlcnMiLCJkb25lIiwiZ2V0TWVzc2FnZSIsImhpZGUiLCJpZCIsIm1haWwiLCJwYXlsb2FkIiwiZ2V0SGVhZGVyIiwidW5yZWFkIiwiaW5BcnJheSIsImxhYmVsSWRzIiwiaW5kZXgiLCJoZWFkZXIiLCJlYWNoIiwidmFsdWUiLCJnZXRCb2R5IiwiZW5jb2RlZEJvZHkiLCJwYXJ0cyIsImJvZHkiLCJnZXRIVE1MUGFydCIsInJlcGxhY2UiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlc2NhcGUiLCJ3aW5kb3ciLCJhdG9iIiwiYXJyIiwieCIsIm1pbWVUeXBlIiwib3Blbk1lc3NhZ2UiLCJyZXN1bHQiLCJncmVwIiwiZSIsImlmcm0iLCJjb250ZW50V2luZG93IiwiZG9jdW1lbnQiLCJodG1sIiwiYXR0ciIsImFuaW1hdGUiLCJvcGFjaXR5Iiwic2V0TWVzc2FnZUFzUmVhZCIsImNsb3NlTW9kYWwiLCJzY3JvbGxUb3AiLCJyZXBseSIsImluY2x1ZGVzIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJtYWlsYWRyZXNzIiwic2VuZCIsInZhbCIsInR5cGUiLCJvcGVuTW9kYWwiLCJmYWlsIiwid3JpdGVNYWlsIiwib3BlbiIsInZpZXdNb2RlbCIsIm1vZGVsIiwidGhlbiIsInJlc3BvbnNlIiwid2FzQ2FuY2VsbGVkIiwib3V0cHV0IiwibWVzc2FnZXNVbnJlYWQiLCJkYXRhVHlwZSIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxtQixrQkFBQUEsYTs7QUFDQUMsWSxxQkFBQUEsTTs7QUFDQUMsVSxnQkFBQUEsSTs7QUFDQUMsWSxXQUFBQSxNOzs7dUJBSUtDLEssV0FGWkgsT0FBT0QsYUFBUCxDO0FBR0csdUJBQVlLLGFBQVosRUFBMkI7QUFBQTs7QUFDdkIsZUFBS0EsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxlQUFLQyxTQUFMLEdBQWlCLDBFQUFqQjtBQUNBLGVBQUtDLE1BQUwsR0FBYyxDQUFFLDBCQUFGLENBQWQ7QUFDQSxlQUFLQyxPQUFMLEdBQWUsQ0FBQyx5Q0FBRCxDQUFmO0FBQ0EsZUFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxlQUFLQyxLQUFMLEdBQWEsT0FBYjtBQUNBLGVBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxlQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLGVBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxlQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLGVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsZUFBS0MsY0FBTCxHQUFzQixDQUF0QjtBQUNBLGVBQUtDLE9BQUwsR0FBZSxXQUFmO0FBQ0EsZUFBS0MsS0FBTCxHQUFhQyxhQUFhQyxPQUFiLENBQXFCLGFBQXJCLEtBQXVDLFdBQXBEO0FBQ0EsZUFBS0MsSUFBTCxHQUFZQyxhQUFhLFdBQXpCO0FBQ0EsZUFBS0MsWUFBTCxHQUFvQjtBQUNsQkMscUJBQVMsRUFEUztBQUVsQkMsa0JBQU0sRUFGWTtBQUdsQkMsa0JBQU07QUFIWSxXQUFwQjtBQUtELGVBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxjQUFHLEtBQUtULEtBQUwsS0FBZSxXQUFsQixFQUErQjtBQUM1QixpQkFBS1UsUUFBTDtBQUNGO0FBQ0g7O3dCQUVEQSxRLHVCQUFZO0FBQ1YsY0FBSUMsT0FBTSxJQUFWO0FBQ0EsY0FBRyxLQUFLUixJQUFMLEtBQWMsV0FBZCxJQUE2QixLQUFLQSxJQUFMLENBQVVaLE1BQVYsS0FBcUIsV0FBckQsRUFBa0U7QUFDaEUsaUJBQUtFLFNBQUwsR0FBaUIsSUFBakI7QUFDQW1CLHdCQUFZLFlBQVU7QUFDbEJELG1CQUFLRSxpQkFBTDtBQUNILGFBRkQsRUFFRyxLQUZIO0FBR0EsaUJBQUtDLFNBQUwsQ0FBZSxLQUFLWCxJQUFwQjtBQUNBLGlCQUFLWSxXQUFMLENBQWlCLEtBQUt2QixLQUF0QjtBQUNELFdBUEQsTUFRSztBQUNId0IscUJBQVNDLE1BQVQ7QUFDRDtBQUNGLFM7O3dCQUVEQyxPLHNCQUFVO0FBQ1JDLGVBQUtDLElBQUwsQ0FBVUMsU0FBVixDQUNJO0FBQ0FDLHVCQUFXLEtBQUtsQyxTQURoQjtBQUVBbUMsbUJBQU8sS0FBS2xDLE1BQUwsQ0FBWW1DLElBQVosQ0FBaUIsR0FBakIsQ0FGUDtBQUdBQyx1QkFBVztBQUhYLFdBREosRUFNRUMsZ0JBTkY7QUFPRCxTOzt3QkFFRFosUyxzQkFBVVgsSSxFQUFNO0FBQ2QsZUFBS1UsaUJBQUw7QUFDQSxjQUFJLEtBQUtWLElBQUwsQ0FBVVosTUFBVixDQUFpQm9DLE1BQWpCLEdBQTBCLENBQTlCLEVBQWlDO0FBQy9CLGlCQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLekIsSUFBTCxDQUFVWixNQUFWLENBQWlCb0MsTUFBckMsRUFBNkNDLEdBQTdDLEVBQWtEO0FBQ2hELGtCQUFJQyxPQUFPLEtBQUsxQixJQUFMLENBQVVaLE1BQVYsQ0FBaUJxQyxDQUFqQixFQUFvQkMsSUFBL0I7QUFDQSxrQkFBSUEsUUFBUSxPQUFSLElBQW1CQSxRQUFRLE1BQS9CLEVBQXVDO0FBQ3JDLHFCQUFLdEMsTUFBTCxDQUFZdUMsSUFBWixDQUFpQixLQUFLM0IsSUFBTCxDQUFVWixNQUFWLENBQWlCcUMsQ0FBakIsRUFBb0JDLElBQXJDO0FBQ0Q7QUFDRjtBQUNGLFdBUEQsTUFPTztBQUNIRSxvQkFBUUMsR0FBUixDQUFZLHNCQUFaO0FBQ0g7QUFDRixTOzt3QkFFRGpCLFcsd0JBQVl2QixLLEVBQU87QUFDakIsZUFBS0ssS0FBTCxHQUFhLEVBQWI7QUFDQSxlQUFLTCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxjQUFJbUIsT0FBTyxJQUFYO0FBQ0EsZUFBS2YsT0FBTCxHQUFlLENBQWY7QUFDQXFDLFlBQUVDLElBQUYsQ0FBTztBQUNIQyxpQkFBSyxvRUFBa0UzQyxLQURwRTtBQUVINEMscUJBQVMsRUFBRSxpQkFBaUIsS0FBS3BDLEtBQXhCO0FBRk4sV0FBUCxFQUdHcUMsSUFISCxDQUdRLFVBQVVsQyxJQUFWLEVBQWlCO0FBQ3JCUSxpQkFBS2hCLFFBQUwsR0FBZ0JRLEtBQUtSLFFBQXJCO0FBQ0FnQixpQkFBSzJCLFVBQUwsQ0FBZ0IzQixLQUFLaEIsUUFBckI7QUFDQXNDLGNBQUUsb0JBQUYsRUFBd0JNLElBQXhCO0FBQ0gsV0FQRDtBQVFELFM7O3dCQUdERCxVLHVCQUFXM0MsUSxFQUFVO0FBQ25CLGNBQUlnQixPQUFPLElBQVg7O0FBRUEsY0FBSSxDQUFDQSxLQUFLaEIsUUFBTCxDQUFjZ0IsS0FBS2YsT0FBbkIsQ0FBRCxJQUFnQ2UsS0FBS2YsT0FBTCxJQUFnQixFQUFwRCxFQUF3RDtBQUNwRDtBQUNIO0FBQ0QsY0FBSTRDLEtBQUs3QyxTQUFTZ0IsS0FBS2YsT0FBZCxFQUF1QjRDLEVBQWhDOztBQUVBUCxZQUFFQyxJQUFGLENBQU87QUFDSEMsaUJBQUssMkRBQXlESyxFQUQzRDtBQUVISixxQkFBUyxFQUFFLGlCQUFpQnBDLEtBQW5CO0FBRk4sV0FBUCxFQUdHcUMsSUFISCxDQUdRLFVBQVVsQyxJQUFWLEVBQWlCOztBQUVyQixnQkFBSXNDLE9BQU8sRUFBWDtBQUNBQSxpQkFBSzFDLE9BQUwsR0FBZUksS0FBS3VDLE9BQXBCO0FBQ0FELGlCQUFLRCxFQUFMLEdBQVVBLEVBQVY7QUFDQUMsaUJBQUtsQyxJQUFMLEdBQVlJLEtBQUtnQyxTQUFMLENBQWV4QyxLQUFLdUMsT0FBTCxDQUFhTixPQUE1QixFQUFxQyxNQUFyQyxDQUFaO0FBQ0FLLGlCQUFLbkMsT0FBTCxHQUFlSyxLQUFLZ0MsU0FBTCxDQUFleEMsS0FBS3VDLE9BQUwsQ0FBYU4sT0FBNUIsRUFBcUMsU0FBckMsQ0FBZjtBQUNBSyxpQkFBS2pDLElBQUwsR0FBWUcsS0FBS2dDLFNBQUwsQ0FBZXhDLEtBQUt1QyxPQUFMLENBQWFOLE9BQTVCLEVBQXFDLE1BQXJDLENBQVo7QUFDQUssaUJBQUtHLE1BQUwsR0FBY1gsRUFBRVksT0FBRixDQUFVLFFBQVYsRUFBb0IxQyxLQUFLMkMsUUFBekIsSUFBcUMsQ0FBQyxDQUFwRDtBQUNBbkMsaUJBQUtkLEtBQUwsQ0FBV2lDLElBQVgsQ0FBZ0JXLElBQWhCO0FBQ0E5QixpQkFBS2YsT0FBTDtBQUNBZSxpQkFBSzJCLFVBQUwsQ0FBZ0IzQyxRQUFoQjtBQUNILFdBZkQ7QUFpQkQsUzs7d0JBRURnRCxTLHNCQUFVUCxPLEVBQVNXLEssRUFBTztBQUN4QixjQUFJQyxTQUFTLEVBQWI7QUFDQWYsWUFBRWdCLElBQUYsQ0FBT2IsT0FBUCxFQUFnQixZQUFVO0FBQ3hCLGdCQUFHLEtBQUtQLElBQUwsS0FBY2tCLEtBQWpCLEVBQXVCO0FBQ3JCQyx1QkFBUyxLQUFLRSxLQUFkO0FBQ0Q7QUFDRixXQUpEO0FBS0EsaUJBQU9GLE1BQVA7QUFDRCxTOzt3QkFFREcsTyxvQkFBUXpELE8sRUFBUztBQUNiLGNBQUkwRCxjQUFjLEVBQWxCO0FBQ0EsY0FBRyxPQUFPMUQsUUFBUTJELEtBQWYsS0FBeUIsV0FBNUIsRUFBeUM7QUFDdkNELDBCQUFjMUQsUUFBUTRELElBQVIsQ0FBYW5ELElBQTNCO0FBQ0QsV0FGRCxNQUdLO0FBQ0hpRCwwQkFBYyxLQUFLRyxXQUFMLENBQWlCN0QsUUFBUTJELEtBQXpCLENBQWQ7QUFDRDtBQUNERCx3QkFBY0EsWUFBWUksT0FBWixDQUFvQixJQUFwQixFQUEwQixHQUExQixFQUErQkEsT0FBL0IsQ0FBdUMsSUFBdkMsRUFBNkMsR0FBN0MsRUFBa0RBLE9BQWxELENBQTBELEtBQTFELEVBQWlFLEVBQWpFLENBQWQ7QUFDQSxpQkFBT0MsbUJBQW1CQyxPQUFPQyxPQUFPQyxJQUFQLENBQVlSLFdBQVosQ0FBUCxDQUFuQixDQUFQO0FBQ0gsUzs7d0JBRURHLFcsd0JBQVlNLEcsRUFBSztBQUNiLGVBQUksSUFBSUMsSUFBSSxDQUFaLEVBQWVBLEtBQUtELElBQUlsQyxNQUF4QixFQUFnQ21DLEdBQWhDLEVBQXFDO0FBQ25DLGdCQUFHLE9BQU9ELElBQUlDLENBQUosRUFBT1QsS0FBZCxLQUF3QixXQUEzQixFQUF3QztBQUN0QyxrQkFBR1EsSUFBSUMsQ0FBSixFQUFPQyxRQUFQLEtBQW9CLFdBQXZCLEVBQW9DO0FBQ2xDLHVCQUFPRixJQUFJQyxDQUFKLEVBQU9SLElBQVAsQ0FBWW5ELElBQW5CO0FBQ0Q7QUFDRixhQUpELE1BS0s7QUFDSCxxQkFBTyxLQUFLb0QsV0FBTCxDQUFpQk0sSUFBSUMsQ0FBSixFQUFPVCxLQUF4QixDQUFQO0FBQ0Q7QUFDRjtBQUNELGlCQUFPLEVBQVA7QUFDSCxTOzt3QkFFRFcsVyx3QkFBWXhCLEUsRUFBSTs7QUFFZCxjQUFJeUIsU0FBU2hDLEVBQUVpQyxJQUFGLENBQU8sS0FBS3JFLEtBQVosRUFBbUIsVUFBU3NFLENBQVQsRUFBVztBQUFFLG1CQUFPQSxFQUFFM0IsRUFBRixJQUFRQSxFQUFmO0FBQW9CLFdBQXBELENBQWI7O0FBRUEsZUFBS25DLFlBQUwsQ0FBa0JDLE9BQWxCLEdBQTRCMkQsT0FBTyxDQUFQLEVBQVUzRCxPQUF0QztBQUNBLGVBQUtELFlBQUwsQ0FBa0JFLElBQWxCLEdBQXlCMEQsT0FBTyxDQUFQLEVBQVUxRCxJQUFuQztBQUNBLGVBQUtGLFlBQUwsQ0FBa0JHLElBQWxCLEdBQXlCeUQsT0FBTyxDQUFQLEVBQVV6RCxJQUFuQzs7QUFFQSxjQUFJNEQsT0FBT25DLEVBQUUsa0JBQUYsRUFBc0IsQ0FBdEIsRUFBeUJvQyxhQUF6QixDQUF1Q0MsUUFBbEQ7QUFDQXJDLFlBQUUsTUFBRixFQUFVbUMsSUFBVixFQUFnQkcsSUFBaEIsQ0FBcUIsS0FBS3BCLE9BQUwsQ0FBYWMsT0FBTyxDQUFQLEVBQVVsRSxPQUF2QixDQUFyQjs7QUFFQWtDLFlBQUUsT0FBRixFQUNHdUMsSUFESCxDQUNRLE9BRFIsRUFDaUIsd0NBRGpCLEVBRUdDLE9BRkgsQ0FFVyxFQUFDQyxTQUFTLENBQVYsRUFGWDtBQUdBekMsWUFBRSxNQUFGLEVBQVV1QyxJQUFWLENBQWUsT0FBZixFQUF1Qix5QkFBdkI7O0FBRUEsZUFBS0csZ0JBQUwsQ0FBc0JuQyxFQUF0QjtBQUNELFM7O3dCQUVEb0MsVSx5QkFBYTs7QUFFWDNDLFlBQUUsa0JBQUYsRUFBc0J1QyxJQUF0QixDQUEyQixPQUEzQixFQUFtQyx5QkFBbkM7QUFDQSxjQUFJSixPQUFPbkMsRUFBRSxrQkFBRixFQUFzQixDQUF0QixFQUF5Qm9DLGFBQXpCLENBQXVDQyxRQUFsRDtBQUNBckMsWUFBRSxNQUFGLEVBQVVtQyxJQUFWLEVBQWdCSyxPQUFoQixDQUF3QjtBQUN0QkksdUJBQVc7QUFEVyxXQUF4QixFQUVHLEdBRkg7QUFHRCxTOzt3QkFFREMsSyxvQkFBUTs7QUFFTixjQUFJdkUsT0FBTyxLQUFLRixZQUFMLENBQWtCRSxJQUE3QjtBQUNBLGNBQUdBLEtBQUt3RSxRQUFMLENBQWMsR0FBZCxDQUFILEVBQXVCO0FBQ3JCeEUsbUJBQU9BLEtBQUt5RSxTQUFMLENBQWV6RSxLQUFLMEUsV0FBTCxDQUFpQixHQUFqQixJQUFzQixDQUFyQyxFQUF1QzFFLEtBQUswRSxXQUFMLENBQWlCLEdBQWpCLENBQXZDLENBQVA7QUFDRDtBQUNELGVBQUs1RSxZQUFMLENBQWtCNkUsVUFBbEIsR0FBK0IzRSxJQUEvQjtBQUNBLGVBQUtGLFlBQUwsQ0FBa0JDLE9BQWxCLEdBQTRCLFNBQVMsS0FBS0QsWUFBTCxDQUFrQkMsT0FBdkQ7O0FBRUEyQixZQUFFLE1BQUYsRUFBVXVDLElBQVYsQ0FBZSxPQUFmLEVBQXVCLHlCQUF2QjtBQUNBdkMsWUFBRSxZQUFGLEVBQWdCdUMsSUFBaEIsQ0FBcUIsT0FBckIsRUFBNkIseUJBQTdCO0FBRUQsUzs7d0JBRURXLEksbUJBQVE7O0FBRU4sY0FBSXhFLE9BQU8sSUFBWDs7QUFFQSxjQUFJOEIsT0FBUSwwQkFDQSxNQURBLEdBQ09SLEVBQUUsYUFBRixFQUFpQm1ELEdBQWpCLEVBRFAsR0FDOEIsTUFEOUIsR0FFQSxXQUZBLEdBRVluRCxFQUFFLGtCQUFGLEVBQXNCbUQsR0FBdEIsRUFGWixHQUV3QyxVQUZ4QyxHQUlBLEVBSkEsR0FJR25ELEVBQUUsa0JBQUYsRUFBc0JtRCxHQUF0QixFQUpILEdBSStCLFVBSjNDOztBQU1BbkQsWUFBRUMsSUFBRixDQUFPO0FBQ0xtRCxrQkFBTSxNQUREO0FBRUxsRCxpQkFBSyxtRUFGQTtBQUdMQyxxQkFBUztBQUNQLCtCQUFpQixLQUFLcEMsS0FEZjtBQUVQLDhCQUFnQjtBQUZULGFBSEo7QUFPTEcsa0JBQU1zQzs7QUFQRCxXQUFQLEVBU0dKLElBVEgsQ0FTUSxZQUFXO0FBQ2pCMUIsaUJBQUsyRSxTQUFMO0FBQ0QsV0FYRCxFQVlDQyxJQVpELENBWU0sWUFBVztBQUNmeEQsb0JBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNELFdBZEQ7O0FBZ0JBQyxZQUFFLGtCQUFGLEVBQXNCdUMsSUFBdEIsQ0FBMkIsT0FBM0IsRUFBbUMseUJBQW5DO0FBRUQsUzs7d0JBRURnQixTLHdCQUFhO0FBQ1gsZUFBS25GLFlBQUwsR0FBb0I7QUFDbEJDLHFCQUFTLEVBRFM7QUFFbEJDLGtCQUFNLEVBRlk7QUFHbEJDLGtCQUFNO0FBSFksV0FBcEI7QUFLQXlCLFlBQUUsWUFBRixFQUFnQnVDLElBQWhCLENBQXFCLE9BQXJCLEVBQTZCLHlCQUE3QjtBQUNELFM7O3dCQUVEYyxTLHdCQUFZO0FBQ1YsZUFBS25HLGFBQUwsQ0FBbUJzRyxJQUFuQixDQUF3QixFQUFDQyxXQUFXekcsTUFBWixFQUFvQjBHLE9BQU8sMEJBQTNCLEVBQXhCLEVBQWlGQyxJQUFqRixDQUFzRixvQkFBWTtBQUM5RjdELG9CQUFRQyxHQUFSLENBQVk2RCxRQUFaOztBQUVBLGdCQUFJLENBQUNBLFNBQVNDLFlBQWQsRUFBNEI7QUFDMUIvRCxzQkFBUUMsR0FBUixDQUFZLElBQVo7QUFDRCxhQUZELE1BRU87QUFDTEQsc0JBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0Q7QUFDREQsb0JBQVFDLEdBQVIsQ0FBWTZELFNBQVNFLE1BQXJCO0FBQ0gsV0FURDtBQVVELFM7O3dCQUVEbEYsaUIsZ0NBQW9CO0FBQ2xCLGNBQUlGLE9BQU8sSUFBWDs7QUFFQXNCLFlBQUVDLElBQUYsQ0FBTztBQUNMQyxpQkFBSywyREFEQTtBQUVMQyxxQkFBUyxFQUFFLGlCQUFpQixLQUFLcEMsS0FBeEI7QUFGSixXQUFQLEVBR0dxQyxJQUhILENBR1EsVUFBVWxDLElBQVYsRUFBaUI7QUFDdkIsZ0JBQUdRLEtBQUtiLGNBQUwsSUFBdUJLLEtBQUs2RixjQUEvQixFQUErQztBQUM3Q3JGLG1CQUFLYixjQUFMLEdBQXNCSyxLQUFLNkYsY0FBM0I7QUFDQXJGLG1CQUFLSSxXQUFMLENBQWlCSixLQUFLbkIsS0FBdEI7QUFDRDtBQUNGLFdBUkQ7QUFTRCxTOzt3QkFFRG1GLGdCLDZCQUFpQm5DLEUsRUFBSTtBQUNuQixjQUFJN0IsT0FBTyxJQUFYOztBQUVBLGNBQUlzRCxTQUFTaEMsRUFBRWlDLElBQUYsQ0FBTyxLQUFLckUsS0FBWixFQUFtQixVQUFTc0UsQ0FBVCxFQUFXO0FBQUUsbUJBQU9BLEVBQUUzQixFQUFGLElBQVFBLEVBQWY7QUFBb0IsV0FBcEQsQ0FBYjs7QUFFQSxjQUFHeUIsT0FBTyxDQUFQLEVBQVVyQixNQUFiLEVBQXFCOztBQUVuQnFCLG1CQUFPLENBQVAsRUFBVXJCLE1BQVYsR0FBbUIsS0FBbkI7O0FBRUFYLGNBQUVDLElBQUYsQ0FBTztBQUNMbUQsb0JBQU0sTUFERDtBQUVMWSx3QkFBVSxNQUZMO0FBR0w3RCx1QkFBUyxFQUFFLGlCQUFpQnBDLEtBQW5CO0FBQ0csZ0NBQWdCLGtCQURuQixFQUhKO0FBS0xtQyxtQkFBSywyREFBeURLLEVBQXpELEdBQTRELFNBTDVEO0FBTUxyQyxvQkFBTStGLEtBQUtDLFNBQUwsQ0FBZSxFQUFDLGtCQUFpQixDQUFDLFFBQUQsQ0FBbEIsRUFBZjtBQU5ELGFBQVAsRUFRQzlELElBUkQsQ0FRTSxVQUFVbEMsSUFBVixFQUFpQjtBQUNyQlEsbUJBQUtiLGNBQUw7QUFDRCxhQVZELEVBV0N5RixJQVhELENBV00sWUFBVTtBQUVkeEQsc0JBQVFDLEdBQVIsQ0FBWSw4QkFBWjtBQUNELGFBZEQ7QUFlRDtBQUVGLFMiLCJmaWxlIjoiZ21haWwuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
