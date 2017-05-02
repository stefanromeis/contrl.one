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
              image.link = data.data[x].link;

              self.interactions += image.comments + image.likes;

              self.images.push(image);
              self.loggedIn = true;
            }

            self.checkForUpdates();
          });
        };

        Instagram.prototype.checkForUpdates = function checkForUpdates() {
          if (this.firstLoad) {
            this.firstLoad = false;
            this.tempInteractions = this.interactions;
          } else {
            if (this.tempInteractions != this.interactions) {
              this.updates = this.interactions - this.tempInteractions;
            }
          }
        };

        Instagram.prototype.resetUpdates = function resetUpdates() {
          this.updates = 0;
          this.tempInteractions = this.interactions;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RhZ3JhbS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiY29uZmlnIiwiSW5zdGFncmFtIiwiaHR0cCIsImFjdGl2ZSIsInVzZXIiLCJpbWFnZUNvdW50IiwiaW1hZ2VzIiwiaW1hZ2UiLCJ1cmxUb0ltYWdlIiwiaW50ZXJhY3Rpb25zIiwidGVtcEludGVyYWN0aW9ucyIsInVwZGF0ZXMiLCJmaXJzdExvYWQiLCJhcGkiLCJwcm92aWRlcnMiLCJpbnN0YWdyYW0iLCJjbGllbnRJZCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldFN0cmluZ0Zyb21VcmwiLCJzaWduSW4iLCJzZWxmIiwiJCIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsInR5cGUiLCJkYXRhIiwiYWNjZXNzX3Rva2VuIiwiZG9uZSIsInVzZXJuYW1lIiwiZnVsbG5hbWUiLCJwcm9maWxlX3BpY3R1cmUiLCJ3ZWJzaXRlIiwibWVkaWEiLCJjb3VudHMiLCJmb2xsb3dzIiwiZm9sbG93ZWRfYnkiLCJnZXRVc2VySW1hZ2VzIiwic2V0SW50ZXJ2YWwiLCJjb3VudCIsIngiLCJsZW5ndGgiLCJsb3dfcmVzb2x1dGlvbiIsImNvbW1lbnRzIiwibGlrZXMiLCJsaW5rIiwicHVzaCIsImxvZ2dlZEluIiwiY2hlY2tGb3JVcGRhdGVzIiwicmVzZXRVcGRhdGVzIiwic2lnbk91dCIsInJlbW92ZUl0ZW0iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzdHIiLCJ2YXJzIiwiaGFzaCIsImluY2x1ZGVzIiwiaGFzaGVzIiwic2xpY2UiLCJpbmRleE9mIiwic3BsaXQiLCJpIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVNBLFkscUJBQUFBLE07O0FBQ0FDLGdCLHVCQUFBQSxVOztBQUNGQyxZOzs7MkJBR01DLFMsV0FEWkgsT0FBT0MsVUFBUCxDO0FBR0MsMkJBQVlHLElBQVosRUFBa0I7QUFBQTs7QUFFaEIsZUFBS0EsSUFB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
