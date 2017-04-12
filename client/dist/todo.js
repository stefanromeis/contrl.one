'use strict';

System.register(['aurelia-framework', 'aurelia-dialog', 'prompt', 'aurelia-binding', './todo-item', 'underscore'], function (_export, _context) {
	"use strict";

	var inject, DialogService, Prompt, ObserverLocator, TodoItem, _, _dec, _class, ENTER_KEY, Todo;

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
					this.tooltip = "Click + to add new todo-item. Click to check/uncheck. Doubleclick to edit.";

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8uanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiRGlhbG9nU2VydmljZSIsIlByb21wdCIsIk9ic2VydmVyTG9jYXRvciIsIlRvZG9JdGVtIiwiXyIsIkVOVEVSX0tFWSIsIlRvZG8iLCJvYnNlcnZlckxvY2F0b3IiLCJzdG9yYWdlIiwiZGlhbG9nU2VydmljZSIsImNvbm5lY3RlZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJpc0xvYWRpbmciLCJjYWxEYXRhIiwib3Blbk1vZGFsIiwibG9naW5Nb2RhbE9wZW4iLCJhcGkiLCJ0b29sdGlwIiwiaXRlbXMiLCJmaWx0ZXJlZEl0ZW1zIiwiZmlsdGVyIiwibmV3VG9kb1RpdGxlIiwiYXJlQWxsQ2hlY2tlZCIsImdldCIsImFjdGl2YXRlIiwicGFyYW1zIiwidXBkYXRlRmlsdGVyZWRJdGVtcyIsIm9uS2V5VXAiLCJldiIsImFkZE5ld1RvZG8iLCJrZXlDb2RlIiwic2lnblVwIiwidGl0bGUiLCJ1bmRlZmluZWQiLCJ0cmltIiwibGVuZ3RoIiwibmV3VG9kb0l0ZW0iLCJvYnNlcnZlSXRlbSIsInB1c2giLCJ1cGRhdGVBcmVBbGxDaGVja2VkU3RhdGUiLCJzYXZlIiwiYWxsIiwiaSIsImlzQ29tcGxldGVkIiwidG9kb0l0ZW0iLCJnZXRPYnNlcnZlciIsInN1YnNjcmliZSIsIm8iLCJuIiwib25UaXRsZUNoYW5nZWQiLCJvbklzQ29tcGxldGVkQ2hhbmdlZCIsImRlbGV0ZVRvZG8iLCJ3aXRob3V0IiwiY2xlYXJDb21wbGV0ZWRUb2RvcyIsImxvYWQiLCJkYXRhIiwic3RvcmFnZUNvbnRlbnQiLCJzaW1wbGVJdGVtcyIsIkpTT04iLCJwYXJzZSIsIm1hcCIsIml0ZW0iLCJjb21wbGV0ZWQiLCJzZWxmIiwiJCIsImFqYXgiLCJ0eXBlIiwidXJsIiwiaGVhZGVycyIsImRvbmUiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwidG9kb0RhdGEiLCJmYWlsIiwiZXJyIiwicmVzcG9uc2VUZXh0IiwiaW5jbHVkZXMiLCJzdHJpbmdpZnkiLCJlbWFpbCIsInBhc3N3b3JkIiwic2V0SXRlbSIsImlkX3Rva2VuIiwic3RhdHVzIiwibG9naW4iLCJsb2dvdXQiLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBU0EsUyxxQkFBQUEsTTs7QUFDQUMsZ0Isa0JBQUFBLGE7O0FBQ0FDLFMsV0FBQUEsTTs7QUFDQUMsa0IsbUJBQUFBLGU7O0FBQ0FDLFcsYUFBQUEsUTs7QUFDRkMsSTs7O0FBRURDLFksR0FBWSxFOzttQkFHTEMsSSxXQURaUCxPQUFPQyxhQUFQLEVBQXNCRSxlQUF0QixDO0FBRUEsa0JBQVlGLGFBQVosRUFBMkJPLGVBQTNCLEVBQTREO0FBQUEsU0FBaEJDLE9BQWdCLHVFQUFOLElBQU07O0FBQUE7O0FBQzNELFVBQUtDLGFBQUwsR0FBcUJULGFBQXJCOztBQUVBLFVBQUtVLFNBQUwsR0FBaUJDLGFBQWFDLE9BQWIsQ0FBcUIsa0JBQXJCLEtBQTRDLEtBQTdEO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFVBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFVBQUtDLGNBQUwsR0FBc0IsS0FBdEI7O0FBRUEsVUFBS0MsR0FBTCxHQUFXLHdCQUFYO0FBQ0EsVUFBS0MsT0FBTCxHQUFlLDRFQUFmOztBQUVBLFVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQixFQUFyQjtBQUNBLFVBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUIsS0FBckI7QUFDQSxVQUFLaEIsZUFBTCxHQUF1QkEsZUFBdkI7QUFDQSxVQUFLQyxPQUFMLEdBQWVBLFdBQVdHLFlBQTFCO0FBQ0EsU0FBR0EsYUFBYUMsT0FBYixDQUFxQixNQUFyQixLQUFnQ0QsYUFBYUMsT0FBYixDQUFxQixrQkFBckIsQ0FBbkMsRUFBNkU7QUFDNUUsV0FBS1ksR0FBTDtB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
