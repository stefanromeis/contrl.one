'use strict';

System.register(['i18next-xhr-backend', 'fetch'], function (_export, _context) {
    "use strict";

    var Backend;
    function configure(aurelia) {

        aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-dialog');

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY29uZmlndXJlIiwiYXVyZWxpYSIsInVzZSIsInN0YW5kYXJkQ29uZmlndXJhdGlvbiIsImRldmVsb3BtZW50TG9nZ2luZyIsInBsdWdpbiIsImluc3RhbmNlIiwiaTE4bmV4dCIsIkJhY2tlbmQiLCJzZXR1cCIsImJhY2tlbmQiLCJsb2FkUGF0aCIsImxuZyIsImF0dHJpYnV0ZXMiLCJnZXRBc3luYyIsInNlbmRNaXNzaW5nIiwiZmFsbGJhY2tMbmciLCJkZWJ1ZyIsInN0YXJ0IiwidGhlbiIsInNldFJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlPLGFBQVNBLFNBQVQsQ0FBbUJDLE9BQW5CLEVBQTRCOztBQUUvQkEsZ0JBQVFDLEdBQVIsQ0FDS0MscUJBREwsR0FFS0Msa0JBRkwsR0FJS0MsTUFKTCxDQUlZLGdCQUpaOztBQVFBSixnQkFBUUMsR0FBUixDQUFZRyxNQUFaLENBQW1CLGNBQW5CLEVBQW1DLFVBQUNDLFFBQUQsRUFBYztBQUM3Q0EscUJBQVNDLE9BQVQsQ0FBaUJMLEdBQWpCLENBQXFCTSxPQUFyQjtBQUNBLG1CQUFPRixTQUFTRyxLQUFULENBQWU7QUFDbEJDLHlCQUFVO0FBQ05DLDhCQUFXO0FBREwsaUJBRFE7QUFJbEJDLHFCQUFNLElBSlk7QUFLbEJDLDRCQUFhLENBQUMsTUFBRCxDQUxLO0FBTWxCQywwQkFBVyxJQU5PO0FBT2xCQyw2QkFBYyxLQVBJO0FBUWxCQyw2QkFBYyxJQVJJO0FBU2xCQyx1QkFBUTtBQVRVLGFBQWYsQ0FBUDtBQVdILFNBYkQ7O0FBa0JBaEIsZ0JBQVFpQixLQUFSLEdBQ0tDLElBREwsQ0FDVTtBQUFBLG1CQUFNbEIsUUFBUW1CLE9BQVIsRUFBTjtBQUFBLFNBRFY7QUFHSDs7eUJBL0JlcEIsUzs7OztBQUpUUSxtQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
