'use strict';

System.register(['aurelia-framework', 'aurelia-i18n', 'soundcloud', 'spotify'], function (_export, _context) {
    "use strict";

    var inject, I18N, Soundcloud, Spotify, _dec, _class, MusicMedia;

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
        }, function (_soundcloud) {
            Soundcloud = _soundcloud.Soundcloud;
        }, function (_spotify) {
            Spotify = _spotify.Spotify;
        }],
        execute: function () {
            _export('MusicMedia', MusicMedia = (_dec = inject(Soundcloud, Spotify), _dec(_class = function () {
                function MusicMedia(Soundcloud, Spotify) {
                    _classCallCheck(this, MusicMedia);

                    this.Soundcloud = Soundcloud;
                    this.Spotify = Spotify;
                    this.label = 'Spotify';

                    this.components = ['soundcloud', 'spotify'];
                    this.componentsMusic = {
                        'soundcloud': this.Soundcloud,
                        'spotify': this.Spotify
                    };

                    this.latest = localStorage.getItem("music-media.latest") || "spotify";
                    this.active = this.latest;
                }

                MusicMedia.prototype.attached = function attached() {
                    var _this = this;

                    this.componentsMusic[this.latest].active = true;
                    $(this.selectComp).val(this.latest);

                    $(this.selectComp).on('change', function (e) {
                        _this.loadComponent(e.target.value);
                    });
                };

                MusicMedia.prototype.loadComponent = function loadComponent(component) {
                    if (component in this.componentsMusic) {
                        this.componentsMusic[this.active].active = false;
                        this.active = component;
                        this.componentsMusic[component].active = true;
                        localStorage.setItem("music-media.latest", component);
                    } else {
                        console.log('component NA');
                    }
                };

                MusicMedia.prototype.loadNext = function loadNext() {
                    this.componentsMusic[this.active].loadNextTrack();
                };

                MusicMedia.prototype.loadPrev = function loadPrev() {
                    this.componentsMusic[this.active].loadPrevTrack();
                };

                return MusicMedia;
            }()) || _class));

            _export('MusicMedia', MusicMedia);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm11c2ljLW1lZGlhLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkkxOE4iLCJTb3VuZGNsb3VkIiwiU3BvdGlmeSIsIk11c2ljTWVkaWEiLCJsYWJlbCIsImNvbXBvbmVudHMiLCJjb21wb25lbnRzTXVzaWMiLCJsYXRlc3QiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYWN0aXZlIiwiYXR0YWNoZWQiLCIkIiwic2VsZWN0Q29tcCIsInZhbCIsIm9uIiwibG9hZENvbXBvbmVudCIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNvbXBvbmVudCIsInNldEl0ZW0iLCJjb25zb2xlIiwibG9nIiwibG9hZE5leHQiLCJsb2FkTmV4dFRyYWNrIiwibG9hZFByZXYiLCJsb2FkUHJldlRyYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOztBQUNBQyxzQixlQUFBQSxVOztBQUNBQyxtQixZQUFBQSxPOzs7a0NBR0tDLFUsV0FEWkosT0FBUUUsVUFBUixFQUFvQkMsT0FBcEIsQztBQUdHLG9DQUFhRCxVQUFiLEVBQXlCQyxPQUF6QixFQUFrQztBQUFBOztBQUM5Qix5QkFBS0QsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSx5QkFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EseUJBQUtFLEtBQUwsR0FBYSxTQUFiOztBQUVBLHlCQUFLQyxVQUFMLEdBQWtCLENBQUMsWUFBRCxFQUFlLFNBQWYsQ0FBbEI7QUFDQSx5QkFBS0MsZUFBTCxHQUF5QjtBQUNELHNDQUFjLEtBQUtMLFVBRGxCO0FBRUQsbUNBQVcsS0FBS0M7QUFGZixxQkFBekI7O0FBS0EseUJBQUtLLE1BQUwsR0FBY0MsYUFBYUMsT0FBYixDQUFxQixvQkFBckIsS0FBOEMsU0FBNUQ7QUFDQSx5QkFBS0MsTUFBTCxHQUFjLEtBQUtILE1BQW5CO0FBQ0g7O3FDQUVESSxRLHVCQUFXO0FBQUE7O0FBQ1AseUJBQUtMLGVBQUwsQ0FBcUIsS0FBS0MsTUFBMUIsRUFBa0NHLE1BQWxDLEdBQTJDLElBQTNDO0FBQ0FFLHNCQUFFLEtBQUtDLFVBQVAsRUFBbUJDLEdBQW5CLENBQXVCLEtBQUtQLE1BQTVCOztBQUdBSyxzQkFBRSxLQUFLQyxVQUFQLEVBQW1CRSxFQUFuQixDQUFzQixRQUF0QixFQUFnQyxhQUFLO0FBQ2pDLDhCQUFLQyxhQUFMLENBQW9CQyxFQUFFQyxNQUFGLENBQVNDLEtBQTdCO0FBQ0gscUJBRkQ7QUFHSCxpQjs7cUNBRURILGEsMEJBQWVJLFMsRUFBVztBQUN0Qix3QkFBSUEsYUFBYSxLQUFLZCxlQUF0QixFQUF1QztBQUNuQyw2QkFBS0EsZUFBTCxDQUFxQixLQUFLSSxNQUExQixFQUFrQ0EsTUFBbEMsR0FBMkMsS0FBM0M7QUFDQSw2QkFBS0EsTUFBTCxHQUFjVSxTQUFkO0FBQ0EsNkJBQUtkLGVBQUwsQ0FBcUJjLFNBQXJCLEVBQWdDVixNQUFoQyxHQUF5QyxJQUF6QztBQUNBRixxQ0FBYWEsT0FBYixDQUFxQixvQkFBckIsRUFBMkNELFNBQTNDO0FBQ0gscUJBTEQsTUFNSztBQUNERSxnQ0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDSDtBQUNKLGlCOztxQ0FFREMsUSx1QkFBWTtBQUNSLHlCQUFLbEIsZUFBTCxDQUFxQixLQUFLSSxNQUExQixFQUFrQ2UsYUFBbEM7QUFDSCxpQjs7cUNBRURDLFEsdUJBQVk7QUFDUix5QkFBS3BCLGVBQUwsQ0FBcUIsS0FBS0ksTUFBMUIsRUFBa0NpQixhQUFsQztBQUNILGlCIiwiZmlsZSI6Im11c2ljLW1lZGlhLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
