'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client'], function (_export, _context) {
	"use strict";

	var inject, HttpClient, _dec, _class, Api;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}, function (_aureliaFetchClient) {
			HttpClient = _aureliaFetchClient.HttpClient;
		}],
		execute: function () {
			_export('Api', Api = (_dec = inject(HttpClient), _dec(_class = function () {
				function Api(http) {
					_classCallCheck(this, Api);

					http.configure(function (config) {
						config.withBaseUrl('http://localhost/api/');
					});

					this.http = http;
				}

				Api.prototype.createUser = function createUser() {
					var userdata = {
						'name': 'Stefan',
						'json': JSON.stringify({ test: '1' }),
						'email': 's.romeis@gmail.com'
					};
					this.http.fetch('user', {
						method: 'post',
						body: JSON.stringify(userdata)
					}).then(function (data) {
						console.log('Create User Response', data);
					});
				};

				Api.prototype.getUser = function getUser() {
					var userdata = {
						'name': 'Stefan',
						'json': JSON.stringify({ test: '1' }),
						'email': 's.romeis@gmail.com'
					};
					this.http.fetch('user', {
						method: 'post',
						body: JSON.stringify(userdata)
					}).then(function (data) {
						console.log('Create User Response', data);
					});
				};

				Api.prototype.updateUser = function updateUser(UserID, json) {
					var userdata = {
						'name': 'Stefan',
						'json': JSON.stringify({ test: '1' }),
						'email': 's.romeis@gmail.com'
					};
					this.http.fetch('user', {
						method: 'post',
						body: JSON.stringify(userdata)
					}).then(function (data) {
						console.log('Create User Response', data);
					});
				};

				Api.prototype.updateUser = function updateUser(UserID, json) {
					var result = $.ajax({
						type: 'PUT',
						url: 'api/user/' + UserID,
						data: JSON.stringify(json)
					}).responseText;

					return result;
				};

				Api.prototype.getUser = function getUser(UserID) {
					var result = $.ajax({
						type: 'GET',
						url: 'http://localhost/mme/mme2_uebung_4/api/user/124',
						success: function success(data) {
							console.log(data);
							return null;
						},
						error: function error(data) {
							console.log(data);
						}
					}).responseText;

					return result;
				};

				Api.prototype.getAll = function getAll(emailAddress) {
					var result = $.ajax({
						type: 'GET',
						async: false,
						url: 'api/user?email=' + emailAddress
					}).responseText;

					return result;
				};

				Api.prototype.deleteUser = function deleteUser(UserID) {
					var result = $.ajax({
						type: 'DELETE',
						async: false,
						url: 'api/user/' + UserID
					}).responseText;
					return result;
				};

				return Api;
			}()) || _class));

			_export('Api', Api);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2FwaS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiQXBpIiwiaHR0cCIsImNvbmZpZ3VyZSIsImNvbmZpZyIsIndpdGhCYXNlVXJsIiwiY3JlYXRlVXNlciIsInVzZXJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInRlc3QiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJnZXRVc2VyIiwidXBkYXRlVXNlciIsIlVzZXJJRCIsImpzb24iLCJyZXN1bHQiLCIkIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJyZXNwb25zZVRleHQiLCJzdWNjZXNzIiwiZXJyb3IiLCJnZXRBbGwiLCJlbWFpbEFkZHJlc3MiLCJhc3luYyIsImRlbGV0ZVVzZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFRQSxTLHFCQUFBQSxNOztBQUNBQyxhLHVCQUFBQSxVOzs7a0JBR0tDLEcsV0FEWkYsT0FBT0MsVUFBUCxDO0FBR0EsaUJBQVlFLElBQVosRUFBa0I7QUFBQTs7QUFDWEEsVUFBS0MsU0FBTCxDQUFlLGtCQUFVO0FBQ3JCQyxhQUNLQyxXQURMLENBQ2lCLHVCQURqQjtBQUVILE1BSEQ7O0FBS0EsVUFBS0gsSUFBTCxHQUFZQSxJQUFaO0FBRUg7O2tCQUdKSSxVLHlCQUFhO0FBQ1osU0FBSUMsV0FBVztBQUNkLGNBQVEsUUFETTtBQUVkLGNBQVFDLEtBQUtDLFNBQUwsQ0FBZSxFQUFDQyxNQUFNLEdBQVAsRUFBZixDQUZNO0FBR2QsZUFBUztBQUhLLE1BQWY7QUFLQSxVQUFLUixJQUFMLENBQVVTLEtBQVYsQ0FBZ0IsTUFBaEIsRUFBd0I7QUFDdEJDLGNBQVEsTUFEYztBQUV0QkMsWUFBTUwsS0FBS0MsU0FBTCxDQUFlRixRQUFmO0FBRmdCLE1BQXhCLEVBSUVPLElBSkYsQ0FJTyxnQkFBUTtBQUNiQyxjQUFRQyxHQUFSLENBQVksc0JBQVosRUFBb0NDLElBQXBDO0FBQ0EsTUFORjtBQU9BLEs7O2tCQUdEQyxPLHNCQUFVO0FBQ1QsU0FBSVgsV0FBVztBQUNkLGNBQVEsUUFETTtBQUVkLGNBQVFDLEtBQUtDLFNBQUwsQ0FBZSxFQUFDQyxNQUFNLEdBQVAsRUFBZixDQUZNO0FBR2QsZUFBUztBQUhLLE1BQWY7QUFLQSxVQUFLUixJQUFMLENBQVVTLEtBQVYsQ0FBZ0IsTUFBaEIsRUFBd0I7QUFDdEJDLGNBQVEsTUFEYztBQUV0QkMsWUFBTUwsS0FBS0MsU0FBTCxDQUFlRixRQUFmO0FBRmdCLE1BQXhCLEVBSUVPLElBSkYsQ0FJTyxnQkFBUTtBQUNiQyxjQUFRQyxHQUFSLENBQVksc0JBQVosRUFBb0NDLElBQXBDO0FBQ0EsTUFORjtBQU9BLEs7O2tCQUdERSxVLHVCQUFXQyxNLEVBQVFDLEksRUFBTTtBQUN4QixTQUFJZCxXQUFXO0FBQ2QsY0FBUSxRQURNO0FBRWQsY0FBUUMsS0FBS0MsU0FBTCxDQUFlLEVBQUNDLE1BQU0sR0FBUCxFQUFmLENBRk07QUFHZCxlQUFTO0FBSEssTUFBZjtBQUtBLFVBQUtSLElBQUwsQ0FBVVMsS0FBVixDQUFnQixNQUFoQixFQUF3QjtBQUN0QkMsY0FBUSxNQURjO0FBRXRCQyxZQUFNTCxLQUFLQyxTQUFMLENBQWVGLFFBQWY7QUFGZ0IsTUFBeEIsRUFJRU8sSUFKRixDQUlPLGdCQUFRO0FBQ2JDLGNBQVFDLEdBQVIsQ0FBWSxzQkFBWixFQUFvQ0MsSUFBcEM7QUFDQSxNQU5GO0FBT0EsSzs7a0JBR0RFLFUsdUJBQVdDLE0sRUFBUUMsSSxFQUFNO0FBQ3hCLFNBQUlDLFNBQVNDLEVBQUVDLElBQUYsQ0FBTztBQUNuQkMsWUFBTyxLQURZO0FBRW5CQyxXQUFNLGNBQWNOLE1BRkQ7QUFHbkJILFlBQU1ULEtBQUtDLFNBQUwsQ0FBZVksSUFBZjtBQUhhLE1BQVAsRUFJVk0sWUFKSDs7QUFNQSxZQUFPTCxNQUFQO0FBQ0EsSzs7a0JBR0RKLE8sb0JBQVFFLE0sRUFBUTtBQUNmLFNBQUlFLFNBQVNDLEVBQUVDLElBQUYsQ0FBTztBQUNuQkMsWUFBTyxLQURZO0FBRW5CQyxXQUFNLGlEQUZhO0FBR25CRSxlQUFTLGlCQUFTWCxJQUFULEVBQWM7QUFDdEJGLGVBQVFDLEdBQVIsQ0FBWUMsSUFBWjtBQUNBLGNBQU8sSUFBUDtBQUNBLE9BTmtCO0FBT25CWSxhQUFPLGVBQVNaLElBQVQsRUFBZTtBQUNyQkYsZUFBUUMsR0FBUixDQUFZQyxJQUFaO0FBQ0E7QUFUa0IsTUFBUCxFQVVWVSxZQVZIOztBQVlBLFlBQU9MLE1BQVA7QUFDQSxLOztrQkFJRFEsTSxtQkFBT0MsWSxFQUFjO0FBQ3BCLFNBQUlULFNBQVNDLEVBQUVDLElBQUYsQ0FBTztBQUNuQkMsWUFBTyxLQURZO0FBRW5CTyxhQUFRLEtBRlc7QUFHbkJOLFdBQU0sb0JBQW9CSztBQUhQLE1BQVAsRUFJVkosWUFKSDs7QUFNQSxZQUFPTCxNQUFQO0FBQ0EsSzs7a0JBR0RXLFUsdUJBQVdiLE0sRUFBUTtBQUNsQixTQUFJRSxTQUFTQyxFQUFFQyxJQUFGLENBQU87QUFDbkJDLFlBQU8sUUFEWTtBQUVuQk8sYUFBUSxLQUZXO0FBR25CTixXQUFNLGNBQWNOO0FBSEQsTUFBUCxFQUlWTyxZQUpIO0FBS0EsWUFBT0wsTUFBUDtBQUNBLEsiLCJmaWxlIjoic2VydmljZXMvYXBpLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
