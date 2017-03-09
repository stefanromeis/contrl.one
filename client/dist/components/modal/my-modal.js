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
            function Prompt(controller) {
               _classCallCheck(this, Prompt);

               this.controller = controller;
               this.answer = null;

               controller.settings.centerHorizontalOnly = true;
            }

            Prompt.prototype.activate = function activate(message) {
               this.message = message;

               var ifrm = $('#message-content')[0].contentWindow.document;
               $('body', ifrm).html(message.Content);
            };

            Prompt.prototype.test = function test() {
               console.log('test');
            };

            return Prompt;
         }()) || _class));

         _export('Prompt', Prompt);
      }
   };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbW9kYWwvbXktbW9kYWwuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiRGlhbG9nQ29udHJvbGxlciIsIlByb21wdCIsImNvbnRyb2xsZXIiLCJhbnN3ZXIiLCJzZXR0aW5ncyIsImNlbnRlckhvcml6b250YWxPbmx5IiwiYWN0aXZhdGUiLCJtZXNzYWdlIiwiaWZybSIsIiQiLCJjb250ZW50V2luZG93IiwiZG9jdW1lbnQiLCJodG1sIiwiQ29udGVudCIsInRlc3QiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsZSxxQkFBQUEsTTs7QUFDQUMseUIsa0JBQUFBLGdCOzs7MkJBSUtDLE0sV0FGWkYsT0FBT0MsZ0JBQVAsQztBQUlFLDRCQUFZRSxVQUFaLEVBQXVCO0FBQUE7O0FBQ3BCLG9CQUFLQSxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLG9CQUFLQyxNQUFMLEdBQWMsSUFBZDs7QUFFQUQsMEJBQVdFLFFBQVgsQ0FBb0JDLG9CQUFwQixHQUEyQyxJQUEzQztBQUNGOzs2QkFFREMsUSxxQkFBU0MsTyxFQUFTO0FBQ2Isb0JBQUtBLE9BQUwsR0FBZUEsT0FBZjs7QUFJQSxtQkFBSUMsT0FBT0MsRUFBRSxrQkFBRixFQUFzQixDQUF0QixFQUF5QkMsYUFBekIsQ0FBdUNDLFFBQWxEO0FBQ0FGLGlCQUFFLE1BQUYsRUFBVUQsSUFBVixFQUFnQkksSUFBaEIsQ0FBcUJMLFFBQVFNLE9BQTdCO0FBRUosYTs7NkJBRURDLEksbUJBQVE7QUFDSkMsdUJBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBRUgsYSIsImZpbGUiOiJjb21wb25lbnRzL21vZGFsL215LW1vZGFsLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
