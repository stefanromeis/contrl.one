'use strict';

System.register(['aurelia-framework', 'aurelia-i18n', 'js-base64'], function (_export, _context) {
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
    }, function (_jsBase) {}],
    execute: function () {
      _export('Gmail', Gmail = (_dec = inject(Base64), _dec(_class = function () {
        function Gmail(Base64dal) {
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
          this.Base64 = Base64;
          console.log('bsae64: ', this.base64);
          this.messageContent = '...';

          this.content = {
            from: "from",
            subject: "sub",
            data: "MailContent",
            date: "date"
          };
          this.showModal = true;
        }

        Gmail.prototype.attached = function attached() {
          this.data = gmailData;
          this.token = localStorage.getItem('gmail.token');

          if (this.data) {
            this.connected = true;
            $('.gmail-connect-btn').hide();
            this.getLabels(this.data);
            this.getMessages(this.label);
            this.getMessage(this.messages[0].id);
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
          this.label = label;
          var self = this;
          $.ajax({
            url: 'https://www.googleapis.com/gmail/v1/users/me/messages?labelIds=' + label,
            headers: { 'authorization': this.token }
          }).done(function (data) {
            this.messages = data.messages;

            self.getMessage(this.messages[0].id);
          });
        };

        Gmail.prototype.getMessage = function getMessage(id) {
          var self = this;
          $.ajax({
            url: 'https://www.googleapis.com/gmail/v1/users/me/messages/' + id,

            headers: { 'authorization': token }
          }).done(function (data) {
            self.message = data;

            if (self.message.payload.parts) {
              var bodyData = self.message.payload.parts[0].body.data;
            } else {
              var bodyData = self.message.payload.body.data;
            }


            var html = Base64.decode(bodyData).replace(/\r\n|\r|\n/g, '<br />').replace(/!important/g, ' ');

            self.content.data = html;
            console.log(self.content.data);
          });
        };

        return Gmail;
      }()) || _class));

      _export('Gmail', Gmail);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkkxOE4iLCJHbWFpbCIsIkJhc2U2NCIsIkJhc2U2NGRhbCIsIkNMSUVOVF9JRCIsIlNDT1BFUyIsIkFQSV9LRVkiLCJhdXRoT2JqIiwiZGF0YSIsInVuZGVmaW5lZCIsImxhYmVscyIsImxhYmVsIiwiY29ubmVjdGVkIiwibWVzc2FnZSIsImNvbnNvbGUiLCJsb2ciLCJiYXNlNjQiLCJtZXNzYWdlQ29udGVudCIsImNvbnRlbnQiLCJmcm9tIiwic3ViamVjdCIsImRhdGUiLCJzaG93TW9kYWwiLCJhdHRhY2hlZCIsImdtYWlsRGF0YSIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIiQiLCJoaWRlIiwiZ2V0TGFiZWxzIiwiZ2V0TWVzc2FnZXMiLCJnZXRNZXNzYWdlIiwibWVzc2FnZXMiLCJpZCIsImNvbm5lY3QiLCJnYXBpIiwiYXV0aCIsImF1dGhvcml6ZSIsImNsaWVudF9pZCIsInNjb3BlIiwiam9pbiIsImltbWVkaWF0ZSIsImhhbmRsZUF1dGhSZXN1bHQiLCJsZW5ndGgiLCJpIiwibmFtZSIsInB1c2giLCJzZWxmIiwiYWpheCIsInVybCIsImhlYWRlcnMiLCJkb25lIiwicGF5bG9hZCIsInBhcnRzIiwiYm9keURhdGEiLCJib2R5IiwiaHRtbCIsImRlY29kZSIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxZLHFCQUFBQSxNOztBQUNBQyxVLGdCQUFBQSxJOzs7dUJBS0tDLEssV0FEWkYsT0FBT0csTUFBUCxDO0FBRUcsdUJBQVlDLFNBQVosRUFBdUI7QUFBQTs7QUFDbkIsZUFBS0MsU0FBTCxHQUFpQiwwRUFBakI7QUFDQSxlQUFLQyxNQUFMLEdBQWMsQ0FBQyxnREFBRCxFQUFtRCw0Q0FBbkQsQ0FBZDtBQUNBLGVBQUtDLE9BQUwsR0FBZSxDQUFDLHlDQUFELENBQWY7QUFDQSxlQUFLQyxPQUFMO0FBQ0EsZUFBS0MsSUFBTCxHQUFZQyxTQUFa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
