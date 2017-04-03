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
					this.openModal = false;
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
					if (!ev) {
						this.addNewTodo(this.newTodoTitle);
						return;
					}
					if (ev.keyCode === ENTER_KEY && this.openModal) {
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

				Todo.prototype.clearCompletedTodos = function clearCompletedTodos() {
					this.items = _(this.items).filter(function (i) {
						return !i.isCompleted;
					});
					this.areAllChecked = false;
					this.updateFilteredItems(this.filter);
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
					this.updateAreAllCheckedState();
				};

				Todo.prototype.get = function get() {

					var self = this;
					$.ajax({
						type: "GET",
						url: this.api + 'todo',
						headers: {
							"Authorization": 'Bearer ' + localStorage.getItem('contrl.one.token')
						},
						data: {
							'email': localStorage.getItem('user')
						}
					}).done(function (res) {
						console.log('ToDoListGet Success', res);
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
						url: this.api + 'todo',
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8uanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiRGlhbG9nU2VydmljZSIsIlByb21wdCIsIk9ic2VydmVyTG9jYXRvciIsIlRvZG9JdGVtIiwiXyIsIlNUT1JBR0VfTkFNRSIsIkVOVEVSX0tFWSIsIlRvZG8iLCJvYnNlcnZlckxvY2F0b3IiLCJzdG9yYWdlIiwiZGlhbG9nU2VydmljZSIsImNvbm5lY3RlZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJpc0xvYWRpbmciLCJjYWxEYXRhIiwib3Blbk1vZGFsIiwibG9naW5Nb2RhbE9wZW4iLCJhcGkiLCJpdGVtcyIsImZpbHRlcmVkSXRlbXMiLCJmaWx0ZXIiLCJuZXdUb2RvVGl0bGUiLCJhcmVBbGxDaGVja2VkIiwiZ2V0IiwiYWN0aXZhdGUiLCJwYXJhbXMiLCJ1cGRhdGVGaWx0ZXJlZEl0ZW1zIiwib25LZXlVcCIsImV2IiwiYWRkTmV3VG9kbyIsImtleUNvZGUiLCJzaWduVXAiLCJ0aXRsZSIsInVuZGVmaW5lZCIsInRyaW0iLCJsZW5ndGgiLCJuZXdUb2RvSXRlbSIsIm9ic2VydmVJdGVtIiwicHVzaCIsInVwZGF0ZUFyZUFsbENoZWNrZWRTdGF0ZSIsInNhdmUiLCJhbGwiLCJpIiwiaXNDb21wbGV0ZWQiLCJ0b2RvSXRlbSIsImdldE9ic2VydmVyIiwic3Vic2NyaWJlIiwibyIsIm4iLCJvblRpdGxlQ2hhbmdlZCIsIm9uSXNDb21wbGV0ZWRDaGFuZ2VkIiwiZGVsZXRlVG9kbyIsIndpdGhvdXQiLCJjbGVhckNvbXBsZXRlZFRvZG9zIiwibG9hZCIsImRhdGEiLCJzdG9yYWdlQ29udGVudCIsInNpbXBsZUl0ZW1zIiwiSlNPTiIsInBhcnNlIiwibWFwIiwiaXRlbSIsImNvbXBsZXRlZCIsInNlbGYiLCIkIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJoZWFkZXJzIiwiZG9uZSIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJ0b2RvRGF0YSIsImZhaWwiLCJlcnIiLCJyZXNwb25zZVRleHQiLCJpbmNsdWRlcyIsInN0cmluZ2lmeSIsImVtYWlsIiwicGFzc3dvcmQiLCJzZXRJdGVtIiwiaWRfdG9rZW4iLCJzdGF0dXMiLCJsb2dpbiIsImxvZ291dCIsInJlbW92ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFTQSxTLHFCQUFBQSxNOztBQUNBQyxnQixrQkFBQUEsYTs7QUFDQUMsUyxXQUFBQSxNOztBQUNBQyxrQixtQkFBQUEsZTs7QUFDQUMsVyxhQUFBQSxROztBQUNGQyxJOzs7QUFFREMsZSxHQUFlLGlCO0FBQ2ZDLFksR0FBWSxFOzttQkFHTEMsSSxXQURaUixPQUFPQyxhQUFQLEVBQXNCRSxlQUF0QixDO0FBRUEsa0JBQVlGLGFBQVosRUFBMkJRLGVBQTNCLEVBQTREO0FBQUEsU0FBaEJDLE9BQWdCLHVFQUFOLElBQU07O0FBQUE7O0FBQzNELFVBQUtDLGFBQUwsR0FBcUJWLGFBQXJCOztBQUVBLFVBQUtXLFNBQUwsR0FBaUJDLGFBQWFDLE9BQWIsQ0FBcUIsa0JBQXJCLEtBQTRDLEtBQTdEO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFVBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFVBQUtDLGNBQUwsR0FBc0IsS0FBdEI7O0FBRUEsVUFBS0MsR0FBTCxHQUFXLHdCQUFYOztBQUVBLFVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQixFQUFyQjtBQUNBLFVBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUIsS0FBckI7O0FBRUEsVUFBS2YsZUFBTCxHQUF1QkEsZUFBdkI7QUFDQSxVQUFLQyxPQUFMLEdBQWVBLFdBQVdHLFlBQTFCO0FBQ0EsU0FBR0EsYUFBYUMsT0FBYixDQUFxQixNQUFyQixLQUFnQ0QsYUFBYUMsT0FBYixDQUFxQixrQkFBckIsQ0FBbkMsRUFBNkU7QUFDNUUsV0FBS1csR0FBTDtBQUNBO0FB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
