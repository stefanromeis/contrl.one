'use strict';

System.register(['aurelia-framework', 'aurelia-i18n', 'moment'], function (_export, _context) {
    "use strict";

    var inject, I18N, moment, _dec, _class, Time;

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
        }, function (_moment) {
            moment = _moment.default;
        }],
        execute: function () {
            _export('Time', Time = (_dec = inject(I18N), _dec(_class = function () {
                function Time(I18N) {
                    _classCallCheck(this, Time);

                    this.I18N = I18N;
                    this.date = "";
                    this.time = "";

                    this.attached();
                    this.toView();
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

                Time.prototype.toView = function toView(value) {
                    return moment(value).format('DD.MM.YYYY');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWUuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsIm1vbWVudCIsIlRpbWUiLCJkYXRlIiwidGltZSIsImF0dGFjaGVkIiwidG9WaWV3IiwiZCIsIkRhdGUiLCJ3ZWVrZGF5cyIsIm1vbnRoIiwiY2xvY2siLCJzZWxmIiwic2V0SW50ZXJ2YWwiLCJnZXREYXkiLCJzdWJzdHIiLCJnZXRPcmRpbmFsIiwiZ2V0RGF0ZSIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJ0b1N0cmluZyIsImxlbmd0aCIsInZhbHVlIiwiZm9ybWF0IiwibiIsInBhcnNlRmxvYXQiLCJwYXJzZUludCIsImlzTmFOIiwicyIsInYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7O0FBQ0RDLGtCOzs7NEJBR01DLEksV0FEWkgsT0FBT0MsSUFBUCxDO0FBRUcsOEJBQWFBLElBQWIsRUFBbUI7QUFBQTs7QUFDZix5QkFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EseUJBQUtHLElBQUwsR0FBWSxFQUFaO0FBQ0EseUJBQUtDLElBQUwsR0FBWSxFQUFaOztBQUVBLHlCQUFLQyxRQUFMO0FBQ0EseUJBQUtDLE1BQUw7QUFDSDs7K0JBRURELFEsdUJBQVc7QUFBQTs7QUFDUCx3QkFBSUUsSUFBSSxJQUFJQyxJQUFKLEVBQVI7O0FBRUEseUJBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSx5QkFBS0EsUUFBTCxDQUFjLENBQWQsSUFBbUIsUUFBbkI7QUFDQSx5QkFBS0EsUUFBTCxDQUFjLENBQWQsSUFBbUIsUUFBbkI7QUFDQSx5QkFBS0EsUUFBTCxDQUFjLENBQWQsSUFBbUIsU0FBbkI7QUFDQSx5QkFBS0EsUUFBTCxDQUFjLENBQWQsSUFBbUIsV0FBbkI7QUFDQSx5QkFBS0EsUUFBTCxDQUFjLENBQWQsSUFBbUIsVUFBbkI7QUFDQSx5QkFBS0EsUUFBTCxDQUFjLENBQWQsSUFBbUIsUUFBbkI7QUFDQSx5QkFBS0EsUUFBTCxDQUFjLENBQWQsSUFBbUIsVUFBbkI7O0FBRUEseUJBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EseUJBQUtBLEtBQUwsQ0FBVyxDQUFYLElBQWdCLFNBQWhCO0FBQ0EseUJBQUtBLEtBQUwsQ0FBVyxDQUFYLElBQWdCLFVBQWhCO0FBQ0EseUJBQUtBLEtBQUwsQ0FBVyxDQUFYLElBQWdCLE9BQWhCO0FBQ0EseUJBQUtBLEtBQUwsQ0FBVyxDQUFYLElBQWdCLE9BQWhCO0FBQ0EseUJBQUtBLEtBQUwsQ0FBVyxDQUFYLElBQWdCLEtBQWhCO0FBQ0EseUJBQUtBLEtBQUwsQ0FBVyxDQUFYLElBQWdCLE1BQWhCO0FBQ0EseUJBQUtBLEtBQUwsQ0FBVyxDQUFYLElBQWdCLE1BQWhCO0FBQ0EseUJBQUtBLEtBQUwsQ0FBVyxDQUFYLElBQWdCLFFBQWhCO0FBQ0EseUJBQUtBLEtBQUwsQ0FBVyxDQUFYLElBQWdCLFdBQWhCO0FBQ0EseUJBQUtBLEtBQUwsQ0FBVyxDQUFYLElBQWdCLFNBQWhCO0FBQ0EseUJBQUtBLEtBQUwsQ0FBVyxFQUFYLElBQWlCLFVBQWpCO0FBQ0EseUJBQUtBLEtBQUwsQ0FBVyxFQUFYLElBQWlCLFVBQWpCO0FBQ0EseUJBQUtDLEtBQUw7QUFDQSx3QkFBSUMsT0FBTyxJQUFYOztBQUVBQyxnQ0FBWTtBQUFBLCtCQUFNLE1BQUtGLEtBQUwsRUFBTjtBQUFBLHFCQUFaLEVBQWdDLElBQWhDO0FBQ0gsaUI7OytCQUVEQSxLLG9CQUFRO0FBQ0osd0JBQUlKLElBQUksSUFBSUMsSUFBSixFQUFSO0FBQ0EseUJBQUtMLElBQUwsR0FBWSxLQUFLTSxRQUFMLENBQWNGLEVBQUVPLE1BQUYsRUFBZCxFQUEwQkMsTUFBMUIsQ0FBaUMsQ0FBakMsRUFBb0MsQ0FBcEMsSUFBeUMsSUFBekMsR0FBK0MsS0FBS0MsVUFBTCxDQUFnQlQsRUFBRVUsT0FBRixFQUFoQixDQUEvQyxHQUE4RSxNQUE5RSxHQUF3RixLQUFLUCxLQUFMLENBQVdILEVBQUVXLFFBQUYsRUFBWCxDQUF4RixHQUFxSCxHQUFySCxHQUEySFgsRUFBRVksV0FBRixFQUF2STs7QUFFQSx5QkFBS2YsSUFBTCxHQUFZRyxFQUFFYSxRQUFGLEtBQWEsR0FBYixHQUFpQmIsRUFBRWMsVUFBRixFQUE3QjtBQUNBLHdCQUFHZCxFQUFFYyxVQUFGLEdBQWVDLFFBQWYsR0FBMEJDLE1BQTFCLElBQW9DLENBQXZDLEVBQTBDO0FBQ3RDLDZCQUFLbkIsSUFBTCxHQUFZRyxFQUFFYSxRQUFGLEtBQWEsSUFBYixHQUFrQmIsRUFBRWMsVUFBRixFQUE5QjtBQUNIO0FBQ0osaUI7OytCQUVEZixNLG1CQUFPa0IsSyxFQUFPO0FBRVYsMkJBQU92QixPQUFPdUIsS0FBUCxFQUFjQyxNQUFkLENBQXNCLFlBQXRCLENBQVA7QUFDSCxpQjs7K0JBRURULFUsdUJBQVdVLEMsRUFBRztBQUNWLHdCQUFJQyxXQUFXRCxDQUFYLEtBQWlCRSxTQUFTRixDQUFULENBQWxCLElBQWtDLENBQUNHLE1BQU1ILENBQU4sQ0FBdEMsRUFBK0M7QUFDM0MsNEJBQUlJLElBQUUsQ0FBQyxJQUFELEVBQU0sSUFBTixFQUFXLElBQVgsRUFBZ0IsSUFBaEIsQ0FBTjtBQUFBLDRCQUNBQyxJQUFFTCxJQUFFLEdBREo7QUFFQSwrQkFBT0EsS0FBR0ksRUFBRSxDQUFDQyxJQUFFLEVBQUgsSUFBTyxFQUFULEtBQWNELEVBQUVDLENBQUYsQ0FBZCxJQUFvQkQsRUFBRSxDQUFGLENBQXZCLENBQVA7QUFDSDtBQUNELDJCQUFPSixDQUFQO0FBQ0gsaUIiLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
