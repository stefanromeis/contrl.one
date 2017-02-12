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
                    this.tempArticles;
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

                        setInterval(function () {
                            self.getArticles(self.source);
                        }, 10000);
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
                    var count = self.calData.length;
                    if (count > self.count && self.count != "") {
                        self.notifications = self.notifications + count - self.count;
                        self.count = count;
                    } else if (count < self.count && self.count != "") {
                        self.notifications = 0;
                        self.count = count;
                    } else {
                        self.count = count;
                    }
                    self.connected = true;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld3MuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSHR0cENsaWVudCIsIk5ld3MiLCJodHRwIiwic291cmNlcyIsInNvdXJjZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJhcnRpY2xlcyIsInRlbXBBcnRpY2xlcyIsImF1dGhvciIsImRlc2NyaXB0aW9uIiwicHVibGlzaGVkQXQiLCJ0aXRsZSIsInVybCIsInVybFRvSW1hZ2UiLCJpbWFnZSIsImhlYWRsaW5lIiwiYWN0aXZlU291cmNlIiwibmFtZSIsImlkIiwidXJsc1RvTG9nb3MiLCJpc0xvYWRpbmciLCJhdHRhY2hlZCIsImdldFNvdXJjZXMiLCJpbmRleCIsIiQiLCJzZWxlY3RTb3VyY2UiLCJvbiIsImdldEFydGljbGVzIiwiZSIsInRhcmdldCIsInZhbHVlIiwic2VsZiIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIngiLCJkYXRhIiwibGVuZ3RoIiwibWVkaXVtIiwicHVzaCIsInNldEludGVydmFsIiwicmVzdWx0IiwiZ3JlcCIsInNldEl0ZW0iLCJ0b0xvd2VyQ2FzZSIsImNvdW50IiwiY2FsRGF0YSIsIm5vdGlmaWNhdGlvbnMiLCJjb25uZWN0ZWQiLCJsb2FkTmV3cyIsInNwbGl0IiwiZ2V0TmV4dE5ld3MiLCJnZXRQcmV2TmV3cyIsImxvYWRJbWFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNBQyxzQix1QkFBQUEsVTs7OzRCQUdLQyxJLFdBRFpGLE9BQU9DLFVBQVAsQztBQUdHLDhCQUFZRSxJQUFaLEVBQWtCO0FBQUE7O0FBQ2QseUJBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLHlCQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLHlCQUFLQyxNQUFMLEdBQWNDLGFBQWFDLE9BQWIsQ0FBcUIsWUFBckIsS0FBc0MsS0FBcEQ7QUFDQSx5QkFBS0MsUUFBTDtBQUNBLHlCQUFLQyxZQUFMO0FBQ0EseUJBQUtDLE1BQUw7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
