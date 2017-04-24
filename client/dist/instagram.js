'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', './services/authConfig'], function (_export, _context) {
  "use strict";

  var inject, HttpClient, config, _dec, _class, Instagram;

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
    }, function (_servicesAuthConfig) {
      config = _servicesAuthConfig.default;
    }],
    execute: function () {
      _export('Instagram', Instagram = (_dec = inject(HttpClient), _dec(_class = function () {
        function Instagram(http) {
          _classCallCheck(this, Instagram);

          this.http = http;
          this.active = false;
          this.user = {};
          this.imageCount = 10;
          this.images = [];
          this.image = {
            urlToImage: "undefined"
          };
          this.interactions = 0;
          this.tempInteractions = 0;
          this.updates = 0;
          this.firstLoad = true;
          this.api = config.providers.instagram.api;
          this.clientId = config.providers.instagram.clientId;
          this.token = localStorage.getItem('instagram.token') != null ? localStorage.getItem('instagram.token') : this.getStringFromUrl('access_token');

          if (this.token !== "undefined" && this.token != null) {
            this.signIn();
          }
        }

        Instagram.prototype.signIn = function signIn() {
          var self = this;
          $.ajax({
            url: self.api + '/users/self',
            dataType: 'jsonp',
            type: 'GET',
            data: { access_token: self.token }
          }).done(function (data) {
            self.user.username = data.data.username;
            self.user.fullname = data.data.fullname;
            self.user.profile_picture = data.data.profile_picture;
            self.user.website = data.website;
            self.user.media = data.data.counts.media;
            self.user.follows = data.data.counts.follows;
            self.user.followed_by = data.data.counts.followed_by;
            self.getUserImages(data);
            setInterval(function () {
              self.getUserImages(data);
            }, 60000);
          });
        };

        Instagram.prototype.getUserImages = function getUserImages(data) {
          var self = this;
          $.ajax({
            url: self.api + '/users/self/media/recent/',
            dataType: 'jsonp',
            type: 'GET',
            data: { access_token: self.token, count: self.imageCount }
          }).done(function (data) {
            self.interactions = 0;
            self.images = [];
            for (var x = 0; x < data.data.length; x++) {
              var image = {};
              image.urlToImage = data.data[x].images.low_resolution.url;
              image.comments = data.data[x].comments.count;
              image.likes = data.data[x].likes.count;

              self.interactions += image.comments + image.likes;

              image.link = data.data[x].link;
              self.images.push(image);
              self.loggedIn = true;
            }

            if (self.firstLoad) {
              self.firstLoad = false;
              self.tempInteractions = self.interactions;
            } else {
              if (self.tempInteractions != self.interactions) {
                self.updates = self.interactions - self.tempInteractions;
              }
            }
          });
        };

        Instagram.prototype.signOut = function signOut() {
          this.token = false;
          this.images = [];
          this.user = {};
          localStorage.removeItem('instagram.token');
          window.location.href = "#";
        };

        Instagram.prototype.getStringFromUrl = function getStringFromUrl(str) {
          var vars = [],
              hash;
          if (window.location.href.includes('access_token')) {
            var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
              hash = hashes[i].split('=');
              vars.push(hash[0]);
              vars[hash[0]] = hash[1];
            }
            if (vars[str].length < 80) {
              localStorage.setItem('instagram.token', vars[str]);
              return vars[str];
            }
          }
        };

        return Instagram;
      }()) || _class));

      _export('Instagram', Instagram);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RhZ3JhbS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiY29uZmlnIiwiSW5zdGFncmFtIiwiaHR0cCIsImFjdGl2ZSIsInVzZXIiLCJpbWFnZUNvdW50IiwiaW1hZ2VzIiwiaW1hZ2UiLCJ1cmxUb0ltYWdlIiwiaW50ZXJhY3Rpb25zIiwidGVtcEludGVyYWN0aW9ucyIsInVwZGF0ZXMiLCJmaXJzdExvYWQiLCJhcGkiLCJwcm92aWRlcnMiLCJpbnN0YWdyYW0iLCJjbGllbnRJZCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldFN0cmluZ0Zyb21VcmwiLCJzaWduSW4iLCJzZWxmIiwiJCIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsInR5cGUiLCJkYXRhIiwiYWNjZXNzX3Rva2VuIiwiZG9uZSIsInVzZXJuYW1lIiwiZnVsbG5hbWUiLCJwcm9maWxlX3BpY3R1cmUiLCJ3ZWJzaXRlIiwibWVkaWEiLCJjb3VudHMiLCJmb2xsb3dzIiwiZm9sbG93ZWRfYnkiLCJnZXRVc2VySW1hZ2VzIiwic2V0SW50ZXJ2YWwiLCJjb3VudCIsIngiLCJsZW5ndGgiLCJsb3dfcmVzb2x1dGlvbiIsImNvbW1lbnRzIiwibGlrZXMiLCJsaW5rIiwicHVzaCIsImxvZ2dlZEluIiwic2lnbk91dCIsInJlbW92ZUl0ZW0iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzdHIiLCJ2YXJzIiwiaGFzaCIsImluY2x1ZGVzIiwiaGFzaGVzIiwic2xpY2UiLCJpbmRleE9mIiwic3BsaXQiLCJpIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLFkscUJBQUFBLE07O0FBQ0FDLGdCLHVCQUFBQSxVOztBQUNEQyxZOzs7MkJBR01DLFMsV0FEWkgsT0FBT0MsVUFBUCxDO0FBR0MsMkJBQVlHLElBQVosRUFBaUI7QUFBQTs7QUFFZixlQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxlQUFLQyxNQUFMLEdBQWMs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
