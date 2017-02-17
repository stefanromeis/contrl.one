'use strict';

System.register(['aurelia-fetch-client', 'aurelia-framework', 'isomorphic-fetch', 'aurelia-auth'], function (_export, _context) {
    "use strict";

    var HttpClient, inject, AuthService, _dec, _class, CustomHttpClient;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_aureliaFetchClient) {
            HttpClient = _aureliaFetchClient.HttpClient;
        }, function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_isomorphicFetch) {}, function (_aureliaAuth) {
            AuthService = _aureliaAuth.AuthService;
        }],
        execute: function () {
            _export('CustomHttpClient', CustomHttpClient = (_dec = inject(AuthService), _dec(_class = function (_HttpClient) {
                _inherits(CustomHttpClient, _HttpClient);

                function CustomHttpClient(auth) {
                    _classCallCheck(this, CustomHttpClient);

                    var _this = _possibleConstructorReturn(this, _HttpClient.call(this));

                    _this.configure(function (config) {
                        config.withBaseUrl('http://localhost/').withDefaults({
                            credentials: 'same-origin',
                            headers: {
                                'Accept': 'application/json',
                                'X-Requested-With': 'Fetch'
                            }
                        }).withInterceptor(auth.tokenInterceptor).withInterceptor({
                            request: function request(_request) {
                                console.log('Requesting ' + _request.method + ' ' + _request.url);
                                return _request;
                            },
                            response: function response(_response) {
                                console.log('Received ' + _response.status + ' ' + _response.url);
                                return _response;
                            }
                        });
                    });
                    return _this;
                }

                return CustomHttpClient;
            }(HttpClient)) || _class));

            _export('CustomHttpClient', CustomHttpClient);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbWh0dHBjbGllbnQuanMiXSwibmFtZXMiOlsiSHR0cENsaWVudCIsImluamVjdCIsIkF1dGhTZXJ2aWNlIiwiQ3VzdG9tSHR0cENsaWVudCIsImF1dGgiLCJjb25maWd1cmUiLCJjb25maWciLCJ3aXRoQmFzZVVybCIsIndpdGhEZWZhdWx0cyIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsIndpdGhJbnRlcmNlcHRvciIsInRva2VuSW50ZXJjZXB0b3IiLCJyZXF1ZXN0IiwiY29uc29sZSIsImxvZyIsIm1ldGhvZCIsInVybCIsInJlc3BvbnNlIiwic3RhdHVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsc0IsdUJBQUFBLFU7O0FBQ0FDLGtCLHFCQUFBQSxNOztBQUVBQyx1QixnQkFBQUEsVzs7O3dDQUdLQyxnQixXQURaRixPQUFPQyxXQUFQLEM7OztBQUVHLDBDQUFZRSxJQUFaLEVBQWtCO0FBQUE7O0FBQUEsaUVBQ2Qsc0JBRGM7O0FBRWQsMEJBQUtDLFNBQUwsQ0FBZSxrQkFBVTtBQUNyQkMsK0JBQ0tDLFdBREwsQ0FDaUIsbUJBRGpCLEVBRUtDLFlBRkwsQ0FFa0I7QUFDVkMseUNBQWEsYUFESDtBQUVWQyxxQ0FBUztBQUNMLDBDQUFVLGtCQURMO0FBRUwsb0RBQW9CO0FBRmY7QUFGQyx5QkFGbEIsRUFZS0MsZUFaTCxDQVlxQlAsS0FBS1EsZ0JBWjFCLEVBY0tELGVBZEwsQ0FjcUI7QUFDYkUsbUNBRGEsbUJBQ0xBLFFBREssRUFDSTtBQUNiQyx3Q0FBUUMsR0FBUixpQkFBMEJGLFNBQVFHLE1BQWxDLFNBQTRDSCxTQUFRSSxHQUFwRDtBQUNBLHVDQUFPSixRQUFQO0FBQ0gsNkJBSlk7QUFLYkssb0NBTGEsb0JBS0pBLFNBTEksRUFLTTtBQUNmSix3Q0FBUUMsR0FBUixlQUF3QkcsVUFBU0MsTUFBakMsU0FBMkNELFVBQVNELEdBQXBEO0FBQ0EsdUNBQU9DLFNBQVA7QUFDSDtBQVJZLHlCQWRyQjtBQXdCSyxxQkF6QlQ7QUFGYztBQTRCakI7OztjQTdCaUNsQixVIiwiZmlsZSI6ImN1c3RvbWh0dHBjbGllbnQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
