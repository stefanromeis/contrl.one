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
          });

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RhZ3JhbS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiSW5zdGFncmFtIiwiaHR0cCIsImFjdGl2ZSIsInVzZXIiLCJpbWFnZUNvdW50IiwiaW1hZ2VzIiwiaW1hZ2UiLCJ1cmxUb0ltYWdlIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZ2V0U3RyaW5nRnJvbVVybCIsInNpZ25JbiIsInNlbGYiLCIkIiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwidHlwZSIsImRhdGEiLCJhY2Nlc3NfdG9rZW4iLCJkb25lIiwidXNlcm5hbWUiLCJmdWxsbmFtZSIsInByb2ZpbGVfcGljdHVyZSIsIndlYnNpdGUiLCJtZWRpYSIsImNvdW50cyIsImZvbGxvd3MiLCJmb2xsb3dlZF9ieSIsImNvdW50IiwieCIsImxlbmd0aCIsImxvd19yZXNvbHV0aW9uIiwiY29tbWVudHMiLCJsaWtlcyIsImxpbmsiLCJwdXNoIiwibG9nZ2VkSW4iLCJzaWduT3V0IiwicmVtb3ZlSXRlbSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInN0ciIsInZhcnMiLCJoYXNoIiwiaW5jbHVkZXMiLCJoYXNoZXMiLCJzbGljZSIsImluZGV4T2YiLCJzcGxpdCIsImkiLCJzZXRJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsWSxxQkFBQUEsTTs7QUFDQUMsZ0IsdUJBQUFBLFU7OzsyQkFHS0MsUyxXQURaRixPQUFPQyxVQUFQLEM7QUFHQywyQkFBWUUsSUFBWixFQUFpQjtBQUFBOztBQUVmLGVBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLGVBQUtDLE1BQUwsR0FBYyxLQUFkO0FBQ0EsZUFBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxlQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsZUFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxlQUFLQyxLQUFMLEdBQWE7QUFDWEMsd0JBQWE7QUFERixXQUFiOztBQUlBLGVBQUtDLEtBQUws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
