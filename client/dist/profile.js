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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsIlByb2ZpbGUiLCJkYXRlIiwidGltZSIsIndlZWtkYXkiLCJ3ZWVrZGF5cyIsIm1vbnRoIiwiYXR0YWNoZWQiLCJkIiwiRGF0ZSIsInNlbGYiLCJzZXRJbnRlcnZhbCIsImNsb2NrIiwiZ2V0RGF5Iiwic3Vic3RyIiwiZ2V0T3JkaW5hbCIsImdldERhdGUiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwidG9TdHJpbmciLCJsZW5ndGgiLCJuIiwicGFyc2VGbG9hdCIsInBhcnNlSW50IiwiaXNOYU4iLCJzIiwidiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNBQyxnQixnQkFBQUEsSTs7OytCQUdLQyxPLFdBRFpGLE9BQU9DLElBQVAsQztBQUVHLGlDQUFhQSxJQUFiLEVBQW1CO0FBQUE7O0FBQ2YseUJBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLHlCQUFLRSxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLHlCQUFLQyxRQUFMO0FBQ0EseUJBQUtDLEtBQUw7O0FBRUEseUJBQUtDLFFBQUw7QUFDSDs7a0NBRURBLFEsdUJBQVc7QUFDUCx3QkFBSUMsSUFBSSxJQUFJQyxJQUFKLEVBQVI7O0FBRUEseUJBQUtKLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSx5QkFBS0EsUUFBTCxDQUFjLENBQWQsSUFBbUIsUUFBbkI7QUFDQSx5QkFBS0EsUUFBTCxDQUFjLENBQWQsSUFBbUIsUUFBbkI7QUFDQSx5QkFBS0EsUUFBTCxDQUFjLENBQWQsSUFBbUIsU0FBbkI7QUFDQSx5QkFBS0EsUUFBTCxDQUFjLENBQWQsSUFBbUIsV0FBbkI7QUFDQSx5QkFBS0EsUUFBTCxDQUFjLENBQWQsSUFBbUIsVUFBbkI7QUFDQSx5QkFBS0EsUUFB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
