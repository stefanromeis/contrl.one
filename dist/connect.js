'use strict';

System.register(['aurelia-framework', 'facebook', 'soundcloud'], function (_export, _context) {
    "use strict";

    var inject, Facebook, Soundcloud, _dec, _class, Connect;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
        }, function (_facebook) {
            Facebook = _facebook.Facebook;
        }, function (_soundcloud) {
            Soundcloud = _soundcloud.Soundcloud;
        }],
        execute: function () {
            _export('Connect', Connect = (_dec = inject(Facebook, Soundcloud), _dec(_class = function Connect(Facebook, Soundcloud) {
                _classCallCheck(this, Connect);

                this.Facebook = Facebook;
                this.Soundcloud = Soundcloud;
            }) || _class));

            _export('Connect', Connect);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3QuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiRmFjZWJvb2siLCJTb3VuZGNsb3VkIiwiQ29ubmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVFBLGtCLHFCQUFBQSxNOztBQUNBQyxvQixhQUFBQSxROztBQUNBQyxzQixlQUFBQSxVOzs7K0JBR0tDLE8sV0FEWkgsT0FBT0MsUUFBUCxFQUFpQkMsVUFBakIsQyxnQkFFRyxpQkFBYUQsUUFBYixFQUF1QkMsVUFBdkIsRUFBbUM7QUFBQTs7QUFDL0IscUJBQUtELFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EscUJBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0gsYSIsImZpbGUiOiJjb25uZWN0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
