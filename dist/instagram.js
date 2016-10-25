'use strict';

System.register(['aurelia-framework', 'aurelia-pal-browser', 'services/ig-service'], function (_export, _context) {
  "use strict";

  var inject, initialize, IgService, _dec, _class, Instagram;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaPalBrowser) {
      initialize = _aureliaPalBrowser.initialize;
    }, function (_servicesIgService) {
      IgService = _servicesIgService.IgService;
    }],
    execute: function () {
      initialize();

      _export('Instagram', Instagram = (_dec = inject(IgService), _dec(_class = function () {
        function Instagram(igService) {
          _classCallCheck(this, Instagram);

          this.heading = "Me";
          this.me = {};

          this.igService = igService;
        }

        Instagram.prototype.activate = function activate() {
          var _this = this;

          if (localStorage.getItem('token')) {
            return this.igService.me().then(function (res) {
              return res.response.data;
            }).then(function (me) {
              _this.me = me;
            });
          }
        };

        return Instagram;
      }()) || _class));

      _export('Instagram', Instagram);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RhZ3JhbS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJpbml0aWFsaXplIiwiSWdTZXJ2aWNlIiwiSW5zdGFncmFtIiwiaWdTZXJ2aWNlIiwiaGVhZGluZyIsIm1lIiwiYWN0aXZhdGUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidGhlbiIsInJlcyIsInJlc3BvbnNlIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLFkscUJBQUFBLE07O0FBQ0FDLGdCLHNCQUFBQSxVOztBQUNBQyxlLHNCQUFBQSxTOzs7QUFDUkQ7OzJCQUlhRSxTLFdBRFpILE9BQU9FLFNBQVAsQztBQUtDLDJCQUFZRSxTQUFaLEVBQXNCO0FBQUE7O0FBQUEsZUFIdEJDLE9BR3NCLEdBSFosSUFHWTtBQUFBLGVBRnRCQyxFQUVzQixHQUZqQixFQUVpQjs7QUFFcEIsZUFBS0YsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7NEJBRURHLFEsdUJBQVc7QUFBQTs7QUFDVCxjQUFHQyxhQUFhQyxPQUFiLENBQXFCLE9BQXJCLENBQUgsRUFBaUM7QUFFL0IsbUJBQU8sS0FBS0wsU0FBTCxDQUFlRSxFQUFmLEdBQ0pJLElBREksQ0FDQztBQUFBLHFCQUFPQyxJQUFJQyxRQUFKLENBQWFDLElBQXBCO0FBQUEsYUFERCxFQUVKSCxJQUZJLENBRUMsY0FDSjtBQUVFLG9CQUFLSixFQUFMLEdBQVVBLEVBQVY7QUFDRCxhQU5FLENBQVA7QUFPQztBQUNKLFMiLCJmaWxlIjoiaW5zdGFncmFtLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
