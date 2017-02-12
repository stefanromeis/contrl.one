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

					this.http = http;
				}

				Api.prototype.createUser = function createUser(json) {
					var result = "default";

					result = $.ajax({
						type: 'POST',
						async: false,
						url: 'api/user',
						data: JSON.stringify(json)
					}).responseText;

					return result;
				};

				Api.prototype.updateUser = function updateUser(UserID, json) {
					var result = $.ajax({
						type: 'PUT',
						async: false,
						url: 'api/user/' + UserID,
						data: JSON.stringify(json)
					}).responseText;

					return result;
				};

				Api.prototype.getUser = function getUser(UserID) {
					var result = $.ajax({
						type: 'GET',
						async: false,
						url: 'api/user/' + UserID,
						success: function success(data) {
							return null;
						},
						error: function error(data) {
							alert('ID ' + UserID + ' not found');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2FwaS5qcyJdLCJuYW1lcyI6WyJpbmplY3QiLCJIdHRwQ2xpZW50IiwiQXBpIiwiaHR0cCIsImNyZWF0ZVVzZXIiLCJqc29uIiwicmVzdWx0IiwiJCIsImFqYXgiLCJ0eXBlIiwiYXN5bmMiLCJ1cmwiLCJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlVGV4dCIsInVwZGF0ZVVzZXIiLCJVc2VySUQiLCJnZXRVc2VyIiwic3VjY2VzcyIsImVycm9yIiwiYWxlcnQiLCJnZXRBbGwiLCJlbWFpbEFkZHJlc3MiLCJkZWxldGVVc2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBUUEsUyxxQkFBQUEsTTs7QUFDQUMsYSx1QkFBQUEsVTs7O2tCQUdLQyxHLFdBRFpGLE9BQU9DLFVBQVAsQztBQUVBLGlCQUFZRSxJQUFaLEVBQWlCO0FBQUE7O0FBQ2hCLFVBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBOztrQkFHREMsVSx1QkFBV0MsSSxFQUFNO0FBQ2hCLFNBQUlDLFNBQVMsU0FBYjs7QUFFQUEsY0FBU0MsRUFBRUMsSUFBRixDQUFPO0FBQ2ZDLFlBQU8sTUFEUTtBQUVmQyxhQUFRLEtBRk87QUFHZkMsV0FBTSxVQUhTO0FBSWZDLFlBQU1DLEtBQUtDLFNBQUwsQ0FBZVQsSUFBZjtBQUpTLE1BQVAsRUFLTlUsWUFMSDs7QUFPQSxZQUFPVCxNQUFQO0FBQ0EsSzs7a0JBR0RVLFUsdUJBQVdDLE0sRUFBUVosSSxFQUFNO0FBQ3hCLFNBQUlDLFNBQVNDLEVBQUVDLElBQUYsQ0FBTztBQUNuQkMsWUFBTyxLQURZO0FBRW5CQyxhQUFRLEtBRlc7QUFHbkJDLFdBQU0sY0FBY00sTUFIRDtBQUluQkwsWUFBTUMsS0FBS0MsU0FBTCxDQUFlVCxJQUFmO0FBSmEsTUFBUCxFQUtWVSxZQUxIOztBQU9BLFlBQU9ULE1BQVA7QUFDQSxLOztrQkFHRFksTyxvQkFBUUQsTSxFQUFRO0FBQ2YsU0FBSVgsU0FBU0MsRUFBRUMsSUFBRixDQUFPO0FBQ25CQyxZQUFPLEtBRFk7QUFFbkJDLGFBQVEsS0FGVztBQUduQkMsV0FBTSxjQUFjTSxNQUhEO0FBSW5CRSxlQUFTLGlCQUFTUCxJQUFULEVBQWM7QUFDdEIsY0FBTyxJQUFQO0FBQ0EsT0FOa0I7QUFPbkJRLGFBQU8sZUFBU1IsSUFBVCxFQUFlO0FBQ3JCUyxhQUFNLFFBQU1KLE1BQU4sR0FBYSxZQUFuQjtBQUNBO0FBVGtCLE1BQVAsRUFVVkYsWUFWSDs7QUFZQSxZQUFPVCxNQUFQO0FBQ0EsSzs7a0JBR0RnQixNLG1CQUFPQyxZLEVBQWM7QUFDcEIsU0FBSWpCLFNBQVNDLEVBQUVDLElBQUYsQ0FBTztBQUNuQkMsWUFBTyxLQURZO0FBRW5CQyxhQUFRLEtBRlc7QUFHbkJDLFdBQU0sb0JBQW9CWTtBQUhQLE1BQVAsRUFJVlIsWUFKSDs7QUFNQSxZQUFPVCxNQUFQO0FBQ0EsSzs7a0JBR0RrQixVLHVCQUFXUCxNLEVBQVE7QUFDbEIsU0FBSVgsU0FBU0MsRUFBRUMsSUFBRixDQUFPO0FBQ25CQyxZQUFPLFFBRFk7QUFFbkJDLGFBQVEsS0FGVztBQUduQkMsV0FBTSxjQUFjTTtBQUhELE1BQVAsRUFJVkYsWUFKSDtBQUtBLFlBQU9ULE1BQVA7QUFDQSxLIiwiZmlsZSI6InNlcnZpY2VzL2FwaS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
