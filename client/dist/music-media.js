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
                        console.log(e.target.value);
                    });
                };

                MusicMedia.prototype.loadComponent = function loadComponent(component) {
                    if (component in this.componentsMusic) {
                        this.componentsMusic[this.active].active = false;
                        console.log(this.componentsMusic[this.active].active);
                        this.active = component;

                        this.componentsMusic[component].active = true;
                        localStorage.setItem("music-media.latest", component);
                    } else {
                        console.log('component NA');
                    }
                };

                return MusicMedia;
            }()) || _class));

            _export('MusicMedia', MusicMedia);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm11c2ljLW1lZGlhLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkkxOE4iLCJTb3VuZGNsb3VkIiwiU3BvdGlmeSIsIk11c2ljTWVkaWEiLCJsYWJlbCIsImNvbXBvbmVudHMiLCJjb21wb25lbnRzTXVzaWMiLCJsYXRlc3QiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYWN0aXZlIiwiYXR0YWNoZWQiLCIkIiwic2VsZWN0Q29tcCIsInZhbCIsIm9uIiwibG9hZENvbXBvbmVudCIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJjb21wb25lbnQiLCJzZXRJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLGdCLGdCQUFBQSxJOztBQUNBQyxzQixlQUFBQSxVOztBQUNBQyxtQixZQUFBQSxPOzs7a0NBR0tDLFUsV0FEWkosT0FBUUUsVUFBUixFQUFvQkMsT0FBcEIsQztBQUdHLG9DQUFhRCxVQUFiLEVBQXlCQyxPQUF6QixFQUFrQztBQUFBOztBQUM5Qix5QkFBS0QsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSx5QkFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EseUJBQUtFLEtBQUwsR0FBYSxTQUFiOztBQUVBLHlCQUFLQyxVQUFMLEdBQWtCLENBQUMsWUFBRCxFQUFlLFNBQWYsQ0FBbEI7QUFDQSx5QkFBS0MsZUFBTCxHQUF5QjtBQUNELHNDQUFjLEtBQUtMLFVBRGxCO0FBRUQsbUNBQVcsS0FBS0M7QUFGZixxQkFBekI7O0FBS0EseUJBQUtLLE1BQUwsR0FBY0MsYUFBYUMsT0FBYixDQUFxQixvQkFBckIsS0FBOEMsU0FBNUQ7QUFDQSx5QkFBS0MsTUFBTCxHQUFjLEtBQUtILE1BQW5CO0FBR0g7O3FDQUVESSxRLHVCQUFXO0FBQUE7O0FBQ1AseUJBQUtMLGVBQUwsQ0FBcUIsS0FBS0MsTUFBMUIsRUFBa0NHLE1BQWxDLEdBQTJDLElBQTNDO0FBQ0FFLHNCQUFFLEtBQUtDLFVBQVAsRUFBbUJDLEdBQW5CLENBQXVCLEtBQUtQLE1BQTVCOztBQUdBSyxzQkFBRSxLQUFLQyxVQUFQLEVBQW1CRSxFQUFuQixDQUFzQixRQUF0QixFQUFnQyxhQUFLO0FBQ2pDLDhCQUFLQyxhQUFMLENBQW9CQyxFQUFFQyxNQUFGLENBQVNDLEtBQTdCO0FBQ0FDLGdDQUFRQyxHQUFSLENBQVlKLEVBQUVDLE1BQUYsQ0FBU0MsS0FBckI7QUFDSCxxQkFIRDtBQUlILGlCOztxQ0FFREgsYSwwQkFBZU0sUyxFQUFXO0FBQ3RCLHdCQUFJQSxhQUFhLEtBQUtoQixlQUF0QixFQUF1QztBQUNuQyw2QkFBS0EsZUFBTCxDQUFxQixLQUFLSSxNQUExQixFQUFrQ0EsTUFBbEMsR0FBMkMsS0FBM0M7QUFDQVUsZ0NBQVFDLEdBQVIsQ0FBWSxLQUFLZixlQUFMLENBQXFCLEtBQUtJLE1BQTFCLEVBQWtDQSxNQUE5QztBQUNBLDZCQUFLQSxNQUFMLEdBQWNZLFNBQWQ7O0FBRUEsNkJBQUtoQixlQUFMLENBQXFCZ0IsU0FBckIsRUFBZ0NaLE1BQWhDLEdBQXlDLElBQXpDO0FBQ0FGLHFDQUFhZSxPQUFiLENBQXFCLG9CQUFyQixFQUEyQ0QsU0FBM0M7QUFDSCxxQkFQRCxNQVFLO0FBQ0RGLGdDQUFRQyxHQUFSLENBQVksY0FBWjtBQUNIO0FBQ0osaUIiLCJmaWxlIjoibXVzaWMtbWVkaWEuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
