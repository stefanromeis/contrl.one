'use strict';

System.register(['aurelia-framework', 'aurelia-i18n'], function (_export, _context) {
  "use strict";

  var inject, I18N, _dec, _class, Gmail;

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
      _export('Gmail', Gmail = (_dec = inject(), _dec(_class = function () {
        function Gmail() {
          _classCallCheck(this, Gmail);

          this.CLIENT_ID = '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com';
          this.SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'];
          this.API_KEY = ['AIzaSyDkNvkPgkC60vrb0OGvSwg12i0sjHANaYU'];
          this.authObj;
          this.data = undefined;
          this.labels = [];
          this.label = 'INBOX';
          this.connected = false;
          this.message = '';
          this.messages = '';
          this.content = "undefined";
          this.counter = 0;
          this.mails = [];
          this.content = "undefined";
        }

        Gmail.prototype.attached = function attached() {
          this.data = gmailData;
          this.token = localStorage.getItem('gmail.token');

          if (this.data) {

            this.connected = true;
            $('.gmail-connect-btn').hide();
            this.getLabels(this.data);
            this.getMessages(this.label);
            this.getMessage();
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
          $('.gmail-connect-btn').hide();
          return false;
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

            self.message = data;


            var mail = {};

            mail.content = data.payload;


            mail.id = id;
            mail.from = self.getHeader(self.message.payload.headers, 'From');
            mail.subject = self.getHeader(self.message.payload.headers, 'Subject');
            mail.date = self.getHeader(self.message.payload.headers, 'Date');

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

        Gmail.prototype.appendMessageRow = function appendMessageRow(message) {
          $('.table-inbox tbody').append('<tr>\
            <td>' + this.getHeader(message.payload.headers, 'From') + '</td>\
            <td>\
              <a click.delegate="this.openModal(' + message.id + ')" data-toggle="modal">' + this.getHeader(message.payload.headers, 'Subject') + '\
              </a>\
            </td>\
            <td>' + this.getHeader(message.payload.headers, 'Date') + '</td>\
          </tr>');
        };

        Gmail.prototype.openModal = function openModal(id) {

          console.log('mails ', this.mails);

          var result = $.grep(this.mails, function (e) {
            return e.id == id;
          });

          console.log('res ', result);

          var ifrm = $('#message-content')[0].contentWindow.document;
          $('body', ifrm).html(this.getBody(result[0].content));

          $('.fade').attr('style', 'display: block !important; opacity: 0;').animate({ opacity: 1 });
          $('.mod').attr('style', 'display:flex !important');
        };

        Gmail.prototype.closeModal = function closeModal() {
          $('.fade').attr('style', 'display: none !important; opacity: 1;').animate({ opacity: 0 });
          $('.mod').attr('style', 'display:none !important');
        };

        return Gmail;
      }()) || _class));

      _export('Gmail', Gmail);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkkxOE4iLCJHbWFpbCIsIkNMSUVOVF9JRCIsIlNDT1BFUyIsIkFQSV9LRVkiLCJhdXRoT2JqIiwiZGF0YSIsInVuZGVmaW5lZCIsImxhYmVscyIsImxhYmVsIiwiY29ubmVjdGVkIiwibWVzc2FnZSIsIm1lc3NhZ2VzIiwiY29udGVudCIsImNvdW50ZXIiLCJtYWlscyIsImF0dGFjaGVkIiwiZ21haWxEYXRhIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiJCIsImhpZGUiLCJnZXRMYWJlbHMiLCJnZXRNZXNzYWdlcyIsImdldE1lc3NhZ2UiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbm5lY3QiLCJnYXBpIiwiYXV0aCIsImF1dGhvcml6ZSIsImNsaWVudF9pZCIsInNjb3BlIiwiam9pbiIsImltbWVkaWF0ZSIsImhhbmRsZUF1dGhSZXN1bHQiLCJsZW5ndGgiLCJpIiwibmFtZSIsInB1c2giLCJjb25zb2xlIiwibG9nIiwic2hvdyIsInNlbGYiLCJhamF4IiwidXJsIiwiaGVhZGVycyIsImRvbmUiLCJpZCIsIm1haWwiLCJwYXlsb2FkIiwiZnJvbSIsImdldEhlYWRlciIsInN1YmplY3QiLCJkYXRlIiwiaW5kZXgiLCJoZWFkZXIiLCJlYWNoIiwidmFsdWUiLCJnZXRCb2R5IiwiZW5jb2RlZEJvZHkiLCJwYXJ0cyIsImJvZHkiLCJnZXRIVE1MUGFydCIsInJlcGxhY2UiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlc2NhcGUiLCJ3aW5kb3ciLCJhdG9iIiwiYXJyIiwieCIsIm1pbWVUeXBlIiwiYXBwZW5kTWVzc2FnZVJvdyIsImFwcGVuZCIsIm9wZW5Nb2RhbCIsInJlc3VsdCIsImdyZXAiLCJlIiwiaWZybSIsImNvbnRlbnRXaW5kb3ciLCJkb2N1bWVudCIsImh0bWwiLCJhdHRyIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJjbG9zZU1vZGFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7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QU8sS0FBSzBELFdBQUwsQ0FBaUJNLElBQUlDLENBQUosRUFBT1QsS0FBeEIsQ0FBUDtBQUNEO0FBQ0Y7QUFDRCxpQkFBTyxFQUFQO0FBQ0gsUzs7d0JBRURXLGdCLDZCQUFpQjlELE8sRUFBUztBQUN4QlUsWUFBRSxvQkFBRixFQUF3QnFELE1BQXhCLENBQ0k7aUJBQUEsR0FDUSxLQUFLckIsU0FBTCxDQUFlMUMsUUFBUXdDLE9BQVIsQ0FBZ0JKLE9BQS9CLEVBQXdDLE1BQXhDLENBRFIsR0FDd0Q7O2lEQUR4RCxHQUd3Q3BDLFFBQVFzQyxFQUhoRCxHQUdtRCx5QkFIbkQsR0FHK0UsS0FBS0ksU0FBTCxDQUFlMUMsUUFBUXdDLE9BQVIsQ0FBZ0JKLE9BQS9CLEVBQXdDLFNBQXhDLENBSC9FLEdBR29JOzs7aUJBSHBJLEdBTVEsS0FBS00sU0FBTCxDQUFlMUMsUUFBUXdDLE9BQVIsQ0FBZ0JKLE9BQS9CLEVBQXdDLE1BQXhDLENBTlIsR0FNd0Q7Z0JBUDVEO0FBVUQsUzs7d0JBRUQ0QixTLHNCQUFVMUIsRSxFQUFJOztBQUVaUixrQkFBUUMsR0FBUixDQUFZLFFBQVosRUFBc0IsS0FBSzNCLEtBQTNCOztBQUVBLGNBQUk2RCxTQUFTdkQsRUFBRXdELElBQUYsQ0FBTyxLQUFLOUQsS0FBWixFQUFtQixVQUFTK0QsQ0FBVCxFQUFXO0FBQUUsbUJBQU9BLEVBQUU3QixFQUFGLElBQVFBLEVBQWY7QUFBb0IsV0FBcEQsQ0FBYjs7QUFFQVIsa0JBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9Ca0MsTUFBcEI7O0FBRUEsY0FBSUcsT0FBTzFELEVBQUUsa0JBQUYsRUFBc0IsQ0FBdEIsRUFBeUIyRCxhQUF6QixDQUF1Q0MsUUFBbEQ7QUFDQTVELFlBQUUsTUFBRixFQUFVMEQsSUFBVixFQUFnQkcsSUFBaEIsQ0FBcUIsS0FBS3RCLE9BQUwsQ0FBYWdCLE9BQU8sQ0FBUCxFQUFVL0QsT0FBdkIsQ0FBckI7O0FBR0FRLFlBQUUsT0FBRixFQUNHOEQsSUFESCxDQUNRLE9BRFIsRUFDaUIsd0NBRGpCLEVBRUdDLE9BRkgsQ0FFVyxFQUFDQyxTQUFTLENBQVYsRUFGWDtBQUdBaEUsWUFBRSxNQUFGLEVBQVU4RCxJQUFWLENBQWUsT0FBZixFQUF1Qix5QkFBdkI7QUFFRCxTOzt3QkFDREcsVSx5QkFBYTtBQUNYakUsWUFBRSxPQUFGLEVBQ0c4RCxJQURILENBQ1EsT0FEUixFQUNpQix1Q0FEakIsRUFFR0MsT0FGSCxDQUVXLEVBQUNDLFNBQVMsQ0FBVixFQUZYO0FBR0FoRSxZQUFFLE1BQUYsRUFBVThELElBQVYsQ0FBZSxPQUFmLEVBQXVCLHlCQUF2QjtBQUNELFMiLCJmaWxlIjoiZ21haWwuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
