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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYXRoZXJiYXIuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsImpRIiwiJCIsIldlYXRoZXJiYXIiLCJjaXR5IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInJlZ2lvbiIsImNvZGUiLCJ0ZW1wIiwidW5pdCIsImF0dGFjaGVkIiwibG9hZFdlYXRoZXIiLCJzZWxmIiwic2V0SW50ZXJ2YWwiLCJzaW1wbGVXZWF0aGVyIiwibG9jYXRpb24iLCJ3b2VpZCIsInN1Y2Nlc3MiLCJ3ZWF0aGVyIiwidW5pdHMiLCJzZXRJdGVtIiwiZXJyb3IiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYmx1ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNBQyxnQixnQkFBQUEsSTs7O0FBRUpDLGMsR0FBS0MsQzs7a0NBRUlDLFU7QUFDVCxzQ0FBZTtBQUFBOztBQUNYLHlCQUFLQyxJQUFMLEdBQVlDLGFBQWFDLE9BQWIsQ0FBcUIsY0FBckIsS0FBd0MsZUFBcEQ7QUFDQSx5QkFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSx5QkFBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSx5QkFBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSx5QkFBS0MsSUFBTCxHQUFZLEVBQVo7QUFDSDs7cUNBRURDLFEsdUJBQVk7O0FBRVIseUJBQUtDLFdBQUwsQ0FBaUIsS0FBS1IsSUFBdEI7O0FBRUEsd0JBQUlTLE9BQU8sSUFBWDtBQUNBQyxnQ0FBWSxZQUFVO0FBQ2xCRCw2QkFBS0QsV0FBTCxDQUFpQkMsS0FBS1QsSUFBdEI7QUFDSCxxQkFGRCxFQUVHLEtBRkg7QUFJSCxpQjs7cUNBRURRLFcsd0JBQVlSLEksRUFBTTs7QUFFZCx3QkFBSVMsT0FBTyxJQUFYOztBQUVBWix1QkFBR2MsYUFBSCxDQUFpQjtBQUNiQyxrQ0FBVUgsS0FBS1QsSUFERjtBQUViYSwrQkFBTyxFQUZNO0FBR2JQLDhCQUFNLEdBSE87QUFJYlEsaUNBQVMsaUJBQVNDLE9BQVQsRUFBa0I7QUFDdkJOLGlDQUFLTCxJQUFMLEdBQVksVUFBUVcsUUFBUVgsSUFBNUI7QUFDQUssaUNBQUtKLElBQUwsR0FBWVUsUUFBUVYsSUFBcEI7QUFDQUksaUNBQUtILElBQUwsR0FBWSxNQUFJUyxRQUFRQyxLQUFSLENBQWNYLElBQTlCO0FBQ0FJLGlDQUFLVCxJQUFMLEdBQVllLFFBQVFmLElBQXBCO0FBQ0FTLGlDQUFLTixNQUFMLEdBQWNZLFFBQVFaLE1BQXRCOztBQUVBRix5Q0FBYWdCLE9BQWIsQ0FBcUIsY0FBckIsRUFBcUNqQixJQUFyQztBQUNILHlCQVpZO0FBYWJrQiwrQkFBTyxlQUFTQSxNQUFULEVBQWdCO0FBRXJCVCxpQ0FBS0osSUFBTCxHQUFZLGlCQUFaO0FBQ0FJLGlDQUFLSCxJQUFMLEdBQVksRUFBWjtBQUNBRyxpQ0FBS0wsSUFBTCxHQUFZLEVBQVo7QUFDRDtBQWxCWSxxQkFBakI7QUFvQkFlLDZCQUFTQyxjQUFULENBQXdCLGVBQXhCLEVBQXlDQyxJQUF6QztBQUNILGlCIiwiZmlsZSI6IndlYXRoZXJiYXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
