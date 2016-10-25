'use strict';

System.register(['aurelia-framework', 'aurelia-http-client'], function (_export, _context) {
  "use strict";

  var inject, HttpClient, _dec, _class, IgService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }],
    execute: function () {
      _export('IgService', IgService = (_dec = inject(HttpClient), _dec(_class = function () {
        function IgService(http) {
          _classCallCheck(this, IgService);

          this.token = localStorage.getItem('token');

          http.configure(function (config) {
            config.withBaseUrl('https://api.instagram.com/v1/');
          });

          this.http = http;
        }

        IgService.prototype.recent = function recent() {
          return this.http.jsonp('users/self/media/recent/?access_token=' + this.token, 'callback');
        };

        IgService.prototype.me = function me() {
          return this.http.jsonp('users/self/?access_token=' + this.token, 'callback');
        };

        return IgService;
      }()) || _class));

      _export('IgService', IgService);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2lnLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiSHR0cENsaWVudCIsIklnU2VydmljZSIsImh0dHAiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJjb25maWd1cmUiLCJjb25maWciLCJ3aXRoQmFzZVVybCIsInJlY2VudCIsImpzb25wIiwibWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNRQSxZLHFCQUFBQSxNOztBQUNBQyxnQixzQkFBQUEsVTs7OzJCQUlLQyxTLFdBRFpGLE9BQU9DLFVBQVAsQztBQUdDLDJCQUFZRSxJQUFaLEVBQWtCO0FBQUE7O0FBQUEsZUFEbEJDLEtBQ2tCLEdBRFZDLGFBQWFDLE9BQWIsQ0FBcUIsT0FBckIsQ0FDVTs7QUFFaEJILGVBQUtJLFNBQUwsQ0FBZSxrQkFBVTtBQUN2QkMsbUJBQ0dDLFdBREgsQ0FDZSwrQkFEZjtBQUVELFdBSEQ7O0FBS0EsZUFBS04sSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7OzRCQUVETyxNLHFCQUFTO0FBRVAsaUJBQU8sS0FBS1AsSUFBTCxDQUFVUSxLQUFWLDRDQUF5RCxLQUFLUCxLQUE5RCxFQUF1RSxVQUF2RSxDQUFQO0FBQ0QsUzs7NEJBRURRLEUsaUJBQUs7QUFFSCxpQkFBTyxLQUFLVCxJQUFMLENBQVVRLEtBQVYsK0JBQTRDLEtBQUtQLEtBQWpELEVBQTBELFVBQTFELENBQVA7QUFDRCxTIiwiZmlsZSI6InNlcnZpY2VzL2lnLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
