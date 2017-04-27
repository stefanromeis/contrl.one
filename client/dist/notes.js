'use strict';

System.register(['aurelia-framework', 'aurelia-dialog', 'prompt', 'aurelia-binding', './notes-item', './time', 'services/login', 'underscore', 'services/keycodes', 'services/authConfig'], function (_export, _context) {
	"use strict";

	var inject, DialogService, Prompt, ObserverLocator, NoteItem, Time, Login, _, keys, config, _dec, _class, Notes;

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
		}, function (_notesItem) {
			NoteItem = _notesItem.NoteItem;
		}, function (_time) {
			Time = _time.Time;
		}, function (_servicesLogin) {
			Login = _servicesLogin.Login;
		}, function (_underscore) {
			_ = _underscore.default;
		}, function (_servicesKeycodes) {
			keys = _servicesKeycodes.default;
		}, function (_servicesAuthConfig) {
			config = _servicesAuthConfig.default;
		}],
		execute: function () {
			_export('Notes', Notes = (_dec = inject(DialogService, ObserverLocator, Login), _dec(_class = function () {
				function Notes(DialogService, observerLocator, Login) {
					_classCallCheck(this, Notes);

					this.dialogService = DialogService;
					this.time = new Time();
					this.isLoading = false;
					this.openModal = false;
					this.loginModalOpen = false;
					this.login = Login;
					this.open = false;

					this.api = config.providers.contrlOne.api;

					this.items = [];
					this.newNoteTitle = null;
					this.newNoteContent = null;

					this.observerLocator = observerLocator;
				}

				Notes.prototype.attached = function attached() {
					var _this = this;

					if (localStorage.getItem('user') && localStorage.getItem('contrl.one.token')) {
						this.get();
					}
					this.observerLocator.getObserver(this.login, 'connected').subscribe(function (o, n) {
						return _this.onConnectChange();
					});
				};

				Notes.prototype.onConnectChange = function onConnectChange() {
					if (!this.login.connected) {
						this.items = [];
						return;
					}
					this.get();
				};

				Notes.prototype.labelClicked = function labelClicked(item) {
					this.editTitle = item.title;
					this.editContent = item.content;
					item.isEditing = true;
					this.newNoteTitle = item.title;
					this.newNoteContent = item.content;
				};

				Notes.prototype.create = function create(ev) {
					if (this.openModal) {
						this.addNewNote(this.newNoteTitle, this.newNoteContent);
						this.openModal = false;
					}
					if (!ev) {
						return;
					}
					if (ev.keyCode === keys.ENTER && this.loginModalOpen) {
						this.signUp();
					}
				};

				Notes.prototype.update = function update(item) {
					item.title = this.newNoteTitle;
					item.content = this.newNoteContent;
					item.isEditing = false;
					item.time = this.time.date;
				};

				Notes.prototype.addNewNote = function addNewNote() {
					var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.newNoteTitle;
					var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.newNoteContent;

					if (title == undefined || title.length === 0) {
						title = 'No title';
					}

					title = title.trim();

					var newNoteItem = new NoteItem(title, content, this.time.date);
					this.observeItem(newNoteItem);
					this.items.push(newNoteItem);

					this.newNoteTitle = null;
					this.newNoteContent = null;
					this.save();
				};

				Notes.prototype.openAndClearModal = function openAndClearModal() {
					this.openModal = true;
					this.newNoteTitle = null;
					this.newNoteContent = null;
				};

				Notes.prototype.observeItem = function observeItem(notesItem) {
					var _this2 = this;

					this.observerLocator.getObserver(notesItem, 'title').subscribe(function (o, n) {
						return _this2.onTitleChanged(notesItem);
					});

					this.observerLocator.getObserver(notesItem, 'content').subscribe(function (o, n) {
						return _this2.onContentChanged(notesItem);
					});

					this.observerLocator.getObserver(notesItem, 'time').subscribe(function (o, n) {
						return _this2.onTimeChanged(notesItem);
					});
				};

				Notes.prototype.onTitleChanged = function onTitleChanged(notesItem) {
					if (notesItem.title === '') {
						notesItem.title = 'No Title';
					}

					this.save();
				};

				Notes.prototype.onContentChanged = function onContentChanged(notesItem) {
					this.save();
				};

				Notes.prototype.onTimeChanged = function onTimeChanged(notesItem) {
					this.save();
				};

				Notes.prototype.deleteNote = function deleteNote(notesItem) {
					this.items = _(this.items).without(notesItem);
					this.save();
				};

				Notes.prototype.onToggleAllChanged = function onToggleAllChanged() {
					this.items = _.map(this.items, function (item) {
						return item;
					});
				};

				Notes.prototype.load = function load(data) {
					var _this3 = this;

					var storageContent = data;
					if (storageContent == undefined) {
						return;
					}

					var simpleItems = JSON.parse(storageContent);
					this.items = _.map(simpleItems, function (item) {
						var notesItem = new NoteItem(item.title, item.content, item.time);

						_this3.observeItem(notesItem);

						return notesItem;
					});
				};

				Notes.prototype.get = function get() {

					var self = this;
					$.ajax({
						type: "GET",
						url: this.api + '/notes',
						headers: {
							"Authorization": 'Bearer ' + localStorage.getItem('contrl.one.token')
						},
						data: {
							'email': localStorage.getItem('user')
						}
					}).done(function (res) {
						console.log('NoteList Success', res);
						if (res.notesData) {
							self.load(res.notesData);
						}
						self.loginModalOpen = false;
					}).fail(function (err) {
						console.log('Error', err);
						if (err.responseText) {
							if (err.responseText.includes("jwt expired")) {}
						}
						self.login.connected = false;
					});
				};

				Notes.prototype.save = function save() {

					var simpleItems = _.map(this.items, function (item) {
						return {
							title: item.title,
							content: item.content,
							time: item.time
						};
					});

					var self = this;
					$.ajax({
						type: "PUT",
						url: this.api + '/notes',
						headers: {
							"Authorization": 'Bearer ' + localStorage.getItem('contrl.one.token')
						},
						data: {
							'email': localStorage.getItem('user'),
							'notesData': JSON.stringify(simpleItems)
						}
					}).done(function (res) {
						console.log('Success', res);
					}).fail(function (err) {
						console.log('Error', err);

						self.login.connected = false;
					});
				};

				return Notes;
			}()) || _class));

			_export('Notes', Notes);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGVzLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkRpYWxvZ1NlcnZpY2UiLCJQcm9tcHQiLCJPYnNlcnZlckxvY2F0b3IiLCJOb3RlSXRlbSIsIlRpbWUiLCJMb2dpbiIsIl8iLCJrZXlzIiwiY29uZmlnIiwiTm90ZXMiLCJvYnNlcnZlckxvY2F0b3IiLCJkaWFsb2dTZXJ2aWNlIiwidGltZSIsImlzTG9hZGluZyIsIm9wZW5Nb2RhbCIsImxvZ2luTW9kYWxPcGVuIiwibG9naW4iLCJvcGVuIiwiYXBpIiwicHJvdmlkZXJzIiwiY29udHJsT25lIiwiaXRlbXMiLCJuZXdOb3RlVGl0bGUiLCJuZXdOb3RlQ29udGVudCIsImF0dGFjaGVkIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldCIsImdldE9ic2VydmVyIiwic3Vic2NyaWJlIiwibyIsIm4iLCJvbkNvbm5lY3RDaGFuZ2UiLCJjb25uZWN0ZWQiLCJsYWJlbENsaWNrZWQiLCJpdGVtIiwiZWRpdFRpdGxlIiwidGl0bGUiLCJlZGl0Q29udGVudCIsImNvbnRlbnQiLCJpc0VkaXRpbmciLCJjcmVhdGUiLCJldiIsImFkZE5ld05vdGUiLCJrZXlDb2RlIiwiRU5URVIiLCJzaWduVXAiLCJ1cGRhdGUiLCJkYXRlIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwidHJpbSIsIm5ld05vdGVJdGVtIiwib2JzZXJ2ZUl0ZW0iLCJwdXNoIiwic2F2ZSIsIm9wZW5BbmRDbGVhck1vZGFsIiwibm90ZXNJdGVtIiwib25UaXRsZUNoYW5nZWQiLCJvbkNvbnRlbnRDaGFuZ2VkIiwib25UaW1lQ2hhbmdlZCIsImRlbGV0ZU5vdGUiLCJ3aXRob3V0Iiwib25Ub2dnbGVBbGxDaGFuZ2VkIiwibWFwIiwibG9hZCIsImRhdGEiLCJzdG9yYWdlQ29udGVudCIsInNpbXBsZUl0ZW1zIiwiSlNPTiIsInBhcnNlIiwic2VsZiIsIiQiLCJhamF4IiwidHlwZSIsInVybCIsImhlYWRlcnMiLCJkb25lIiwicmVzIiwiY29uc29sZSIsImxvZyIsIm5vdGVzRGF0YSIsImZhaWwiLCJlcnIiLCJyZXNwb25zZVRleHQiLCJpbmNsdWRlcyIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVNBLFMscUJBQUFBLE07O0FBQ0FDLGdCLGtCQUFBQSxhOztBQUNBQyxTLFdBQUFBLE07O0FBQ0FDLGtCLG1CQUFBQSxlOztBQUNBQyxXLGNBQUFBLFE7O0FBQ0FDLE8sU0FBQUEsSTs7QUFDQUMsUSxrQkFBQUEsSzs7QUFDRkMsSTs7QUFDQUMsTzs7QUFDQUMsUzs7O29CQUdNQyxLLFdBRFpWLE9BQU9DLGFBQVAsRUFBc0JFLGVBQXRCLEVBQXVDRyxLQUF2QyxDO0FBRUEsbUJBQVlMLGFBQVosRUFBMkJVLGVBQTNCLEVBQTRDTCxLQUE1QyxFQUFtRDtBQUFBOztBQUNsRCxVQUFLTSxhQUFMLEdBQXFCWCxhQUFyQjtBQUNBLFVBQUtZLElBQUwsR0FBWSxJQUFJUixJQUFKLEVBQVo7QUFDQSxVQUFLUyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFVBQUtDLGNBQUwsR0FBc0IsS0FBdEI7QUFDQSxVQUFLQyxLQUFMLEdBQWFYLEtBQWI7QUFDQSxVQUFLWSxJQUFMLEdBQVksS0FBWjs7QUFFQSxVQUFLQyxHQUFMLEdBQVdWLE9BQU9XLFNBQVAsQ0FBaUJDLFNBQWpCLENBQTJCRixHQUF0Qzs7QUFFQSxVQUFLRyxLQUFMLEdBQWEsRUFBYjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxVQUFLQyxjQUFMLEdBQXNCLElBQXRCOztBQUVBLFVBQUtiLGVBQUwsR0FBdUJBLGVBQXZCO0FBRUE7O29CQUVEYyxRLHVCQUFXO0FBQUE7O0FBQ1YsU0FBSUMsYUFBYUMsT0FBYixDQUFxQixNQUFyQixLQUFnQ0QsYUFBYUMsT0FBYixDQUFxQixrQkFBckIsQ0FBcEMsRUFBOEU7QUFDN0UsV0FBS0MsR0FBTDtBQUNBO0FBQ0QsVUFBS2pCLGVBQUwsQ0FDRWtCLFdBREYsQ0FDYyxLQUFL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
