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
          this.interactions = 0;
          this.tempInteractions = 0;
          this.updates = 0;
          this.firstLoad = true;

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
            setInterval(function () {
              self.getUserImages(data);
            }, 60000);
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
            self.interactions = 0;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RhZ3JhbS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiSW5zdGFncmFtIiwiaHR0cCIsImFjdGl2ZSIsInVzZXIiLCJpbWFnZUNvdW50IiwiaW1hZ2VzIiwiaW1hZ2UiLCJ1cmxUb0ltYWdlIiwiaW50ZXJhY3Rpb25zIiwidGVtcEludGVyYWN0aW9ucyIsInVwZGF0ZXMiLCJmaXJzdExvYWQiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJnZXRTdHJpbmdGcm9tVXJsIiwic2lnbkluIiwic2VsZiIsIiQiLCJhamF4IiwidXJsIiwiZGF0YVR5cGUiLCJ0eXBlIiwiZGF0YSIsImFjY2Vzc190b2tlbiIsImRvbmUiLCJ1c2VybmFtZSIsImZ1bGxuYW1lIiwicHJvZmlsZV9waWN0dXJlIiwid2Vic2l0ZSIsIm1lZGlhIiwiY291bnRzIiwiZm9sbG93cyIsImZvbGxvd2VkX2J5IiwiZ2V0VXNlckltYWdlcyIsInNldEludGVydmFsIiwiY291bnQiLCJ4IiwibGVuZ3RoIiwibG93X3Jlc29sdXRpb24iLCJjb21tZW50cyIsImxpa2VzIiwibGluayIsInB1c2giLCJsb2dnZWRJbiIsInNpZ25PdXQiLCJyZW1vdmVJdGVtIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwic3RyIiwidmFycyIsImhhc2giLCJpbmNsdWRlcyIsImhhc2hlcyIsInNsaWNlIiwiaW5kZXhPZiIsInNwbGl0IiwiaSIsInNldEl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxZLHFCQUFBQSxNOztBQUNBQyxnQix1QkFBQUEsVTs7OzJCQUdLQyxTLFdBRFpGLE9BQU9DLFVBQVAsQztBQUdDLDJCQUFZRSxJQUFaLEVBQWlCO0FBQUE7O0FBRWYsZUFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsZUFBS0MsTUFBTCxHQUFjLEtBQWQ7QUFDQSxlQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLGVBQUtDLFVBQUwsR0FBa0IsRUFBbEI7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QWlCbEMsTUFBTW1DLEtBQTVDOztBQUVBbkMsb0JBQU1vQyxJQUFOLEdBQWFuQixLQUFLQSxJQUFMLENBQVVjLENBQVYsRUFBYUssSUFBMUI7QUFDQXpCLG1CQUFLWixNQUFMLENBQVlzQyxJQUFaLENBQWlCckMsS0FBakI7QUFDQVcsbUJBQUsyQixRQUFMLEdBQWdCLElBQWhCO0FBRUQ7O0FBR0QsZ0JBQUczQixLQUFLTixTQUFSLEVBQW1CO0FBQ2pCTSxtQkFBS04sU0FBTCxHQUFpQixLQUFqQjtBQUNBTSxtQkFBS1IsZ0JBQUwsR0FBd0JRLEtBQUtULFlBQTdCO0FBQ0QsYUFIRCxNQUlLO0FBQ0gsa0JBQUdTLEtBQUtSLGdCQUFMLElBQXlCUSxLQUFLVCxZQUFqQyxFQUErQztBQUMzQ1MscUJBQUtQLE9BQUwsR0FBZU8sS0FBS1QsWUFBTCxHQUFvQlMsS0FBS1IsZ0JBQXhDO0FBQ0g7QUFDRjtBQUVKLFdBaENIO0FBaUNELFM7OzRCQUVEb0MsTyxzQkFBVTtBQUNSLGVBQUtqQyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUtQLE1BQUwsR0FBYyxFQUFkO0FBQ0EsZUFBS0YsSUFBTCxHQUFZLEVBQVo7QUFDQVUsdUJBQWFpQyxVQUFiLENBQXdCLGlCQUF4QjtBQUNBQyxpQkFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIsR0FBdkI7QUFDRCxTOzs0QkFFRGxDLGdCLDZCQUFpQm1DLEcsRUFBSztBQUNwQixjQUFJQyxPQUFPLEVBQVg7QUFBQSxjQUFlQyxJQUFmO0FBQ0EsY0FBR0wsT0FBT0MsUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJJLFFBQXJCLENBQThCLGNBQTlCLENBQUgsRUFBa0Q7QUFDaEQsZ0JBQUlDLFNBQVNQLE9BQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLENBQXFCTSxLQUFyQixDQUEyQlIsT0FBT0MsUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJPLE9BQXJCLENBQTZCLEdBQTdCLElBQW9DLENBQS9ELEVBQWtFQyxLQUFsRSxDQUF3RSxHQUF4RSxDQUFiO0FBQ0EsaUJBQUksSUFBSUMsSUFBSSxDQUFaLEVBQWVBLElBQUlKLE9BQU9oQixNQUExQixFQUFrQ29CLEdBQWxDLEVBQXVDO0FBQ25DTixxQkFBT0UsT0FBT0ksQ0FBUCxFQUFVRCxLQUFWLENBQWdCLEdBQWhCLENBQVA7QUFDQU4sbUJBQUtSLElBQUwsQ0FBVVMsS0FBSyxDQUFMLENBQVY7QUFDQUQsbUJBQUtDLEtBQUssQ0FBTCxDQUFMLElBQWdCQSxLQUFLLENBQUwsQ0FBaEI7QUFDSDtBQUNELGdCQUFHRCxLQUFLRCxHQUFMLEVBQVVaLE1BQVYsR0FBbUIsRUFBdEIsRUFBMEI7QUFDdEJ6QiwyQkFBYThDLE9BQWIsQ0FBcUIsaUJBQXJCLEVBQXdDUixLQUFLRCxHQUFMLENBQXhDO0FBQ0EscUJBQU9DLEtBQUtELEdBQUwsQ0FBUDtBQUNIO0FBQ0Y7QUFDRixTIiwiZmlsZSI6Imluc3RhZ3JhbS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
