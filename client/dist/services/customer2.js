'use strict';

System.register(['aurelia-framework', './customHttpClient', 'isomorphic-fetch'], function (_export, _context) {
  "use strict";

  var inject, useView, CustomHttpClient, _dec, _dec2, _class, Customer2;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      useView = _aureliaFramework.useView;
    }, function (_customHttpClient) {
      CustomHttpClient = _customHttpClient.CustomHttpClient;
    }, function (_isomorphicFetch) {}],
    execute: function () {
      _export('Customer2', Customer2 = (_dec = inject(CustomHttpClient), _dec2 = useView('./todo.html'), _dec(_class = _dec2(_class = function () {
        function Customer2(http) {
          _classCallCheck(this, Customer2);

          this.heading = 'Customer management with custom http service';
          this.customers = [];
          this.url = 'api/user';

          this.http = http;
        }

        Customer2.prototype.activate = function activate() {
          var _this = this;

          return this.http.fetch(this.url).then(function (response) {
            return response.json();
          }).then(function (c) {
            return _this.customers = c;
          });
        };

        return Customer2;
      }()) || _class) || _class));

      _export('Customer2', Customer2);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2N1c3RvbWVyMi5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJ1c2VWaWV3IiwiQ3VzdG9tSHR0cENsaWVudCIsIkN1c3RvbWVyMiIsImh0dHAiLCJoZWFkaW5nIiwiY3VzdG9tZXJzIiwidXJsIiwiYWN0aXZhdGUiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsWSxxQkFBQUEsTTtBQUFRQyxhLHFCQUFBQSxPOztBQUNSQyxzQixxQkFBQUEsZ0I7OzsyQkFJS0MsUyxXQUZaSCxPQUFPRSxnQkFBUCxDLFVBQ0FELFFBQVEsYUFBUixDO0FBT0MsMkJBQVlHLElBQVosRUFBaUI7QUFBQTs7QUFBQSxlQUxqQkMsT0FLaUIsR0FMUCw4Q0FLTztBQUFBLGVBSmpCQyxTQUlpQixHQUpMLEVBSUs7QUFBQSxlQUZqQkMsR0FFaUIsR0FGWCxVQUVXOztBQUNmLGVBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNEOzs0QkFFREksUSx1QkFBVTtBQUFBOztBQUVULGlCQUFPLEtBQUtKLElBQUwsQ0FBVUssS0FBVixDQUFnQixLQUFLRixHQUFyQixFQUNORyxJQURNLENBQ0Q7QUFBQSxtQkFBYUMsU0FBU0MsSUFBVCxFQUFiO0FBQUEsV0FEQyxFQUVORixJQUZNLENBRUQ7QUFBQSxtQkFBSyxNQUFLSixTQUFMLEdBQWlCTyxDQUF0QjtBQUFBLFdBRkMsQ0FBUDtBQUdGLFMiLCJmaWxlIjoic2VydmljZXMvY3VzdG9tZXIyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
