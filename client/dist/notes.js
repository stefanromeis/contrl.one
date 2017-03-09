'use strict';

System.register(['aurelia-dialog', 'aurelia-framework', 'aurelia-i18n', 'prompt'], function (_export, _context) {
    "use strict";

    var DialogService, inject, I18N, Prompt, _dec, _class, Notes;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaDialog) {
            DialogService = _aureliaDialog.DialogService;
        }, function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_aureliaI18n) {
            I18N = _aureliaI18n.I18N;
        }, function (_prompt) {
            Prompt = _prompt.Prompt;
        }],
        execute: function () {
            _export('Notes', Notes = (_dec = inject(DialogService), _dec(_class = function () {
                function Notes(DialogService) {
                    _classCallCheck(this, Notes);

                    this.dialogService = DialogService;

                    this.connected = false;
                    this.isLoading = false;
                    this.calData = [];
                    this.modalOpen = false;
                }

                Notes.prototype.attached = function attached() {};

                Notes.prototype.connect = function connect() {};

                return Notes;
            }()) || _class));

            _export('Notes', Notes);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGVzLmpzIl0sIm5hbWVzIjpbIkRpYWxvZ1NlcnZpY2UiLCJpbmplY3QiLCJJMThOIiwiUHJvbXB0IiwiTm90ZXMiLCJkaWFsb2dTZXJ2aWNlIiwiY29ubmVjdGVkIiwiaXNMb2FkaW5nIiwiY2FsRGF0YSIsIm1vZGFsT3BlbiIsImF0dGFjaGVkIiwiY29ubmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLHlCLGtCQUFBQSxhOztBQUNBQyxrQixxQkFBQUEsTTs7QUFDQUMsZ0IsZ0JBQUFBLEk7O0FBQ0FDLGtCLFdBQUFBLE07Ozs2QkFHS0MsSyxXQURaSCxPQUFPRCxhQUFQLEM7QUFFRywrQkFBYUEsYUFBYixFQUE0QjtBQUFBOztBQUN4Qix5QkFBS0ssYUFBTCxHQUFxQkwsYUFBckI7O0FBRUEseUJBQUtNLFNBQUwsR0FBaUIsS0FBakI7QUFDQSx5QkFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLHlCQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBRUg7O2dDQUVEQyxRLHVCQUFZLENBRVgsQzs7Z0NBRURDLE8sc0JBQVUsQ0FFVCxDIiwiZmlsZSI6Im5vdGVzLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
