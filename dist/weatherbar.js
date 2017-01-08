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
                        console.log('City', self.city);
                    }, 30000);
                };

                Weatherbar.prototype.loadWeather = function loadWeather(city) {

                    var self = this;

                    jQ.simpleWeather({
                        location: city,
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYXRoZXJiYXIuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsImpRIiwiJCIsIldlYXRoZXJiYXIiLCJjaXR5IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInJlZ2lvbiIsImNvZGUiLCJ0ZW1wIiwidW5pdCIsImF0dGFjaGVkIiwibG9hZFdlYXRoZXIiLCJzZWxmIiwic2V0SW50ZXJ2YWwiLCJjb25zb2xlIiwibG9nIiwic2ltcGxlV2VhdGhlciIsImxvY2F0aW9uIiwid29laWQiLCJzdWNjZXNzIiwid2VhdGhlciIsInVuaXRzIiwic2V0SXRlbSIsImVycm9yIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImJsdXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7OztBQUVKQyxjLEdBQUtDLEM7O2tDQUVJQyxVO0FBQ1Qsc0NBQWU7QUFBQTs7QUFDWCx5QkFBS0MsSUFBTCxHQUFZQyxhQUFhQyxPQUFiLENBQXFCLGNBQXJCLEtBQXdDLGVBQXBEO0FBQ0EseUJBQUtDLE1BQUwsR0FBYyxFQUFkOztBQUVBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLHlCQUFLQyxJQUFMLEdBQVksRUFBWjtBQUVIOztxQ0FFREMsUSx1QkFBWTs7QUFFUix5QkFBS0MsV0FBTCxDQUFpQixLQUFLUixJQUF0Qjs7QUFFQSx3QkFBSVMsT0FBTyxJQUFYOztBQUVBQyxnQ0FBWSxZQUFVO0FBQ2xCRCw2QkFBS0QsV0FBTCxDQUFpQkMsS0FBS1QsSUFBdEI7QUFDQVcsZ0NBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CSCxLQUFLVCxJQUF6QjtBQUNILHFCQUhELEVBR0csS0FISDtBQUtILGlCOztxQ0FHRFEsVyx3QkFBWVIsSSxFQUFNOztBQUVkLHdCQUFJUyxPQUFPLElBQVg7O0FBRUFaLHVCQUFHZ0IsYUFBSCxDQUFpQjtBQUNiQyxrQ0FBVWQsSUFERztBQUViZSwrQkFBTyxFQUZNO0FBR2JULDhCQUFNLEdBSE87QUFJYlUsaUNBQVMsaUJBQVNDLE9BQVQsRUFBa0I7QUFDdkJSLGlDQUFLTCxJQUFMLEdBQVksVUFBUWEsUUFBUWIsSUFBNUI7QUFDQUssaUNBQUtKLElBQUwsR0FBWVksUUFBUVosSUFBcEI7QUFDQUksaUNBQUtILElBQUwsR0FBWSxNQUFJVyxRQUFRQyxLQUFSLENBQWNiLElBQTlCO0FBQ0FJLGlDQUFLVCxJQUFMLEdBQVlpQixRQUFRakIsSUFBcEI7QUFDQVMsaUNBQUtOLE1BQUwsR0FBY2MsUUFBUWQsTUFBdEI7O0FBRUFGLHlDQUFha0IsT0FBYixDQUFxQixjQUFyQixFQUFxQ25CLElBQXJDO0FBRUgseUJBYlk7QUFjYm9CLCtCQUFPLGVBQVNBLE1BQVQsRUFBZ0I7QUFDckJULG9DQUFRQyxHQUFSLENBQVksV0FBV1EsTUFBWCxHQUFtQixPQUFuQixHQUE2QnBCLElBQXpDO0FBQ0FTLGlDQUFLSixJQUFMLEdBQVksaUJBQVo7QUFDQUksaUNBQUtILElBQUwsR0FBWSxFQUFaO0FBQ0FHLGlDQUFLTCxJQUFMLEdBQVksRUFBWjtBQUVEO0FBcEJZLHFCQUFqQjtBQXNCQWlCLDZCQUFTQyxjQUFULENBQXdCLGVBQXhCLEVBQXlDQyxJQUF6QztBQUNILGlCIiwiZmlsZSI6IndlYXRoZXJiYXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
