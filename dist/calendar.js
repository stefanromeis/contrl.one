'use strict';

System.register(['aurelia-framework', 'aurelia-i18n'], function (_export, _context) {
    "use strict";

    var inject, I18N, jQ, Calendar;

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
            jQ = $;

            _export('Calendar', Calendar = function () {
                function Calendar() {
                    _classCallCheck(this, Calendar);

                    this.SCOPES = ['https://mail.google.com/', 'https://www.googleapis.com/auth/calendar.readonly'];
                    this.CLIENT_ID = '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com';
                    this.token = localStorage.getItem('google.token') || 'undefined';
                    this.connected = false;
                    this.isLoading = false;
                    this.calData = [];
                    this.notifications = 0;
                    this.count = "";
                }

                Calendar.prototype.attached = function attached() {
                    var self = this;
                    if (this.token !== "undefined") {
                        this.connected = true;

                        this.getCalendarList();
                        setInterval(function () {
                            self.getCalendarList();
                        }, 3000);
                    }
                };

                Calendar.prototype.connect = function connect() {
                    gapi.auth.authorize({
                        client_id: this.CLIENT_ID,
                        scope: this.SCOPES.join(' '),
                        immediate: false
                    }, this.handleAuthResult);
                };

                Calendar.prototype.getCalendarList = function getCalendarList() {
                    var self = this;
                    $.ajax({
                        url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&singleEvents=true',
                        headers: { 'authorization': this.token }
                    }).done(function (data) {
                        self.calData = [];
                        for (var x = 0; x < data.items.length; x++) {
                            var cData = {};
                            cData.summary = data.items[x].summary;
                            cData.creator = data.items[x].creator.displayName;
                            cData.htmlLink = data.items[x].htmlLink;
                            cData.id = data.items[x].id;
                            if (data.items[x].start.dateTime) {
                                cData.start = data.items[x].start.dateTime.split(/-|T/);
                            }
                            if (data.items[x].start.date) {
                                cData.start = data.items[x].start.date.split(/-|T/);
                            }
                            self.calData.push(cData);
                        }
                        var count = self.calData.length;
                        if (count > self.count && self.count != "") {
                            console.log('yop');
                            self.notifications = self.notifications + count - self.count;
                            self.count = count;
                        } else {
                            console.log('yep');
                            self.count = count;
                        }
                        self.connected = true;
                    }).fail(function () {
                        self.connected = false;
                    });
                };

                return Calendar;
            }());

            _export('Calendar', Calendar);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkkxOE4iLCJqUSIsIiQiLCJDYWxlbmRhciIsIlNDT1BFUyIsIkNMSUVOVF9JRCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImNvbm5lY3RlZCIsImlzTG9hZGluZyIsImNhbERhdGEiLCJub3RpZmljYXRpb25zIiwiY291bnQiLCJhdHRhY2hlZCIsInNlbGYiLCJnZXRDYWxlbmRhckxpc3QiLCJzZXRJbnRlcnZhbCIsImNvbm5lY3QiLCJnYXBpIiwiYXV0aCIsImF1dGhvcml6ZSIsImNsaWVudF9pZCIsInNjb3BlIiwiam9pbiIsImltbWVkaWF0ZSIsImhhbmRsZUF1dGhSZXN1bHQiLCJhamF4IiwidXJsIiwiaGVhZGVycyIsImRvbmUiLCJkYXRhIiwieCIsIml0ZW1zIiwibGVuZ3RoIiwiY0RhdGEiLCJzdW1tYXJ5IiwiY3JlYXRvciIsImRpc3BsYXlOYW1lIiwiaHRtbExpbmsiLCJpZCIsInN0YXJ0IiwiZGF0ZVRpbWUiLCJzcGxpdCIsImRhdGUiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsImZhaWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7OztBQUVKQyxjLEdBQUtDLEM7O2dDQUVJQyxRO0FBQ1Qsb0NBQWU7QUFBQTs7QUFDYix5QkFBS0MsTUFBTCxHQUFjLENBQUMsMEJBQUQsRUFDQSxtREFEQSxDQUFkO0FBRUEseUJBQUtDLFNBQUwsR0FBaUIsMEVBQWpCO0FBQ0EseUJBQUtDLEtBQUwsR0FBYUMsYUFBYUMsT0FBYixDQUFxQixjQUFyQixLQUF3QyxXQUFyRDtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EseUJBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSx5QkFBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSx5QkFBS0MsYUFBTCxHQUFxQixDQUFyQjtBQUNBLHlCQUFLQyxLQUFMLEdB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
