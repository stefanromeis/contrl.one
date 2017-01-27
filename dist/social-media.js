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
                    this.componentsO = {
                        'facebook': this.Facebook,
                        'instagram': this.Instagram
                    };

                    this.latest = localStorage.getItem("social-media.latest") || "facebook";
                }

                SocialMedia.prototype.attached = function attached() {
                    this.componentsO[this.latest].active = true;
                };

                SocialMedia.prototype.loadComponent = function loadComponent(component) {
                    console.log(component);
                    if (component in this.componentsO) {
                        this.componentsO[this.latest].active = false;
                        this.latest = component;
                        this.componentsO[component].active = true;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2lhbC1tZWRpYS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJJMThOIiwiRmFjZWJvb2siLCJJbnN0YWdyYW0iLCJTb2NpYWxNZWRpYSIsImxhYmVsIiwiY29tcG9uZW50cyIsImNvbXBvbmVudHNPIiwibGF0ZXN0IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImF0dGFjaGVkIiwiYWN0aXZlIiwibG9hZENvbXBvbmVudCIsImNvbXBvbmVudCIsImNvbnNvbGUiLCJsb2ciLCJzZXRJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOztBQUNBQyxvQixhQUFBQSxROztBQUNBQyxxQixjQUFBQSxTOzs7bUNBR0tDLFcsV0FEWkosT0FBUUUsUUFBUixFQUFrQkMsU0FBbEIsQztBQUVHLHFDQUFhRCxRQUFiLEVBQXVCQyxTQUF2QixFQUFrQztBQUFBOztBQUM5Qix5QkFBS0QsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSx5QkFBS0MsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSx5QkFBS0UsS0FBTCxHQUFhLFdBQWI7O0FBRUEseUJBQUtDLFVBQUwsR0FBa0IsQ0FBQyxVQUFELEVBQWEsV0FBYixDQUFsQjtBQUNBLHlCQUFLQyxXQUFMLEdBQXFCO0FBQ0csb0NBQVksS0FBS0wsUUFEcEI7QUFFRyxxQ0FBYSxLQUFLQztBQUZyQixxQkFBckI7O0FBS0EseUJBQUtLLE1BQUwsR0FBY0MsYUFBYUMsT0FBYixDQUFxQixxQkFBckIsS0FBK0MsVUFBN0Q7QUFDSDs7c0NBRURDLFEsdUJBQVc7QUFDUCx5QkFBS0osV0FBTCxDQUFpQixLQUFLQyxNQUF0QixFQUE4QkksTUFBOUIsR0FBdUMsSUFBdkM7QUFDSCxpQjs7c0NBRURDLGEsMEJBQWVDLFMsRUFBVztBQUN0QkMsNEJBQVFDLEdBQVIsQ0FBWUYsU0FBWjtBQUNBLHdCQUFJQSxhQUFhLEtBQUtQLFdBQXRCLEVBQW1DO0FBQy9CLDZCQUFLQSxXQUFMLENBQWlCLEtBQUtDLE1BQXRCLEVBQThCSSxNQUE5QixHQUF1QyxLQUF2QztBQUNBLDZCQUFLSixNQUFMLEdBQWNNLFNBQWQ7QUFDQSw2QkFBS1AsV0FBTCxDQUFpQk8sU0FBakIsRUFBNEJGLE1BQTVCLEdBQXFDLElBQXJDO0FBQ0FILHFDQUFhUSxPQUFiLENBQXFCLHFCQUFyQixFQUE0Q0gsU0FBNUM7QUFDSCxxQkFMRCxNQU1LO0FBQ0RDLGdDQUFRQyxHQUFSLENBQVksY0FBWjtBQUNIO0FBQ0osaUIiLCJmaWxlIjoic29jaWFsLW1lZGlhLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
