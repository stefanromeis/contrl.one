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
                    this.attached();
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
