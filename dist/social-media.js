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

                    console.log('latest', this.latest);

                    this.componentsSocial[this.active].active = true;

                    $(this.selectComp).on('change', function (e) {
                        _this.loadComponent(e.target.value);
                    });
                };

                SocialMedia.prototype.loadComponent = function loadComponent(component) {
                    console.log('comp ', component);
                    if (component in this.componentsSocial) {
                        this.componentsSocial[this.active].active = false;
                        console.log('comp inactive', this.active);
                        this.active = component;
                        this.componentsSocial[component].active = true;
                        localStorage.setItem("social-media.latest", component);
                        console.log('component active:', this.active);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2lhbC1tZWRpYS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJJMThOIiwiRmFjZWJvb2siLCJJbnN0YWdyYW0iLCJTb2NpYWxNZWRpYSIsImxhYmVsIiwiY29tcG9uZW50cyIsImNvbXBvbmVudHNTb2NpYWwiLCJsYXRlc3QiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYWN0aXZlIiwiaW5pdCIsImNvbnNvbGUiLCJsb2ciLCIkIiwic2VsZWN0Q29tcCIsIm9uIiwibG9hZENvbXBvbmVudCIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNvbXBvbmVudCIsInNldEl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7O0FBQ0FDLG9CLGFBQUFBLFE7O0FBQ0FDLHFCLGNBQUFBLFM7OzttQ0FJS0MsVyxXQURaSixPQUFRRSxRQUFSLEVBQWtCQyxTQUFsQixDO0FBR0cscUNBQWFELFFBQWIsRUFBdUJDLFNBQXZCLEVBQWtDO0FBQUE7O0FBRTlCLHlCQUFLRCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLHlCQUFLRSxLQUFMLEdBQWEsV0FBYjs7QUFFQSx5QkFBS0MsVUFBTCxHQUFrQixDQUFDLFVBQUQsRUFBYSxXQUFiLENBQWxCO0FBQ0EseUJBQUtDLGdCQUFMLEdBQTBCO0FBQ0Ysb0NBQVksS0FBS0wsUUFEZjtBQUVGLHFDQUFhLEtBQUtDO0FBRmhCLHFCQUExQjs7QUFLQSx5QkFBS0ssTUFBTCxHQUFjQyxhQUFhQyxPQUFiLENBQXFCLHFCQUFyQixLQUErQyxVQUE3RDtBQUNBLHlCQUFLQyxNQUFMLEdBQWMsS0FBS0gsTUFBbkI7QUFDQSx5QkFBS0ksSUFBTDtBQUVIOztzQ0FFREEsSSxtQkFBTztBQUFBOztBQUNIQyw0QkFBUUMsR0FBUixDQUFZLFFBQVosRUFBc0IsS0FBS04sTUFBM0I7O0FBRUEseUJBQUtELGdCQUFMLENBQXNCLEtBQUtJLE1BQTNCLEVBQW1DQSxNQUFuQyxHQUE0QyxJQUE1Qzs7QUFJQUksc0JBQUUsS0FBS0MsVUFBUCxFQUFtQkMsRUFBbkIsQ0FBc0IsUUFBdEIsRUFBZ0MsYUFBSztBQUNqQyw4QkFBS0MsYUFBTCxDQUFvQkMsRUFBRUMsTUFBRixDQUFTQyxLQUE3QjtBQUNILHFCQUZEO0FBSUgsaUI7O3NDQUVESCxhLDBCQUFlSSxTLEVBQVc7QUFDdEJULDRCQUFRQyxHQUFSLENBQVksT0FBWixFQUFxQlEsU0FBckI7QUFDQSx3QkFBSUEsYUFBYSxLQUFLZixnQkFBdEIsRUFBd0M7QUFDcEMsNkJBQUtBLGdCQUFMLENBQXNCLEtBQUtJLE1BQTNCLEVBQW1DQSxNQUFuQyxHQUE0QyxLQUE1QztBQUNBRSxnQ0FBUUMsR0FBUixDQUFZLGVBQVosRUFBNkIsS0FBS0gsTUFBbEM7QUFDQSw2QkFBS0EsTUFBTCxHQUFjVyxTQUFkO0FBQ0EsNkJBQUtmLGdCQUFMLENBQXNCZSxTQUF0QixFQUFpQ1gsTUFBakMsR0FBMEMsSUFBMUM7QUFDQUYscUNBQWFjLE9BQWIsQ0FBcUIscUJBQXJCLEVBQTRDRCxTQUE1QztBQUNBVCxnQ0FBUUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDLEtBQUtILE1BQXRDO0FBQ0gscUJBUEQsTUFRSztBQUNERSxnQ0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDSDtBQUNKLGlCIiwiZmlsZSI6InNvY2lhbC1tZWRpYS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
