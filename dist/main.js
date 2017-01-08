'use strict';

System.register(['i18next-xhr-backend', 'fetch'], function (_export, _context) {
    "use strict";

    var Backend;
    function configure(aurelia) {

        aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-animator-css').plugin('aurelia-dialog');

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY29uZmlndXJlIiwiYXVyZWxpYSIsInVzZSIsInN0YW5kYXJkQ29uZmlndXJhdGlvbiIsImRldmVsb3BtZW50TG9nZ2luZyIsInBsdWdpbiIsImluc3RhbmNlIiwiaTE4bmV4dCIsIkJhY2tlbmQiLCJzZXR1cCIsImJhY2tlbmQiLCJsb2FkUGF0aCIsImxuZyIsImF0dHJpYnV0ZXMiLCJnZXRBc3luYyIsInNlbmRNaXNzaW5nIiwiZmFsbGJhY2tMbmciLCJkZWJ1ZyIsInN0YXJ0IiwidGhlbiIsInNldFJvb3QiLCIkIiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsInRvb2x0aXAiLCJzZWxlY3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR08sYUFBU0EsU0FBVCxDQUFtQkMsT0FBbkIsRUFBNEI7O0FBRS9CQSxnQkFBUUMsR0FBUixDQUNLQyxxQkFETCxHQUVLQyxrQkFGTCxHQUdLQyxNQUhMLENBR1ksc0JBSFosRUFJS0EsTUFKTCxDQUlZLGdCQUpaOztBQVFBSixnQkFBUUMsR0FBUixDQUFZRyxNQUFaLENBQW1CLGNBQW5CLEVBQW1DLFVBQUNDLFFBQUQsRUFBYztBQUM3Q0EscUJBQVNDLE9BQVQsQ0FBaUJMLEdBQWpCLENBQXFCTSxPQUFyQjtBQUNBLG1CQUFPRixTQUFTRyxLQUFULENBQWU7QUFDbEJDLHlCQUFVO0FBQ05DLDhCQUFXO0FBREwsaUJBRFE7QUFJbEJDLHFCQUFNLElBSlk7QUFLbEJDLDRCQUFhLENBQUMsTUFBRCxDQUxLO0FBTWxCQywwQkFBVyxJQU5PO0FBT2xCQyw2QkFBYyxLQVBJO0FBUWxCQyw2QkFBYyxJQVJJO0FBU2xCQyx1QkFBUTtBQVRVLGFBQWYsQ0FBUDtBQVdILFNBYkQ7O0FBcUJBaEIsZ0JBQVFpQixLQUFSLEdBQ0tDLElBREwsQ0FDVTtBQUFBLG1CQUFNbEIsUUFBUW1CLE9BQVIsRUFBTjtBQUFBLFNBRFYsRUFFS0QsSUFGTCxDQUVVLFlBQU07QUFHUixnQkFBSUUsRUFBRSxNQUFGLEVBQVVDLFFBQVYsQ0FBbUIsVUFBbkIsQ0FBSixFQUFvQztBQUNoQ0Qsa0JBQUUsVUFBRixFQUFjRSxRQUFkLENBQXVCLFVBQXZCO0FBQ0g7O0FBR0RGLGNBQUUsVUFBRixFQUFjRyxPQUFkLENBQXNCO0FBQ2xCQywwQkFBVztBQURPLGFBQXRCO0FBSUgsU0FkTDtBQWdCSDs7eUJBL0NlekIsUzs7OztBQUhUUSxtQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
