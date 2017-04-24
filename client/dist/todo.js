'use strict';

System.register(['aurelia-framework', 'todo-item', 'aurelia-dialog', 'aurelia-binding', 'prompt', 'services/authConfig', 'services/keycodes', 'underscore'], function (_export, _context) {
	"use strict";

	var inject, TodoItem, DialogService, ObserverLocator, Prompt, config, keys, _, _dec, _class, Todo;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}, function (_todoItem) {
			TodoItem = _todoItem.TodoItem;
		}, function (_aureliaDialog) {
			DialogService = _aureliaDialog.DialogService;
		}, function (_aureliaBinding) {
			ObserverLocator = _aureliaBinding.ObserverLocator;
		}, function (_prompt) {
			Prompt = _prompt.Prompt;
		}, function (_servicesAuthConfig) {
			config = _servicesAuthConfig.default;
		}, function (_servicesKeycodes) {
			keys = _servicesKeycodes.default;
		}, function (_underscore) {
			_ = _underscore.default;
		}],
		execute: function () {
			_export('Todo', Todo = (_dec = inject(DialogService, ObserverLocator), _dec(_class = function () {
				function Todo(DialogService, ObserverLocator) {
					_classCallCheck(this, Todo);

					this.dialogService = DialogService;
					this.observerLocator = ObserverLocator;
					this.api = config.providers.contrlOne.api;
					this.items = [];
					this.newTodoTitle = null;
					this.openModal = false;
					this.loginModalOpen = false;
				}

				Todo.prototype.attached = function attached() {
					if (localStorage.getItem('user') && localStorage.getItem('contrl.one.token')) {
						this.get();
					}
				};

				Todo.prototype.onKeyUp = function onKeyUp(ev) {
					if (ev.keyCode === keys.ENTER && this.openModal) {
						this.addNewTodo(this.newTodoTitle);
					}
					if (ev.keyCode === keys.ESC && this.openModal) {
						this.openModal = false;
					}
					if (ev.keyCode === keys.ENTER && this.loginModalOpen) {
						this.signUp();
					}
				};

				Todo.prototype.addNewTodo = function addNewTodo(title) {
					if (title == undefined) {
						return;
					}
					title = title.trim();
					if (title.length === 0) {
						return;
					}

					var newTodoItem = new TodoItem(title);
					this.observeItem(newTodoItem);
					this.items.push(newTodoItem);
					this.newTodoTitle = null;
					this.save();
					this.openDialog("Entry created!");
				};

				Todo.prototype.observeItem = function observeItem(todoItem) {
					var _this = this;

					this.observerLocator.getObserver(todoItem, 'title').subscribe(function (o, n) {
						return _this.onTitleChanged(todoItem);
					});

					this.observerLocator.getObserver(todoItem, 'isCompleted').subscribe(function () {
						return _this.onIsCompletedChanged();
					});
				};

				Todo.prototype.onTitleChanged = function onTitleChanged(todoItem) {
					if (todoItem.title === '') {
						this.deleteTodo(todoItem);
					}
					this.save();
				};

				Todo.prototype.onIsCompletedChanged = function onIsCompletedChanged() {
					this.save();
				};

				Todo.prototype.deleteTodo = function deleteTodo(todoItem) {
					this.items = _(this.items).without(todoItem);
					this.save();
				};

				Todo.prototype.load = function load(data) {
					var _this2 = this;

					var storageContent = data;
					if (storageContent == undefined) {
						return;
					}

					var simpleItems = JSON.parse(storageContent);
					this.items = _.map(simpleItems, function (item) {
						var todoItem = new TodoItem(item.title);
						todoItem.isCompleted = item.completed;
						_this2.observeItem(todoItem);
						return todoItem;
					});
				};

				Todo.prototype.get = function get() {
					var self = this;
					$.ajax({
						type: "GET",
						url: this.api + '/todo',
						headers: {
							"Authorization": 'Bearer ' + localStorage.getItem('contrl.one.token')
						},
						data: {
							'email': localStorage.getItem('user')
						}
					}).done(function (res) {
						console.log('ToDoListGet Success', res);
						self.connected = true;
						if (res.todoData) {
							self.load(res.todoData);
						}
					}).fail(function (err) {
						console.log('Error', err);
						if (err.responseText) {
							if (err.responseText.includes("jwt expired")) {}
						}
						self.connected = false;
					});
				};

				Todo.prototype.save = function save() {
					var simpleItems = _.map(this.items, function (item) {
						return {
							title: item.title,
							completed: item.isCompleted
						};
					});

					var self = this;
					$.ajax({
						type: "POST",
						url: this.api + '/todo',
						headers: {
							"Authorization": 'Bearer ' + localStorage.getItem('contrl.one.token')
						},
						data: {
							'email': localStorage.getItem('user'),
							'todoData': JSON.stringify(simpleItems)
						}
					}).done(function (res) {
						console.log('Success', res);
					}).fail(function (err) {
						console.log('Error', err);
						if (err.responseText) {
							if (err.responseText.includes("jwt expired")) {
								self.connected = false;
							}
						}
						self.connected = false;
					});
				};

				Todo.prototype.signUp = function signUp() {
					var self = this;
					$.ajax({
						type: "POST",
						url: this.api + "/users",
						data: {
							'email': this.email,
							'password': this.password
						}
					}).done(function (res) {
						console.log('Success', res);
						self.connected = true;
						self.loginModalOpen = false;
						localStorage.setItem('contrl.one.token', res.id_token);
						localStorage.setItem('user', self.email);
						self.get();
					}).fail(function (err) {
						if (err.status == 401) {
							self.login();
							return;
						}
						console.log('Error', err);
					});
				};

				Todo.prototype.login = function login() {
					var self = this;
					$.ajax({
						type: "POST",
						url: this.api + "/sessions/create",
						data: {
							'email': this.email,
							'password': this.password
						}
					}).done(function (res) {
						console.log('Logged in', res);
						self.connected = true;
						self.loginModalOpen = false;
						localStorage.setItem('contrl.one.token', res.id_token);
						localStorage.setItem('user', self.email);
						self.get();
					}).fail(function (err) {
						console.log('Error', err);
					});
				};

				Todo.prototype.logout = function logout() {
					localStorage.removeItem('contrl.one.token');
					localStorage.removeItem('user');
					this.connected = false;
					this.items = [];
				};

				Todo.prototype.openDialog = function openDialog(model) {
					this.dialogService.open({ viewModel: Prompt, model: model });
				};

				return Todo;
			}()) || _class));

			_export('Todo', Todo);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8uanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiVG9kb0l0ZW0iLCJEaWFsb2dTZXJ2aWNlIiwiT2JzZXJ2ZXJMb2NhdG9yIiwiUHJvbXB0IiwiY29uZmlnIiwia2V5cyIsIl8iLCJUb2RvIiwiZGlhbG9nU2VydmljZSIsIm9ic2VydmVyTG9jYXRvciIsImFwaSIsInByb3ZpZGVycyIsImNvbnRybE9uZSIsIml0ZW1zIiwibmV3VG9kb1RpdGxlIiwib3Blbk1vZGFsIiwibG9naW5Nb2RhbE9wZW4iLCJhdHRhY2hlZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJnZXQiLCJvbktleVVwIiwiZXYiLCJrZXlDb2RlIiwiRU5URVIiLCJhZGROZXdUb2RvIiwiRVNDIiwic2lnblVwIiwidGl0bGUiLCJ1bmRlZmluZWQiLCJ0cmltIiwibGVuZ3RoIiwibmV3VG9kb0l0ZW0iLCJvYnNlcnZlSXRlbSIsInB1c2giLCJzYXZlIiwib3BlbkRpYWxvZyIsInRvZG9JdGVtIiwiZ2V0T2JzZXJ2ZXIiLCJzdWJzY3JpYmUiLCJvIiwibiIsIm9uVGl0bGVDaGFuZ2VkIiwib25Jc0NvbXBsZXRlZENoYW5nZWQiLCJkZWxldGVUb2RvIiwid2l0aG91dCIsImxvYWQiLCJkYXRhIiwic3RvcmFnZUNvbnRlbnQiLCJzaW1wbGVJdGVtcyIsIkpTT04iLCJwYXJzZSIsIm1hcCIsIml0ZW0iLCJpc0NvbXBsZXRlZCIsImNvbXBsZXRlZCIsInNlbGYiLCIkIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJoZWFkZXJzIiwiZG9uZSIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJjb25uZWN0ZWQiLCJ0b2RvRGF0YSIsImZhaWwiLCJlcnIiLCJyZXNwb25zZVRleHQiLCJpbmNsdWRlcyIsInN0cmluZ2lmeSIsImVtYWlsIiwicGFzc3dvcmQiLCJzZXRJdGVtIiwiaWRfdG9rZW4iLCJzdGF0dXMiLCJsb2dpbiIsImxvZ291dCIsInJlbW92ZUl0ZW0iLCJtb2RlbCIsIm9wZW4iLCJ2aWV3TW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFTQSxTLHFCQUFBQSxNOztBQUNBQyxXLGFBQUFBLFE7O0FBQ0FDLGdCLGtCQUFBQSxhOztBQUNBQyxrQixtQkFBQUEsZTs7QUFDQUMsUyxXQUFBQSxNOztBQUNGQyxTOztBQUNBQyxPOztBQUNBQyxJOzs7bUJBR01DLEksV0FEWlIsT0FBT0UsYUFBUCxFQUFzQkMsZUFBdEIsQztBQUVBLGtCQUFZRCxhQUFaLEVBQTJCQyxlQUEzQixFQUE0QztBQUFBOztBQUMzQyxVQUFLTSxhQUFMLEdBQXFCUCxhQUFyQjtBQUNBLFVBQUtRLGVBQUwsR0FBdUJQLGVBQXZCO0FBQ0EsVUFBS1EsR0FBTCxHQUFXTixPQUFPTyxTQUFQLENBQWlCQyxTQUFqQixDQUEyQkYsR0FBdEM7QUFDQSxVQUFLRyxLQUFMLEdBQWEsRUFBYjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxVQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsVUFBS0MsY0FBTCxHQUFzQixLQUF0QjtBQUNBOzttQkFFREMsUSx1QkFBVztBQUNWLFNBQUlDLGFBQWFDLE9BQWIsQ0FBcUIsTUFBckIsS0FBZ0NELGFBQWFDLE9BQWIsQ0FBcUIsa0JBQXJCLENBQXBDLEVBQThFO0FBQzdFLFdBQUtDLEdBQUw7QUFDQTtBQUNELEs7O21CQUVEQyxPLG9CQUFRQyxFLEVBQUk7QUFDWCxTQUFJQSxHQUFHQyxPQUFILEtBQWVsQixLQUFLbUIsS0FBcEIsSUFBNkIsS0FBS1QsU0FBdEMsRUFBaUQ7QUFDaEQsV0FBS1UsVUFBTCxDQUFnQixLQUFLWCxZQUFyQjtBQUNBO0FBQ0QsU0FBSVEsR0FBR0MsT0FBSCxLQUFlbEIsS0FBS3FCLEdBQXBCLElBQTJCLEtBQUtYLFNBQXBDLEVBQStDO0FBQzlDLFdBQUtBLFNBQUwsR0FBaUIsS0FBakI7QUFDQTtBQUNELFNBQUlPLEdBQUdDLE9BQUgsS0FBZWxCLEtBQUttQixLQUFwQixJQUE2QixLQUFLUixjQUF0QyxFQUFzRDtBQUNyRCxXQUFLVyxNQUFMO0FBQ0E7QUFDRCxLOzttQkFFREYsVSx1QkFBV0csSyxFQUFPO0FBQ2pCLFNBQUlBLFNBQVNDLFNBQWIsRUFBd0I7QUFBRTtBQUFTO0FBQ25DRCxhQUFRQSxNQUFNRSxJQUFOLEVBQVI7QUFDQSxTQUFJRixNQUFNRyxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQUU7QUFBUzs7QUFFbkMsU0FBTUMsY0FBYyxJQUFJaEMsUUFBSixDQUFhNEIsS0FBYixDQUFwQjtBQUNBLFVBQUtLLFdBQUwsQ0FBaUJELFdBQWpCO0FBQ0EsVUFBS25CLEtBQUwsQ0FBV3FCLElBQVgsQ0FBZ0JGLFdBQWhCO0FBQ0EsVUFBS2xCLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxVQUFLcUIsSUFBTDtBQUNBLFVBQUtDLFVBQUwsQ0FBZ0IsZ0JBQWhCO0FBRUEsSzs7bUJBRURILFcsd0JBQVlJLFEsRUFBVTtBQUFBOztBQUNyQixVQUFLNUIsZUFBTCxDQUNFNkIsV0FERixDQUNjRCxRQURkLEVBQ3dCLE9BRHhCLEVBRUVFLFNBRkYsQ0FFWSxVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxhQUFVLE1BQUtDLGNBQUwsQ0FBb0JMLFFBQXBCLENBQVY7QUFBQSxNQUZaOztBQUlBLFVBQUs1QixlQUFMLENBQ0U2QixXQURGLENBQ2NELFFBRGQsRUFDd0IsYUFEeEIsRUFFRUUsU0FGRixDQUVZO0FBQUEsYUFBTSxNQUFLSSxvQkFBTCxFQUFOO0FBQUEsTUFGWjtBQUdBLEs7O21CQUVERCxjLDJCQUFlTCxRLEVBQVU7QUFDeEIsU0FBSUEsU0FBU1QsS0FBVCxLQUFtQixFQUF2QixFQUEyQjtBQUMxQixXQUFLZ0IsVUFBTCxDQUFnQlAsUUFBaEI7QUFDQTtBQUNELFVBQUtGLElBQUw7QUFDQSxLOzttQkFFRFEsb0IsbUNBQXVCO0FBQ3RCLFVBQUtSLElBQUw7QUFDQSxLOzttQkFFRFMsVSx1QkFBV1AsUSxFQUFVO0FBQ3BCLFVBQUt4QixLQUFMLEdBQWFQLEVBQUUsS0FBS08sS0FBUCxFQUFjZ0MsT0FBZCxDQUFzQlIsUUFBdEIsQ0FBYjtBQUNBLFVBQUtGLElBQUw7QUFDQSxLOzttQkFFRFcsSSxpQkFBS0MsSSxFQUFNO0FBQUE7O0FBQ1YsU0FBSUMsaUJBQWlCRCxJQUFyQjtBQUNBLFNBQUlDLGtCQUFrQm5CLFNBQXRCLEVBQWlDO0FBQUU7QUFBUzs7QUFFNUMsU0FBTW9CLGNBQWNDLEtBQUtDLEtBQUwsQ0FBV0gsY0FBWCxDQUFwQjtBQUNBLFVBQUtuQyxLQUFMLEdBQWFQLEVBQUU4QyxHQUFGLENBQU1ILFdBQU4sRUFBbUIsZ0JBQVE7QUFDdkMsVUFBTVosV0FBVyxJQUFJckMsUUFBSixDQUFhcUQsS0FBS3pCLEtBQWxCLENBQWpCO0FBQ0FTLGVBQVNpQixXQUFULEdBQXVCRCxLQUFLRSxTQUE1QjtBQUNBLGFBQUt0QixXQUFMLENBQWlCSSxRQUFqQjtBQUNBLGFBQU9BLFFBQVA7QUFDQSxNQUxZLENBQWI7QUFNQSxLOzttQkFFRGpCLEcsa0JBQU07QUFDTCxTQUFNb0MsT0FBTyxJQUFiO0FBQ0FDLE9BQUVDLElBQUYsQ0FBTztBQUNOQyxZQUFNLEtBREE7QUFFTkMsV0FBSyxLQUFLbEQsR0FBTCxHQUFXLE9BRlY7QUFHTm1ELGVBQVM7QUFDUix3QkFBaUIsWUFBWTNDLGFBQWFDLE9BQWIsQ0FBcUIsa0JBQXJCO0FBRHJCLE9BSEg7QUFNTjRCLFlBQU07QUFDTCxnQkFBUzdCLGFBQWFDLE9BQWIsQ0FBcUIsTUFBckI7QUFESjtBQU5BLE1BQVAsRUFTRzJDLElBVEgsQ0FTUSxVQUFVQyxHQUFWLEVBQWU7QUFDdEJDLGNBQVFDLEdBQVIsQ0FBWSxxQkFBWixFQUFtQ0YsR0FBbkM7QUFDQVAsV0FBS1UsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFVBQUlILElBQUlJLFFBQVIsRUFBa0I7QUFDakJYLFlBQUtWLElBQUwsQ0FBVWlCLElBQUlJLFFBQWQ7QUFDQTtBQUNELE1BZkQsRUFlR0MsSUFmSCxDQWVRLFVBQVVDLEdBQVYsRUFBZTtBQUN0QkwsY0FBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJJLEdBQXJCO0FBQ0EsVUFBSUEsSUFBSUMsWUFBUixFQUFzQjtBQUNyQixXQUFJRCxJQUFJQyxZQUFKLENBQWlCQyxRQUFqQixDQUEwQixhQUExQixDQUFKLEVBQThDLENBQzdDO0FBQ0Q7QUFDRGYsV0FBS1UsU0FBTCxHQUFpQixLQUFqQjtBQUNBLE1BdEJEO0FBdUJBLEs7O21CQUVEL0IsSSxtQkFBTztBQUNOLFNBQU1jLGNBQWMzQyxFQUFFOEMsR0FBRixDQUFNLEtBQUt2QyxLQUFYLEVBQWtCLGdCQUFRO0FBQzdDLGFBQU87QUFDTmUsY0FBT3lCLEtBQUt6QixLQUROO0FBRU4yQixrQkFBV0YsS0FBS0M7QUFGVixPQUFQO0FBSUEsTUFMbUIsQ0FBcEI7O0FBT0EsU0FBTUUsT0FBTyxJQUFiO0FBQ0FDLE9BQUVDLElBQUYsQ0FBTztBQUNOQyxZQUFNLE1BREE7QUFFTkMsV0FBSyxLQUFLbEQsR0FBTCxHQUFXLE9BRlY7QUFHTm1ELGVBQVM7QUFDUix3QkFBaUIsWUFBWTNDLGFBQWFDLE9BQWIsQ0FBcUIsa0JBQXJCO0FBRHJCLE9BSEg7QUFNTjRCLFlBQU07QUFDTCxnQkFBUzdCLGFBQWFDLE9BQWIsQ0FBcUIsTUFBckIsQ0FESjtBQUVMLG1CQUFZK0IsS0FBS3NCLFNBQUwsQ0FBZXZCLFdBQWY7QUFGUDtBQU5BLE1BQVAsRUFVR2EsSUFWSCxDQVVRLFVBQVVDLEdBQVYsRUFBZTtBQUN0QkMsY0FBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJGLEdBQXZCO0FBQ0EsTUFaRCxFQVlHSyxJQVpILENBWVEsVUFBVUMsR0FBVixFQUFlO0FBQ3RCTCxjQUFRQyxHQUFSLENBQVksT0FBWixFQUFxQkksR0FBckI7QUFDQSxVQUFJQSxJQUFJQyxZQUFSLEVBQXNCO0FBQ3JCLFdBQUlELElBQUlDLFlBQUosQ0FBaUJDLFFBQWpCLENBQTBCLGFBQTFCLENBQUosRUFBOEM7QUFDN0NmLGFBQUtVLFNBQUwsR0FBaUIsS0FBakI7QUFDQTtBQUNEO0FBQ0RWLFdBQUtVLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxNQXBCRDtBQXFCQSxLOzttQkFHRHZDLE0scUJBQVM7QUFDUixTQUFNNkIsT0FBTyxJQUFiO0FBQ0FDLE9BQUVDLElBQUYsQ0FBTztBQUNOQyxZQUFNLE1BREE7QUFFTkMsV0FBSyxLQUFLbEQsR0FBTCxHQUFXLFFBRlY7QUFHTnFDLFlBQU07QUFDTCxnQkFBUyxLQUFLMEIsS0FEVDtBQUVMLG1CQUFZLEtBQUtDO0FBRlo7QUFIQSxNQUFQLEVBT0daLElBUEgsQ0FPUSxVQUFVQyxHQUFWLEVBQWU7QUFDdEJDLGNBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCRixHQUF2QjtBQUNBUCxXQUFLVSxTQUFMLEdBQWlCLElBQWpCO0FBQ0FWLFdBQUt4QyxjQUFMLEdBQXNCLEtBQXRCO0FBQ0FFLG1CQUFheUQsT0FBYixDQUFxQixrQkFBckIsRUFBeUNaLElBQUlhLFFBQTdDO0FBQ0ExRCxtQkFBYXlELE9BQWIsQ0FBcUIsTUFBckIsRUFBNkJuQixLQUFLaUIsS0FBbEM7QUFDQWpCLFdBQUtwQyxHQUFMO0FBQ0EsTUFkRCxFQWNHZ0QsSUFkSCxDQWNRLFVBQVVDLEdBQVYsRUFBZTtBQUN0QixVQUFJQSxJQUFJUSxNQUFKLElBQWMsR0FBbEIsRUFBdUI7QUFDdEJyQixZQUFLc0IsS0FBTDtBQUNBO0FBQ0E7QUFDRGQsY0FBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJJLEdBQXJCO0FBQ0EsTUFwQkQ7QUFxQkEsSzs7bUJBRURTLEssb0JBQVE7QUFDUCxTQUFNdEIsT0FBTyxJQUFiO0FBQ0FDLE9BQUVDLElBQUYsQ0FBTztBQUNOQyxZQUFNLE1BREE7QUFFTkMsV0FBSyxLQUFLbEQsR0FBTCxHQUFXLGtCQUZWO0FBR05xQyxZQUFNO0FBQ0wsZ0JBQVMsS0FBSzBCLEtBRFQ7QUFFTCxtQkFBWSxLQUFLQztBQUZaO0FBSEEsTUFBUCxFQU9HWixJQVBILENBT1EsVUFBVUMsR0FBVixFQUFlO0FBQ3RCQyxjQUFRQyxHQUFSLENBQVksV0FBWixFQUF5QkYsR0FBekI7QUFDQVAsV0FBS1UsU0FBTCxHQUFpQixJQUFqQjtBQUNBVixXQUFLeEMsY0FBTCxHQUFzQixLQUF0QjtBQUNBRSxtQkFBYXlELE9BQWIsQ0FBcUIsa0JBQXJCLEVBQXlDWixJQUFJYSxRQUE3QztBQUNBMUQsbUJBQWF5RCxPQUFiLENBQXFCLE1BQXJCLEVBQTZCbkIsS0FBS2lCLEtBQWxDO0FBQ0FqQixXQUFLcEMsR0FBTDtBQUNBLE1BZEQsRUFjR2dELElBZEgsQ0FjUSxVQUFVQyxHQUFWLEVBQWU7QUFDdEJMLGNBQVFDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCSSxHQUFyQjtBQUNBLE1BaEJEO0FBaUJBLEs7O21CQUVEVSxNLHFCQUFTO0FBQ1I3RCxrQkFBYThELFVBQWIsQ0FBd0Isa0JBQXhCO0FBQ0E5RCxrQkFBYThELFVBQWIsQ0FBd0IsTUFBeEI7QUFDQSxVQUFLZCxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsVUFBS3JELEtBQUwsR0FBYSxFQUFiO0FBQ0EsSzs7bUJBRUR1QixVLHVCQUFXNkMsSyxFQUFPO0FBQ2pCLFVBQUt6RSxhQUFMLENBQW1CMEUsSUFBbkIsQ0FBd0IsRUFBRUMsV0FBV2hGLE1BQWIsRUFBcUI4RSxPQUFPQSxLQUE1QixFQUF4QjtBQUNBLEsiLCJmaWxlIjoidG9kby5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
