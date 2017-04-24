'use strict';

System.register(['aurelia-framework', 'aurelia-dialog'], function (_export, _context) {
    "use strict";

    var inject, DialogController, _dec, _class, Prompt;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaDialog) {
            DialogController = _aureliaDialog.DialogController;
        }],
        execute: function () {
            _export('Prompt', Prompt = (_dec = inject(DialogController), _dec(_class = function () {
                function Prompt(DialogController) {
                    _classCallCheck(this, Prompt);

                    this.controller = DialogController;
                    this.controller.settings.centerHorizontalOnly = true;
                    this.timer = 2500;
                }

                Prompt.prototype.activate = function activate(message) {
                    this.message = message;

                    this.deactivate();
                };

                Prompt.prototype.deactivate = function deactivate() {
                    var self = this;
                    setTimeout(function () {
                        self.controller.ok();
                    }, self.timer);
                };

                return Prompt;
            }()) || _class));

            _export('Prompt', Prompt);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21wdC5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJEaWFsb2dDb250cm9sbGVyIiwiUHJvbXB0IiwiY29udHJvbGxlciIsInNldHRpbmdzIiwiY2VudGVySG9yaXpvbnRhbE9ubHkiLCJ0aW1lciIsImFjdGl2YXRlIiwibWVzc2FnZSIsImRlYWN0aXZhdGUiLCJzZWxmIiwic2V0VGltZW91dCIsIm9rIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBU0Esa0IscUJBQUFBLE07O0FBQ0FDLDRCLGtCQUFBQSxnQjs7OzhCQUlJQyxNLFdBRlpGLE9BQU9DLGdCQUFQLEM7QUFJRyxnQ0FBWUEsZ0JBQVosRUFBOEI7QUFBQTs7QUFDMUIseUJBQUtFLFVBQUwsR0FBa0JGLGdCQUFsQjtBQUNBLHlCQUFLRSxVQUFMLENBQWdCQyxRQUFoQixDQUF5QkMsb0JBQXpCLEdBQWdELElBQWhEO0FBQ0EseUJBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0g7O2lDQUVEQyxRLHFCQUFTQyxPLEVBQVM7QUFDZCx5QkFBS0EsT0FBTCxHQUFlQSxPQUFmOztBQUVBLHlCQUFLQyxVQUFMO0FBRUgsaUI7O2lDQUVEQSxVLHlCQUFhO0FBQ1Qsd0JBQU1DLE9BQU8sSUFBYjtBQUNBQywrQkFBVyxZQUFZO0FBQ25CRCw2QkFBS1AsVUFBTCxDQUFnQlMsRUFBaEI7QUFDSCxxQkFGRCxFQUVHRixLQUFLSixLQUZSO0FBR0gsaUIiLCJmaWxlIjoicHJvbXB0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
