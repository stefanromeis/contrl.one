'use strict';

System.register(['aurelia-dialog', 'aurelia-framework', 'aurelia-i18n', 'prompt'], function (_export, _context) {
    "use strict";

    var DialogService, inject, I18N, Prompt, _dec, _class, Calendar;

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
                }

                Calendar.prototype.attached = function attached() {
                    var self = this;
                    if (this.token !== "undefined") {
                        this.connected = true;

                        this.getCalendarList();
                        setInterval(function () {
                            self.getCalendarList();
                        }, 6000);
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
                    this.dialogService.open({ viewModel: Prompt, model: 'Creating new entry in calendar successful.' }).then(function (response) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiQ2FsZW5kYXIiLCJkaWFsb2dTZXJ2aWNlIiwiU0NPUEVTIiwiQ0xJRU5UX0lEIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29ubmVjdGVkIiwiaXNMb2FkaW5nIiwiY2FsRGF0YSIsIm5vdGlmaWNhdGlvbnMiLCJjb3VudCIsIm1vZGFsT3BlbiIsImF0dGFjaGVkIiwic2VsZiIsImdldENhbGVuZGFyTGlzdCIsInNldEludGVydmFsIiwiY29ubmVjdCIsImdhcGkiLCJhdXRoIiwiYXV0aG9yaXplIiwiY2xpZW50X2lkIiwic2NvcGUiLCJqb2luIiwiaW1tZWRpYXRlIiwiaGFuZGxlQXV0aFJlc3VsdCIsIiQiLCJhamF4IiwidXJsIiwiaGVhZGVycyIsImRvbmUiLCJkYXRhIiwieCIsIml0ZW1zIiwibGVuZ3RoIiwiY0RhdGEiLCJzdW1tYXJ5IiwiY3JlYXRvciIsImRpc3BsYXlOYW1lIiwiaHRtbExpbmsiLCJpZCIsInN0YXJ0IiwiZGF0ZVRpbWUiLCJzcGxpdCIsImRhdGUiLCJwdXNoIiwiZmFpbCIsIm9wZW5Nb2RhbCIsImNsb3NlTW9kYWwiLCJjcmVhdGVFbnRyeSIsInNEYXRlIiwic3RhcnREYXRlIiwiZURhdGUiLCJlbmREYXRlIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImNvbnNvbGUiLCJsb2ciLCJsb2NhdGlvbiIsImRlc2NyaXB0aW9uIiwidHlwZSIsImNvbnRlbnRUeXBlIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9wZW5EaWFsb2ciLCJlcnIiLCJvcGVuIiwidmlld01vZGVsIiwibW9kZWwiLCJ0aGVuIiwicmVzcG9uc2UiLCJ3YXNDYW5jZWxsZWQiLCJvdXRwdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSx5QixrQkFBQUEsYTs7QUFDQUMsa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFB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
