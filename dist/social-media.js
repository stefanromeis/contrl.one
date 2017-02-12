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

                    this.Facebook = Facebook;
                    this.Instagram = Instagram;
                    this.label = 'Instagram';

                    this.components = ['facebook', 'instagram'];
                    this.componentsSocial = {
                        'facebook': this.Facebook,
                        'instagram': this.Instagram
                    };

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
                    } else {
                        console.log('component NA');
                    }
                };

                return SocialMedia;
            }()) || _class));

            _export('SocialMedia', SocialMedia);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2lhbC1tZWRpYS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJJMThOIiwiRmFjZWJvb2siLCJJbnN0YWdyYW0iLCJTb2NpYWxNZWRpYSIsImxhYmVsIiwiY29tcG9uZW50cyIsImNvbXBvbmVudHNTb2NpYWwiLCJsYXRlc3QiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYWN0aXZlIiwiaW5pdCIsIiQiLCJzZWxlY3RDb21wIiwib24iLCJsb2FkQ29tcG9uZW50IiwiZSIsInRhcmdldCIsInZhbHVlIiwiY29tcG9uZW50Iiwic2V0SXRlbSIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7O0FBQ0FDLG9CLGFBQUFBLFE7O0FBQ0FDLHFCLGNBQUFBLFM7OzttQ0FJS0MsVyxXQURaSixPQUFRRSxRQUFSLEVBQWtCQyxTQUFsQixDO0FBR0cscUNBQWFELFFBQWIsRUFBdUJDLFNBQXZCLEVBQWtDO0FBQUE7O0FBRTlCLHlCQUFLRCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLHlCQUFLRSxLQUFMLEdBQWEsV0FBYjs7QUFFQSx5QkFBS0MsVUFBTCxHQUFrQixDQUFDLFVBQUQsRUFBYSxXQUFiLENBQWxCO0FBQ0EseUJBQUtDLGdCQUFMLEdBQTBCO0FBQ0Ysb0NBQVksS0FBS0wsUUFEZjtBQUVGLHFDQUFhLEtBQUtDO0FBRmhCLHFCQUExQjs7QUFLQSx5QkFBS0ssTUFBTCxHQUFjQyxhQUFhQyxPQUFiLENBQXFCLHFCQUFyQixLQUErQyxVQUE3RDtBQUNBLHlCQUFLQyxNQUFMLEdBQWMsS0FBS0gsTUFBbkI7QUFDQSx5QkFBS0ksSUFBTDtBQUVIOztzQ0FFREEsSSxtQkFBTztBQUFBOztBQUVILHlCQUFLTCxnQkFBTCxDQUFzQixLQUFLSSxNQUEzQixFQUFtQ0EsTUFBbkMsR0FBNEMsSUFBNUM7O0FBSUFFLHNCQUFFLEtBQUtDLFVBQVAsRUFBbUJDLEVBQW5CLENBQXNCLFFBQXRCLEVBQWdDLGFBQUs7QUFDakMsOEJBQUtDLGFBQUwsQ0FBb0JDLEVBQUVDLE1BQUYsQ0FBU0MsS0FBN0I7QUFDSCxxQkFGRDtBQUlILGlCOztzQ0FFREgsYSwwQkFBZUksUyxFQUFXO0FBQ3RCLHdCQUFJQSxhQUFhLEtBQUtiLGdCQUF0QixFQUF3QztBQUNwQyw2QkFBS0EsZ0JBQUwsQ0FBc0IsS0FBS0ksTUFBM0IsRUFBbUNBLE1BQW5DLEdBQTRDLEtBQTVDO0FBQ0EsNkJBQUtBLE1BQUwsR0FBY1MsU0FBZDtBQUNBLDZCQUFLYixnQkFBTCxDQUFzQmEsU0FBdEIsRUFBaUNULE1BQWpDLEdBQTBDLElBQTFDO0FBQ0FGLHFDQUFhWSxPQUFiLENBQXFCLHFCQUFyQixFQUE0Q0QsU0FBNUM7QUFDSCxxQkFMRCxNQU1LO0FBQ0RFLGdDQUFRQyxHQUFSLENBQVksY0FBWjtBQUNIO0FBQ0osaUIiLCJmaWxlIjoic29jaWFsLW1lZGlhLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
