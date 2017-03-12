'use strict';

System.register(['aurelia-framework', './time'], function (_export, _context) {
    "use strict";

    var inject, Time, Profile;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_time) {
            Time = _time.Time;
        }],
        execute: function () {
            _export('Profile', Profile = function () {
                function Profile() {
                    _classCallCheck(this, Profile);

                    this.TIME = new Time();
                    this.date = "";
                    this.time = "";

                    this.attached();
                }

                Profile.prototype.attached = function attached() {

                    var self = this;

                    setInterval(function () {
                        self.time = self.TIME.time;
                        self.date = self.TIME.date;
                    }, 1000);
                };

                return Profile;
            }());

            _export('Profile', Profile);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiVGltZSIsIlByb2ZpbGUiLCJUSU1FIiwiZGF0ZSIsInRpbWUiLCJhdHRhY2hlZCIsInNlbGYiLCJzZXRJbnRlcnZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNBQyxnQixTQUFBQSxJOzs7K0JBRUtDLE87QUFDVCxtQ0FBZTtBQUFBOztBQUNYLHlCQUFLQyxJQUFMLEdBQVksSUFBSUYsSUFBSixFQUFaO0FBQ0EseUJBQUtHLElBQUwsR0FBWSxFQUFaO0FBQ0EseUJBQUtDLElBQUwsR0FBWSxFQUFaOztBQUVBLHlCQUFLQyxRQUFMO0FBQ0g7O2tDQUVEQSxRLHVCQUFXOztBQUVQLHdCQUFJQyxPQUFPLElBQVg7O0FBRUFDLGdDQUFZLFlBQVU7QUFDbEJELDZCQUFLRixJQUFMLEdBQVlFLEtBQUtKLElBQUwsQ0FBVUUsSUFBdEI7QUFDQUUsNkJBQUtILElBQUwsR0FBWUcsS0FBS0osSUFBTCxDQUFVQyxJQUF0QjtBQUNILHFCQUhELEVBR0csSUFISDtBQUtILGlCIiwiZmlsZSI6InByb2ZpbGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
