'use strict';

System.register(['aurelia-dialog', 'aurelia-framework', 'aurelia-i18n', 'prompt', './time'], function (_export, _context) {
    "use strict";

    var DialogService, inject, I18N, Prompt, Time, _dec, _class, Calendar;

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
        }, function (_time) {
            Time = _time.Time;
        }],
        execute: function () {
            _export('Calendar', Calendar = (_dec = inject(DialogService), _dec(_class = function () {
                function Calendar(DialogService) {
                    _classCallCheck(this, Calendar);

                    this.dialogService = DialogService;
                    this.SCOPES = ['https://mail.google.com/', 'https://www.googleapis.com/auth/calendar'];
                    this.CLIENT_ID = '746849452307-shhj8dj68odgekedt0v1l9lbmndn0qqu.apps.googleusercontent.com';
                    this.token = localStorage.getItem('google.token') || 'undefined';
                    this.connected = false;
                    this.isLoading = false;
                    this.calData = [];
                    this.notifications = 0;
                    this.count = "";
                    this.modalOpen = false;
                    this.TIME = new Time();
                    this.date = 0;
                }

                Calendar.prototype.attached = function attached() {
                    var self = this;
                    if (this.token !== "undefined") {
                        this.connected = true;
                        console.log(this.TIME);
                        this.getCalendarList();
                        setInterval(function () {
                            self.getCalendarList();
                            self.date = self.TIME.date;
                        }, 20000);
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
                        headers: { 'authorization': self.token }
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
                    }).fail(function () {
                        console.log('Could not load calendar list.');
                        self.connected = false;
                    });
                };

                Calendar.prototype.openModal = function openModal() {
                    this.modalOpen = true;
                };

                Calendar.prototype.closeModal = function closeModal() {
                    this.modalOpen = false;
                };

                Calendar.prototype.createEntry = function createEntry() {
                    var self = this;
                    var sDate = this.startDate.split(".");
                    var eDate = this.endDate.split(".");

                    var startDate = sDate[2] + '-' + sDate[1] + '-' + sDate[0] + 'T' + this.startTime + ':00+01:00';
                    var endDate = eDate[2] + '-' + eDate[1] + '-' + eDate[0] + 'T' + this.endTime + ':00+01:00';

                    console.log('startDate', startDate);
                    console.log('endDate', endDate);


                    var data = {
                        "summary": this.summary,
                        "location": this.location,
                        "description": this.description,
                        "start": {
                            "dateTime": startDate
                        },
                        "end": {
                            "dateTime": endDate
                        }
                    };

                    $.ajax({
                        type: "POST",
                        url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                        headers: { 'authorization': self.token }
                    }).done(function (data) {
                        console.log(data);
                        self.modalOpen = false;
                        self.openDialog();
                    }).fail(function (err) {
                        console.log(err);
                    });
                };

                Calendar.prototype.openDialog = function openDialog() {
                    this.dialogService.open({ viewModel: Prompt, model: 'Created new entry in calendar.' }).then(function (response) {
                        console.log(response);

                        if (!response.wasCancelled) {
                            console.log('OK');
                        } else {
                            console.log('cancelled');
                        }
                        console.log(response.output);
                    });
                };

                return Calendar;
            }()) || _class));

            _export('Calendar', Calendar);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiVGltZSIsIkNhbGVuZGFyIiwiZGlhbG9nU2VydmljZSIsIlNDT1BFUyIsIkNMSUVOVF9JRCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImNvbm5lY3RlZCIsImlzTG9hZGluZyIsImNhbERhdGEiLCJub3RpZmljYXRpb25zIiwiY291bnQiLCJtb2RhbE9wZW4iLCJUSU1FIiwiZGF0ZSIsImF0dGFjaGVkIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJnZXRDYWxlbmRhckxpc3QiLCJzZXRJbnRlcnZhbCIsImNvbm5lY3QiLCJnYXBpIiwiYXV0aCIsImF1dGhvcml6ZSIsImNsaWVudF9pZCIsInNjb3BlIiwiam9pbiIsImltbWVkaWF0ZSIsImhhbmRsZUF1dGhSZXN1bHQiLCIkIiwiYWpheCIsInVybCIsImhlYWRlcnMiLCJkb25lIiwiZGF0YSIsIngiLCJpdGVtcyIsImxlbmd0aCIsImNEYXRhIiwic3VtbWFyeSIsImNyZWF0b3IiLCJkaXNwbGF5TmFtZSIsImh0bWxMaW5rIiwiaWQiLCJzdGFydCIsImRhdGVUaW1lIiwic3BsaXQiLCJwdXNoIiwiZmFpbCIsIm9wZW5Nb2RhbCIsImNsb3NlTW9kYWwiLCJjcmVhdGVFbnRyeSIsInNEYXRlIiwic3RhcnREYXRlIiwiZURhdGUiLCJlbmREYXRlIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImxvY2F0aW9uIiwiZGVzY3JpcHRpb24iLCJ0eXBlIiwiY29udGVudFR5cGUiLCJKU09OIiwic3RyaW5naWZ5Iiwib3BlbkRpYWxvZyIsImVyciIsIm9wZW4iLCJ2aWV3TW9kZWwiLCJtb2RlbCIsInRoZW4iLCJyZXNwb25zZSIsIndhc0NhbmNlbGxlZCIsIm91dHB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVNBLHlCLGtCQUFBQSxhOztBQUNBQyxrQixxQkFBQUEsTTs7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
