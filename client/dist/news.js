"use strict";

System.register(["aurelia-framework"], function (_export, _context) {
    "use strict";

    var inject, News;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }],
        execute: function () {
            _export("News", News = function () {
                function News() {
                    _classCallCheck(this, News);

                    this.sources = [];
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
                    }, 10000);
                };

                News.prototype.getSources = function getSources(lang) {
                    var self = this;
                    this.lang = lang;
                    this.isLoading = true;
                    $.ajax({
                        url: 'https://newsapi.org/v1/sources?language=' + self.lang + '&apiKey=356bfc9442404652add03b1e0cc1a527',
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
                    localStorage.setItem(str, source);

                    var self = this;
                    $.ajax({
                        url: 'https://newsapi.org/v1/articles?source=' + source.toLowerCase() + '&apiKey=356bfc9442404652add03b1e0cc1a527',
                        dataType: 'json',
                        type: 'GET'
                    }).done(function (data) {
                        self.articles = data.articles;
                        self.isLoading = false;

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

            _export("News", News);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld3MuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiTmV3cyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibGFuZyIsImFydGljbGVzIiwidGVtcEFydGljbGVzIiwiZmlyc3RMb2FkIiwidXBkYXRlcyIsImF1dGhvciIsImRlc2NyaXB0aW9uIiwicHVibGlzaGVkQXQiLCJ0aXRsZSIsInVybCIsInVybFRvSW1hZ2UiLCJpbWFnZSIsImhlYWRsaW5lIiwiYWN0aXZlU291cmNlIiwibmFtZSIsImlkIiwidXJsc1RvTG9nb3MiLCJpc0xvYWRpbmciLCJhdHRhY2hlZCIsImdldFNvdXJjZXMiLCJpbmRleCIsInNlbGYiLCIkIiwic2VsZWN0U291cmNlIiwib24iLCJnZXRBcnRpY2xlcyIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInNldEludGVydmFsIiwiYWpheCIsImRhdGFUeXBlIiwidHlwZSIsImRvbmUiLCJkYXRhIiwieCIsImxlbmd0aCIsIm1lZGl1bSIsInB1c2giLCJzdHIiLCJzZXRJdGVtIiwicmVzdWx0IiwiZ3JlcCIsInRvTG93ZXJDYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07Ozs0QkFFS0MsSTtBQUVULGdDQUFjO0FBQUE7O0FBQ1YseUJBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EseUJBQUtDLE1BQUwsR0FBY0MsYUFBYUMsT0FBYixDQUFxQixnQkFBckIsS0FBMENELGFBQWFDLE9BQWIsQ0FBcUIsZ0JBQXJCLENBQTFDLElBQW9GLEtBQWxHO0FBQ0EseUJBQUtDLElBQUwsR0FBWUYsYUFBYUMsT0FBYixDQUFxQixXQUFyQixLQUFxQyxJQUFqRDtBQUNBLHlCQUFLRSxRQUFMO0FBQ0EseUJBQUtDLFlBQUw7QUFDQSx5QkFBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBLHlCQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLHlCQUFLQyxNQUFMO0FBQ0EseUJBQUtDLFdBQUw7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
