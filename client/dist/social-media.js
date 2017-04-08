'use strict';

System.register(['aurelia-framework', 'aurelia-i18n', 'facebook', 'instagram'], function (_export, _context) {
    "use strict";

    var inject, I18N, Facebook, Instagram, _dec, _class, SocialMedia;

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
        }, function (_facebook) {
            Facebook = _facebook.Facebook;
        }, function (_instagram) {
            Instagram = _instagram.Instagram;
        }],
        execute: function () {
            _export('SocialMedia', SocialMedia = (_dec = inject(Facebook, Instagram), _dec(_class = function () {
                function SocialMedia(Facebook, Instagram) {
                    _classCallCheck(this, SocialMedia);

                    this.facebook = Facebook;
                    this.instagram = Instagram;
                    this.components = ['facebook', 'instagram'];
                    this.componentsSocial = { 'facebook': this.facebook,
                        'instagram': this.instagram };

                    this.latest = localStorage.getItem("social-media.latest") || "facebook";
                    this.active = this.latest;
                    this.init();
                }

                SocialMedia.prototype.init = function init() {
                    var _this = this;

                    this.componentsSocial[this.active].active = true;

                    $(this.selectComp).on('change', function (e) {
                        _this.loadComponent(e.target.value);
                    });
                };

                SocialMedia.prototype.loadComponent = function loadComponent(component) {
                    if (component in this.componentsSocial) {
                        this.componentsSocial[this.active].active = false;
                        this.active = component;
                        this.componentsSocial[component].active = true;
                        localStorage.setItem("social-media.latest", component);
                        this.latest = component;
                    } else {
                        console.log('Component NA');
                    }
                };

                return SocialMedia;
            }()) || _class));

            _export('SocialMedia', SocialMedia);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2lhbC1tZWRpYS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJJMThOIiwiRmFjZWJvb2siLCJJbnN0YWdyYW0iLCJTb2NpYWxNZWRpYSIsImZhY2Vib29rIiwiaW5zdGFncmFtIiwiY29tcG9uZW50cyIsImNvbXBvbmVudHNTb2NpYWwiLCJsYXRlc3QiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYWN0aXZlIiwiaW5pdCIsIiQiLCJzZWxlY3RDb21wIiwib24iLCJsb2FkQ29tcG9uZW50IiwiZSIsInRhcmdldCIsInZhbHVlIiwiY29tcG9uZW50Iiwic2V0SXRlbSIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7O0FBQ0FDLG9CLGFBQUFBLFE7O0FBQ0FDLHFCLGNBQUFBLFM7OzttQ0FHS0MsVyxXQURaSixPQUFRRSxRQUFSLEVBQWtCQyxTQUFsQixDO0FBR0cscUNBQWFELFFBQWIsRUFBdUJDLFNBQXZCLEVBQWtDO0FBQUE7O0FBQzlCLHlCQUFLRSxRQUFMLEdBQWdCSCxRQUFoQjtBQUNBLHlCQUFLSSxTQUFMLEdBQWlCSCxTQUFqQjtBQUNBLHlCQUFLSSxVQUFMLEdBQWtCLENBQUMsVUFBRCxFQUFhLFdBQWIsQ0FBbEI7QUFDQSx5QkFBS0MsZ0JBQUwsR0FBMEIsRUFBRSxZQUFZLEtBQUtILFFBQW5CO0FBQ0UscUNBQWEsS0FBS0MsU0FEcEIsRUFBMUI7O0FBR0EseUJBQUtHLE1BQUwsR0FBY0MsYUFBYUMsT0FBYixDQUFxQixxQkFBckIsS0FBK0MsVUFBN0Q7QUFDQSx5QkFBS0MsTUFBTCxHQUFjLEtBQUtILE1BQW5CO0FBQ0EseUJBQUtJLElBQUw7QUFDSDs7c0NBRURBLEksbUJBQU87QUFBQTs7QUFDSCx5QkFBS0wsZ0JBQUwsQ0FBc0IsS0FBS0ksTUFBM0IsRUFBbUNBLE1BQW5DLEdBQTRDLElBQTVDOztBQUVBRSxzQkFBRSxLQUFLQyxVQUFQLEVBQW1CQyxFQUFuQixDQUFzQixRQUF0QixFQUFnQyxhQUFLO0FBQ2pDLDhCQUFLQyxhQUFMLENBQW9CQyxFQUFFQyxNQUFGLENBQVNDLEtBQTdCO0FBQ0gscUJBRkQ7QUFHSCxpQjs7c0NBRURILGEsMEJBQWVJLFMsRUFBVztBQUN0Qix3QkFBSUEsYUFBYSxLQUFLYixnQkFBdEIsRUFBd0M7QUFDcEMsNkJBQUtBLGdCQUFMLENBQXNCLEtBQUtJLE1BQTNCLEVBQW1DQSxNQUFuQyxHQUE0QyxLQUE1QztBQUNBLDZCQUFLQSxNQUFMLEdBQWNTLFNBQWQ7QUFDQSw2QkFBS2IsZ0JBQUwsQ0FBc0JhLFNBQXRCLEVBQWlDVCxNQUFqQyxHQUEwQyxJQUExQztBQUNBRixxQ0FBYVksT0FBYixDQUFxQixxQkFBckIsRUFBNENELFNBQTVDO0FBQ0EsNkJBQUtaLE1BQUwsR0FBY1ksU0FBZDtBQUNILHFCQU5ELE1BT0s7QUFDREUsZ0NBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0g7QUFDSixpQiIsImZpbGUiOiJzb2NpYWwtbWVkaWEuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
