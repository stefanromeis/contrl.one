'use strict';

System.register(['aurelia-framework', 'aurelia-dialog', 'prompt', 'aurelia-binding', './notes-item', './time', 'underscore'], function (_export, _context) {
	"use strict";

	var inject, DialogService, Prompt, ObserverLocator, NoteItem, Time, _, _dec, _class, STORAGE_NAME, ENTER_KEY, Notes;

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
		}, function (_underscore) {
			_ = _underscore.default;
		}],
		execute: function () {
			STORAGE_NAME = 'notesmvc-aurelia';
			ENTER_KEY = 13;

			_export('Notes', Notes = (_dec = inject(DialogService, ObserverLocator), _dec(_class = function () {
				function Notes(DialogService, observerLocator) {
					var storage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

					_classCallCheck(this, Notes);

					this.dialogService = DialogService;
					this.time = new Time();
					this.connected = localStorage.getItem('contrl.one.token') || false;
					this.isLoading = false;
					this.openModal = false;
					this.loginModalOpen = false;

					this.api = 'http://localhost:3001/';

					this.items = [];
					this.newNoteTitle = null;
					this.newNoteContent = null;

					this.observerLocator = observerLocator;
					if (localStorage.getItem('user') && localStorage.getItem('contrl.one.token')) {
						this.get();
					}
				}

				Notes.prototype.labelDoubleClicked = function labelDoubleClicked(item) {
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
					if (ev.keyCode === ENTER_KEY && this.loginModalOpen) {
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

				Notes.prototype.observeItem = function observeItem(notesItem) {
					var _this = this;

					this.observerLocator.getObserver(notesItem, 'title').subscribe(function (o, n) {
						return _this.onTitleChanged(notesItem);
					});

					this.observerLocator.getObserver(notesItem, 'content').subscribe(function (o, n) {
						return _this.onContentChanged(notesItem);
					});

					this.observerLocator.getObserver(notesItem, 'time').subscribe(function (o, n) {
						return _this.onTimeChanged(notesItem);
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
					var _this2 = this;

					var storageContent = data;
					if (storageContent == undefined) {
						return;
					}

					var simpleItems = JSON.parse(storageContent);
					this.items = _.map(simpleItems, function (item) {
						var notesItem = new NoteItem(item.title, item.content, item.time);

						_this2.observeItem(notesItem);

						return notesItem;
					});
				};

				Notes.prototype.get = function get() {

					var self = this;
					$.ajax({
						type: "GET",
						url: this.api + 'notes',
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
					}).fail(function (err) {
						console.log('Error', err);
						if (err.responseText) {
							if (err.responseText.includes("jwt expired")) {}
						}
						self.connected = false;
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
						type: "POST",
						url: this.api + 'notes',
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
						if (err.responseText) {
							if (err.responseText.includes("jwt expired")) {
								self.connected = false;
							}
						}
						self.connected = false;
					});
				};

				Notes.prototype.signUp = function signUp() {
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

				Notes.prototype.login = function login() {
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

				Notes.prototype.logout = function logout() {
					localStorage.removeItem('contrl.one.token');
					localStorage.removeItem('user');
					this.connected = false;
					this.items = [];
				};

				return Notes;
			}()) || _class));

			_export('Notes', Notes);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGVzLmpzIl0sIm5hbWVzIjpbImluamVjdCIsIkRpYWxvZ1NlcnZpY2UiLCJQcm9tcHQiLCJPYnNlcnZlckxvY2F0b3IiLCJOb3RlSXRlbSIsIlRpbWUiLCJfIiwiU1RPUkFHRV9OQU1FIiwiRU5URVJfS0VZIiwiTm90ZXMiLCJvYnNlcnZlckxvY2F0b3IiLCJzdG9yYWdlIiwiZGlhbG9nU2VydmljZSIsInRpbWUiLCJjb25uZWN0ZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiaXNMb2FkaW5nIiwib3Blbk1vZGFsIiwibG9naW5Nb2RhbE9wZW4iLCJhcGkiLCJpdGVtcyIsIm5ld05vdGVUaXRsZSIsIm5ld05vdGVDb250ZW50IiwiZ2V0IiwibGFiZWxEb3VibGVDbGlja2VkIiwiaXRlbSIsImVkaXRUaXRsZSIsInRpdGxlIiwiZWRpdENvbnRlbnQiLCJjb250ZW50IiwiaXNFZGl0aW5nIiwiY3JlYXRlIiwiZXYiLCJhZGROZXdOb3RlIiwia2V5Q29kZSIsInNpZ25VcCIsInVwZGF0ZSIsImRhdGUiLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJ0cmltIiwibmV3Tm90ZUl0ZW0iLCJvYnNlcnZlSXRlbSIsInB1c2giLCJzYXZlIiwibm90ZXNJdGVtIiwiZ2V0T2JzZXJ2ZXIiLCJzdWJzY3JpYmUiLCJvIiwibiIsIm9uVGl0bGVDaGFuZ2VkIiwib25Db250ZW50Q2hhbmdlZCIsIm9uVGltZUNoYW5nZWQiLCJkZWxldGVOb3RlIiwid2l0aG91dCIsIm9uVG9nZ2xlQWxsQ2hhbmdlZCIsIm1hcCIsImxvYWQiLCJkYXRhIiwic3RvcmFnZUNvbnRlbnQiLCJzaW1wbGVJdGVtcyIsIkpTT04iLCJwYXJzZSIsInNlbGYiLCIkIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJoZWFkZXJzIiwiZG9uZSIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJub3Rlc0RhdGEiLCJmYWlsIiwiZXJyIiwicmVzcG9uc2VUZXh0IiwiaW5jbHVkZXMiLCJzdHJpbmdpZnkiLCJlbWFpbCIsInBhc3N3b3JkIiwic2V0SXRlbSIsImlkX3Rva2VuIiwic3RhdHVzIiwibG9naW4iLCJsb2dvdXQiLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBU0EsUyxxQkFBQUEsTTs7QUFDQUMsZ0Isa0JBQUFBLGE7O0FBQ0FDLFMsV0FBQUEsTTs7QUFDQUMsa0IsbUJBQUFBLGU7O0FBQ0FDLFcsY0FBQUEsUTs7QUFDQUMsTyxTQUFBQSxJOztBQUNGQyxJOzs7QUFFREMsZSxHQUFlLGtCO0FBQ2ZDLFksR0FBWSxFOztvQkFHTEMsSyxXQURaVCxPQUFPQyxhQUFQLEVBQXNCRSxlQUF0QixDO0FBRUEsbUJBQVlGLGFBQVosRUFBMkJTLGVBQTNCLEVBQTREO0FBQUEsU0FBaEJDLE9BQWdCLHVFQUFOLElBQU07O0FBQUE7O0FBQzNELFVBQUtDLGFBQUwsR0FBcUJYLGFBQXJCO0FBQ0EsVUFBS1ksSUFBTCxHQUFZLElBQUlSLElBQUosRUFBWjtBQUNBLFVBQUtTLFNBQUwsR0FBaUJDLGFBQWFDLE9BQWIsQ0FBcUIsa0JBQXJCLEtBQTRDLEtBQTdEO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFVBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxVQUFLQyxjQUFMLEdBQXNCLEtBQXRCOztBQUVBLFVBQUtDLEdBQUwsR0FBVyx3QkFBWDs7QUFFQSxVQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxVQUFLQyxjQUFMLEdBQXNCLElBQXRCOztBQUVBLFVBQUtiLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0EsU0FBR0ssYUFBYUMsT0FBYixDQUFxQixNQUFyQixLQUFnQ0QsYUFBYUMsT0FBYixDQUFxQixrQkFBckIsQ0FBbkMsRUFBNkU7QUFDNUUsV0FBS1EsR0FBTDtBQUNBO0FBQ0Q7O29CQUVEQyxrQiwrQkFBbUJDLEksRUFBTTtBQUN4QixVQUFLQyxTQUFMLEdBQWlCRCxLQUFLRSxLQUF0QjtBQUNBLFVBQUtDLFdBQUwsR0FBbUJI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
