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
          this.active = true;
          this.user = {};
          this.imageCount = 10;
          this.images = [];
          this.image = {
            urlToImage: "undefined"
          };

          this.token = localStorage.getItem('instagram.token') !== "undefined" && localStorage.getItem('instagram.token') != null ? localStorage.getItem('instagram.token') : this.getStringFromUrl('access_token');

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
            console.log('userdata ', data.data.profile_picture);
            self.user.username = data.data.username;
            self.user.fullname = data.data.fullname;
            self.user.profile_picture = data.data.profile_picture;
            self.user.website = data.website;
            self.user.media = data.data.counts.media;
            self.user.follows = data.data.counts.follows;
            self.user.followed_by = data.data.counts.followed_by;
          });

          $.ajax({
            url: 'https://api.instagram.com/v1/users/self/media/recent/',
            dataType: 'jsonp',
            type: 'GET',
            data: { access_token: self.token, count: self.imageCount }
          }).done(function (data) {
            console.log(data);
            for (var x = 0; x < data.data.length; x++) {
              var image = {};
              image.urlToImage = data.data[x].images.low_resolution.url;
              image.comments = data.data[x].comments.count;
              image.likes = data.data[x].likes.count;
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
          var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
          for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
          }
          localStorage.setItem('instagram.token', vars[str]);
          return vars[str];
        };

        return Instagram;
      }()) || _class));

      _export('Instagram', Instagram);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RhZ3JhbS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiSW5zdGFncmFtIiwiaHR0cCIsImFjdGl2ZSIsInVzZXIiLCJpbWFnZUNvdW50IiwiaW1hZ2VzIiwiaW1hZ2UiLCJ1cmxUb0ltYWdlIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZ2V0U3RyaW5nRnJvbVVybCIsInNpZ25JbiIsInNlbGYiLCIkIiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwidHlwZSIsImRhdGEiLCJhY2Nlc3NfdG9rZW4iLCJkb25lIiwiY29uc29sZSIsImxvZyIsInByb2ZpbGVfcGljdHVyZSIsInVzZXJuYW1lIiwiZnVsbG5hbWUiLCJ3ZWJzaXRlIiwibWVkaWEiLCJjb3VudHMiLCJmb2xsb3dzIiwiZm9sbG93ZWRfYnkiLCJjb3VudCIsIngiLCJsZW5ndGgiLCJsb3dfcmVzb2x1dGlvbiIsImNvbW1lbnRzIiwibGlrZXMiLCJwdXNoIiwibG9nZ2VkSW4iLCJzaWduT3V0IiwicmVtb3ZlSXRlbSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInN0ciIsInZhcnMiLCJoYXNoIiwiaGFzaGVzIiwic2xpY2UiLCJpbmRleE9mIiwic3BsaXQiLCJpIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLFkscUJBQUFBLE07O0FBQ0FDLGdCLHVCQUFBQSxVOzs7MkJBR0tDLFMsV0FEWkYsT0FBT0MsVUFBUCxDO0FBR0MsMkJBQVlFLElBQVosRUFBaUI7QUFBQTs7QUFFZixlQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxlQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLGVBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsZUFBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLGVBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsZUFBS0MsS0FBTCxHQUFhO0FBQ1hDLHdCQUFhO0FBREYsV0FBYjs7QUFJQSxlQUFLQyxLQUFMLEdB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
