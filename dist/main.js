'use strict';

System.register(['i18next-xhr-backend', 'fetch'], function (_export, _context) {
    "use strict";

    var Backend;
    function configure(aurelia) {

        aurelia.use.standardConfiguration().developmentLogging();

        aurelia.use.plugin('aurelia-animator-css');

        aurelia.use.plugin('aurelia-i18n', function (instance) {
            instance.i18next.use(Backend);
            return instance.setup({
                backend: {
                    loadPath: 'locale/{{lng}}/{{ns}}.json'
                },
                lng: 'en',
                attributes: ['i18n'],
                getAsync: true,
                sendMissing: false,
                fallbackLng: 'en',
                debug: false
            });
        });

        aurelia.start().then(function () {
            return aurelia.setRoot();
        }).then(function () {
            if ($('body').hasClass('loggedIn')) {
                $('#wrapper').addClass('animated');
            }

            $('#wrapper').tooltip({
                selector: '[data-toggle="tooltip"]'
            });
        });
    }

    _export('configure', configure);

    return {
        setters: [function (_i18nextXhrBackend) {
            Backend = _i18nextXhrBackend.default;
        }, function (_fetch) {}],
        execute: function () {}
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY29uZmlndXJlIiwiYXVyZWxpYSIsInVzZSIsInN0YW5kYXJkQ29uZmlndXJhdGlvbiIsImRldmVsb3BtZW50TG9nZ2luZyIsInBsdWdpbiIsImluc3RhbmNlIiwiaTE4bmV4dCIsIkJhY2tlbmQiLCJzZXR1cCIsImJhY2tlbmQiLCJsb2FkUGF0aCIsImxuZyIsImF0dHJpYnV0ZXMiLCJnZXRBc3luYyIsInNlbmRNaXNzaW5nIiwiZmFsbGJhY2tMbmciLCJkZWJ1ZyIsInN0YXJ0IiwidGhlbiIsInNldFJvb3QiLCIkIiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsInRvb2x0aXAiLCJzZWxlY3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR08sYUFBU0EsU0FBVCxDQUFtQkMsT0FBbkIsRUFBNEI7O0FBRS9CQSxnQkFBUUMsR0FBUixDQUNLQyxxQkFETCxHQUVLQyxrQkFGTDs7QUFRQUgsZ0JBQVFDLEdBQVIsQ0FBWUcsTUFBWixDQUFtQixzQkFBbkI7O0FBR0FKLGdCQUFRQyxHQUFSLENBQVlHLE1BQVosQ0FBbUIsY0FBbkIsRUFBbUMsVUFBQ0MsUUFBRCxFQUFjO0FBQzdDQSxxQkFBU0MsT0FBVCxDQUFpQkwsR0FBakIsQ0FBcUJNLE9BQXJCO0FBQ0EsbUJBQU9GLFNBQVNHLEtBQVQsQ0FBZTtBQUNsQkMseUJBQVU7QUFDTkMsOEJBQVc7QUFETCxpQkFEUTtBQUlsQkMscUJBQU0sSUFKWTtBQUtsQkMsNEJBQWEsQ0FBQyxNQUFELENBTEs7QUFNbEJDLDBCQUFXLElBTk87QUFPbEJDLDZCQUFjLEtBUEk7QUFRbEJDLDZCQUFjLElBUkk7QUFTbEJDLHVCQUFRO0FBVFUsYUFBZixDQUFQO0FBV0gsU0FiRDs7QUFxQkFoQixnQkFBUWlCLEtBQVIsR0FDS0MsSUFETCxDQUNVO0FBQUEsbUJBQU1sQixRQUFRbUIsT0FBUixFQUFOO0FBQUEsU0FEVixFQUVJRCxJQUZKLENBRVMsWUFBTTtBQUdQLGdCQUFJRSxFQUFFLE1BQUYsRUFBVUMsUUFBVixDQUFtQixVQUFuQixDQUFKLEVBQW9DO0FBQ2hDRCxrQkFBRSxVQUFGLEVBQWNFLFFBQWQsQ0FBdUIsVUFBdkI7QUFDSDs7QUFHREYsY0FBRSxVQUFGLEVBQWNHLE9BQWQsQ0FBc0I7QUFDbEJDLDBCQUFXO0FBRE8sYUFBdEI7QUFJSCxTQWRMO0FBZ0JIOzt5QkFsRGV6QixTOzs7O0FBSFRRLG1CIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
