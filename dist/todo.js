'use strict';

System.register(['aurelia-dialog', 'aurelia-framework', 'aurelia-i18n', 'prompt', 'services/api'], function (_export, _context) {
    "use strict";

    var DialogService, inject, I18N, Prompt, Api, _dec, _class, Todo;

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
        }, function (_servicesApi) {
            Api = _servicesApi.Api;
        }],
        execute: function () {
            _export('Todo', Todo = (_dec = inject(DialogService, Api), _dec(_class = function () {
                function Todo(DialogService, Api) {
                    _classCallCheck(this, Todo);

                    this.dialogService = DialogService;
                    this.api = Api;

                    this.connected = false;
                    this.isLoading = false;
                    this.calData = [];
                    this.modalOpen = false;
                    this.todoLoging = localStorage.getItem('togoLogin');
                    this.loginModalOpen = false;
                }

                Todo.prototype.attached = function attached() {};

                Todo.prototype.loginWithMail = function loginWithMail() {};

                return Todo;
            }()) || _class));

            _export('Todo', Todo);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8uanMiXSwibmFtZXMiOlsiRGlhbG9nU2VydmljZSIsImluamVjdCIsIkkxOE4iLCJQcm9tcHQiLCJBcGkiLCJUb2RvIiwiZGlhbG9nU2VydmljZSIsImFwaSIsImNvbm5lY3RlZCIsImlzTG9hZGluZyIsImNhbERhdGEiLCJtb2RhbE9wZW4iLCJ0b2RvTG9naW5nIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImxvZ2luTW9kYWxPcGVuIiwiYXR0YWNoZWQiLCJsb2dpbldpdGhNYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEseUIsa0JBQUFBLGE7O0FBQ0FDLGtCLHFCQUFBQSxNOztBQUNBQyxnQixnQkFBQUEsSTs7QUFDQUMsa0IsV0FBQUEsTTs7QUFDQUMsZSxnQkFBQUEsRzs7OzRCQUdLQyxJLFdBRFpKLE9BQU9ELGFBQVAsRUFBc0JJLEdBQXRCLEM7QUFFRyw4QkFBYUosYUFBYixFQUE0QkksR0FBNUIsRUFBaUM7QUFBQTs7QUFDN0IseUJBQUtFLGFBQUwsR0FBcUJOLGFBQXJCO0FBQ0EseUJBQUtPLEdBQUwsR0FBV0gsR0FBWDs7QUFFQSx5QkFBS0ksU0FBTCxHQUFpQixLQUFqQjtBQUNBLHlCQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EseUJBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EseUJBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSx5QkFBS0MsVUFBTCxHQUFrQkMsYUFBYUMsT0FBYixDQUFxQixXQUFyQixDQUFsQjtBQUNBLHlCQUFLQyxjQUFMLEdBQXNCLEtBQXRCO0FBQ0g7OytCQUVEQyxRLHVCQUFZLENBRVgsQzs7K0JBRURDLGEsNEJBQWdCLENBR2YsQyIsImZpbGUiOiJ0b2RvLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
