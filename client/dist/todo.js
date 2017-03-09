'use strict';

System.register(['aurelia-framework', 'aurelia-dialog', 'prompt', 'aurelia-binding', './todo-item', 'underscore'], function (_export, _context) {
	"use strict";

	var inject, DialogService, Prompt, ObserverLocator, TodoItem, _, _dec, _class, STORAGE_NAME, ENTER_KEY, Todo;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}, function (_aureliaDialog) {
			DialogService = _aureliaDialog.DialogService;
		}, function (_prompt) {
			Prompt = _prompt.Prompt;
		}, function (_aureliaBinding) {
			ObserverLocator = _aureliaBinding.ObserverLocator;
		}, function (_todoItem) {
			TodoItem = _todoItem.TodoItem;
		}, function (_underscore) {
			_ = _underscore.default;
		}],
		execute: function () {
			STORAGE_NAME = 'todomvc-aurelia';
			ENTER_KEY = 13;

			_export('Todo', Todo = (_dec = inject(DialogService, ObserverLocator), _dec(_class = function () {
				function Todo(DialogService, observerLocator) {
					var storage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

					_classCallCheck(this, Todo);

					this.dialogService = DialogService;

					this.connected = localStorage.getItem('contrl.one.token') || false;
					this.isLoading = false;
					this.calData = [];
					this.modalOpen = false;
					this.loginModalOpen = false;

					this.api = 'http://localhost:3001/';

					this.items = [];
					this.filteredItems = [];
					this.filter = '';
					this.newTodoTitle = null;
					this.areAllChecked = false;

					this.observerLocator = observerLocator;
					this.storage = storage || localStorage;
					if (localStorage.getItem('user') && localStorage.getItem('contrl.one.token')) {
						this.get();
					}
				}

				Todo.prototype.activate = function activate(params) {
					this.updateFilteredItems(params.filter);
				};

				Todo.prototype.onKeyUp = function onKeyUp(ev) {
					if (ev.keyCode === ENTER_KEY && this.modalOpen) {
						this.addNewTodo(this.newTodoTitle);
					}
					if (ev.keyCode === ENTER_KEY && this.loginModalOpen) {
						this.signUp();
					}
				};

				Todo.prototype.addNewTodo = function addNewTodo() {
					var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.newTodoTitle;

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
					this.updateAreAllCheckedState();
					this.updateFilteredItems(this.filter);
					this.save();
				};

				Todo.prototype.updateAreAllCheckedState = function updateAreAllCheckedState() {
					this.areAllChecked = _(this.items).all(function (i) {
						return i.isCompleted;
					});
				};

				Todo.prototype.updateFilteredItems = function updateFilteredItems(filter) {
					this.filter = filter || '!';

					switch (filter) {
						case 'active':
							this.filteredItems = _(this.items).filter(function (i) {
								return !i.isCompleted;
							});
							break;
						case 'completed':
							this.filteredItems = _(this.items).filter(function (i) {
								return i.isCompleted;
							});
							break;
						default:
							this.filteredItems = this.items;
							break;
					}
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
						this.updateAreAllCheckedState();
					}

					this.save();
				};

				Todo.prototype.onIsCompletedChanged = function onIsCompletedChanged() {
					this.updateAreAllCheckedState();
					this.updateFilteredItems(this.filter);

					this.save();
				};

				Todo.prototype.deleteTodo = function deleteTodo(todoItem) {
					this.items = _(this.items).without(todoItem);
					this.updateAreAllCheckedState();
					this.updateFilteredItems(this.filter);
					this.save();
				};

				Todo.prototype.onToggleAllChanged = function onToggleAllChanged() {
					var _this2 = this;

					this.items = _.map(this.items, function (item) {
						item.isCompleted = _this2.areAllChecked;
						return item;
					});

					this.updateFilteredItems(this.filter);
				};

				Todo.prototype.clearCompletedTodos = function clearCompletedTodos() {
					this.items = _(this.items).filter(function (i) {
						return !i.isCompleted;
					});
					this.areAllChecked = false;
					this.updateFilteredItems(this.filter);
					this.save();
				};

				Todo.prototype.load = function load(data) {
					var _this3 = this;

					var storageContent = data;
					if (storageContent == undefined) {
						return;
					}

					var simpleItems = JSON.parse(storageContent);
					this.items = _.map(simpleItems, function (item) {
						var todoItem = new TodoItem(item.title);
						todoItem.isCompleted = item.completed;

						_this3.observeItem(todoItem);

						return todoItem;
					});
					this.updateAreAllCheckedState();
				};

				Todo.prototype.get = function get() {

					var self = this;
					$.ajax({
						type: "GET",
						url: this.api + 'todo/get',
						headers: {
							"Authorization": 'Bearer ' + localStorage.getItem('contrl.one.token')
						},
						data: {
							'email': localStorage.getItem('user')
						}
					}).done(function (res) {
						console.log('ToDoListGet Success', res);
						self.load(res.todoData);
					}).fail(function (err) {
						console.log('Error', err);
						if (err.responseText) {
							if (err.responseText.includes("jwt expired")) {
								self.connected = false;
							}
						}
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
						url: this.api + 'todo/save',
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
					});
				};

				Todo.prototype.signUp = function signUp() {
					var self = this;
					$.ajax({
						type: "POST",
						url: this.api + "users",
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
						url: this.api + "sessions/create",
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

				return Todo;
			}()) || _class));

			_export('Todo', Todo);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8uanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiRGlhbG9nU2VydmljZSIsIlByb21wdCIsIk9ic2VydmVyTG9jYXRvciIsIlRvZG9JdGVtIiwiXyIsIlNUT1JBR0VfTkFNRSIsIkVOVEVSX0tFWSIsIlRvZG8iLCJvYnNlcnZlckxvY2F0b3IiLCJzdG9yYWdlIiwiZGlhbG9nU2VydmljZSIsImNvbm5lY3RlZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJpc0xvYWRpbmciLCJjYWxEYXRhIiwibW9kYWxPcGVuIiwibG9naW5Nb2RhbE9wZW4iLCJhcGkiLCJpdGVtcyIsImZpbHRlcmVkSXRlbXMiLCJmaWx0ZXIiLCJuZXdUb2RvVGl0bGUiLCJhcmVBbGxDaGVja2VkIiwiZ2V0IiwiYWN0aXZhdGUiLCJwYXJhbXMiLCJ1cGRhdGVGaWx0ZXJlZEl0ZW1zIiwib25LZXlVcCIsImV2Iiwia2V5Q29kZSIsImFkZE5ld1RvZG8iLCJzaWduVXAiLCJ0aXRsZSIsInVuZGVmaW5lZCIsInRyaW0iLCJsZW5ndGgiLCJuZXdUb2RvSXRlbSIsIm9ic2VydmVJdGVtIiwicHVzaCIsInVwZGF0ZUFyZUFsbENoZWNrZWRTdGF0ZSIsInNhdmUiLCJhbGwiLCJpIiwiaXNDb21wbGV0ZWQiLCJ0b2RvSXRlbSIsImdldE9ic2VydmVyIiwic3Vic2NyaWJlIiwibyIsIm4iLCJvblRpdGxlQ2hhbmdlZCIsIm9uSXNDb21wbGV0ZWRDaGFuZ2VkIiwiZGVsZXRlVG9kbyIsIndpdGhvdXQiLCJvblRvZ2dsZUFsbENoYW5nZWQiLCJtYXAiLCJpdGVtIiwiY2xlYXJDb21wbGV0ZWRUb2RvcyIsImxvYWQiLCJkYXRhIiwic3RvcmFnZUNvbnRlbnQiLCJzaW1wbGVJdGVtcyIsIkpTT04iLCJwYXJzZSIsImNvbXBsZXRlZCIsInNlbGYiLCIkIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJoZWFkZXJzIiwiZG9uZSIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJ0b2RvRGF0YSIsImZhaWwiLCJlcnIiLCJyZXNwb25zZVRleHQiLCJpbmNsdWRlcyIsInN0cmluZ2lmeSIsImVtYWlsIiwicGFzc3dvcmQiLCJzZXRJdGVtIiwiaWRfdG9rZW4iLCJzdGF0dXMiLCJsb2dpbiIsImxvZ291dCIsInJlbW92ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFTQSxTLHFCQUFBQSxNOztBQUNBQyxnQixrQkFBQUEsYTs7QUFDQUMsUyxXQUFBQSxNOztBQUNBQyxrQixtQkFBQUEsZTs7QUFDQUMsVyxhQUFBQSxROztBQUNGQyxJOzs7QUFFREMsZSxHQUFlLGlCO0FBQ2ZDLFksR0FBWSxFOzttQkFHTEMsSSxXQURaUixPQUFPQyxhQUFQLEVBQXNCRSxlQUF0QixDO0FBRUEsa0JBQVlGLGFBQVosRUFBMkJRLGVBQTNCLEVBQTREO0FBQUEsU0FBaEJDLE9BQWdCLHVFQUFOLElBQU07O0FBQUE7O0FBQzNELFVBQUtDLGFBQUwsR0FBcUJWLGFBQXJCOztBQUVBLFVBQUtXLFNBQUwsR0FBaUJDLGFBQWFDLE9BQWIsQ0FBcUIsa0JBQXJCLEtBQTRDLEtBQTdEO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFVBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFVBQUtDLGNBQUwsR0FBc0IsS0FBdEI7O0FBRUEsVUFBS0MsR0FBTCxHQUFXLHdCQUFYOztBQUVBLFVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQixFQUFyQjtBQUNBLFVBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUIsS0FBckI7O0FBRUEsVUFBS2YsZUFBTCxHQUF1QkEsZUFBdkI7QUFDQSxVQUFLQyxPQUFMLEdBQWVBLFdBQVdHLFlBQTFCO0FBQ0EsU0FBR0EsYUFBYUMsT0FBYixDQUFxQixNQUFyQixLQUFnQ0QsYUFBYUMsT0FBYixDQUFxQixrQkFBckIsQ0FBbkMsRUFBNkU7QUFD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
