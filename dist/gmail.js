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
          this.SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'];
          this.API_KEY = ['AIzaSyDkNvkPgkC60vrb0OGvSwg12i0sjHANaYU'];
          this.labels = [];
          this.label = 'INBOX';
          this.connected = false;
          this.message = '';
          this.messages = '';
          this.counter = 0;
          this.mails = [];
          this.content = "undefined";
          this.token = localStorage.getItem('gmail.token') || 'undefined';
          console.log(this.token);
          console.log(gmailData);
          this.data = gmailData;
          this.modalMessage = {
            subject: "",
            from: "",
            date: ""
          };
          this.showReplyMod = true;
          if (this.token !== 'undefined') {
            this.attached();
          }
        }

        Gmail.prototype.attached = function attached() {
          if (this.data !== 'undefined' && this.data.labels !== 'undefined') {
            this.connected = true;
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
          console.log('ask for it');
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
            console.log('get it');
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
          console.log(this.modalMessage.subject);
          this.modalMessage.from = result[0].from;
          this.modalMessage.date = result[0].date;

          var ifrm = $('#message-content')[0].contentWindow.document;
          $('body', ifrm).html(this.getBody(result[0].content));

          $('.fade').attr('style', 'display: block !important; opacity: 0;').animate({ opacity: 1 });
          $('.mod').attr('style', 'display:flex !important');
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

        return Gmail;
      }()) || _class));

      _export('Gmail', Gmail);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiR21haWwiLCJkaWFsb2dTZXJ2aWNlIiwiQ0xJRU5UX0lEIiwiU0NPUEVTIiwiQVBJX0tFWSIsImxhYmVscyIsImxhYmVsIiwiY29ubmVjdGVkIiwibWVzc2FnZSIsIm1lc3NhZ2VzIiwiY291bnRlciIsIm1haWxzIiwiY29udGVudCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImNvbnNvbGUiLCJsb2ciLCJnbWFpbERhdGEiLCJkYXRhIiwibW9kYWxNZXNzYWdlIiwic3ViamVjdCIsImZyb20iLCJkYXRlIiwic2hvd1JlcGx5TW9kIiwiYXR0YWNoZWQiLCJnZXRMYWJlbHMiLCJnZXRNZXNzYWdlcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29ubmVjdCIsImdhcGkiLCJhdXRoIiwiYXV0aG9yaXplIiwiY2xpZW50X2lkIiwic2NvcGUiLCJqb2luIiwiaW1tZWRpYXRlIiwiaGFuZGxlQXV0aFJlc3VsdCIsImxlbmd0aCIsImkiLCJuYW1lIiwicHVzaCIsInNlbGYiLCIkIiwiYWpheCIsInVybCIsImhlYWRlcnMiLCJkb25lIiwiZ2V0TWVzc2FnZSIsImhpZGUiLCJpZCIsIm1haWwiLCJwYXlsb2FkIiwiZ2V0SGVhZGVyIiwiaW5kZXgiLCJoZWFkZXIiLCJlYWNoIiwidmFsdWUiLCJnZXRCb2R5IiwiZW5jb2RlZEJvZHkiLCJwYXJ0cyIsImJvZHkiLCJnZXRIVE1MUGFydCIsInJlcGxhY2UiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlc2NhcGUiLCJ3aW5kb3ciLCJhdG9iIiwiYXJyIiwieCIsIm1pbWVUeXBlIiwib3Blbk1lc3NhZ2UiLCJyZXN1bHQiLCJncmVwIiwiZSIsImlmcm0iLCJjb250ZW50V2luZG93IiwiZG9jdW1lbnQiLCJodG1sIiwiYXR0ciIsImFuaW1hdGUiLCJvcGFjaXR5IiwiY2xvc2VNb2RhbCIsInNjcm9sbFRvcCIsInJlcGx5IiwiaW5jbHVkZXMiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsIm1haWxhZHJlc3MiLCJzZW5kIiwidmFsIiwidHlwZSIsIm9wZW5Nb2RhbCIsImZhaWwiLCJ3cml0ZU1haWwiLCJvcGVuIiwidmlld01vZGVsIiwibW9kZWwiLCJ0aGVuIiwicmVzcG9uc2UiLCJ3YXNDYW5jZWxsZWQiLCJvdXRwdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxtQixrQkFBQUEsYTs7QUFDQUMsWSxxQkFBQUEsTTs7QUFDQUMsVSxnQkFBQUEsSTs7QUFDQUMsWSxXQUFBQSxNOzs7dUJBSUtDLEssV0FGWkgsT0FBT0QsYUFBUCxDO0FBR0csdUJBQVlLLGFBQVosRUFBMkI7QUFBQTs7QUFDdkIsZUFBS0EsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxlQUFLQyxTQUFMLEdBQWlCLDBFQUFqQjtBQUNBLGVBQUtDLE1BQUwsR0FBYyxDQUFDLGdEQUFELEVBQW1ELDRDQUFuRCxDQUFkO0FBQ0EsZUFBS0MsT0FBTCxHQUFlLENBQUMseUNBQUQsQ0FBZjtBQUNBLGVBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsZUFBS0MsS0FBTCxHQUFhLE9BQWI7QUFDQSxlQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsZUFBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxlQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsZUFBS0MsT0FBTCxHQUFlLENBQWY7QUFDQSxlQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLGVBQUtDLE9BQUwsR0FBZSxXQUFmO0FBQ0EsZUFBS0MsS0FBTCxHQUFhQyxhQUFhQyxPQUFiLENBQXFCLGFBQXJCLEtBQXVDLFdBQXBEO0FBQ0FDLGtCQUFRQyxHQUFSLENBQVksS0FBS0osS0FBakI7QUFDQUcsa0JBQVFDLEdBQVIsQ0FBWUMsU0FBWjtBQUNBLGVBQUtDLElBQUwsR0FBWUQsU0FBWjtBQUNBLGVBQUtFLFlBQUwsR0FBb0I7QUFDbEJDLHFCQUFTLEVBRFM7QUFFbEJDLGtCQUFNLEVB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LFlBQUYsRUFBZ0JvQyxJQUFoQixDQUFxQixPQUFyQixFQUE2Qix5QkFBN0I7QUFFRCxTOzt3QkFFRFUsSSxtQkFBUTs7QUFFTixjQUFJL0MsT0FBTyxJQUFYOztBQUVBLGNBQUlTLE9BQVEsMEJBQ0EsTUFEQSxHQUNPUixFQUFFLGFBQUYsRUFBaUIrQyxHQUFqQixFQURQLEdBQzhCLE1BRDlCLEdBRUEsV0FGQSxHQUVZL0MsRUFBRSxrQkFBRixFQUFzQitDLEdBQXRCLEVBRlosR0FFd0MsVUFGeEMsR0FJQSxFQUpBLEdBSUcvQyxFQUFFLGtCQUFGLEVBQXNCK0MsR0FBdEIsRUFKSCxHQUkrQixVQUozQzs7QUFNQS9DLFlBQUVDLElBQUYsQ0FBTztBQUNMK0Msa0JBQU0sTUFERDtBQUVMOUMsaUJBQUssbUVBRkE7QUFHTEMscUJBQVM7QUFDUCwrQkFBaUIsS0FBS2xDLEtBRGY7QUFFUCw4QkFBZ0I7QUFGVCxhQUhKO0FBT0xNLGtCQUFNaUM7O0FBUEQsV0FBUCxFQVNHSixJQVRILENBU1EsWUFBVztBQUNqQkwsaUJBQUtrRCxTQUFMO0FBQ0QsV0FYRCxFQVlDQyxJQVpELENBWU0sWUFBVztBQUNmOUUsb0JBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNELFdBZEQ7O0FBZ0JBMkIsWUFBRSxrQkFBRixFQUFzQm9DLElBQXRCLENBQTJCLE9BQTNCLEVBQW1DLHlCQUFuQztBQUVELFM7O3dCQUVEZSxTLHdCQUFhO0FBQ1gsZUFBSzNFLFlBQUwsR0FBb0I7QUFDbEJDLHFCQUFTLEVBRFM7QUFFbEJDLGtCQUFNLEVBRlk7QUFHbEJDLGtCQUFNO0FBSFksV0FBcEI7QUFLQXFCLFlBQUUsWUFBRixFQUFnQm9DLElBQWhCLENBQXFCLE9BQXJCLEVBQTZCLHlCQUE3QjtBQUNELFM7O3dCQUVEYSxTLHdCQUFZO0FBQ1YsZUFBSzVGLGFBQUwsQ0FBbUIrRixJQUFuQixDQUF3QixFQUFDQyxXQUFXbEcsTUFBWixFQUFvQm1HLE9BQU8sMEJBQTNCLEVBQXhCLEVBQWlGQyxJQUFqRixDQUFzRixvQkFBWTtBQUMvRm5GLG9CQUFRQyxHQUFSLENBQVltRixRQUFaOztBQUVBLGdCQUFJLENBQUNBLFNBQVNDLFlBQWQsRUFBNEI7QUFDekJyRixzQkFBUUMsR0FBUixDQUFZLElBQVo7QUFDRixhQUZELE1BRU87QUFDSkQsc0JBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0Y7QUFDREQsb0JBQVFDLEdBQVIsQ0FBWW1GLFNBQVNFLE1BQXJCO0FBQ0YsV0FURDtBQVVGLFMiLCJmaWxlIjoiZ21haWwuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
