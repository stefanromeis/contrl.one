'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client'], function (_export, _context) {
    "use strict";

    var inject, HttpClient, _dec, _class, News;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaFetchClient) {
            HttpClient = _aureliaFetchClient.HttpClient;
        }],
        execute: function () {
            _export('News', News = (_dec = inject(HttpClient), _dec(_class = function () {
                function News(http) {
                    _classCallCheck(this, News);

                    this.http = http;
                    this.sources = [];
                    this.source = localStorage.getItem("newsSource") || "cnn";
                    this.articles;
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

                    this.getSources();
                    this.index = 0;

                    $(this.selectSource).on('change', function (e) {
                        _this.getArticles(e.target.value);
                        _this.isLoading = true;
                    });
                };

                News.prototype.getSources = function getSources() {
                    var self = this;

                    this.http.fetch('https://newsapi.org/v1/sources?language=en&apiKey=356bfc9442404652add03b1e0cc1a527').then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        for (var x = 0; x < data.sources.length; x++) {
                            var source = {};
                            source.name = data.sources[x].name;
                            source.id = data.sources[x].id;
                            source.urlsToLogos = data.sources[x].urlsToLogos.medium;
                            source.url = data.sources[x].url;

                            self.sources.push(source);
                        }
                        self.getArticles(self.source);
                    });
                };

                News.prototype.getArticles = function getArticles(source) {
                    var _this2 = this;

                    this.source = source;

                    var result = $.grep(this.sources, function (e) {
                        return e.id == source;
                    });
                    if (result.length > 0) {
                        this.activeSource.name = result[0].name;
                        this.activeSource.id = result[0].id;
                        this.activeSource.urlsToLogos = result[0].urlsToLogos;
                        this.activeSource.url = result[0].url;
                    }

                    localStorage.setItem('newsSource', source);

                    var self = this;
                    this.http.fetch('https://newsapi.org/v1/articles?source=' + source.toLowerCase() + '&apiKey=356bfc9442404652add03b1e0cc1a527').then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        self.articles = data.articles;

                        _this2.isLoading = false;
                    });
                };

                News.prototype.loadNews = function loadNews() {
                    this.author = this.articles[this.index].author;
                    this.description = this.articles[this.index].description;
                    this.publishedAt = this.articles[this.index].publishedAt.split(/-|T/);
                    this.title = this.articles[this.index].title;
                    this.url = this.articles[this.index].url;
                    this.urlToImage = this.articles[this.index].urlToImage;
                };

                News.prototype.getNextNews = function getNextNews() {
                    this.index = this.index + 1;
                    this.loadNews();
                };

                News.prototype.getPrevNews = function getPrevNews() {
                    this.index = this.index - 1;
                    this.loadNews();
                };

                News.prototype.loadImage = function loadImage(urlToImage) {
                    var self = this;
                    this.http.fetch(urlToImage).then(function (response) {
                        return response;
                    }).then(function (data) {
                        self.image = data;
                    });
                };

                return News;
            }()) || _class));

            _export('News', News);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld3MuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSHR0cENsaWVudCIsIk5ld3MiLCJodHRwIiwic291cmNlcyIsInNvdXJjZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJhcnRpY2xlcyIsImF1dGhvciIsImRlc2NyaXB0aW9uIiwicHVibGlzaGVkQXQiLCJ0aXRsZSIsInVybCIsInVybFRvSW1hZ2UiLCJpbWFnZSIsImhlYWRsaW5lIiwiYWN0aXZlU291cmNlIiwibmFtZSIsImlkIiwidXJsc1RvTG9nb3MiLCJpc0xvYWRpbmciLCJhdHRhY2hlZCIsImdldFNvdXJjZXMiLCJpbmRleCIsIiQiLCJzZWxlY3RTb3VyY2UiLCJvbiIsImdldEFydGljbGVzIiwiZSIsInRhcmdldCIsInZhbHVlIiwic2VsZiIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIngiLCJkYXRhIiwibGVuZ3RoIiwibWVkaXVtIiwicHVzaCIsInJlc3VsdCIsImdyZXAiLCJzZXRJdGVtIiwidG9Mb3dlckNhc2UiLCJsb2FkTmV3cyIsInNwbGl0IiwiZ2V0TmV4dE5ld3MiLCJnZXRQcmV2TmV3cyIsImxvYWRJbWFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNBQyxzQix1QkFBQUEsVTs7OzRCQUdLQyxJLFdBRFpGLE9BQU9DLFVBQVAsQztBQUdHLDhCQUFZRSxJQUFaLEVBQWtCO0FBQUE7O0FBQ2QseUJBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLHlCQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLHlCQUFLQyxNQUFMLEdBQWNDLGFBQWFDLE9BQWIsQ0FBcUIsWUFBckIsS0FBc0MsS0FBcEQ7QUFDQSx5QkFBS0MsUUFBTDtBQUNBLHlCQUFLQyxNQUFMO0FBQ0EseUJBQUtDLFdBQUw7QUFDQSx5QkFBS0MsV0FBTDtBQUNBLHlCQUFLQyxLQUFMO0FBQ0EseUJBQUtDLEdBQUw7QUFDQSx5QkFBS0MsVUFBTDtBQUNBLHlC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
