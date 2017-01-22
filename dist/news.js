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
                    this.source = localStorage.getItem("newsSource") || "t3n";
                    this.articles;
                    this.author;
                    this.description;
                    this.publishedAt;
                    this.title;
                    this.url;
                    this.urlToImage;
                    this.image;

                    this.getArticles(this.source);
                    this.index = 0;
                }

                News.prototype.getArticles = function getArticles(source) {
                    var _this = this;

                    var self = this;
                    localStorage.setItem('newsSource', source);
                    this.http.fetch('https://newsapi.org/v1/articles?source=' + source + '&apiKey=356bfc9442404652add03b1e0cc1a527').then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        self.articles = data.articles;

                        _this.index = 0;
                        self.loadNews();
                    });
                };

                News.prototype.loadNews = function loadNews() {
                    document.getElementById("search").blur();
                    this.author = this.articles[this.index].author;
                    this.description = this.articles[this.index].description;
                    this.publishedAt = this.articles[this.index].publishedAt;
                    this.title = this.articles[this.index].title;
                    this.url = this.articles[this.index].url;
                    this.urlToImage = this.articles[this.index].urlToImage;
                    this.loadImage(this.urlToImage);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld3MuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSHR0cENsaWVudCIsIk5ld3MiLCJodHRwIiwic291cmNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImFydGljbGVzIiwiYXV0aG9yIiwiZGVzY3JpcHRpb24iLCJwdWJsaXNoZWRBdCIsInRpdGxlIiwidXJsIiwidXJsVG9JbWFnZSIsImltYWdlIiwiZ2V0QXJ0aWNsZXMiLCJpbmRleCIsInNlbGYiLCJzZXRJdGVtIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImxvYWROZXdzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImJsdXIiLCJsb2FkSW1hZ2UiLCJnZXROZXh0TmV3cyIsImdldFByZXZOZXdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLHNCLHVCQUFBQSxVOzs7NEJBR0tDLEksV0FEWkYsT0FBT0MsVUFBUCxDO0FBR0csOEJBQVlFLElBQVosRUFBa0I7QUFBQTs7QUFDZCx5QkFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EseUJBQUtDLE1BQUwsR0FBY0MsYUFBYUMsT0FBYixDQUFxQixZQUFyQixLQUFzQyxLQUFwRDtBQUNBLHlCQUFLQyxRQUFMO0FBQ0EseUJBQUtDLE1BQUw7QUFDQSx5QkFBS0MsV0FBTDtBQUNBLHlCQUFLQyxXQUFMO0FBQ0EseUJBQUtDLEtBQUw7QUFDQSx5QkFBS0MsR0FBTDtBQUNBLHlCQUFLQyxVQUFMO0FBQ0EseUJBQUtDLEtBQUw7O0FBRUEseUJBQUtDLFdBQUwsQ0FBaUIsS0FBS1gsTUFBdEI7QUFDQSx5QkFBS1ksS0FBTCxHQUFhLENBQWI7QUFDSDs7K0JBRURELFcsd0JBQVlYLE0sRUFBUTtBQUFBOztBQUNoQix3QkFBSWEsT0FBTyxJQUFYO0FBQ0FaLGlDQUFhYSxPQUFiLENBQXFCLFlBQXJCLEVBQW1DZCxNQUFuQztBQUNBLHlCQUFLRCxJQUFMLENBQVVnQixLQUFWLENBQWdCLDRDQUEwQ2YsTUFBMUMsR0FBaUQsMENBQWpFLEVBQ0tnQixJQURMLENBQ1U7QUFBQSwrQkFBWUMsU0FBU0MsSUFBVCxFQUFaO0FBQUEscUJBRFYsRUFFS0YsSUFGTCxDQUVVLGdCQUFRO0FBQ1ZILDZCQUFLVixRQUFMLEdBQWdCZ0IsS0FBS2hCLFFBQXJCOztBQUVBLDhCQUFLUyxLQUFMLEdBQWEsQ0FBYjtBQUNBQyw2QkFBS08sUUFBTDtBQUNILHFCQVBMO0FBUUgsaUI7OytCQUdEQSxRLHVCQUFXO0FBQ1BDLDZCQUFTQyxjQUFULENBQXdCLFFBQXhCLEVBQWtDQyxJQUFsQztBQUNBLHlCQUFLbkIsTUFBTCxHQUFjLEtBQUtELFFBQUwsQ0FBYyxLQUFLUyxLQUFuQixFQUEwQlIsTUFBeEM7QUFDQSx5QkFBS0MsV0FBTCxHQUFtQixLQUFLRixRQUFMLENBQWMsS0FBS1MsS0FBbkIsRUFBMEJQLFdBQTdDO0FBQ0EseUJBQUtDLFdBQUwsR0FBbUIsS0FBS0gsUUFBTCxDQUFjLEtBQUtTLEtBQW5CLEVBQTBCTixXQUE3QztBQUNBLHlCQUFLQyxLQUFMLEdBQWEsS0FBS0osUUFBTCxDQUFjLEtBQUtTLEtBQW5CLEVBQTBCTCxLQUF2QztBQUNBLHlCQUFLQyxHQUFMLEdBQVcsS0FBS0wsUUFBTCxDQUFjLEtBQUtTLEtBQW5CLEVBQTBCSixHQUFyQztBQUNBLHlCQUFLQyxVQUFMLEdBQWtCLEtBQUtOLFFBQUwsQ0FBYyxLQUFLUyxLQUFuQixFQUEwQkgsVUFBNUM7QUFDQSx5QkFBS2UsU0FBTCxDQUFlLEtBQUtmLFVBQXBCO0FBQ0gsaUI7OytCQUVEZ0IsVywwQkFBZTtBQUNYLHlCQUFLYixLQUFMLEdBQWEsS0FBS0EsS0FBTCxHQUFhLENBQTFCO0FBQ0EseUJBQUtRLFFBQUw7QUFDSCxpQjs7K0JBRURNLFcsMEJBQWU7QUFDWCx5QkFBS2QsS0FBTCxHQUFhLEtBQUtBLEtBQUwsR0FBYSxDQUExQjtBQUNBLHlCQUFLUSxRQUFMO0FBQ0gsaUI7OytCQUVESSxTLHNCQUFVZixVLEVBQVk7QUFDbEIsd0JBQUlJLE9BQU8sSUFBWDtBQUNBLHlCQUFLZCxJQUFMLENBQVVnQixLQUFWLENBQWdCTixVQUFoQixFQUNLTyxJQURMLENBQ1U7QUFBQSwrQkFBWUMsUUFBWjtBQUFBLHFCQURWLEVBRUtELElBRkwsQ0FFVSxnQkFBUTtBQUNWSCw2QkFBS0gsS0FBTCxHQUFhUyxJQUFiO0FBQ0gscUJBSkw7QUFLSCxpQiIsImZpbGUiOiJuZXdzLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
