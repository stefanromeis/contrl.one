'use strict';

System.register(['aurelia-framework', 'todo-item', 'aurelia-dialog', 'aurelia-binding', 'prompt', 'services/authConfig', 'services/keycodes', 'services/login', 'underscore'], function (_export, _context) {
	"use strict";

	var inject, TodoItem, DialogService, ObserverLocator, Prompt, config, keys, Login, _, _dec, _class, Todo;

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
		}, function (_servicesLogin) {
			Login = _servicesLogin.Login;
		}, function (_underscore) {
			_ = _underscore.default;
		}],
		execute: function () {
			_export('Todo', Todo = (_dec = inject(DialogService, ObserverLocator, Login), _dec(_class = function () {
				function Todo(DialogService, ObserverLocator, Login) {
					_classCallCheck(this, Todo);

					this.dialogService = DialogService;
					this.observerLocator = ObserverLocator;
					this.api = config.providers.contrlOne.api;
					this.items = [];
					this.newTodoTitle = null;
					this.openModal = false;
					this.login = Login;
					if (localStorage.getItem('user') && localStorage.getItem('contrl.one.token')) {
						this.get();
						this.login.connected = true;
					}
				}

				Todo.prototype.created = function created() {
					var _this = this;

					this.observerLocator.getObserver(this.login, 'connected').subscribe(function (o, n) {
						return _this.onConnectChange();
					});
				};

				Todo.prototype.onConnectChange = function onConnectChange() {
					if (!this.login.connected) {
						this.items = [];
						return;
					}
					this.get();
				};

				Todo.prototype.onKeyUp = function onKeyUp(ev) {
					if (ev.keyCode === keys.ENTER && this.openModal) {
						this.addNewTodo(this.newTodoTitle);
					}
					if (ev.keyCode === keys.ESC && this.openModal) {
						this.openModal = false;
					}
					if (ev.keyCode === keys.ENTER && this.login.loginModalOpen) {
						this.login.login();
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
					var _this2 = this;

					this.observerLocator.getObserver(todoItem, 'title').subscribe(function (o, n) {
						return _this2.onTitleChanged(todoItem);
					});

					this.observerLocator.getObserver(todoItem, 'isCompleted').subscribe(function () {
						return _this2.onIsCompletedChanged();
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

						if (res.todoData) {
							self.load(res.todoData);
						}
					}).fail(function (err) {
						console.log('Error', err);
						self.items = [];
						self.login.connected = false;
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
						type: "PUT",
						url: this.api + '/todo',
						headers: {
							"Authorization": 'Bearer ' + localStorage.getItem('contrl.one.token')
						},
						data: {
							'todoData': JSON.stringify(simpleItems)
						}
					}).done(function (res) {
						console.log('Success', res);
					}).fail(function (err) {
						console.log('Error', err);
						if (err.responseText) {
							if (err.responseText.includes("jwt expired")) {
								self.login.connected = false;
							}
						}
						self.login.connected = false;
					});
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8uanMiXSwibmFtZXMiOlsiaW5qZWN0IiwiVG9kb0l0ZW0iLCJEaWFsb2dTZXJ2aWNlIiwiT2JzZXJ2ZXJMb2NhdG9yIiwiUHJvbXB0IiwiY29uZmlnIiwia2V5cyIsIkxvZ2luIiwiXyIsIlRvZG8iLCJkaWFsb2dTZXJ2aWNlIiwib2JzZXJ2ZXJMb2NhdG9yIiwiYXBpIiwicHJvdmlkZXJzIiwiY29udHJsT25lIiwiaXRlbXMiLCJuZXdUb2RvVGl0bGUiLCJvcGVuTW9kYWwiLCJsb2dpbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJnZXQiLCJjb25uZWN0ZWQiLCJjcmVhdGVkIiwiZ2V0T2JzZXJ2ZXIiLCJzdWJzY3JpYmUiLCJvIiwibiIsIm9uQ29ubmVjdENoYW5nZSIsIm9uS2V5VXAiLCJldiIsImtleUNvZGUiLCJFTlRFUiIsImFkZE5ld1RvZG8iLCJFU0MiLCJsb2dpbk1vZGFsT3BlbiIsInRpdGxlIiwidW5kZWZpbmVkIiwidHJpbSIsImxlbmd0aCIsIm5ld1RvZG9JdGVtIiwib2JzZXJ2ZUl0ZW0iLCJwdXNoIiwic2F2ZSIsIm9wZW5EaWFsb2ciLCJ0b2RvSXRlbSIsIm9uVGl0bGVDaGFuZ2VkIiwib25Jc0NvbXBsZXRlZENoYW5nZWQiLCJkZWxldGVUb2RvIiwid2l0aG91dCIsImxvYWQiLCJkYXRhIiwic3RvcmFnZUNvbnRlbnQiLCJzaW1wbGVJdGVtcyIsIkpTT04iLCJwYXJzZSIsIm1hcCIsIml0ZW0iLCJpc0NvbXBsZXRlZCIsImNvbXBsZXRlZCIsInNlbGYiLCIkIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJoZWFkZXJzIiwiZG9uZSIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJ0b2RvRGF0YSIsImZhaWwiLCJlcnIiLCJzdHJpbmdpZnkiLCJyZXNwb25zZVRleHQiLCJpbmNsdWRlcyIsIm1vZGVsIiwib3BlbiIsInZpZXdNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVNBLFMscUJBQUFBLE07O0FBQ0FDLFcs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QyxPQUFiLENBQXFCLE1BQXJCO0FBREo7QUFOQSxNQUFQLEVBU0c4QyxJQVRILENBU1EsVUFBVUMsR0FBVixFQUFlO0FBQ3RCQyxjQUFRQyxHQUFSLENBQVkscUJBQVosRUFBbUNGLEdBQW5DOztBQUVBLFVBQUlBLElBQUlHLFFBQVIsRUFBa0I7QUFDakJWLFlBQUtWLElBQUwsQ0FBVWlCLElBQUlHLFFBQWQ7QUFDQTtBQUNELE1BZkQsRUFlR0MsSUFmSCxDQWVRLFVBQVVDLEdBQVYsRUFBZTtBQUN0QkosY0FBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJHLEdBQXJCO0FBQ0FaLFdBQUs3QyxLQUFMLEdBQWEsRUFBYjtBQUNBNkMsV0FBSzFDLEtBQUwsQ0FBV0ksU0FBWCxHQUF1QixLQUF2QjtBQUNBLE1BbkJEO0FBb0JBLEs7O21CQUVEcUIsSSxtQkFBTztBQUNOLFNBQU1VLGNBQWM3QyxFQUFFZ0QsR0FBRixDQUFNLEtBQUt6QyxLQUFYLEVBQWtCLGdCQUFRO0FBQzdDLGFBQU87QUFDTnFCLGNBQU9xQixLQUFLckIsS0FETjtBQUVOdUIsa0JBQVdGLEtBQUtDO0FBRlYsT0FBUDtBQUlBLE1BTG1CLENBQXBCOztBQU9BLFNBQU1FLE9BQU8sSUFBYjtBQUNBQyxPQUFFQyxJQUFGLENBQU87QUFDTkMsWUFBTSxLQURBO0FBRU5DLFdBQUssS0FBS3BELEdBQUwsR0FBVyxPQUZWO0FBR05xRCxlQUFTO0FBQ1Isd0JBQWlCLFlBQVk5QyxhQUFhQyxPQUFiLENBQXFCLGtCQUFyQjtBQURyQixPQUhIO0FBTU4rQixZQUFNO0FBQ0wsbUJBQVlHLEtBQUttQixTQUFMLENBQWVwQixXQUFmO0FBRFA7QUFOQSxNQUFQLEVBU0dhLElBVEgsQ0FTUSxVQUFVQyxHQUFWLEVBQWU7QUFDdEJDLGNBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCRixHQUF2QjtBQUNBLE1BWEQsRUFXR0ksSUFYSCxDQVdRLFVBQVVDLEdBQVYsRUFBZTtBQUN0QkosY0FBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJHLEdBQXJCO0FBQ0EsVUFBSUEsSUFBSUUsWUFBUixFQUFzQjtBQUNyQixXQUFJRixJQUFJRSxZQUFKLENBQWlCQyxRQUFqQixDQUEwQixhQUExQixDQUFKLEVBQThDO0FBQzdDZixhQUFLMUMsS0FBTCxDQUFXSSxTQUFYLEdBQXVCLEtBQXZCO0FBQ0E7QUFDRDtBQUNEc0MsV0FBSzFDLEtBQUwsQ0FBV0ksU0FBWCxHQUF1QixLQUF2QjtBQUNBLE1BbkJEO0FBb0JBLEs7O21CQUVEc0IsVSx1QkFBV2dDLEssRUFBTztBQUNqQixVQUFLbEUsYUFBTCxDQUFtQm1FLElBQW5CLENBQXdCLEVBQUVDLFdBQVcxRSxNQUFiLEVBQXFCd0UsT0FBT0EsS0FBNUIsRUFBeEI7QUFDQSxLIiwiZmlsZSI6InRvZG8uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
