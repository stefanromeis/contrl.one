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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY29uZmlndXJlIiwiYXVyZWxpYSIsInVzZSIsInN0YW5kYXJkQ29uZmlndXJhdGlvbiIsImRldmVsb3BtZW50TG9nZ2luZyIsInBsdWdpbiIsImluc3RhbmNlIiwiaTE4bmV4dCIsIkJhY2tlbmQiLCJzZXR1cCIsImJhY2tlbmQiLCJsb2FkUGF0aCIsImxuZyIsImF0dHJpYnV0ZXMiLCJnZXRBc3luYyIsInNlbmRNaXNzaW5nIiwiZmFsbGJhY2tMbmciLCJkZWJ1ZyIsInN0YXJ0IiwidGhlbiIsInNldFJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlPLGFBQVNBLFNBQVQsQ0FBbUJDLE9BQW5CLEVBQTRCOztBQUUvQkEsZ0JBQVFDLEdBQVIsQ0FDS0MscUJBREwsR0FFS0Msa0JBRkwsR0FHS0MsTUFITCxDQUdZLHNCQUhaLEVBSUtBLE1BSkwsQ0FJWSxnQkFKWjs7QUFRQUosZ0JBQVFDLEdBQVIsQ0FBWUcsTUFBWixDQUFtQixjQUFuQixFQUFtQyxVQUFDQyxRQUFELEVBQWM7QUFDN0NBLHFCQUFTQyxPQUFULENBQWlCTCxHQUFqQixDQUFxQk0sT0FBckI7QUFDQSxtQkFBT0YsU0FBU0csS0FBVCxDQUFlO0FBQ2xCQyx5QkFBVTtBQUNOQyw4QkFBVztBQURMLGlCQURRO0FBSWxCQyxxQkFBTSxJQUpZO0FBS2xCQyw0QkFBYSxDQUFDLE1BQUQsQ0FMSztBQU1sQkMsMEJBQVcsSUFOTztBQU9sQkMsNkJBQWMsS0FQSTtBQVFsQkMsNkJBQWMsSUFSSTtBQVNsQkMsdUJBQVE7QUFUVSxhQUFmLENBQVA7QUFXSCxTQWJEOztBQWtCQWhCLGdCQUFRaUIsS0FBUixHQUNLQyxJQURMLENBQ1U7QUFBQSxtQkFBTWxCLFFBQVFtQixPQUFSLEVBQU47QUFBQSxTQURWO0FBaUJIOzt5QkE3Q2VwQixTOzs7O0FBSlRRLG1CIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
