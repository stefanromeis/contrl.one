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
          console.log('gmailData ', gmailData);
          this.data = gmailData || 'undefined';
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
          gapi.auth.authorize({
            client_id: this.CLIENT_ID,
            scope: this.SCOPES.join(' '),
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
            }, 10000);
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

          if (!self.messages[self.counter] || self.counter >= 10) {
            this.isLoading = false;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdtYWlsLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiR21haWwiLCJkaWFsb2dTZXJ2aWNlIiwiQ0xJRU5UX0lEIiwiU0NPUEVTIiwiQVBJX0tFWSIsImxhYmVscyIsImxhYmVsIiwiY29ubmVjdGVkIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsIm1lc3NhZ2VzIiwiY291bnRlciIsIm1haWxzIiwidW5yZWFkTWVzc2FnZXMiLCJjb250ZW50IiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29uc29sZSIsImxvZyIsImdtYWlsRGF0YSIsImRhdGEiLCJtb2RhbE1lc3NhZ2UiLCJzdWJqZWN0IiwiZnJvbSIsImRhdGUiLCJzaG93UmVwbHlNb2QiLCJpbml0IiwicmVxdWVzdEdtYWlsRGF0YSIsInNlbGYiLCJjb25uZWN0IiwiZ2FwaSIsImF1dGgiLCJhdXRob3JpemUiLCJjbGllbnRfaWQiLCJzY29wZSIsImpvaW4iLCJpbW1lZGlhdGUiLCJoYW5kbGVBdXRoUmVzdWx0IiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsIiQiLCJzcmMiLCJpZCIsImZyYW1lYm9yZGVyIiwic2Nyb2xsaW5nIiwiYXBwZW5kVG8iLCJzZXRUaW1lb3V0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ1cmwiLCJhamF4IiwiaGVhZGVycyIsImRvbmUiLCJzZXRJbnRlcnZhbCIsImdldFVucmVhZE1lc3NhZ2VzIiwiZ2V0TGFiZWxzIiwiZ2V0TWVzc2FnZXMiLCJmYWlsIiwibGVuZ3RoIiwiaSIsIm5hbWUiLCJwdXNoIiwiZ2V0TWVzc2FnZSIsImhpZGUiLCJtYWlsIiwicGF5bG9hZCIsImdldEhlYWRlciIsInVucmVhZCIsImluQXJyYXkiLCJsYWJlbElkcyIsImluZGV4IiwiaGVhZGVyIiwiZWFjaCIsInZhbHVlIiwiZ2V0Qm9keSIsImVuY29kZWRCb2R5IiwicGFydHMiLCJib2R5IiwiZ2V0SFRNTFBhcnQiLCJyZXBsYWNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZXNjYXBlIiwid2luZG93IiwiYXRvYiIsImFyciIsIngiLCJtaW1lVHlwZSIsIm9wZW5NZXNzYWdlIiwicmVzdWx0IiwiZ3JlcCIsImUiLCJpZnJtIiwiY29udGVudFdpbmRvdyIsImRvY3VtZW50IiwiaHRtbCIsImF0dHIiLCJhbmltYXRlIiwib3BhY2l0eSIsInNldE1lc3NhZ2VBc1JlYWQiLCJjbG9zZU1vZGFsIiwic2Nyb2xsVG9wIiwicmVwbHkiLCJpbmNsdWRlcyIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibWFpbGFkcmVzcyIsInNlbmQiLCJ2YWwiLCJ0eXBlIiwib3BlbkRpYWxvZyIsIndyaXRlTWFpbCIsIm9wZW4iLCJ2aWV3TW9kZWwiLCJtb2RlbCIsInRoZW4iLCJyZXNwb25zZSIsIndhc0NhbmNlbGxlZCIsIm91dHB1dCIsIm1lc3NhZ2VzVW5yZWFkIiwiZGF0YVR5cGUiLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsbUIsa0JBQUFBLGE7O0FBQ0FDLFkscUJBQUFBLE07O0FBQ0FDLFUsZ0JBQUFBLEk7O0FBQ0FDLFksV0FBQUEsTTs7O3VCQUlLQyxLLFdBRlpILE9BQU9ELGFBQVAsQztBQUdHLHVCQUFZSyxhQUFaLEVBQTJCO0FBQUE7O0FBQ3ZCLGVBQUtBLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsZUFBS0MsU0FBTCxHQUFpQiwwRUFBakI7QUFDQSxlQUFLQyxNQUFMLEdBQWMsQ0FBQywwQkFBRCxFQUNDLG1EQURELENBQWQ7QUFFQSxlQUFLQyxPQUFMLEdBQWUsQ0FBQyx5Q0FBRCxDQUFmO0FBQ0EsZUFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxlQUFLQyxLQUFMLEdBQWEsT0FBYjtBQUNBLGVBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxlQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsZUFBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxlQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsZUFBS0MsT0FBTCxHQUFlLENBQWY7QUFDQSxlQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLGVBQUtDLGNBQUwsR0FBc0IsQ0FBdEI7QUFDQSxlQUFLQyxPQUFMLEdBQWUsV0FBZjtBQUNBLGVBQUtDLEtBQUwsR0FBYUMsYUFBYUMsT0FBYixDQUFxQixjQUFyQixLQUF3QyxXQUFyRDtBQUNBQyxrQkFBUUMsR0FBUixDQUFZLFlBQVosRUFBMkJDLFNBQTNCO0FBQ0EsZUFBS0MsSUFBTCxHQUFZRCxhQUFhLFdBQXpCO0FBQ0EsZUFBS0UsWUFBTCxHQUFvQjtBQUNsQkMscUJBQVMsRUFEUztBQUVsQkMsa0JBQU0sRUFGWTtBQUdsQkMsa0JBQU07QUFIWSxXQUFwQjtBQUtELGVBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxjQUFHLEtBQUtYLEtBQUwsS0FBZSxXQUFsQixFQUErQjtBQUM1QixpQkFBS1ksSUFBTDtBQUNGO0FBRUg7O3dCQUVEQSxJLG1CQUFRO0FBQ04sZUFBS0MsZ0JBQUwsQ0FBc0IscURBQXRCO0FBQ0EsY0FBSUMsT0FBTyxJQUFYO0FBWUQsUzs7d0JBRURDLE8sc0JBQVU7QUFDUkMsZUFBS0MsSUFBTCxDQUFVQyxTQUFWLENBQ0k7QUFDQUMsdUJBQVcsS0FBS2hDLFNBRGhCO0FBRUFpQyxtQkFBTyxLQUFLaEMsTUFBTCxDQUFZaUMsSUFBWixDQUFpQixHQUFqQixDQUZQO0FBR0FDLHVCQUFXO0FBSFgsV0FESixFQU1FQyxnQkFORjtBQU9ELFM7O3dCQUVEQyxNLHFCQUFTO0FBQ1B2Qix1QkFBYXdCLFVBQWIsQ0FBd0IsY0FBeEI7O0FBRUFDLFlBQUUsVUFBRixFQUFjO0FBQ1pDLGlCQUFLLG9DQURPO0FBRVpDLGdCQUFLLFNBRk87QUFHWkMseUJBQWEsQ0FIRDtBQUlaQyx1QkFBVztBQUpDLFdBQWQsRUFNQ0MsUUFORCxDQU1VLE1BTlY7O0FBUUFDLHFCQUFXQyxTQUFTQyxNQUFULEVBQVgsRUFBOEIsSUFBOUI7QUFDRCxTOzt3QkFFRHJCLGdCLDZCQUFpQnNCLEcsRUFBSztBQUNsQixjQUFJckIsT0FBTyxJQUFYO0FBQ0FZLFlBQUVVLElBQUYsQ0FBTztBQUNIRCxpQkFBS0EsR0FERjtBQUVIRSxxQkFBUyxFQUFFLGlCQUFpQnZCLEtBQUtkLEtBQXhCO0FBRk4sV0FBUCxFQUdHc0MsSUFISCxDQUdRLFVBQVVoQyxJQUFWLEVBQWlCO0FBQ3JCUSxpQkFBS1IsSUFBTCxHQUFZQSxJQUFaO0FBQ0FpQyx3QkFBWSxZQUFVO0FBQ2xCekIsbUJBQUswQixpQkFBTDtBQUNILGFBRkQsRUFFRyxLQUZIO0FBR0ExQixpQkFBSzJCLFNBQUwsQ0FBZTNCLEtBQUtSLElBQXBCO0FBQ0FRLGlCQUFLNEIsV0FBTCxDQUFpQjVCLEtBQUt2QixLQUF0QjtBQUNDLFdBVkwsRUFXR29ELElBWEgsQ0FXUSxZQUFXO0FBQ2Y3QixpQkFBS3RCLFNBQUwsR0FBaUIsS0FBakI7QUFDRCxXQWJIO0FBY0gsUzs7d0JBRURpRCxTLHNCQUFVbkMsSSxFQUFNO0FBQ2QsZUFBS2tDLGlCQUFMO0FBQ0EsY0FBSSxLQUFLbEMsSUFBTCxDQUFVaEIsTUFBVixDQUFpQnNELE1BQWpCLEdBQTBCLENBQTlCLEVBQWlDO0FBQy9CLGlCQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLdkMsSUFBTCxDQUFVaEIsTUFBVixDQUFpQnNELE1BQXJDLEVBQTZDQyxHQUE3QyxFQUFrRDtBQUNoRCxrQkFBSUMsT0FBTyxLQUFLeEMsSUFBTCxDQUFVaEIsTUFBVixDQUFpQnVELENBQWpCLEVBQW9CQyxJQUEvQjtBQUNBLGtCQUFJQSxRQUFRLE9BQVIsSUFBbUJBLFFBQVEsTUFBL0IsRUFBdUM7QUFDckMscUJBQUt4RCxNQUFMLENBQVl5RCxJQUFaLENBQWlCLEtBQUt6QyxJQUFMLENBQVVoQixNQUFWLENBQWlCdUQsQ0FBakIsRUFBb0JDLElBQXJDO0FBQ0Q7QUFDRjtBQUNGLFdBUEQsTUFPTztBQUNIM0Msb0JBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQUNIO0FBQ0YsUzs7d0JBRURzQyxXLHdCQUFZbkQsSyxFQUFPO0FBQ2pCLGVBQUtNLEtBQUwsR0FBYSxFQUFiO0FBQ0EsZUFBS04sS0FBTCxHQUFhQSxLQUFiO0FBQ0EsZUFBS0ssT0FBTCxHQUFlLENBQWY7O0FBRUEsY0FBSWtCLE9BQU8sSUFBWDs7QUFFQVksWUFBRVUsSUFBRixDQUFPO0FBQ0hELGlCQUFLLG9FQUFrRTVDLEtBRHBFO0FBRUg4QyxxQkFBUyxFQUFFLGlCQUFpQixLQUFLckMsS0FBeEI7QUFGTixXQUFQLEVBR0dzQyxJQUhILENBR1EsVUFBVWhDLElBQVYsRUFBaUI7QUFDckJRLGlCQUFLbkIsUUFBTCxHQUFnQlcsS0FBS1gsUUFBckI7QUFDQW1CLGlCQUFLa0MsVUFBTCxDQUFnQmxDLEtBQUtuQixRQUFyQjtBQUNBK0IsY0FBRSxvQkFBRixFQUF3QnVCLElBQXhCO0FBQ0FuQyxpQkFBS3RCLFNBQUwsR0FBaUIsSUFBakI7QUFDSCxXQVJELEVBUUdtRCxJQVJILENBUVEsWUFBVztBQUNmN0IsaUJBQUt0QixTQUFMLEdBQWlCLEtBQWpCO0FBQ0gsV0FWRDtBQVdELFM7O3dCQUdEd0QsVSx1QkFBV3JELFEsRUFBVTtBQUNuQixlQUFLRixTQUFMLEdBQWlCLElBQWpCO0FBQ0EsY0FBSXFCLE9BQU8sSUFBWDs7QUFFQSxjQUFJLENBQUNBLEtBQUtuQixRQUFMLENBQWNtQixLQUFLbEIsT0FBbkIsQ0FBRCxJQUFnQ2tCLEtBQUtsQixPQUFMLElBQWdCLEVBQXBELEVBQXdEO0FBQ3BELGlCQUFLSCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0E7QUFDSDtBQUNELGNBQUltQyxLQUFLakMsU0FBU21CLEtBQUtsQixPQUFkLEVBQXVCZ0MsRUFBaEM7O0FBRUFGLFlBQUVVLElBQUYsQ0FBTztBQUNIRCxpQkFBSywyREFBeURQLEVBRDNEO0FBRUhTLHFCQUFTLEVBQUUsaUJBQWlCckMsS0FBbkI7QUFGTixXQUFQLEVBR0dzQyxJQUhILENBR1EsVUFBVWhDLElBQVYsRUFBaUI7O0FBRXJCLGdCQUFJNEMsT0FBTyxFQUFYO0FBQ0FBLGlCQUFLbkQsT0FBTCxHQUFlTyxLQUFLNkMsT0FBcEI7QUFDQUQsaUJBQUt0QixFQUFMLEdBQVVBLEVBQVY7QUFDQXNCLGlCQUFLekMsSUFBTCxHQUFZSyxLQUFLc0MsU0FBTCxDQUFlOUMsS0FBSzZDLE9BQUwsQ0FBYWQsT0FBNUIsRUFBcUMsTUFBckMsQ0FBWjtBQUNBYSxpQkFBSzFDLE9BQUwsR0FBZU0sS0FBS3NDLFNBQUwsQ0FBZTlDLEtBQUs2QyxPQUFMLENBQWFkLE9BQTVCLEVBQXFDLFNBQXJDLENBQWY7QUFDQWEsaUJBQUt4QyxJQUFMLEdBQVlJLEtBQUtzQyxTQUFMLENBQWU5QyxLQUFLNkMsT0FBTCxDQUFhZCxPQUE1QixFQUFxQyxNQUFyQyxDQUFaO0FBQ0FhLGlCQUFLRyxNQUFMLEdBQWMzQixFQUFFNEIsT0FBRixDQUFVLFFBQVYsRUFBb0JoRCxLQUFLaUQsUUFBekIsSUFBcUMsQ0FBQyxDQUFwRDtBQUNBekMsaUJBQUtqQixLQUFMLENBQVdrRCxJQUFYLENBQWdCRyxJQUFoQjtBQUNBcEMsaUJBQUtsQixPQUFMO0FBQ0FrQixpQkFBS2tDLFVBQUwsQ0FBZ0JyRCxRQUFoQjtBQUVILFdBaEJEO0FBa0JELFM7O3dCQUVEeUQsUyxzQkFBVWYsTyxFQUFTbUIsSyxFQUFPO0FBQ3hCLGNBQUlDLFNBQVMsRUFBYjtBQUNBL0IsWUFBRWdDLElBQUYsQ0FBT3JCLE9BQVAsRUFBZ0IsWUFBVTtBQUN4QixnQkFBRyxLQUFLUyxJQUFMLEtBQWNVLEtBQWpCLEVBQXVCO0FBQ3JCQyx1QkFBUyxLQUFLRSxLQUFkO0FBQ0Q7QUFDRixXQUpEO0FBS0EsaUJBQU9GLE1BQVA7QUFDRCxTOzt3QkFFREcsTyxvQkFBUWxFLE8sRUFBUztBQUNiLGNBQUltRSxjQUFjLEVBQWxCO0FBQ0EsY0FBRyxPQUFPbkUsUUFBUW9FLEtBQWYsS0FBeUIsV0FBNUIsRUFBeUM7QUFDdkNELDBCQUFjbkUsUUFBUXFFLElBQVIsQ0FBYXpELElBQTNCO0FBQ0QsV0FGRCxNQUdLO0FBQ0h1RCwwQkFBYyxLQUFLRyxXQUFMLENBQWlCdEUsUUFBUW9FLEtBQXpCLENBQWQ7QUFDRDtBQUNERCx3QkFBY0EsWUFBWUksT0FBWixDQUFvQixJQUFwQixFQUEwQixHQUExQixFQUErQkEsT0FBL0IsQ0FBdUMsSUFBdkMsRUFBNkMsR0FBN0MsRUFBa0RBLE9BQWxELENBQTBELEtBQTFELEVBQWlFLEVBQWpFLENBQWQ7QUFDQSxpQkFBT0MsbUJBQW1CQyxPQUFPQyxPQUFPQyxJQUFQLENBQVlSLFdBQVosQ0FBUCxDQUFuQixDQUFQO0FBQ0gsUzs7d0JBRURHLFcsd0JBQVlNLEcsRUFBSztBQUNiLGVBQUksSUFBSUMsSUFBSSxDQUFaLEVBQWVBLEtBQUtELElBQUkxQixNQUF4QixFQUFnQzJCLEdBQWhDLEVBQXFDO0FBQ25DLGdCQUFHLE9BQU9ELElBQUlDLENBQUosRUFBT1QsS0FBZCxLQUF3QixXQUEzQixFQUF3QztBQUN0QyxrQkFBR1EsSUFBSUMsQ0FBSixFQUFPQyxRQUFQLEtBQW9CLFdBQXZCLEVBQW9DO0FBQ2xDLHVCQUFPRixJQUFJQyxDQUFKLEVBQU9SLElBQVAsQ0FBWXpELElBQW5CO0FBQ0Q7QUFDRixhQUpELE1BS0s7QUFDSCxxQkFBTyxLQUFLMEQsV0FBTCxDQUFpQk0sSUFBSUMsQ0FBSixFQUFPVCxLQUF4QixDQUFQO0FBQ0Q7QUFDRjtBQUNELGlCQUFPLEVBQVA7QUFDSCxTOzt3QkFFRFcsVyx3QkFBWTdDLEUsRUFBSTs7QUFFZCxjQUFJOEMsU0FBU2hELEVBQUVpRCxJQUFGLENBQU8sS0FBSzlFLEtBQVosRUFBbUIsVUFBUytFLENBQVQsRUFBVztBQUFFLG1CQUFPQSxFQUFFaEQsRUFBRixJQUFRQSxFQUFmO0FBQW9CLFdBQXBELENBQWI7O0FBRUEsZUFBS3JCLFlBQUwsQ0FBa0JDLE9BQWxCLEdBQTRCa0UsT0FBTyxDQUFQLEVBQVVsRSxPQUF0QztBQUNBLGVBQUtELFlBQUwsQ0FBa0JFLElBQWxCLEdBQXlCaUUsT0FBTyxDQUFQLEVBQVVqRSxJQUFuQztBQUNBLGVBQUtGLFlBQUwsQ0FBa0JHLElBQWxCLEdBQXlCZ0UsT0FBTyxDQUFQLEVBQVVoRSxJQUFuQzs7QUFFQSxjQUFJbUUsT0FBT25ELEVBQUUsa0JBQUYsRUFBc0IsQ0FBdEIsRUFBeUJvRCxhQUF6QixDQUF1Q0MsUUFBbEQ7QUFDQXJELFlBQUUsTUFBRixFQUFVbUQsSUFBVixFQUFnQkcsSUFBaEIsQ0FBcUIsS0FBS3BCLE9BQUwsQ0FBYWMsT0FBTyxDQUFQLEVBQVUzRSxPQUF2QixDQUFyQjs7QUFFQTJCLFlBQUUsT0FBRixFQUNHdUQsSUFESCxDQUNRLE9BRFIsRUFDaUIsd0NBRGpCLEVBRUdDLE9BRkgsQ0FFVyxFQUFDQyxTQUFTLENBQVYsRUFGWDtBQUdBekQsWUFBRSxNQUFGLEVBQVV1RCxJQUFWLENBQWUsT0FBZixFQUF1Qix5QkFBdkI7O0FBRUEsZUFBS0csZ0JBQUwsQ0FBc0J4RCxFQUF0QjtBQUNELFM7O3dCQUVEeUQsVSx5QkFBYTs7QUFFWDNELFlBQUUsa0JBQUYsRUFBc0J1RCxJQUF0QixDQUEyQixPQUEzQixFQUFtQyx5QkFBbkM7QUFDQSxjQUFJSixPQUFPbkQsRUFBRSxrQkFBRixFQUFzQixDQUF0QixFQUF5Qm9ELGFBQXpCLENBQXVDQyxRQUFsRDtBQUNBckQsWUFBRSxNQUFGLEVBQVVtRCxJQUFWLEVBQWdCSyxPQUFoQixDQUF3QjtBQUN0QkksdUJBQVc7QUFEVyxXQUF4QixFQUVHLEdBRkg7QUFHRCxTOzt3QkFFREMsSyxvQkFBUTs7QUFFTixjQUFJOUUsT0FBTyxLQUFLRixZQUFMLENBQWtCRSxJQUE3QjtBQUNBLGNBQUdBLEtBQUsrRSxRQUFMLENBQWMsR0FBZCxDQUFILEVBQXVCO0FBQ3JCL0UsbUJBQU9BLEtBQUtnRixTQUFMLENBQWVoRixLQUFLaUYsV0FBTCxDQUFpQixHQUFqQixJQUFzQixDQUFyQyxFQUF1Q2pGLEtBQUtpRixXQUFMLENBQWlCLEdBQWpCLENBQXZDLENBQVA7QUFDRDtBQUNELGVBQUtuRixZQUFMLENBQWtCb0YsVUFBbEIsR0FBK0JsRixJQUEvQjtBQUNBLGVBQUtGLFlBQUwsQ0FBa0JDLE9BQWxCLEdBQTRCLFNBQVMsS0FBS0QsWUFBTCxDQUFrQkMsT0FBdkQ7O0FBRUFrQixZQUFFLE1BQUYsRUFBVXVELElBQVYsQ0FBZSxPQUFmLEVBQXVCLHlCQUF2QjtBQUNBdkQsWUFBRSxZQUFGLEVBQWdCdUQsSUFBaEIsQ0FBcUIsT0FBckIsRUFBNkIseUJBQTdCO0FBRUQsUzs7d0JBRURXLEksbUJBQVE7O0FBRU4sY0FBSTlFLE9BQU8sSUFBWDs7QUFFQSxjQUFJb0MsT0FBUSwwQkFDQSxNQURBLEdBQ094QixFQUFFLGFBQUYsRUFBaUJtRSxHQUFqQixFQURQLEdBQzhCLE1BRDlCLEdBRUEsV0FGQSxHQUVZbkUsRUFBRSxrQkFBRixFQUFzQm1FLEdBQXRCLEVBRlosR0FFd0MsVUFGeEMsR0FHQSxFQUhBLEdBR0duRSxFQUFFLGtCQUFGLEVBQXNCbUUsR0FBdEIsRUFISCxHQUcrQixVQUgzQzs7QUFLQW5FLFlBQUVVLElBQUYsQ0FBTztBQUNMMEQsa0JBQU0sTUFERDtBQUVMM0QsaUJBQUssbUVBRkE7QUFHTEUscUJBQVM7QUFDUCwrQkFBaUIsS0FBS3JDLEtBRGY7QUFFUCw4QkFBZ0I7QUFGVCxhQUhKO0FBT0xNLGtCQUFNNEM7O0FBUEQsV0FBUCxFQVNHWixJQVRILENBU1EsWUFBVztBQUNqQnhCLGlCQUFLaUYsVUFBTDtBQUNELFdBWEQsRUFZQ3BELElBWkQsQ0FZTSxZQUFXO0FBQ2Z4QyxvQkFBUUMsR0FBUixDQUFZLHFCQUFaO0FBQ0QsV0FkRDs7QUFnQkFzQixZQUFFLGtCQUFGLEVBQXNCdUQsSUFBdEIsQ0FBMkIsT0FBM0IsRUFBbUMseUJBQW5DO0FBRUQsUzs7d0JBRURlLFMsd0JBQWE7QUFDWCxlQUFLekYsWUFBTCxHQUFvQjtBQUNsQkMscUJBQVMsRUFEUztBQUVsQkMsa0JBQU0sRUFGWTtBQUdsQkMsa0JBQU07QUFIWSxXQUFwQjtBQUtBZ0IsWUFBRSxZQUFGLEVBQWdCdUQsSUFBaEIsQ0FBcUIsT0FBckIsRUFBNkIseUJBQTdCO0FBQ0QsUzs7d0JBRURjLFUseUJBQWE7QUFDWCxlQUFLN0csYUFBTCxDQUFtQitHLElBQW5CLENBQXdCLEVBQUNDLFdBQVdsSCxNQUFaLEVBQW9CbUgsT0FBTywwQkFBM0IsRUFBeEIsRUFBaUZDLElBQWpGLENBQXNGLG9CQUFZO0FBQzlGakcsb0JBQVFDLEdBQVIsQ0FBWWlHLFFBQVo7O0FBRUEsZ0JBQUksQ0FBQ0EsU0FBU0MsWUFBZCxFQUE0QjtBQUMxQm5HLHNCQUFRQyxHQUFSLENBQVksSUFBWjtBQUNELGFBRkQsTUFFTztBQUNMRCxzQkFBUUMsR0FBUixDQUFZLFdBQVo7QUFDRDtBQUNERCxvQkFBUUMsR0FBUixDQUFZaUcsU0FBU0UsTUFBckI7QUFDSCxXQVREO0FBVUQsUzs7d0JBRUQvRCxpQixnQ0FBb0I7QUFDbEIsY0FBSTFCLE9BQU8sSUFBWDs7QUFFQVksWUFBRVUsSUFBRixDQUFPO0FBQ0xELGlCQUFLLDJEQURBO0FBRUxFLHFCQUFTLEVBQUUsaUJBQWlCLEtBQUtyQyxLQUF4QjtBQUZKLFdBQVAsRUFHR3NDLElBSEgsQ0FHUSxVQUFVaEMsSUFBVixFQUFpQjtBQUN2QixnQkFBR1EsS0FBS2hCLGNBQUwsSUFBdUJRLEtBQUtrRyxjQUEvQixFQUErQztBQUM3QzFGLG1CQUFLaEIsY0FBTCxHQUFzQlEsS0FBS2tHLGNBQTNCO0FBQ0ExRixtQkFBSzRCLFdBQUwsQ0FBaUI1QixLQUFLdkIsS0FBdEI7QUFDRDtBQUNGLFdBUkQ7QUFTRCxTOzt3QkFFRDZGLGdCLDZCQUFpQnhELEUsRUFBSTtBQUNuQixjQUFJZCxPQUFPLElBQVg7O0FBRUEsY0FBSTRELFNBQVNoRCxFQUFFaUQsSUFBRixDQUFPLEtBQUs5RSxLQUFaLEVBQW1CLFVBQVMrRSxDQUFULEVBQVc7QUFBRSxtQkFBT0EsRUFBRWhELEVBQUYsSUFBUUEsRUFBZjtBQUFvQixXQUFwRCxDQUFiOztBQUVBLGNBQUc4QyxPQUFPLENBQVAsRUFBVXJCLE1BQWIsRUFBcUI7O0FBRW5CcUIsbUJBQU8sQ0FBUCxFQUFVckIsTUFBVixHQUFtQixLQUFuQjs7QUFFQTNCLGNBQUVVLElBQUYsQ0FBTztBQUNMMEQsb0JBQU0sTUFERDtBQUVMVyx3QkFBVSxNQUZMO0FBR0xwRSx1QkFBUyxFQUFFLGlCQUFpQnJDLEtBQW5CO0FBQ0csZ0NBQWdCLGtCQURuQixFQUhKO0FBS0xtQyxtQkFBSywyREFBeURQLEVBQXpELEdBQTRELFNBTDVEO0FBTUx0QixvQkFBTW9HLEtBQUtDLFNBQUwsQ0FBZSxFQUFDLGtCQUFpQixDQUFDLFFBQUQsQ0FBbEIsRUFBZjtBQU5ELGFBQVAsRUFRQ3JFLElBUkQsQ0FRTSxVQUFVaEMsSUFBVixFQUFpQjtBQUNyQlEsbUJBQUtoQixjQUFMO0FBQ0QsYUFWRCxFQVdDNkMsSUFYRCxDQVdNLFlBQVU7QUFFZHhDLHNCQUFRQyxHQUFSLENBQVksOEJBQVo7QUFDRCxhQWREO0FBZUQ7QUFFRixTIiwiZmlsZSI6ImdtYWlsLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
