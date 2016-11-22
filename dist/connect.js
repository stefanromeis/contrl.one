'use strict';

System.register(['aurelia-framework', 'facebook', 'soundcloud', 'gmail'], function (_export, _context) {
    "use strict";

    var inject, Facebook, Soundcloud, Gmail, _dec, _class, Connect;

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
        }, function (_gmail) {
            Gmail = _gmail.Gmail;
        }],
        execute: function () {
            _export('Connect', Connect = (_dec = inject(Facebook, Soundcloud, Gmail), _dec(_class = function Connect(Facebook, Soundcloud, Gmail) {
                _classCallCheck(this, Connect);

                this.Facebook = Facebook;
                this.Soundcloud = Soundcloud;
                this.Gmail = Gmail;
            }) || _class));

            _export('Connect', Connect);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3QuanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiRmFjZWJvb2siLCJTb3VuZGNsb3VkIiwiR21haWwiLCJDb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsa0IscUJBQUFBLE07O0FBQ0FDLG9CLGFBQUFBLFE7O0FBQ0FDLHNCLGVBQUFBLFU7O0FBQ0FDLGlCLFVBQUFBLEs7OzsrQkFHS0MsTyxXQURaSixPQUFPQyxRQUFQLEVBQWlCQyxVQUFqQixFQUE2QkMsS0FBN0IsQyxnQkFFRyxpQkFBYUYsUUFBYixFQUF1QkMsVUFBdkIsRUFBbUNDLEtBQW5DLEVBQTBDO0FBQUE7O0FBQ3RDLHFCQUFLRixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLHFCQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLHFCQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDSCxhIiwiZmlsZSI6ImNvbm5lY3QuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
