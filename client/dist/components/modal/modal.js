"use strict";

System.register(["aurelia-framework"], function (_export, _context) {
    "use strict";

    var inject, Modal;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }],
        execute: function () {
            _export("Modal", Modal = function () {
                function Modal() {
                    _classCallCheck(this, Modal);

                    this.modal = {
                        head: "Header",
                        content: "...",
                        caption: "Date: "
                    };
                }

                Modal.prototype.attached = function attached() {};

                Modal.prototype.open = function open() {
                    $('#myModal').show();
                };

                Modal.prototype.close = function close(event) {
                    console.log(event.taget);
                    $('#myModal').hide();
                };

                return Modal;
            }());

            _export("Modal", Modal);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiTW9kYWwiLCJtb2RhbCIsImhlYWQiLCJjb250ZW50IiwiY2FwdGlvbiIsImF0dGFjaGVkIiwib3BlbiIsIiQiLCJzaG93IiwiY2xvc2UiLCJldmVudCIsImNvbnNvbGUiLCJsb2ciLCJ0YWdldCIsImhpZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7OzZCQUVLQyxLO0FBQ1QsaUNBQWM7QUFBQTs7QUFDVix5QkFBS0MsS0FBTCxHQUFhO0FBQ1RDLDhCQUFNLFFBREc7QUFFVEMsaUNBQVMsS0FGQTtBQUdUQyxpQ0FBUztBQUhBLHFCQUFiO0FBTUg7O2dDQUVEQyxRLHVCQUFZLENBRVgsQzs7Z0NBSUZDLEksbUJBQU87QUFDRkMsc0JBQUUsVUFBRixFQUFjQyxJQUFkO0FBQ0gsaUI7O2dDQUdEQyxLLGtCQUFPQyxLLEVBQU07QUFDUkMsNEJBQVFDLEdBQVIsQ0FBWUYsTUFBTUcsS0FBbEI7QUFDR04sc0JBQUUsVUFBRixFQUFjTyxJQUFkO0FBSVAsaUIiLCJmaWxlIjoiY29tcG9uZW50cy9tb2RhbC9tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
