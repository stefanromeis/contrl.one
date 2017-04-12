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
                }

                Time.prototype.toView = function toView(value) {
                    return moment(value).format('M/D/YYYY h:mm:ss a');
                };

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
                    console.log(d);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWUuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsIm1vbWVudCIsIlRpbWUiLCJkYXRlIiwidGltZSIsImF0dGFjaGVkIiwidG9WaWV3IiwidmFsdWUiLCJmb3JtYXQiLCJkIiwiRGF0ZSIsIndlZWtkYXlzIiwibW9udGgiLCJjbG9jayIsInNlbGYiLCJzZXRJbnRlcnZhbCIsImNvbnNvbGUiLCJsb2ciLCJnZXREYXkiLCJzdWJzdHIiLCJnZXRPcmRpbmFsIiwiZ2V0RGF0ZSIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJ0b1N0cmluZyIsImxlbmd0aCIsIm4iLCJwYXJzZUZsb2F0IiwicGFyc2VJbnQiLCJpc05hTiIsInMiLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOztBQUNEQyxrQjs7OzRCQUdNQyxJLFdBRFpILE9BQU9DLElBQVAsQztBQUVHLDhCQUFhQSxJQUFiLEVBQW1CO0FBQUE7O0FBQ2YseUJBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLHlCQUFLRyxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjs7QUFFQSx5QkFBS0MsUUFBTDtBQUNIOzsrQkFFREMsTSxtQkFBT0MsSyxFQUFPO0FBQ1YsMkJBQU9OLE9BQU9NLEtBQVAsRUFBY0MsTUFBZCxDQUFxQixvQkFBckIsQ0FBUDtBQUNILGlCOzsrQkFFREgsUSx1QkFBVztBQUFBOztBQUNQLHdCQUFJSSxJQUFJLElBQUlDLElBQUosRUFBUjs7QUFFQSx5QkFBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUNBLHlCQUFLQSxRQUFMLENBQWMsQ0FBZCxJQUFtQixRQUFuQjtBQUNBLHlCQUFLQSxRQUFMLENBQWMsQ0FBZCxJQUFtQixRQUFuQjtBQUNBLHlCQUFLQSxRQUFMLENBQWMsQ0FBZCxJQUFtQixTQUFuQjtBQUNBLHlCQUFLQSxRQUFMLENBQWMsQ0FBZCxJQUFtQixXQUFuQjtBQUNBLHlCQUFLQSxRQUFMLENBQWMsQ0FBZCxJQUFtQixVQUFuQjtBQUNBLHlCQUFLQSxRQUFMLENBQWMsQ0FBZCxJQUFtQixRQUFuQjtBQUNBLHlCQUFLQSxRQUFMLENBQWMsQ0FBZCxJQUFtQixVQUFuQjs7QUFFQSx5QkFBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSx5QkFBS0EsS0FBTCxDQUFXLENBQVgsSUFBZ0IsU0FBaEI7QUFDQSx5QkFBS0EsS0FBTCxDQUFXLENBQVgsSUFBZ0IsVUFBaEI7QUFDQSx5QkFBS0EsS0FBTCxDQUFXLENBQVgsSUFBZ0IsT0FBaEI7QUFDQSx5QkFBS0EsS0FBTCxDQUFXLENBQVgsSUFBZ0IsT0FBaEI7QUFDQSx5QkFBS0EsS0FBTCxDQUFXLENBQVgsSUFBZ0IsS0FBaEI7QUFDQSx5QkFBS0EsS0FBTCxDQUFXLENBQVgsSUFBZ0IsTUFBaEI7QUFDQSx5QkFBS0EsS0FBTCxDQUFXLENBQVgsSUFBZ0IsTUFBaEI7QUFDQSx5QkFBS0EsS0FBTCxDQUFXLENBQVgsSUFBZ0IsUUFBaEI7QUFDQSx5QkFBS0EsS0FBTCxDQUFXLENBQVgsSUFBZ0IsV0FBaEI7QUFDQSx5QkFBS0EsS0FBTCxDQUFXLENBQVgsSUFBZ0IsU0FBaEI7QUFDQSx5QkFBS0EsS0FBTCxDQUFXLEVBQVgsSUFBaUIsVUFBakI7QUFDQSx5QkFBS0EsS0FBTCxDQUFXLEVBQVgsSUFBaUIsVUFBakI7QUFDQSx5QkFBS0MsS0FBTDtBQUNBLHdCQUFJQyxPQUFPLElBQVg7O0FBRUFDLGdDQUFZO0FBQUEsK0JBQU0sTUFBS0YsS0FBTCxFQUFOO0FBQUEscUJBQVosRUFBZ0MsSUFBaEM7QUFDSCxpQjs7K0JBRURBLEssb0JBQVE7QUFDSix3QkFBSUosSUFBSSxJQUFJQyxJQUFKLEVBQVI7QUFDQU0sNEJBQVFDLEdBQVIsQ0FBWVIsQ0FBWjtBQUNBLHlCQUFLTixJQUFMLEdBQVksS0FBS1EsUUFBTCxDQUFjRixFQUFFUyxNQUFGLEVBQWQsRUFBMEJDLE1BQTFCLENBQWlDLENBQWpDLEVBQW9DLENBQXBDLElBQXlDLElBQXpDLEdBQStDLEtBQUtDLFVBQUwsQ0FBZ0JYLEVBQUVZLE9BQUYsRUFBaEIsQ0FBL0MsR0FBOEUsTUFBOUUsR0FBd0YsS0FBS1QsS0FBTCxDQUFXSCxFQUFFYSxRQUFGLEVBQVgsQ0FBeEYsR0FBcUgsR0FBckgsR0FBMkhiLEVBQUVjLFdBQUYsRUFBdkk7O0FBRUEseUJBQUtuQixJQUFMLEdBQVlLLEVBQUVlLFFBQUYsS0FBYSxHQUFiLEdBQWlCZixFQUFFZ0IsVUFBRixFQUE3QjtBQUNBLHdCQUFHaEIsRUFBRWdCLFVBQUYsR0FBZUMsUUFBZixHQUEwQkMsTUFBMUIsSUFBb0MsQ0FBdkMsRUFBMEM7QUFDdEMsNkJBQUt2QixJQUFMLEdBQVlLLEVBQUVlLFFBQUYsS0FBYSxJQUFiLEdBQWtCZixFQUFFZ0IsVUFBRixFQUE5QjtBQUNIO0FBQ0osaUI7OytCQUVETCxVLHVCQUFXUSxDLEVBQUc7QUFDVix3QkFBSUMsV0FBV0QsQ0FBWCxLQUFpQkUsU0FBU0YsQ0FBVCxDQUFsQixJQUFrQyxDQUFDRyxNQUFNSCxDQUFOLENBQXRDLEVBQStDO0FBQzNDLDRCQUFJSSxJQUFFLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVyxJQUFYLEVBQWdCLElBQWhCLENBQU47QUFBQSw0QkFDQUMsSUFBRUwsSUFBRSxHQURKO0FBRUEsK0JBQU9BLEtBQUdJLEVBQUUsQ0FBQ0MsSUFBRSxFQUFILElBQU8sRUFBVCxLQUFjRCxFQUFFQyxDQUFGLENBQWQsSUFBb0JELEVBQUUsQ0FBRixDQUF2QixDQUFQO0FBQ0g7QUFDRCwyQkFBT0osQ0FBUDtBQUNILGlCIiwiZmlsZSI6InRpbWUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
