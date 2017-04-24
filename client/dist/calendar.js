'use strict';

System.register(['aurelia-framework', 'aurelia-dialog', 'aurelia-i18n', 'prompt', './time'], function (_export, _context) {
    "use strict";

    var inject, DialogService, I18N, Prompt, Time, _dec, _class, Calendar;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaDialog) {
            DialogService = _aureliaDialog.DialogService;
        }, function (_aureliaI18n) {
            I18N = _aureliaI18n.I18N;
        }, function (_prompt) {
            Prompt = _prompt.Prompt;
        }, function (_time) {
            Time = _time.Time;
        }],
        execute: function () {
            _export('Calendar', Calendar = (_dec = inject(DialogService, I18N), _dec(_class = function () {
                function Calendar(DialogService, I18N) {
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
                    this.date = this.TIME.toView(new Date());
                    this.i18n = I18N;
                }

                Calendar.prototype.attached = function attached() {
                    var self = this;
                    if (this.token !== "undefined") {
                        this.connected = true;
                        this.getCalendarList();
                        setInterval(function () {
                            self.getCalendarList();
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
                                cData.start = self.TIME.toView(data.items[x].start.dateTime);
                            }
                            if (data.items[x].start.date) {
                                cData.start = self.TIME.toView(data.items[x].start.date);
                            }
                            self.calData.push(cData);
                        }
                    }).fail(function () {
                        console.log('Could not load calendar list.');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkRpYWxvZ1NlcnZpY2UiLCJJMThOIiwiUHJvbXB0IiwiVGltZSIsIkNhbGVuZGFyIiwiZGlhbG9nU2VydmljZSIsIlNDT1BFUyIsIkNMSUVOVF9JRCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImNvbm5lY3RlZCIsImlzTG9hZGluZyIsImNhbERhdGEiLCJub3RpZmljYXRpb25zIiwiY291bnQiLCJtb2RhbE9wZW4iLCJUSU1FIiwiZGF0ZSIsInRvVmlldyIsIkRhdGUiLCJpMThuIiwiYXR0YWNoZWQiLCJzZWxmIiwiZ2V0Q2FsZW5kYXJMaXN0Iiwic2V0SW50ZXJ2YWwiLCJjb25uZWN0IiwiZ2FwaSIsImF1dGgiLCJhdXRob3JpemUiLCJjbGllbnRfaWQiLCJzY29wZSIsImpvaW4iLCJpbW1lZGlhdGUiLCJoYW5kbGVBdXRoUmVzdWx0IiwiJCIsImFqYXgiLCJ1cmwiLCJoZWFkZXJzIiwiZG9uZSIsImRhdGEiLCJ4IiwiaXRlbXMiLCJsZW5ndGgiLCJjRGF0YSIsInN1bW1hcnkiLCJjcmVhdG9yIiwiZGlzcGxheU5hbWUiLCJodG1sTGluayIsImlkIiwic3RhcnQiLCJkYXRlVGltZSIsInB1c2giLCJmYWlsIiwiY29uc29sZSIsImxvZyIsIm9wZW5Nb2RhbCIsImNsb3NlTW9kYWwiLCJjcmVhdGVFbnRyeSIsInNEYXRlIiwic3RhcnREYXRlIiwic3BsaXQiLCJlRGF0ZSIsImVuZERhdGUiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwibG9jYXRpb24iLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJjb250ZW50VHlwZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvcGVuRGlhbG9nIiwiZXJyIiwib3BlbiIsInZpZXdNb2RlbCIsIm1vZGVsIiwidGhlbiIsInJlc3BvbnNlIiwid2FzQ2FuY2VsbGVkIiwib3V0cHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBU0Esa0IscUJBQUFB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
