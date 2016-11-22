'use strict';

System.register(['aurelia-framework', 'Gmail'], function (_export, _context) {
    "use strict";

    var inject, Gmail, _dec, _class, Modal;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_Gmail) {
            Gmail = _Gmail.Gmail;
        }],
        execute: function () {
            _export('Modal', Modal = (_dec = inject(Gmail), _dec(_class = function () {
                function Modal(Gmail) {
                    _classCallCheck(this, Modal);

                    this.modal = {
                        head: "Header",
                        content: "...",
                        caption: "Date: "
                    };
                    this.Gmail = Gmail;
                }

                Modal.prototype.attached = function attached() {

                    console.log('jo', this.Gmail.content.data);
                };

                Modal.prototype.open = function open() {
                    console.log('jo', this.Gmail.content.data);
                    console.log('xaxs');
                    $('#myModal').show();
                };

                Modal.prototype.close = function close() {
                    $('#myModal').hide();;
                };

                return Modal;
            }()) || _class));

            _export('Modal', Modal);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGFsLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkdtYWlsIiwiTW9kYWwiLCJtb2RhbCIsImhlYWQiLCJjb250ZW50IiwiY2FwdGlvbiIsImF0dGFjaGVkIiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJvcGVuIiwiJCIsInNob3ciLCJjbG9zZSIsImhpZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxrQixxQkFBQUEsTTs7QUFDQUMsaUIsVUFBQUEsSzs7OzZCQUdLQyxLLFdBRFpGLE9BQU9DLEtBQVAsQztBQUVHLCtCQUFZQSxLQUFaLEVBQW1CO0FBQUE7O0FBQ2YseUJBQUtFLEtBQUwsR0FBYTtBQUNUQyw4QkFBTSxRQURHO0FBRVRDLGlDQUFTLEtBRkE7QUFHVEMsaUNBQVM7QUFIQSxxQkFBYjtBQUtBLHlCQUFLTCxLQUFMLEdBQWFBLEtBQWI7QUFFSDs7Z0NBRURNLFEsdUJBQVk7O0FBRVJDLDRCQUFRQyxHQUFSLENBQVksSUFBWixFQUFrQixLQUFLUixLQUFMLENBQVdJLE9BQVgsQ0FBbUJLLElBQXJDO0FBQ0gsaUI7O2dDQUlGQyxJLG1CQUFPO0FBQ0ZILDRCQUFRQyxHQUFSLENBQVksSUFBWixFQUFrQixLQUFLUixLQUFMLENBQVdJLE9BQVgsQ0FBbUJLLElBQXJDO0FBQ0RGLDRCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNDRyxzQkFBRSxVQUFGLEVBQWNDLElBQWQ7QUFDSCxpQjs7Z0NBR0RDLEssb0JBQVE7QUFDSEYsc0JBQUUsVUFBRixFQUFjRyxJQUFkLEdBQXFCO0FBQ3pCLGlCIiwiZmlsZSI6Im1vZGFsLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
