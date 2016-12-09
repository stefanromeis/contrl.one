'use strict';

System.register(['aurelia-framework', 'aurelia-i18n', 'js-base64'], function (_export, _context) {
  "use strict";

  var inject, I18N, _typeof, _dec, _class, Gmail;

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
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

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

            var bodyData = search('data', self.message);

            var html = Base64.decode(bodyData);

            html = html.split('�', 1);

            html = html[0];
            console.log('1', html);

            if (html.includes('</html>')) {
              console.log('is html');

              var ifrm = $('#message-content')[0].contentWindow.document;
              $('body', ifrm).html(html);
            } else {
              alert('nohtml');
              console.log('no html');
              html = html.replace(/\r\n|\r|\n/g, '<br />');

              var ifrm = $('#message-content')[0].contentWindow.document;
              $('body', ifrm).html(html);
            }
          });

          var search = function search(needle, haystack) {
            var found = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            Object.keys(haystack).forEach(function (key) {
              if (key === needle) {
                found.push(haystack[key]);
                return found;
              }
              if (_typeof(haystack[key]) === 'object') {
                search(needle, haystack[key], found);
              }
            });
            return found;
          };
        };

        return Gmail;
      }()) || _class));

      _export('Gmail', Gmail);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkkxOE4iLCJHbWFpbCIsIkJhc2U2NCIsIkNMSUVOVF9JRCIsIlNDT1BFUyIsIkFQSV9LRVkiLCJhdXRoT2JqIiwiZGF0YSIsInVuZGVmaW5lZCIsImxhYmVscyIsImxhYmVsIiwiY29ubmVjdGVkIiwibWVzc2FnZSIsImNvbnNvbGUiLCJsb2ciLCJiYXNlNjQiLCJtZXNzYWdlQ29udGVudCIsImF0dGFjaGVkIiwiZ21haWxEYXRhIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiJCIsImhpZGUiLCJnZXRMYWJlbHMiLCJnZXRNZXNzYWdlcyIsImdldE1lc3NhZ2UiLCJtZXNzYWdlcyIsImlkIiwiY29ubmVjdCIsImdhcGkiLCJhdXRoIiwiYXV0aG9yaXplIiwiY2xpZW50X2lkIiwic2NvcGUiLCJqb2luIiwiaW1tZWRpYXRlIiwiaGFuZGxlQXV0aFJlc3VsdCIsImxlbmd0aCIsImkiLCJuYW1lIiwicHVzaCIsInNlbGYiLCJhamF4IiwidXJsIiwiaGVhZGVycyIsImRvbmUiLCJib2R5RGF0YSIsInNlYXJjaCIsImh0bWwiLCJkZWNvZGUiLCJzcGxpdCIsImluY2x1ZGVzIiwiaWZybSIsImNvbnRlbnRXaW5kb3ciLCJkb2N1bWVudCIsImFsZXJ0IiwicmVwbGFjZSIsIm5lZWRsZSIsImhheXN0YWNrIiwiZm91bmQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLFkscUJBQUFBLE07O0FBQ0FDLFUsZ0JBQUFBLEk7Ozs7Ozs7Ozt1QkFLS0MsSyxXQURaRixPQUFPRyxNQUFQLEM7QUFFRyx1QkFBWUEsTUFBWixFQUFvQjtBQUFBOztBQUNoQixlQUFLQyxTQUFMLEdBQWlCLDBFQUFqQjtBQUNBLGVBQUtDLE1BQUwsR0FBYyxDQUFDLGdEQUFELEVBQW1ELDRDQUFuRCxDQUFkO0FBQ0EsZUFBS0MsT0FBTCxHQUFlLENBQUMs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LFlBQUVxQixJQUFGLENBQU87QUFDSEMsaUJBQUssMkRBQXlEaEIsRUFEM0Q7QUFFSGlCLHFCQUFTLEVBQUUsaUJBQWlCMUIsS0FBbkI7QUFGTixXQUFQLEVBR0cyQixJQUhILENBR1EsVUFBVXZDLElBQVYsRUFBaUI7QUFDckJtQyxpQkFBSzlCLE9BQUwsR0FBZUwsSUFBZjtBQUNBTSxvQkFBUUMsR0FBUixDQUFZLFNBQVosRUFBdUI0QixLQUFLOUIsT0FBNUI7O0FBRUEsZ0JBQUltQyxXQUFXQyxPQUFPLE1BQVAsRUFBZU4sS0FBSzlCLE9BQXBCLENBQWY7O0FBRUEsZ0JBQUlxQyxPQUFRL0MsT0FBT2dELE1BQVAsQ0FBY0gsUUFBZCxDQUFaOztBQUVBRSxtQkFBT0EsS0FBS0UsS0FBTCxDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsQ0FBUDs7QUFFQUYsbUJBQU9BLEtBQUssQ0FBTCxDQUFQO0FBQ0FwQyxvQkFBUUMsR0FBUixDQUFZLEdBQVosRUFBaUJtQyxJQUFqQjs7QUFJQSxnQkFBR0EsS0FBS0csUUFBTCxDQUFjLFNBQWQsQ0FBSCxFQUE2QjtBQUUzQnZDLHNCQUFRQyxHQUFSLENBQVksU0FBWjs7QUFHQSxrQkFBSXVDLE9BQU8vQixFQUFFLGtCQUFGLEVBQXNCLENBQXRCLEVBQXlCZ0MsYUFBekIsQ0FBdUNDLFFBQWxEO0FBQ0FqQyxnQkFBRSxNQUFGLEVBQVUrQixJQUFWLEVBQWdCSixJQUFoQixDQUFxQkEsSUFBckI7QUFDRCxhQVBELE1BUUs7QUFDSE8sb0JBQU0sUUFBTjtBQUNBM0Msc0JBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0FtQyxxQkFBT0EsS0FBS1EsT0FBTCxDQUFhLGFBQWIsRUFBNEIsUUFBNUIsQ0FBUDs7QUFFQSxrQkFBSUosT0FBTy9CLEVBQUUsa0JBQUYsRUFBc0IsQ0FBdEIsRUFBeUJnQyxhQUF6QixDQUF1Q0MsUUFBbEQ7QUFDQWpDLGdCQUFFLE1BQUYsRUFBVStCLElBQVYsRUFBZ0JKLElBQWhCLENBQXFCQSxJQUFyQjtBQUVEO0FBTUosV0F4Q0Q7O0FBMkNBLGNBQUlELFNBQVMsU0FBVEEsTUFBUyxDQUFDVSxNQUFELEVBQVNDLFFBQVQsRUFBa0M7QUFBQSxnQkFBZkMsS0FBZSx1RUFBUCxFQUFPOztBQUM3Q0MsbUJBQU9DLElBQVAsQ0FBWUgsUUFBWixFQUFzQkksT0FBdEIsQ0FBOEIsVUFBQ0MsR0FBRCxFQUFTO0FBQ3JDLGtCQUFHQSxRQUFRTixNQUFYLEVBQWtCO0FBQ2hCRSxzQkFBTW5CLElBQU4sQ0FBV2tCLFNBQVNLLEdBQVQsQ0FBWDtBQUNBLHVCQUFPSixLQUFQO0FBQ0Q7QUFDRCxrQkFBRyxRQUFPRCxTQUFTSyxHQUFULENBQVAsTUFBeUIsUUFBNUIsRUFBcUM7QUFDbkNoQix1QkFBT1UsTUFBUCxFQUFlQyxTQUFTSyxHQUFULENBQWYsRUFBOEJKLEtBQTlCO0FBQ0Q7QUFDRixhQVJEO0FBU0EsbUJBQU9BLEtBQVA7QUFDRCxXQVhEO0FBYUQsUyIsImZpbGUiOiJnbWFpbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
