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
                            self.unit = weather.units.temp;
                            self.city = weather.city;
                            self.region = weather.region;

                            localStorage.setItem("weather.city", weather.city);
                        },
                        error: function error(_error) {
                            console.log(_error);
                            self.city = _error;
                        }
                    });

                    $("#search").blur();
                };

                return Weatherbar;
            }());

            _export('Weatherbar', Weatherbar);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYXRoZXJiYXIuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSTE4TiIsImpRIiwiJCIsIldlYXRoZXJiYXIiLCJjaXR5IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInJlZ2lvbiIsImNvZGUiLCJ0ZW1wIiwidW5pdCIsImF0dGFjaGVkIiwibG9hZFdlYXRoZXIiLCJzZWxmIiwic2V0SW50ZXJ2YWwiLCJjb25zb2xlIiwibG9nIiwic2ltcGxlV2VhdGhlciIsImxvY2F0aW9uIiwid29laWQiLCJzdWNjZXNzIiwid2VhdGhlciIsInVuaXRzIiwic2V0SXRlbSIsImVycm9yIiwiYmx1ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNBQyxnQixnQkFBQUEsSTs7O0FBRUpDLGMsR0FBS0MsQzs7a0NBRUlDLFU7QUFDVCxzQ0FBZTtBQUFBOztBQUNYLHlCQUFLQyxJQUFMLEdBQVlDLGFBQWFDLE9BQWIsQ0FBcUIsY0FBckIsS0FBd0MsZUFBcEQ7QUFDQSx5QkFBS0MsTUFBTCxHQUFjLEVBQWQ7O0FBRUEseUJBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EseUJBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EseUJBQUtDLElBQUwsR0FBWSxFQUFaO0FBRUg7O3FDQUVEQyxRLHVCQUFZOztBQUVSLHlCQUFLQyxXQUFMLENBQWlCLEtBQUtSLElBQXRCOztBQUVBLHdCQUFJUyxPQUFPLElBQVg7O0FBRUFDLGdDQUFZLFlBQVU7QUFDbEJELDZCQUFLRCxXQUFMLENBQWlCQyxLQUFLVCxJQUF0QjtBQUNBVyxnQ0FBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JILEtBQUtULElBQXpCO0FBQ0gscUJBSEQsRUFHRyxLQUhIO0FBS0gsaUI7O3FDQUdEUSxXLHdCQUFZUixJLEVBQU07O0FBRWQsd0JBQUlTLE9BQU8sSUFBWDs7QUFFQVosdUJBQUdnQixhQUFILENBQWlCO0FBQ2JDLGtDQUFVZCxJQURHO0FBRWJlLCtCQUFPLEVBRk07QUFHYlQsOEJBQU0sR0FITztBQUliVSxpQ0FBUyxpQkFBU0MsT0FBVCxFQUFrQjtBQUN2QlIsaUNBQUtMLElBQUwsR0FBWSxVQUFRYSxRQUFRYixJQUE1QjtBQUNBSyxpQ0FBS0osSUFBTCxHQUFZWSxRQUFRWixJQUFwQjtBQUNBSSxpQ0FBS0gsSUFBTCxHQUFZVyxRQUFRQyxLQUFSLENBQWNiLElBQTFCO0FBQ0FJLGlDQUFLVCxJQUFMLEdBQVlpQixRQUFRakIsSUFBcEI7QUFDQVMsaUNBQUtOLE1BQUwsR0FBY2MsUUFBUWQsTUFBdEI7O0FBRUFGLHlDQUFha0IsT0FBYixDQUFxQixjQUFyQixFQUFxQ0YsUUFBUWpCLElBQTdDO0FBRUgseUJBYlk7QUFjYm9CLCtCQUFPLGVBQVNBLE1BQVQsRUFBZ0I7QUFDckJULG9DQUFRQyxHQUFSLENBQVlRLE1BQVo7QUFDQVgsaUNBQUtULElBQUwsR0FBWW9CLE1BQVo7QUFDRDtBQWpCWSxxQkFBakI7O0FBb0JBdEIsc0JBQUUsU0FBRixFQUFhdUIsSUFBYjtBQUNILGlCIiwiZmlsZSI6IndlYXRoZXJiYXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
