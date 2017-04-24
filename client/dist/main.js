'use strict';

System.register(['i18next-xhr-backend'], function (_export, _context) {
    "use strict";

    var Backend;
    function configure(aurelia) {

        var currentLng = localStorage.getItem('appLanguage') || 'en';

        aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-dialog').plugin('font-awesome').plugin('aurelia-i18n', function (instance) {
            instance.i18next.use(Backend);
            return instance.setup({
                backend: {
                    loadPath: 'locale/{{lng}}/{{ns}}.json'
                },
                lng: currentLng,
                attributes: ['i18n'],
                getAsync: true,
                sendMissing: false,
                fallbackLng: 'en',
                debug: false
            });
        });

        aurelia.start().then(function () {
            return aurelia.setRoot('app', document.body);
        });
    }

    _export('configure', configure);

    return {
        setters: [function (_i18nextXhrBackend) {
            Backend = _i18nextXhrBackend.default;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY29uZmlndXJlIiwiYXVyZWxpYSIsImN1cnJlbnRMbmciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidXNlIiwic3RhbmRhcmRDb25maWd1cmF0aW9uIiwiZGV2ZWxvcG1lbnRMb2dnaW5nIiwicGx1Z2luIiwiaW5zdGFuY2UiLCJpMThuZXh0IiwiQmFja2VuZCIsInNldHVwIiwiYmFja2VuZCIsImxvYWRQYXRoIiwibG5nIiwiYXR0cmlidXRlcyIsImdldEFzeW5jIiwic2VuZE1pc3NpbmciLCJmYWxsYmFja0xuZyIsImRlYnVnIiwic3RhcnQiLCJ0aGVuIiwic2V0Um9vdCIsImRvY3VtZW50IiwiYm9keSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRU8sYUFBU0EsU0FBVCxDQUFtQkMsT0FBbkIsRUFBNEI7O0FBRS9CLFlBQUlDLGFBQWFDLGFBQWFDLE9BQWIsQ0FBcUIsYUFBckIsS0FBdUMsSUFBeEQ7O0FBRUFILGdCQUFRSSxHQUFSLENBQ0tDLHFCQURMLEdBRUtDLGtCQUZMLEdBR0tDLE1BSEwsQ0FHWSxnQkFIWixFQUlLQSxNQUpMLENBSVksY0FKWixFQU1LQSxNQU5MLENBTVksY0FOWixFQU00QixVQUFDQyxRQUFELEVBQWM7QUFDbENBLHFCQUFTQyxPQUFULENBQWlCTCxHQUFqQixDQUFxQk0sT0FBckI7QUFDQSxtQkFBT0YsU0FBU0csS0FBVCxDQUFlO0FBQ2xCQyx5QkFBUztBQUNMQyw4QkFBVTtBQURMLGlCQURTO0FBSWxCQyxxQkFBS2IsVUFKYTtBQUtsQmMsNEJBQVksQ0FBQyxNQUFELENBTE07QUFNbEJDLDBCQUFVLElBTlE7QUFPbEJDLDZCQUFhLEtBUEs7QUFRbEJDLDZCQUFhLElBUks7QUFTbEJDLHVCQUFPO0FBVFcsYUFBZixDQUFQO0FBV0gsU0FuQkw7O0FBcUJBbkIsZ0JBQVFvQixLQUFSLEdBQ0tDLElBREwsQ0FDVTtBQUFBLG1CQUFNckIsUUFBUXNCLE9BQVIsQ0FBZ0IsS0FBaEIsRUFBdUJDLFNBQVNDLElBQWhDLENBQU47QUFBQSxTQURWO0FBRUg7O3lCQTNCZXpCLFM7Ozs7QUFGVFcsbUIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
