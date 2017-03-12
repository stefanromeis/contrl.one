'use strict';

System.register(['aurelia-framework', 'aurelia-i18n'], function (_export, _context) {
    "use strict";

    var inject, I18N, _dec, _class, Profile;

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
            _export('Profile', Profile = (_dec = inject(I18N), _dec(_class = function () {
                function Profile(I18N) {
                    _classCallCheck(this, Profile);

                    this.I18N = I18N;
                    this.date = "";
                    this.time = "";
                    this.weekday = '';
                    this.weekdays;
                    this.month;

                    this.attached();
                }

                Profile.prototype.attached = function attached() {
                    var d = new Date();

                    this.weekdays = [];
                    this.weekdays[0] = "Sunday";
                    this.weekdays[1] = "Monday";
                    this.weekdays[2] = "Tuesday";
                    this.weekdays[3] = "Wednesday";
                    this.weekdays[4] = "Thursday";
                    this.weekdays[5] = "Friday";
                    this.weekdays[6] = "Saturday";

                    this.month = [];
                    this.month[0] = "January";
                    this.month[1] = "February";
                    this.month[2] = "March";
                    this.month[3] = "April";
                    this.month[4] = "May";
                    this.month[5] = "June";
                    this.month[6] = "July";
                    this.month[7] = "August";
                    this.month[8] = "September";
                    this.month[9] = "October";
                    this.month[10] = "November";
                    this.month[11] = "December";

                    var self = this;
                    setInterval(function () {
                        self.clock();
                    }, 1000);
                };

                Profile.prototype.clock = function clock() {
                    var d = new Date();
                    this.date = this.weekdays[d.getDay()].substr(0, 3) + ', ' + this.getOrdinal(d.getDate()) + " of " + this.month[d.getMonth() + 1] + " " + d.getFullYear();

                    this.time = d.getHours() + ':' + d.getMinutes();
                    if (d.getMinutes().toString().length == 1) {
                        this.time = d.getHours() + ':0' + d.getMinutes();
                    }
                };

                Profile.prototype.getOrdinal = function getOrdinal(n) {
                    if (parseFloat(n) == parseInt(n) && !isNaN(n)) {
                        var s = ["th", "st", "nd", "rd"],
                            v = n % 100;
                        return n + (s[(v - 20) % 10] || s[v] || s[0]);
                    }
                    return n;
                };

                return Profile;
            }()) || _class));

            _export('Profile', Profile);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUuMS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJJMThOIiwiUHJvZmlsZSIsImRhdGUiLCJ0aW1lIiwid2Vla2RheSIsIndlZWtkYXlzIiwibW9udGgiLCJhdHRhY2hlZCIsImQiLCJEYXRlIiwic2VsZiIsInNldEludGVydmFsIiwiY2xvY2siLCJnZXREYXkiLCJzdWJzdHIiLCJnZXRPcmRpbmFsIiwiZ2V0RGF0ZSIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJ0b1N0cmluZyIsImxlbmd0aCIsIm4iLCJwYXJzZUZsb2F0IiwicGFyc2VJbnQiLCJpc05hTiIsInMiLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOzs7K0JBR0tDLE8sV0FEWkYsT0FBT0MsSUFBUCxDO0FBRUcsaUNBQWFBLElBQWIsRUFBbUI7QUFBQTs7QUFDZix5QkFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EseUJBQUtFLElBQUwsR0FBWSxFQUFaO0FBQ0EseUJBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EseUJBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EseUJBQUtDLFFBQUw7QUFDQSx5QkFBS0MsS0FBTDs7QUFFQSx5QkFBS0MsUUFBTDtBQUNIOztrQ0FFREEsUSx1QkFBVztBQUNQLHdCQUFJQyxJQUFJLElBQUlDLElBQUosRUFBUjs7QUFFQSx5QkFBS0osUUFBTCxHQUFnQixFQUFoQjtBQUNBLHlCQUFLQSxRQUFMLENBQWMsQ0FBZCxJQUFtQixRQUFuQjtBQUNBLHlCQUFLQSxRQUFMLENBQWMsQ0FBZCxJQUFtQixRQUFuQjtBQUNBLHlCQUFLQSxRQUFMLENBQWMsQ0FBZCxJQUFtQixTQUFuQjtBQUNBLHlCQUFLQSxRQUFMLENBQWMsQ0FBZCxJQUFtQixXQUFuQjtBQUNBLHlCQUFLQSxRQUFMLENBQWMsQ0FBZCxJQUFtQixVQUFuQjtBQUNBLHlCQUFLQSxR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
