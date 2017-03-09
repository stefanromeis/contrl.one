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
            };

            return Prompt;
         }()) || _class));

         _export('Prompt', Prompt);
      }
   };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21wdC5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJEaWFsb2dDb250cm9sbGVyIiwiUHJvbXB0IiwiY29udHJvbGxlciIsImFuc3dlciIsInNldHRpbmdzIiwiY2VudGVySG9yaXpvbnRhbE9ubHkiLCJhY3RpdmF0ZSIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxlLHFCQUFBQSxNOztBQUNBQyx5QixrQkFBQUEsZ0I7OzsyQkFJS0MsTSxXQUZaRixPQUFPQyxnQkFBUCxDO0FBSUUsNEJBQVlFLFVBQVosRUFBdUI7QUFBQTs7QUFDcEIsb0JBQUtBLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0Esb0JBQUtDLE1BQUwsR0FBYyxJQUFkOztBQUVBRCwwQkFBV0UsUUFBWCxDQUFvQkMsb0JBQXBCLEdBQTJDLElBQTNDO0FBQ0Y7OzZCQUVEQyxRLHFCQUFTQyxPLEVBQVM7QUFDZixvQkFBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0YsYSIsImZpbGUiOiJwcm9tcHQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
