'use strict';

System.register(['aurelia-framework', 'aurelia-i18n'], function (_export, _context) {
    "use strict";

    var inject, I18N, jQ, Weatherbar;

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

            _export('Weatherbar', Weatherbar = function () {
                function Weatherbar() {
                    _classCallCheck(this, Weatherbar);

                    this.city = localStorage.getItem("weather.city") || "San Francisco";
                    this.region = "";

                    this.code = "";
                    this.temp = "";
                    this.unit = "";
                }

                Weatherbar.prototype.attached = function attached() {

                    this.loadWeather(this.city);

                    var self = this;

                    setInterval(function () {
                        self.loadWeather(self.city);
                    }, 60000);
                };

                Weatherbar.prototype.loadWeather = function loadWeather(city) {

                    var self = this;

                    jQ.simpleWeather({
                        location: self.city,
                        woeid: '',
                        unit: 'c',
                        success: function success(weather) {
                            self.code = 'icon-' + weather.code;
                            self.temp = weather.temp;
                            self.unit = '°' + weather.units.temp;
                            self.city = weather.city;
                            self.region = weather.region;

                            localStorage.setItem("weather.city", city);
                        },
                        error: function error(_error) {
                            console.log('Error ' + _error + ' for ' + city);
                            self.temp = 'No weather info';
                            self.unit = '';
                            self.code = '';
                        }
                    });
                    document.getElementById("weathersearch").blur();
                };

                return Weatherbar;
            }());

            _export('Weatherbar', Weatherbar);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYXRoZXJiYXIuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsImpRIiwiJCIsIldlYXRoZXJiYXIiLCJjaXR5IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInJlZ2lvbiIsImNvZGUiLCJ0ZW1wIiwidW5pdCIsImF0dGFjaGVkIiwibG9hZFdlYXRoZXIiLCJzZWxmIiwic2V0SW50ZXJ2YWwiLCJzaW1wbGVXZWF0aGVyIiwibG9jYXRpb24iLCJ3b2VpZCIsInN1Y2Nlc3MiLCJ3ZWF0aGVyIiwidW5pdHMiLCJzZXRJdGVtIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImJsdXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7OztBQUVKQyxjLEdBQUtDLEM7O2tDQUVJQyxVO0FBQ1Qsc0NBQWU7QUFBQTs7QUFDWCx5QkFBS0MsSUFBTCxHQUFZQyxhQUFhQyxPQUFiLENBQXFCLGNBQXJCLEtBQXdDLGVBQXBEO0FBQ0EseUJBQUtDLE1BQUwsR0FBYyxFQUFkOztBQUVBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUVIOztxQ0FFREMsUSx1QkFBWTs7QUFFUix5QkFBS0MsV0FBTCxDQUFpQixLQUFLUixJQUF0Qjs7QUFFQSx3QkFBSVMsT0FBTyxJQUFYOztBQUVBQyxnQ0FBWSxZQUFVO0FBQ2xCRCw2QkFBS0QsV0FBTCxDQUFpQkMsS0FBS1QsSUFBdEI7QUFDSCxxQkFGRCxFQUVHLEtBRkg7QUFJSCxpQjs7cUNBR0RRLFcsd0JBQVlSLEksRUFBTTs7QUFFZCx3QkFBSVMsT0FBTyxJQUFYOztBQUVBWix1QkFBR2MsYUFBSCxDQUFpQjtBQUNiQyxrQ0FBVUgsS0FBS1QsSUFERjtBQUViYSwrQkFBTyxFQUZNO0FBR2JQLDhCQUFNLEdBSE87QUFJYlEsaUNBQVMsaUJBQVNDLE9BQVQsRUFBa0I7QUFDdkJOLGlDQUFLTCxJQUFMLEdBQVksVUFBUVcsUUFBUVgsSUFBNUI7QUFDQUssaUNBQUtKLElBQUwsR0FBWVUsUUFBUVYsSUFBcEI7QUFDQUksaUNBQUtILElBQUwsR0FBWSxNQUFJUyxRQUFRQyxLQUFSLENBQWNYLElBQTlCO0FBQ0FJLGlDQUFLVCxJQUFMLEdBQVllLFFBQVFmLElBQXBCO0FBQ0FTLGlDQUFLTixNQUFMLEdBQWNZLFFBQVFaLE1BQXRCOztBQUVBRix5Q0FBYWdCLE9BQWIsQ0FBcUIsY0FBckIsRUFBcUNqQixJQUFyQztBQUVILHlCQWJZO0FBY2JrQiwrQkFBTyxlQUFTQSxNQUFULEVBQWdCO0FBQ3JCQyxvQ0FBUUMsR0FBUixDQUFZLFdBQVdGLE1BQVgsR0FBbUIsT0FBbkIsR0FBNkJsQixJQUF6QztBQUNBUyxpQ0FBS0osSUFBTCxHQUFZLGlCQUFaO0FBQ0FJLGlDQUFLSCxJQUFMLEdBQVksRUFBWjtBQUNBRyxpQ0FBS0wsSUFBTCxHQUFZLEVBQVo7QUFDRDtBQW5CWSxxQkFBakI7QUFxQkFpQiw2QkFBU0MsY0FBVCxDQUF3QixlQUF4QixFQUF5Q0MsSUFBekM7QUFDSCxpQiIsImZpbGUiOiJ3ZWF0aGVyYmFyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
