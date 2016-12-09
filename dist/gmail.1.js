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
              if (html.includes('<!DOCTYPE')) {}

              console.log('is html');
              $('#message-content').html(html);
            } else {
              alert('nohtml');
              console.log('no html');
              html = html.replace(/\r\n|\r|\n/g, '<br />');
              $('#message-content').html(html);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLjEuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsIkdtYWlsIiwiQmFzZTY0IiwiQ0xJRU5UX0lEIiwiU0NPUEVTIiwiQVBJX0tFWSIsImF1dGhPYmoiLCJkYXRhIiwidW5kZWZpbmVkIiwibGFiZWxzIiwibGFiZWwiLCJjb25uZWN0ZWQiLCJtZXNzYWdlIiwiY29uc29sZSIsImxvZyIsImJhc2U2NCIsIm1lc3NhZ2VDb250ZW50IiwiYXR0YWNoZWQiLCJnbWFpbERhdGEiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCIkIiwiaGlkZSIsImdldExhYmVscyIsImdldE1lc3NhZ2VzIiwiZ2V0TWVzc2FnZSIsIm1lc3NhZ2VzIiwiaWQiLCJjb25uZWN0IiwiZ2FwaSIsImF1dGgiLCJhdXRob3JpemUiLCJjbGllbnRfaWQiLCJzY29wZSIsImpvaW4iLCJpbW1lZGlhdGUiLCJoYW5kbGVBdXRoUmVzdWx0IiwibGVuZ3RoIiwiaSIsIm5hbWUiLCJwdXNoIiwic2VsZiIsImFqYXgiLCJ1cmwiLCJoZWFkZXJzIiwiZG9uZSIsImJvZHlEYXRhIiwic2VhcmNoIiwiaHRtbCIsImRlY29kZSIsInNwbGl0IiwiaW5jbHVkZXMiLCJhbGVydCIsInJlcGxhY2UiLCJuZWVkbGUiLCJoYXlzdGFjayIsImZvdW5kIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxZLHFCQUFBQSxNOztBQUNBQyxVLGdCQUFBQSxJOzs7Ozs7Ozs7dUJBS0tDLEssV0FEWkYsT0FBT0csTUFBUCxDO0FBRUcsdUJBQVlBLE1BQVosRUFBb0I7QUFBQTs7QUFDaEIsZUFBS0MsU0FBTCxHQUFpQiwwRUFBakI7QUFDQSxlQUFLQyxNQUFMLEdBQWMsQ0FBQyxnREFBRCxFQUFtRCw0Q0FBbkQsQ0FBZDtBQUNBLGVBQUtDLE9BQUwsR0FBZSxDQUFDLHlDQUFELENBQWY7QUFDQSxlQUFLQyxPQUFMO0FBQ0Es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QUF5RGhCLEVBRDNEO0FBRUhpQixxQkFBUyxFQUFFLGlCQUFpQjFCLEtBQW5CO0FBRk4sV0FBUCxFQUdHMkIsSUFISCxDQUdRLFVBQVV2QyxJQUFWLEVBQWlCO0FBQ3JCbUMsaUJBQUs5QixPQUFMLEdBQWVMLElBQWY7QUFDQU0sb0JBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCNEIsS0FBSzlCLE9BQTVCOztBQUVBLGdCQUFJbUMsV0FBV0MsT0FBTyxNQUFQLEVBQWVOLEtBQUs5QixPQUFwQixDQUFmOztBQUVBLGdCQUFJcUMsT0FBUS9DLE9BQU9nRCxNQUFQLENBQWNILFFBQWQsQ0FBWjs7QUFFQUUsbUJBQU9BLEtBQUtFLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLENBQVA7O0FBRUFGLG1CQUFPQSxLQUFLLENBQUwsQ0FBUDtBQUNBcEMsb0JBQVFDLEdBQVIsQ0FBWSxHQUFaLEVBQWlCbUMsSUFBakI7O0FBSUEsZ0JBQUdBLEtBQUtHLFFBQUwsQ0FBYyxTQUFkLENBQUgsRUFBNkI7QUFDM0Isa0JBQUdILEtBQUtHLFFBQUwsQ0FBYyxXQUFkLENBQUgsRUFBK0IsQ0FJOUI7O0FBRUR2QyxzQkFBUUMsR0FBUixDQUFZLFNBQVo7QUFDQVEsZ0JBQUUsa0JBQUYsRUFBc0IyQixJQUF0QixDQUEyQkEsSUFBM0I7QUFHRCxhQVhELE1BWUs7QUFDSEksb0JBQU0sUUFBTjtBQUNBeEMsc0JBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0FtQyxxQkFBT0EsS0FBS0ssT0FBTCxDQUFhLGFBQWIsRUFBNEIsUUFBNUIsQ0FBUDtBQUNBaEMsZ0JBQUUsa0JBQUYsRUFBc0IyQixJQUF0QixDQUEyQkEsSUFBM0I7QUFFRDtBQU1KLFdBMUNEOztBQTZDQSxjQUFJRCxTQUFTLFNBQVRBLE1BQVMsQ0FBQ08sTUFBRCxFQUFTQyxRQUFULEVBQWtDO0FBQUEsZ0JBQWZDLEtBQWUsdUVBQVAsRUFBTzs7QUFDN0NDLG1CQUFPQyxJQUFQLENBQVlILFFBQVosRUFBc0JJLE9BQXRCLENBQThCLFVBQUNDLEdBQUQsRUFBUztBQUNyQyxrQkFBR0EsUUFBUU4sTUFBWCxFQUFrQjtBQUNoQkUsc0JBQU1oQixJQUFOLENBQVdlLFNBQVNLLEdBQVQsQ0FBWDtBQUNBLHVCQUFPSixLQUFQO0FBQ0Q7QUFDRCxrQkFBRyxRQUFPRCxTQUFTSyxHQUFULENBQVAsTUFBeUIsUUFBNUIsRUFBcUM7QUFDbkNiLHVCQUFPTyxNQUFQLEVBQWVDLFNBQVNLLEdBQVQsQ0FBZixFQUE4QkosS0FBOUI7QUFDRDtBQUNGLGFBUkQ7QUFTQSxtQkFBT0EsS0FBUDtBQUNELFdBWEQ7QUFhRCxTIiwiZmlsZSI6ImdtYWlsLjEuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
