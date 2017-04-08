'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client'], function (_export, _context) {
  "use strict";

  var inject, HttpClient, _dec, _class, Instagram;

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

          this.token = localStorage.getItem('instagram.token') != null ? localStorage.getItem('instagram.token') : this.getStringFromUrl('access_token');

          if (this.token !== "undefined" && this.token != null) {
            this.signIn();
          }
        }

        Instagram.prototype.signIn = function signIn() {
          var self = this;
          $.ajax({
            url: 'https://api.instagram.com/v1/users/self',
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
          });
        };

        Instagram.prototype.getUserImages = function getUserImages(data) {
          var self = this;
          $.ajax({
            url: 'https://api.instagram.com/v1/users/self/media/recent/',
            dataType: 'jsonp',
            type: 'GET',
            data: { access_token: self.token, count: self.imageCount }
          }).done(function (data) {
            for (var x = 0; x < data.data.length; x++) {
              var image = {};
              image.urlToImage = data.data[x].images.low_resolution.url;
              image.comments = data.data[x].comments.count;
              image.likes = data.data[x].likes.count;
              image.link = data.data[x].link;
              self.images.push(image);
              self.loggedIn = true;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RhZ3JhbS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiSW5zdGFncmFtIiwiaHR0cCIsImFjdGl2ZSIsInVzZXIiLCJpbWFnZUNvdW50IiwiaW1hZ2VzIiwiaW1hZ2UiLCJ1cmxUb0ltYWdlIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZ2V0U3RyaW5nRnJvbVVybCIsInNpZ25JbiIsInNlbGYiLCIkIiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwidHlwZSIsImRhdGEiLCJhY2Nlc3NfdG9rZW4iLCJkb25lIiwidXNlcm5hbWUiLCJmdWxsbmFtZSIsInByb2ZpbGVfcGljdHVyZSIsIndlYnNpdGUiLCJtZWRpYSIsImNvdW50cyIsImZvbGxvd3MiLCJmb2xsb3dlZF9ieSIsImdldFVzZXJJbWFnZXMiLCJjb3VudCIsIngiLCJsZW5ndGgiLCJsb3dfcmVzb2x1dGlvbiIsImNvbW1lbnRzIiwibGlrZXMiLCJsaW5rIiwicHVzaCIsImxvZ2dlZEluIiwic2lnbk91dCIsInJlbW92ZUl0ZW0iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzdHIiLCJ2YXJzIiwiaGFzaCIsImluY2x1ZGVzIiwiaGFzaGVzIiwic2xpY2UiLCJpbmRleE9mIiwic3BsaXQiLCJpIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLFkscUJBQUFBLE07O0FBQ0FDLGdCLHVCQUFBQSxVOzs7MkJBR0tDLFMsV0FEWkYsT0FBT0MsVUFBUCxDO0FBR0MsMkJBQVlFLElBQVosRUFBaUI7QUFBQTs7QUFFZixlQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxlQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUNBLGVBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsZUFBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLGVBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsZUFBS0MsS0FBTCxHQUFhO0FBQ1hDLHdCQUFhO0FBREYsV0FBYjs7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
