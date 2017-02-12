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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsIlByb2ZpbGUiLCJkYXRlIiwidGltZSIsIndlZWtkYXkiLCJ3ZWVrZGF5cyIsIm1vbnRoIiwiYXR0YWNoZWQiLCJkIiwiRGF0ZSIsInNlbGYiLCJzZXRJbnRlcnZhbCIsImNsb2NrIiwiZ2V0RGF5Iiwic3Vic3RyIiwiZ2V0T3JkaW5hbCIsImdldERhdGUiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwibiIsInBhcnNlRmxvYXQiLCJwYXJzZUludCIsImlzTmFOIiwicyIsInYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7OzsrQkFHS0MsTyxXQURaRixPQUFPQyxJQUFQLEM7QUFFRyxpQ0FBYUEsSUFBYixFQUFtQjtBQUFBOztBQUNmLHlCQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSx5QkFBS0UsSUFBTCxHQUFZLEVBQVo7QUFDQSx5QkFBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSx5QkFBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSx5QkFBS0MsUUFBTDtBQUNBLHlCQUFLQyxLQUFMOztBQUVBLHlCQUFLQyxRQUFMO0FBQ0g7O2tDQUVEQSxRLHVCQUFXO0FBQ1Asd0JBQUlDLElBQUksSUFBSUMsSUFBSixFQUFSOztBQUVBLHlCQUFLSixRQUFMLEdBQWdCLEVBQWhCO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFFBQW5CO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFFBQW5CO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFNBQW5CO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFdBQW5CO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFVBQW5CO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFFBQW5CO0FBQ0EseUJBQUtBLFFBQUwsQ0FBYyxDQUFkLElBQW1CLFVBQW5COztBQUVBLHlCQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixTQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixVQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixPQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixPQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixLQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixNQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixNQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixRQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixXQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsQ0FBWCxJQUFnQixTQUFoQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsRUFBWCxJQUFpQixVQUFqQjtBQUNBLHlCQUFLQSxLQUFMLENBQVcsRUFBWCxJQUFpQixVQUFqQjs7QUFFQSx3QkFBSUksT0FBTyxJQUFYO0FBQ0FDLGdDQUFZLFlBQVU7QUFDbEJELDZCQUFLRSxLQUFMO0FBQ0gscUJBRkQsRUFFRyxJQUZIO0FBR0gsaUI7O2tDQUVEQSxLLG9CQUFRO0FBQ0osd0JBQUlKLElBQUksSUFBSUMsSUFBSixFQUFSO0FBQ0EseUJBQUtQLElBQUwsR0FBWSxLQUFLRyxRQUFMLENBQWNHLEVBQUVLLE1BQUYsRUFBZCxFQUEwQkMsTUFBMUIsQ0FBaUMsQ0FBakMsRUFBb0MsQ0FBcEMsSUFBeUMsSUFBekMsR0FBK0MsS0FBS0MsVUFBTCxDQUFnQlAsRUFBRVEsT0FBRixFQUFoQixDQUEvQyxHQUE4RSxNQUE5RSxHQUF3RixLQUFLVixLQUFMLENBQVdFLEVBQUVTLFFBQUYsS0FBYSxDQUF4QixDQUF4RixHQUF1SCxHQUF2SCxHQUE2SFQsRUFBRVUsV0FBRixFQUF6STs7QUFFQSx5QkFBS2YsSUFBTCxHQUFZSyxFQUFFVyxRQUFGLEtBQWEsR0FBYixHQUFpQlgsRUFBRVksVUFBRixFQUE3QjtBQUNILGlCOztrQ0FFREwsVSx1QkFBV00sQyxFQUFHO0FBQ1Ysd0JBQUlDLFdBQVdELENBQVgsS0FBaUJFLFNBQVNGLENBQVQsQ0FBbEIsSUFBa0MsQ0FBQ0csTUFBTUgsQ0FBTixDQUF0QyxFQUErQztBQUMzQyw0QkFBSUksSUFBRSxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVcsSUFBWCxFQUFnQixJQUFoQixDQUFOO0FBQUEsNEJBQ0FDLElBQUVMLElBQUUsR0FESjtBQUVBLCtCQUFPQSxLQUFHSSxFQUFFLENBQUNDLElBQUUsRUFBSCxJQUFPLEVBQVQsS0FBY0QsRUFBRUMsQ0FBRixDQUFkLElBQW9CRCxFQUFFLENBQUYsQ0FBdkIsQ0FBUDtBQUNIO0FBQ0QsMkJBQU9KLENBQVA7QUFDSCxpQiIsImZpbGUiOiJwcm9maWxlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
