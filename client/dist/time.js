'use strict';

System.register(['aurelia-framework', 'aurelia-i18n'], function (_export, _context) {
    "use strict";

    var inject, I18N, _dec, _class, Time;

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
            _export('Time', Time = (_dec = inject(I18N), _dec(_class = function () {
                function Time(I18N) {
                    _classCallCheck(this, Time);

                    this.I18N = I18N;
                    this.date = "";
                    this.time = "";

                    this.attached();
                }

                Time.prototype.attached = function attached() {
                    var _this = this;

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
                    this.clock();
                    var self = this;

                    setInterval(function () {
                        return _this.clock();
                    }, 1000);
                };

                Time.prototype.clock = function clock() {
                    var d = new Date();
                    this.date = this.weekdays[d.getDay()].substr(0, 3) + ', ' + this.getOrdinal(d.getDate()) + " of " + this.month[d.getMonth()] + " " + d.getFullYear();

                    this.time = d.getHours() + ':' + d.getMinutes();
                    if (d.getMinutes().toString().length == 1) {
                        this.time = d.getHours() + ':0' + d.getMinutes();
                    }
                };

                Time.prototype.getOrdinal = function getOrdinal(n) {
                    if (parseFloat(n) == parseInt(n) && !isNaN(n)) {
                        var s = ["th", "st", "nd", "rd"],
                            v = n % 100;
                        return n + (s[(v - 20) % 10] || s[v] || s[0]);
                    }
                    return n;
                };

                return Time;
            }()) || _class));

            _export('Time', Time);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWUuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsIlRpbWUiLCJkYXRlIiwidGltZSIsImF0dGFjaGVkIiwiZCIsIkRhdGUiLCJ3ZWVrZGF5cyIsIm1vbnRoIiwiY2xvY2siLCJzZWxmIiwic2V0SW50ZXJ2YWwiLCJnZXREYXkiLCJzdWJzdHIiLCJnZXRPcmRpbmFsIiwiZ2V0RGF0ZSIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJ0b1N0cmluZyIsImxlbmd0aCIsIm4iLCJwYXJzZUZsb2F0IiwicGFyc2VJbnQiLCJpc05hTiIsInMiLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOzs7NEJBR0tDLEksV0FEWkYsT0FBT0MsSUFBUCxDO0FBRUcsOEJBQWFBLElBQWIsRUFBbUI7QUFBQTs7QUFDZix5QkFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EseUJBQUtFLElBQUwsR0FBWSxFQUFaO0FBQ0EseUJBQUtDLElBQUwsR0FBWSxFQUFaOztBQUVBLHlCQUFLQyxRQUFMO0FBQ0g7OytCQUVEQSxRLHVCQUFXO0FBQUE7O0FBQ1Asd0JBQUlDLElBQUksSUFBSUMsSUFBSixFQUFSOztBQUVBLHlCQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFFBQW5CO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFFBQW5CO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFNBQW5CO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFdBQW5CO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFVBQW5CO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFFBQW5CO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFVBQW5COztBQUVBLHlCQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixTQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixVQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixPQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixPQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixLQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixNQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixNQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixRQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixXQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixTQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsRUFBWCxJQUFpQixVQUFqQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsRUFBWCxJQUFpQixVQUFqQjtBQUNBLHlCQUFLQyxLQUFMO0FBQ0Esd0JBQUlDLE9BQU8sSUFBWDs7QUFFQUMsZ0NBQVk7QUFBQSwrQkFBTSxNQUFLRixLQUFMLEVBQU47QUFBQSxxQkFBWixFQUFnQyxJQUFoQztBQUNILGlCOzsrQkFFREEsSyxvQkFBUTtBQUNKLHdCQUFJSixJQUFJLElBQUlDLElBQUosRUFBUjtBQUNBLHlCQUFLSixJQUFMLEdBQVksS0FBS0ssUUFBTCxDQUFjRixFQUFFTyxNQUFGLEVBQWQsRUFBMEJDLE1BQTFCLENBQWlDLENBQWpDLEVBQW9DLENBQXBDLElBQXlDLElBQXpDLEdBQStDLEtBQUtDLFVBQUwsQ0FBZ0JULEVBQUVVLE9BQUYsRUFBaEIsQ0FBL0MsR0FBOEUsTUFBOUUsR0FBd0YsS0FBS1AsS0FBTCxDQUFXSCxFQUFFVyxRQUFGLEVBQVgsQ0FBeEYsR0FBcUgsR0FBckgsR0FBMkhYLEVBQUVZLFdBQUYsRUFBdkk7O0FBRUEseUJBQUtkLElBQUwsR0FBWUUsRUFBRWEsUUFBRixLQUFhLEdBQWIsR0FBaUJiLEVBQUVjLFVBQUYsRUFBN0I7QUFDQSx3QkFBR2QsRUFBRWMsVUFBRixHQUFlQyxRQUFmLEdBQTBCQyxNQUExQixJQUFvQyxDQUF2QyxFQUEwQztBQUN0Qyw2QkFBS2xCLElBQUwsR0FBWUUsRUFBRWEsUUFBRixLQUFhLElBQWIsR0FBa0JiLEVBQUVjLFVBQUYsRUFBOUI7QUFDSDtBQUNKLGlCOzsrQkFFREwsVSx1QkFBV1EsQyxFQUFHO0FBQ1Ysd0JBQUlDLFdBQVdELENBQVgsS0FBaUJFLFNBQVNGLENBQVQsQ0FBbEIsSUFBa0MsQ0FBQ0csTUFBTUgsQ0FBTixDQUF0QyxFQUErQztBQUMzQyw0QkFBSUksSUFBRSxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVcsSUFBWCxFQUFnQixJQUFoQixDQUFOO0FBQUEsNEJBQ0FDLElBQUVMLElBQUUsR0FESjtBQUVBLCtCQUFPQSxLQUFHSSxFQUFFLENBQUNDLElBQUUsRUFBSCxJQUFPLEVBQVQsS0FBY0QsRUFBRUMsQ0FBRixDQUFkLElBQW9CRCxFQUFFLENBQUYsQ0FBdkIsQ0FBUDtBQUNIO0FBQ0QsMkJBQU9KLENBQVA7QUFDSCxpQiIsImZpbGUiOiJ0aW1lLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
