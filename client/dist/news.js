'use strict';

System.register(['aurelia-framework', './services/authConfig'], function (_export, _context) {
    "use strict";

    var inject, config, News;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_servicesAuthConfig) {
            config = _servicesAuthConfig.default;
        }],
        execute: function () {
            _export('News', News = function () {
                function News() {
                    _classCallCheck(this, News);

                    this.sources = [];
                    this.api = config.providers.news.api;
                    this.apiKey = config.providers.news.apiKey;
                    this.source = localStorage.getItem("news.en.source") || localStorage.getItem("news.de.source") || "cnn";
                    this.lang = localStorage.getItem("news.lang") || "en";
                    this.articles;
                    this.tempArticles;
                    this.firstLoad = true;
                    this.updates = 0;
                    this.author;
                    this.description;
                    this.publishedAt;
                    this.title;
                    this.url;
                    this.urlToImage;
                    this.image;
                    this.headline = "";
                    this.activeSource = {
                        name: "",
                        id: "",
                        urlsToLogos: "",
                        url: ""
                    };
                    this.isLoading = false;
                }

                News.prototype.attached = function attached() {
                    var _this = this;

                    this.getSources(this.lang);
                    this.index = 0;
                    var self = this;

                    $(this.selectSource).on('change', function (e) {
                        _this.getArticles(e.target.value);
                    });

                    setInterval(function () {
                        self.getSources(self.lang);
                    }, 30000);
                };

                News.prototype.getSources = function getSources(lang) {
                    var self = this;
                    this.lang = lang;
                    $.ajax({
                        url: self.api + '/sources?language=' + self.lang + '&apiKey=' + self.apiKey,
                        dataType: 'json',
                        type: 'GET'
                    }).done(function (data) {
                        self.sources = [];
                        for (var x = 0; x < data.sources.length; x++) {
                            var source = {};
                            source.name = data.sources[x].name;
                            source.id = data.sources[x].id;
                            source.urlsToLogos = data.sources[x].urlsToLogos.medium;
                            source.url = data.sources[x].url;
                            self.sources.push(source);
                        }
                        var str = 'news.' + self.lang + '.source';

                        if (localStorage.getItem(str) !== 'null') {
                            self.source = localStorage.getItem(str);
                        } else {
                            self.source = self.lang == 'de' ? 'bild' : 'cnn';
                        }
                        if (localStorage.getItem('news.lang') != self.lang) {
                            $(".article-body").animate({ scrollTop: 0 }, "slow");
                        }
                        localStorage.setItem('news.lang', self.lang);
                        self.getArticles(self.source);
                    });
                };

                News.prototype.getArticles = function getArticles(source) {
                    var result = $.grep(this.sources, function (e) {
                        return e.id == source;
                    });

                    if (result.length > 0) {
                        this.activeSource.name = result[0].name;
                        this.activeSource.id = result[0].id;
                        this.activeSource.urlsToLogos = result[0].urlsToLogos;
                        this.activeSource.url = result[0].url;
                    }
                    var str = 'news.' + this.lang + '.source';
                    if (localStorage.getItem(str) != this.source) {
                        $(".article-body").animate({ scrollTop: 0 }, "slow");
                    }
                    localStorage.setItem(str, source);

                    var self = this;
                    $.ajax({
                        url: self.api + '/articles?source=' + source.toLowerCase() + '&apiKey=' + self.apiKey,
                        dataType: 'json',
                        type: 'GET'
                    }).done(function (data) {
                        self.articles = data.articles;

                        if (self.firstLoad) {
                            self.tempArticles = self.articles;
                            this.firstLoad = false;
                        } else {
                            if (self.articles.title != self.tempArticles.title) {
                                self.updates++;
                            }
                        }
                    });
                };

                return News;
            }());

            _export('News', News);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld3MuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiY29uZmlnIiwiTmV3cyIsInNvdXJjZXMiLCJhcGkiLCJwcm92aWRlcnMiLCJuZXdzIiwiYXBpS2V5Iiwic291cmNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImxhbmciLCJhcnRpY2xlcyIsInRlbXBBcnRpY2xlcyIsImZpcnN0TG9hZCIsInVwZGF0ZXMiLCJhdXRob3IiLCJkZXNjcmlwdGlvbiIsInB1Ymxpc2hlZEF0IiwidGl0bGUiLCJ1cmwiLCJ1cmxUb0ltYWdlIiwiaW1hZ2UiLCJoZWFkbGluZSIsImFjdGl2ZVNvdXJjZSIsIm5hbWUiLCJpZCIsInVybHNUb0xvZ29zIiwiaXNMb2FkaW5nIiwiYXR0YWNoZWQiLCJnZXRTb3VyY2VzIiwiaW5kZXgiLCJzZWxmIiwiJCIsInNlbGVjdFNvdXJjZSIsIm9uIiwiZ2V0QXJ0aWNsZXMiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJzZXRJbnRlcnZhbCIsImFqYXgiLCJkYXRhVHlwZSIsInR5cGUiLCJkb25lIiwiZGF0YSIsIngiLCJsZW5ndGgiLCJtZWRpdW0iLCJwdXNoIiwic3RyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInNldEl0ZW0iLCJyZXN1bHQiLCJncmVwIiwidG9Mb3dlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFTQSxrQixxQkFBQUEsTTs7QUFDRkMsa0I7Ozs0QkFFTUMsSTtBQUVULGdDQUFjO0FBQUE7O0FBQ1YseUJBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EseUJBQUtDLEdBQUwsR0FBV0gsT0FBT0ksU0FBUCxDQUFpQkMsSUFBakIsQ0FBc0JGLEdBQWpDO0FBQ0EseUJBQUtHLE1BQUwsR0FBY04sT0FBT0ksU0FBUCxDQUFpQkMsSUFBakIsQ0FBc0JDLE1BQXBDO0FBQ0EseUJBQUtDLE1BQUwsR0FBY0MsYUFBYUMsT0FBYixDQUFxQixnQkFBckIsS0FBMENELGFBQWFDLE9BQWIsQ0FBcUIsZ0JBQXJCLENBQTFDLElBQW9GLEtBQWxHO0FBQ0EseUJBQUtDLElBQUwsR0FBWUYsYUFBYUMsT0FBYixDQUFxQixXQUFyQixLQUFxQyxJQUFqRDtBQUNBLHlCQUFLRSxRQUFMO0FBQ0EseUJBQUtDLFlBQUw7QUFDQSx5QkFBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBLHlCQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLHlCQUFLQyxNQUFMO0FBQ0EseUJBQUtDLFdBQUw7QUFDQSx5QkFBS0MsV0FBTDtBQUNBLHlCQUFLQyxLQUFMO0FBQ0EseUJBQUtDLEdBQUw7QUFDQSx5QkFBS0MsVUFBTDtBQUNBLHlCQUFLQyxLQUFMO0FBQ0EseUJBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSx5QkFBS0MsWUFBTCxHQUFvQjtBQUNoQkMsOEJBQU0sRUFEVTtBQUVoQkMsNEJBQUksRUFGWTtBQUdoQkMscUNBQWEsRUFIRztBQUloQlAsNkJBQUs7QUFKVyxxQkFBcEI7QUFNQSx5QkFBS1EsU0FBTCxHQUFpQixLQUFqQjtBQUNIOzsrQkFFREMsUSx1QkFBVztBQUFBOztBQUNQLHlCQUFLQyxVQUFMLENBQWdCLEtBQUtuQixJQUFyQjtBQUNBLHlCQUFLb0IsS0FBTCxHQUFhLENBQWI7QUFDQSx3QkFBSUMsT0FBTyxJQUFYOztBQUVBQyxzQkFBRSxLQUFLQyxZQUFQLEVBQXFCQyxFQUFyQixDQUF3QixRQUF4QixFQUFrQyxhQUFLO0FBQ25DLDhCQUFLQyxXQUFMLENBQWlCQyxFQUFFQyxNQUFGLENBQVNDLEtBQTFCO0FBQ0gscUJBRkQ7O0FBSUFDLGdDQUFZLFlBQVk7QUFDcEJSLDZCQUFLRixVQUFMLENBQWdCRSxLQUFLckIsSUFBckI7QUFDSCxxQkFGRCxFQUVHLEtBRkg7QUFJSCxpQjs7K0JBRURtQixVLHVCQUFXbkIsSSxFQUFNO0FBQ2Isd0JBQUlxQixPQUFPLElBQVg7QUFDQSx5QkFBS3JCLElBQUwsR0FBWUEsSUFBWjtBQUNBc0Isc0JBQUVRLElBQUYsQ0FBTztBQUNIckIsNkJBQUtZLEtBQUs1QixHQUFMLEdBQVcsb0JBQVgsR0FBa0M0QixLQUFLckIsSUFBdkMsR0FBOEMsVUFBOUMsR0FBMkRxQixLQUFLekIsTUFEbEU7QUFFSG1DLGtDQUFVLE1BRlA7QUFHSEMsOEJBQU07QUFISCxxQkFBUCxFQUlHQyxJQUpILENBSVEsVUFBVUMsSUFBVixFQUFnQjtBQUNwQmIsNkJBQUs3QixPQUFMLEdBQWUsRUFBZjtBQUNBLDZCQUFLLElBQUkyQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlELEtBQUsxQyxPQUFMLENBQWE0QyxNQUFqQyxFQUF5Q0QsR0FBekMsRUFBOEM7QUFDMUMsZ0NBQUl0QyxTQUFTLEVBQWI7QUFDQUEsbUNBQU9pQixJQUFQLEdBQWNvQixLQUFLMUMsT0FBTCxDQUFhMkMsQ0FBYixFQUFnQnJCLElBQTlCO0FBQ0FqQixtQ0FBT2tCLEVBQVAsR0FBWW1CLEtBQUsxQyxPQUFMLENBQWEyQyxDQUFiLEVBQWdCcEIsRUFBNUI7QUFDQWxCLG1DQUFPbUIsV0FBUCxHQUFxQmtCLEtBQUsxQyxPQUFMLENBQWEyQyxDQUFiLEVBQWdCbkIsV0FBaEIsQ0FBNEJxQixNQUFqRDtBQUNBeEMsbUNBQU9ZLEdBQVAsR0FBYXlCLEtBQUsxQyxPQUFMLENBQWEyQyxDQUFiLEVBQWdCMUIsR0FBN0I7QUFDQVksaUNBQUs3QixPQUFMLENBQWE4QyxJQUFiLENBQWtCekMsTUFBbEI7QUFDSDtBQUNELDRCQUFJMEMsTUFBTSxVQUFVbEIsS0FBS3JCLElBQWYsR0FBc0IsU0FBaEM7O0FBRUEsNEJBQUlGLGFBQWFDLE9BQWIsQ0FBcUJ3QyxHQUFyQixNQUE4QixNQUFsQyxFQUEwQztBQUN0Q2xCLGlDQUFLeEIsTUFBTCxHQUFjQyxhQUFhQyxPQUFiLENBQXFCd0MsR0FBckIsQ0FBZDtBQUNILHlCQUZELE1BR0s7QUFDRGxCLGlDQUFLeEIsTUFBTCxHQUFjd0IsS0FBS3JCLElBQUwsSUFBYSxJQUFiLEdBQW9CLE1BQXBCLEdBQTZCLEtBQTNDO0FBQ0g7QUFDRCw0QkFBSUYsYUFBYUMsT0FBYixDQUFxQixXQUFyQixLQUFxQ3NCLEtBQUtyQixJQUE5QyxFQUFvRDtBQUNoRHNCLDhCQUFFLGVBQUYsRUFBbUJrQixPQUFuQixDQUEyQixFQUFFQyxXQUFXLENBQWIsRUFBM0IsRUFBNkMsTUFBN0M7QUFDSDtBQUNEM0MscUNBQWE0QyxPQUFiLENBQXFCLFdBQXJCLEVBQWtDckIsS0FBS3JCLElBQXZDO0FBQ0FxQiw2QkFBS0ksV0FBTCxDQUFpQkosS0FBS3hCLE1BQXRCO0FBQ0gscUJBM0JEO0FBNEJILGlCOzsrQkFFRDRCLFcsd0JBQVk1QixNLEVBQVE7QUFDaEIsd0JBQUk4QyxTQUFTckIsRUFBRXNCLElBQUYsQ0FBTyxLQUFLcEQsT0FBWixFQUFxQixVQUFVa0MsQ0FBVixFQUFhO0FBQUUsK0JBQU9BLEVBQUVYLEVBQUYsSUFBUWxCLE1BQWY7QUFBd0IscUJBQTVELENBQWI7O0FBRUEsd0JBQUk4QyxPQUFPUCxNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBQ25CLDZCQUFLdkIsWUFBTCxDQUFrQkMsSUFBbEIsR0FBeUI2QixPQUFPLENBQVAsRUFBVTdCLElBQW5DO0FBQ0EsNkJBQUtELFlBQUwsQ0FBa0JFLEVBQWxCLEdBQXVCNEIsT0FBTyxDQUFQLEVBQVU1QixFQUFqQztBQUNBLDZCQUFLRixZQUFMLENBQWtCRyxXQUFsQixHQUFnQzJCLE9BQU8sQ0FBUCxFQUFVM0IsV0FBMUM7QUFDQSw2QkFBS0gsWUFBTCxDQUFrQkosR0FBbEIsR0FBd0JrQyxPQUFPLENBQVAsRUFBVWxDLEdBQWxDO0FBQ0g7QUFDRCx3QkFBSThCLE1BQU0sVUFBVSxLQUFLdkMsSUFBZixHQUFzQixTQUFoQztBQUNBLHdCQUFJRixhQUFhQyxPQUFiLENBQXFCd0MsR0FBckIsS0FBNkIsS0FBSzFDLE1BQXRDLEVBQThDO0FBQzFDeUIsMEJBQUUsZUFBRixFQUFtQmtCLE9BQW5CLENBQTJCLEVBQUVDLFdBQVcsQ0FBYixFQUEzQixFQUE2QyxNQUE3QztBQUNIO0FBQ0QzQyxpQ0FBYTRDLE9BQWIsQ0FBcUJILEdBQXJCLEVBQTBCMUMsTUFBMUI7O0FBRUEsd0JBQUl3QixPQUFPLElBQVg7QUFDQUMsc0JBQUVRLElBQUYsQ0FBTztBQUNIckIsNkJBQUtZLEtBQUs1QixHQUFMLEdBQVcsbUJBQVgsR0FBaUNJLE9BQU9nRCxXQUFQLEVBQWpDLEdBQXdELFVBQXhELEdBQXFFeEIsS0FBS3pCLE1BRDVFO0FBRUhtQyxrQ0FBVSxNQUZQO0FBR0hDLDhCQUFNO0FBSEgscUJBQVAsRUFJR0MsSUFKSCxDQUlRLFVBQVVDLElBQVYsRUFBZ0I7QUFDcEJiLDZCQUFLcEIsUUFBTCxHQUFnQmlDLEtBQUtqQyxRQUFyQjs7QUFFQSw0QkFBSW9CLEtBQUtsQixTQUFULEVBQW9CO0FBQ2hCa0IsaUNBQUtuQixZQUFMLEdBQW9CbUIsS0FBS3BCLFFBQXpCO0FBQ0EsaUNBQUtFLFNBQUwsR0FBaUIsS0FBakI7QUFDSCx5QkFIRCxNQUlLO0FBQ0QsZ0NBQUlrQixLQUFLcEIsUUFBTCxDQUFjTyxLQUFkLElBQXVCYSxLQUFLbkIsWUFBTCxDQUFrQk0sS0FBN0MsRUFBb0Q7QUFDaERhLHFDQUFLakIsT0FBTDtBQUNIO0FBQ0o7QUFFSixxQkFqQkQ7QUFxQkgsaUIiLCJmaWxlIjoibmV3cy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
