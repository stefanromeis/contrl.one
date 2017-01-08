'use strict';

System.register(['aurelia-framework', 'aurelia-i18n'], function (_export, _context) {
  "use strict";

  var inject, I18N, Gmail;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaI18n) {
      I18N = _aureliaI18n.I18N;
    }],
    execute: function () {
      _export('Gmail', Gmail = function () {
        function Gmail() {
          _classCallCheck(this, Gmail);

          this.CLIENT_ID = '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com';
          this.SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'];
          this.API_KEY = ['AIzaSyDkNvkPgkC60vrb0OGvSwg12i0sjHANaYU'];
          this.authObj;
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
          this.modalMessage = {
            subject: "",
            from: "",
            date: ""
          };
          this.showReplyMod = true;
          if (gmailData) {
            this.attached();
          }
        }

        Gmail.prototype.attached = function attached() {
          this.data = gmailData;
          if (this.data) {
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
          $('.modal').show();
          this.mails = [];
          this.label = label;
          var self = this;
          $.ajax({
            url: 'https://www.googleapis.com/gmail/v1/users/me/messages?labelIds=' + label,
            headers: { 'authorization': this.token }
          }).done(function (data) {
            self.messages = data.messages;
            self.counter = 0;
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
            console.log('Email Successfully send');
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

        return Gmail;
      }());

      _export('Gmail', Gmail);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkkxOE4iLCJHbWFpbCIsIkNMSUVOVF9JRCIsIlNDT1BFUyIsIkFQSV9LRVkiLCJhdXRoT2JqIiwibGFiZWxzIiwibGFiZWwiLCJjb25uZWN0ZWQiLCJtZXNzYWdlIiwibWVzc2FnZXMiLCJjb3VudGVyIiwibWFpbHMiLCJjb250ZW50IiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29uc29sZSIsImxvZyIsIm1vZGFsTWVzc2FnZSIsInN1YmplY3QiLCJmcm9tIiwiZGF0ZSIsInNob3dSZXBseU1vZCIsImdtYWlsRGF0YSIsImF0dGFjaGVkIiwiZGF0YSIsImdldExhYmVscyIsImdldE1lc3NhZ2VzIiwibG9jYXRpb24iLCJyZWxvYWQiLCJjb25uZWN0IiwiZ2FwaSIsImF1dGgiLCJhdXRob3JpemUiLCJjbGllbnRfaWQiLCJzY29wZSIsImpvaW4iLCJpbW1lZGlhdGUiLCJoYW5kbGVBdXRoUmVzdWx0IiwibGVuZ3RoIiwiaSIsIm5hbWUiLCJwdXNoIiwiJCIsInNob3ciLCJzZWxmIiwiYWpheCIsInVybCIsImhlYWRlcnMiLCJkb25lIiwiZ2V0TWVzc2FnZSIsImhpZGUiLCJpZCIsIm1haWwiLCJwYXlsb2FkIiwiZ2V0SGVhZGVyIiwiaW5kZXgiLCJoZWFkZXIiLCJlYWNoIiwidmFsdWUiLCJnZXRCb2R5IiwiZW5jb2RlZEJvZHkiLCJwYXJ0cyIsImJvZHkiLCJnZXRIVE1MUGFydCIsInJlcGxhY2UiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlc2NhcGUiLCJ3aW5kb3ciLCJhdG9iIiwiYXJyIiwieCIsIm1pbWVUeXBlIiwib3Blbk1lc3NhZ2UiLCJyZXN1bHQiLCJncmVwIiwiZSIsImlmcm0iLCJjb250ZW50V2luZG93IiwiZG9jdW1lbnQiLCJodG1sIiwiYXR0ciIsImFuaW1hdGUiLCJvcGFjaXR5IiwiY2xvc2VNb2RhbCIsInNjcm9sbFRvcCIsInJlcGx5IiwiaW5jbHVkZXMiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsIm1haWxhZHJlc3MiLCJzZW5kIiwidmFsIiwidHlwZSIsImZhaWwiLCJ3cml0ZU1haWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxZLHFCQUFBQSxNOztBQUNBQyxVLGdCQUFBQSxJOzs7dUJBRUtDLEs7QUFDVCx5QkFBYztBQUFBOztBQUNWLGVBQUtDLFNBQUwsR0FBaUIsMEVBQWpCO0FBQ0EsZUFBS0MsTUFBTCxHQUFjLENBQUMsZ0RBQUQsRUFBbUQsNENBQW5ELENBQWQ7QUFDQSxlQUFLQyxPQUFMLEdBQWUsQ0FBQyx5Q0FBRCxDQUFmO0FBQ0EsZUFBS0MsT0FBTDtBQUNBLGVBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsZUFBS0MsS0FBTCxHQUFhLE9BQWI7QUFDQSxlQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsZUFBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxlQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsZUFBS0MsT0FBTCxHQUFlLENBQWY7QUFDQSxlQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLGVBQUtDLE9BQUwsR0FBZSxXQUFmO0FBQ0EsZUFBS0MsS0FBTCxHQUFhQyxhQUFhQyxPQUFiLENBQXFCLGFBQXJCLEtBQXVDLFdBQXBEO0FBQ0FDLGtCQUFRQyxHQUFSLENBQVksS0FBS0osS0FBakI7QUFDQSxlQUFLSyxZQUFMLEdBQW9CO0FBQ2xCQyxxQkFBUyxFQURTO0FBRWxCQyxrQkFBTSxFQUZZO0FBR2xCQyxrQkFBTTtBQUhZLFdBQXBCO0FBS0QsZUFBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNBLGNBQUdDLFNBQUgsRUFBYztBQUNYLGlCQUFLQyxRQUFMO0FBQ0Y7QUFDSDs7d0JBRURBLFEsdUJBQVk7QUFDVixlQUFLQyxJQUFMLEdBQVlGLFNBQVo7QUFDQSxjQUFHLEtBQUtFLElBQVIsRUFBYztBQUNaLGlCQUFLbEIsU0FBTCxHQUFpQixJQUFqQjtBQUNBLGlCQUFLbUIsU0FBTCxDQUFlLEtBQUtELElBQXBCO0FBQ0Es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QSxjQUFJSixPQUFPbEMsRUFBRSxrQkFBRixFQUFzQixDQUF0QixFQUF5Qm1DLGFBQXpCLENBQXVDQyxRQUFsRDtBQUNBcEMsWUFBRSxNQUFGLEVBQVVrQyxJQUFWLEVBQWdCSyxPQUFoQixDQUF3QjtBQUN0QkcsdUJBQVc7QUFEVyxXQUF4QixFQUVHLEdBRkg7QUFHRCxTOzt3QkFFREMsSyxvQkFBUTs7QUFFTixjQUFJbEUsT0FBTyxLQUFLRixZQUFMLENBQWtCRSxJQUE3QjtBQUNBLGNBQUdBLEtBQUttRSxRQUFMLENBQWMsR0FBZCxDQUFILEVBQXVCO0FBQ3JCbkUsbUJBQU9BLEtBQUtvRSxTQUFMLENBQWVwRSxLQUFLcUUsV0FBTCxDQUFpQixHQUFqQixJQUFzQixDQUFyQyxFQUF1Q3JFLEtBQUtxRSxXQUFMLENBQWlCLEdBQWpCLENBQXZDLENBQVA7QUFDRDtBQUNELGVBQUt2RSxZQUFMLENBQWtCd0UsVUFBbEIsR0FBK0J0RSxJQUEvQjtBQUNBLGVBQUtGLFlBQUwsQ0FBa0JDLE9BQWxCLEdBQTRCLFNBQVMsS0FBS0QsWUFBTCxDQUFrQkMsT0FBdkQ7O0FBRUF3QixZQUFFLE1BQUYsRUFBVXNDLElBQVYsQ0FBZSxPQUFmLEVBQXVCLHlCQUF2QjtBQUNBdEMsWUFBRSxZQUFGLEVBQWdCc0MsSUFBaEIsQ0FBcUIsT0FBckIsRUFBNkIseUJBQTdCO0FBRUQsUzs7d0JBRURVLEksbUJBQVE7O0FBRU4sY0FBSXRDLE9BQVEsMEJBQ0EsTUFEQSxHQUNPVixFQUFFLGFBQUYsRUFBaUJpRCxHQUFqQixFQURQLEdBQzhCLE1BRDlCLEdBRUEsV0FGQSxHQUVZakQsRUFBRSxrQkFBRixFQUFzQmlELEdBQXRCLEVBRlosR0FFd0MsVUFGeEMsR0FJQSxFQUpBLEdBSUdqRCxFQUFFLGtCQUFGLEVBQXNCaUQsR0FBdEIsRUFKSCxHQUkrQixVQUozQzs7QUFNQWpELFlBQUVHLElBQUYsQ0FBTztBQUNMK0Msa0JBQU0sTUFERDtBQUVMOUMsaUJBQUssbUVBRkE7QUFHTEMscUJBQVM7QUFDUCwrQkFBaUIsS0FBS25DLEtBRGY7QUFFUCw4QkFBZ0I7QUFGVCxhQUhKO0FBT0xZLGtCQUFNNEI7O0FBUEQsV0FBUCxFQVNHSixJQVRILENBU1EsWUFBVztBQUNqQmpDLG9CQUFRQyxHQUFSLENBQVkseUJBQVo7QUFDRCxXQVhELEVBWUM2RSxJQVpELENBWU0sWUFBVztBQUNmOUUsb0JBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNELFdBZEQ7O0FBZ0JBMEIsWUFBRSxrQkFBRixFQUFzQnNDLElBQXRCLENBQTJCLE9BQTNCLEVBQW1DLHlCQUFuQztBQUVELFM7O3dCQUVEYyxTLHdCQUFhO0FBQ1gsZUFBSzdFLFlBQUwsR0FBb0I7QUFDbEJDLHFCQUFTLEVBRFM7QUFFbEJDLGtCQUFNLEVBRlk7QUFHbEJDLGtCQUFNO0FBSFksV0FBcEI7QUFLQXNCLFlBQUUsWUFBRixFQUFnQnNDLElBQWhCLENBQXFCLE9BQXJCLEVBQTZCLHlCQUE3QjtBQUNELFMiLCJmaWxlIjoiZ21haWwuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
