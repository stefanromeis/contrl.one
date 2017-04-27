"use strict";

System.register(["services/authConfig"], function (_export, _context) {
    "use strict";

    var config, Login;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_servicesAuthConfig) {
            config = _servicesAuthConfig.default;
        }],
        execute: function () {
            _export("Login", Login = function () {
                function Login() {
                    _classCallCheck(this, Login);

                    this.connected;
                    this.loginModalOpen = false;
                    this.email;
                    this.password;
                    this.api = config.providers.contrlOne.api;
                }

                Login.prototype.signUp = function signUp() {
                    var _this = this;

                    var self = this;
                    return new Promise(function (resolve, reject) {
                        $.ajax({
                            type: "POST",
                            url: _this.api + "/users",
                            data: {
                                'email': _this.email,
                                'password': _this.password
                            }
                        }).done(function (res) {
                            console.log('Success', res);
                            self.loginModalOpen = false;
                            localStorage.setItem('contrl.one.token', res.id_token);
                            localStorage.setItem('user', self.email);
                            console.log('signed up');
                            self.connected = true;
                            resolve(res);
                        }).fail(function (err) {
                            if (err.status == 401) {
                                self.login();
                            }
                            console.log('Error', err);
                            reject(err);
                        });
                    });
                };

                Login.prototype.login = function login() {
                    var _this2 = this;

                    var self = this;
                    return new Promise(function (resolve, reject) {
                        $.ajax({
                            type: "POST",
                            url: _this2.api + "/sessions/create",
                            data: {
                                'email': _this2.email,
                                'password': _this2.password
                            }
                        }).done(function (res) {
                            console.log('Logged in', res);
                            self.loginModalOpen = false;
                            localStorage.setItem('contrl.one.token', res.id_token);
                            localStorage.setItem('user', self.email);
                            self.connected = true;
                            resolve(res);
                        }).fail(function (err) {
                            console.log('Error', err);
                            reject(err);
                        });
                    });
                };

                Login.prototype.logout = function logout() {
                    localStorage.removeItem('contrl.one.token');
                    localStorage.removeItem('user');
                    this.connected = false;
                    this.items = [];
                };

                return Login;
            }());

            _export("Login", Login);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2xvZ2luLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsIkxvZ2luIiwiY29ubmVjdGVkIiwibG9naW5Nb2RhbE9wZW4iLCJlbWFpbCIsInBhc3N3b3JkIiwiYXBpIiwicHJvdmlkZXJzIiwiY29udHJsT25lIiwic2lnblVwIiwic2VsZiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiJCIsImFqYXgiLCJ0eXBlIiwidXJsIiwiZGF0YSIsImRvbmUiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImlkX3Rva2VuIiwiZmFpbCIsImVyciIsInN0YXR1cyIsImxvZ2luIiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsIml0ZW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBT0Esa0I7Ozs2QkFFTUMsSztBQUVULGlDQUFjO0FBQUE7O0FBQ1YseUJBQUtDLFNBQUw7QUFDQSx5QkFBS0MsY0FBTCxHQUFzQixLQUF0QjtBQUNBLHlCQUFLQyxLQUFMO0FBQ0EseUJBQUtDLFFBQUw7QUFDQSx5QkFBS0MsR0FBTCxHQUFXTixPQUFPTyxTQUFQLENBQWlCQyxTQUFqQixDQUEyQkYsR0FBdEM7QUFDSDs7Z0NBRURHLE0scUJBQVM7QUFBQTs7QUFDTCx3QkFBTUMsT0FBTyxJQUFiO0FBQ0EsMkJBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ0MsMEJBQUVDLElBQUYsQ0FBTztBQUNIQyxrQ0FBTSxNQURIO0FBRUhDLGlDQUFLLE1BQUtYLEdBQUwsR0FBVyxRQUZiO0FBR0hZLGtDQUFNO0FBQ0YseUNBQVMsTUFBS2QsS0FEWjtBQUVGLDRDQUFZLE1BQUtDO0FBRmY7QUFISCx5QkFBUCxFQU9HYyxJQVBILENBT1EsVUFBVUMsR0FBVixFQUFlO0FBQ25CQyxvQ0FBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJGLEdBQXZCO0FBQ0FWLGlDQUFLUCxjQUFMLEdBQXNCLEtBQXRCO0FBQ0FvQix5Q0FBYUMsT0FBYixDQUFxQixrQkFBckIsRUFBeUNKLElBQUlLLFFBQTdDO0FBQ0FGLHlDQUFhQyxPQUFiLENBQXFCLE1BQXJCLEVBQTZCZCxLQUFLTixLQUFsQztBQUNBaUIsb0NBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0FaLGlDQUFLUixTQUFMLEdBQWlCLElBQWpCO0FBQ0FVLG9DQUFRUSxHQUFSO0FBQ0gseUJBZkQsRUFlR00sSUFmSCxDQWVRLFVBQVVDLEdBQVYsRUFBZTtBQUNuQixnQ0FBSUEsSUFBSUMsTUFBSixJQUFjLEdBQWxCLEVBQXVCO0FBQ25CbEIscUNBQUttQixLQUFMO0FBQ0g7QUFDRFIsb0NBQVFDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCSyxHQUFyQjtBQUNBZCxtQ0FBT2MsR0FBUDtBQUNILHlCQXJCRDtBQXNCSCxxQkF2Qk0sQ0FBUDtBQXdCSCxpQjs7Z0NBRURFLEssb0JBQVE7QUFBQTs7QUFDSix3QkFBTW5CLE9BQU8sSUFBYjtBQUNBLDJCQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcENDLDBCQUFFQyxJQUFGLENBQU87QUFDSEMsa0NBQU0sTUFESDtBQUVIQyxpQ0FBSyxPQUFLWCxHQUFMLEdBQVcsa0JBRmI7QUFHSFksa0NBQU07QUFDRix5Q0FBUyxPQUFLZCxLQURaO0FBRUYsNENBQVksT0FBS0M7QUFGZjtBQUhILHlCQUFQLEVBT0djLElBUEgsQ0FPUSxVQUFVQyxHQUFWLEVBQWU7QUFDbkJDLG9DQUFRQyxHQUFSLENBQVksV0FBWixFQUF5QkYsR0FBekI7QUFDQVYsaUNBQUtQLGNBQUwsR0FBc0IsS0FBdEI7QUFDQW9CLHlDQUFhQyxPQUFiLENBQXFCLGtCQUFyQixFQUF5Q0osSUFBSUssUUFBN0M7QUFDQUYseUNBQWFDLE9BQWIsQ0FBcUIsTUFBckIsRUFBNkJkLEtBQUtOLEtBQWxDO0FBQ0FNLGlDQUFLUixTQUFMLEdBQWlCLElBQWpCO0FBQ0FVLG9DQUFRUSxHQUFSO0FBQ0gseUJBZEQsRUFjR00sSUFkSCxDQWNRLFVBQVVDLEdBQVYsRUFBZTtBQUNuQk4sb0NBQVFDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCSyxHQUFyQjtBQUNBZCxtQ0FBT2MsR0FBUDtBQUNILHlCQWpCRDtBQWtCSCxxQkFuQk0sQ0FBUDtBQW9CSCxpQjs7Z0NBRURHLE0scUJBQVM7QUFDTFAsaUNBQWFRLFVBQWIsQ0FBd0Isa0JBQXhCO0FBQ0FSLGlDQUFhUSxVQUFiLENBQXdCLE1BQXhCO0FBQ0EseUJBQUs3QixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EseUJBQUs4QixLQUFMLEdBQWEsRUFBYjtBQUNILGlCIiwiZmlsZSI6InNlcnZpY2VzL2xvZ2luLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
