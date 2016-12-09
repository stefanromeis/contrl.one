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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGFsLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIk1vZGFsIiwibW9kYWwiLCJoZWFkIiwiY29udGVudCIsImNhcHRpb24iLCJhdHRhY2hlZCIsIm9wZW4iLCIkIiwic2hvdyIsImNsb3NlIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidGFnZXQiLCJoaWRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07Ozs2QkFFS0MsSztBQUNULGlDQUFjO0FBQUE7O0FBQ1YseUJBQUtDLEtBQUwsR0FBYTtBQUNUQyw4QkFBTSxRQURHO0FBRVRDLGlDQUFTLEtBRkE7QUFHVEMsaUNBQVM7QUFIQSxxQkFBYjtBQU1IOztnQ0FFREMsUSx1QkFBWSxDQUVYLEM7O2dDQUlGQyxJLG1CQUFPO0FBQ0ZDLHNCQUFFLFVBQUYsRUFBY0MsSUFBZDtBQUNILGlCOztnQ0FHREMsSyxrQkFBT0MsSyxFQUFNO0FBQ1JDLDRCQUFRQyxHQUFSLENBQVlGLE1BQU1HLEtBQWxCO0FBQ0dOLHNCQUFFLFVBQUYsRUFBY08sSUFBZDtBQUlQLGlCIiwiZmlsZSI6Im1vZGFsLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
