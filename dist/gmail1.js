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
        function Gmail(Base64) {
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
                console.log('labels - ', this.data.labels);
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
            console.log('messages', this.messages);
            self.getMessage(this.messages[0].id);
            console.log('message id', this.messages[0].id);
          });
        };

        Gmail.prototype.getMessage = function getMessage(id) {
          var self = this;
          $.ajax({
            url: 'https://www.googleapis.com/gmail/v1/users/me/messages/' + id,
            headers: { 'authorization': token }
          }).done(function (data) {
            self.message = data;
            console.log('snippet', self.message);

            alert('ishtml');
            console.log('is html');

            var ifrm = $('#message-content');
            $('body', ifrm).html(self.getBody(self.message.payload));
          });
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

        Gmail.prototype.getHTMLPart = function (_getHTMLPart) {
          function getHTMLPart(_x) {
            return _getHTMLPart.apply(this, arguments);
          }

          getHTMLPart.toString = function () {
            return _getHTMLPart.toString();
          };

          return getHTMLPart;
        }(function (arr) {
          for (var x = 0; x <= arr.length; x++) {
            if (typeof arr[x].parts === 'undefined') {
              if (arr[x].mimeType === 'text/html') {
                return arr[x].body.data;
              }
            } else {
              return getHTMLPart(arr[x].parts);
            }
          }
          return '';
        });

        return Gmail;
      }()) || _class));

      _export('Gmail', Gmail);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsMS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJJMThOIiwiR21haWwiLCJCYXNlNjQiLCJDTElFTlRfSUQiLCJTQ09QRVMiLCJBUElfS0VZIiwiYXV0aE9iaiIsImRhdGEiLCJ1bmRlZmluZWQiLCJsYWJlbHMiLCJsYWJlbCIsImNvbm5lY3RlZCIsIm1lc3NhZ2UiLCJjb25zb2xlIiwibG9nIiwiYmFzZTY0IiwibWVzc2FnZUNvbnRlbnQiLCJhdHRhY2hlZCIsImdtYWlsRGF0YSIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIiQiLCJoaWRlIiwiZ2V0TGFiZWxzIiwiZ2V0TWVzc2FnZXMiLCJnZXRNZXNzYWdlIiwibWVzc2FnZXMiLCJpZCIsImNvbm5lY3QiLCJnYXBpIiwiYXV0aCIsImF1dGhvcml6ZSIsImNsaWVudF9pZCIsInNjb3BlIiwiam9pbiIsImltbWVkaWF0ZSIsImhhbmRsZUF1dGhSZXN1bHQiLCJsZW5ndGgiLCJpIiwibmFtZSIsInB1c2giLCJzZWxmIiwiYWpheCIsInVybCIsImhlYWRlcnMiLCJkb25lIiwiYWxlcnQiLCJpZnJtIiwiaHRtbCIsImdldEJvZHkiLCJwYXlsb2FkIiwiZW5jb2RlZEJvZHkiLCJwYXJ0cyIsImJvZHkiLCJnZXRIVE1MUGFydCIsInJlcGxhY2UiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlc2NhcGUiLCJ3aW5kb3ciLCJhdG9iIiwiYXJyIiwieCIsIm1pbWVUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsWSxxQkFBQUEsTTs7QUFDQUMsVSxnQkFBQUEsSTs7O3VCQUtLQyxLLFdBRFpGLE9BQU9HLE1BQVAsQztBQUVHLHVCQUFZQSxNQUFaLEVBQW9CO0FBQUE7O0FBQ2hCLGVBQUtDLFNBQUwsR0FBaUIsMEVBQWpCO0FBQ0EsZUFBS0MsTUFBTCxHQUFjLENBQUMsZ0RBQUQsRUFBbUQsNENBQW5ELENBQWQ7QUFDQSxlQUFLQyxPQUFMLEdBQWUsQ0FBQyx5Q0FBRCxDQUFm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QUYsQ0FBTztBQUNIQyxpQkFBSywyREFBeURoQixFQUQzRDtBQUVIaUIscUJBQVMsRUFBRSxpQkFBaUIxQixLQUFuQjtBQUZOLFdBQVAsRUFHRzJCLElBSEgsQ0FHUSxVQUFVdkMsSUFBVixFQUFpQjtBQUNyQm1DLGlCQUFLOUIsT0FBTCxHQUFlTCxJQUFmO0FBQ0FNLG9CQUFRQyxHQUFSLENBQVksU0FBWixFQUF1QjRCLEtBQUs5QixPQUE1Qjs7QUFNRW1DLGtCQUFNLFFBQU47QUFDQWxDLG9CQUFRQyxHQUFSLENBQVksU0FBWjs7QUFFQSxnQkFBSWtDLE9BQU8xQixFQUFFLGtCQUFGLENBQVg7QUFDQUEsY0FBRSxNQUFGLEVBQVUwQixJQUFWLEVBQWdCQyxJQUFoQixDQUFxQlAsS0FBS1EsT0FBTCxDQUFhUixLQUFLOUIsT0FBTCxDQUFhdUMsT0FBMUIsQ0FBckI7QUFRTCxXQXZCRDtBQXlCRCxTOzt3QkFFREQsTyxvQkFBUXRDLE8sRUFBUztBQUNiLGNBQUl3QyxjQUFjLEVBQWxCO0FBQ0EsY0FBRyxPQUFPeEMsUUFBUXlDLEtBQWYsS0FBeUIsV0FBNUIsRUFDQTtBQUNFRCwwQkFBY3hDLFFBQVEwQyxJQUFSLENBQWEvQyxJQUEzQjtBQUNELFdBSEQsTUFLQTtBQUNFNkMsMEJBQWMsS0FBS0csV0FBTCxDQUFpQjNDLFFBQVF5QyxLQUF6QixDQUFkO0FBQ0Q7QUFDREQsd0JBQWNBLFlBQVlJLE9BQVosQ0FBb0IsSUFBcEIsRUFBMEIsR0FBMUIsRUFBK0JBLE9BQS9CLENBQXVDLElBQXZDLEVBQTZDLEdBQTdDLEVBQWtEQSxPQUFsRCxDQUEwRCxLQUExRCxFQUFpRSxFQUFqRSxDQUFkO0FBQ0EsaUJBQU9DLG1CQUFtQkMsT0FBT0MsT0FBT0MsSUFBUCxDQUFZUixXQUFaLENBQVAsQ0FBbkIsQ0FBUDtBQUNELFM7O3dCQUVERyxXOzs7Ozs7Ozs7O29CQUFZTSxHLEVBQUs7QUFDZixlQUFJLElBQUlDLElBQUksQ0FBWixFQUFlQSxLQUFLRCxJQUFJdkIsTUFBeEIsRUFBZ0N3QixHQUFoQyxFQUNBO0FBQ0UsZ0JBQUcsT0FBT0QsSUFBSUMsQ0FBSixFQUFPVCxLQUFkLEtBQXdCLFdBQTNCLEVBQ0E7QUFDRSxrQkFBR1EsSUFBSUMsQ0FBSixFQUFPQyxRQUFQLEtBQW9CLFdBQXZCLEVBQ0E7QUFDRSx1QkFBT0YsSUFBSUMsQ0FBSixFQUFPUixJQUFQLENBQVkvQyxJQUFuQjtBQUNEO0FBQ0YsYUFORCxNQVFBO0FBQ0UscUJBQU9nRCxZQUFZTSxJQUFJQyxDQUFKLEVBQU9ULEtBQW5CLENBQVA7QUFDRDtBQUNGO0FBQ0QsaUJBQU8sRUFBUDtBQUNELFMiLCJmaWxlIjoiZ21haWwxLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
