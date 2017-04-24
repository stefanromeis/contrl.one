import { inject } from 'aurelia-framework';
import { TodoItem } from 'todo-item';
import { DialogService } from 'aurelia-dialog';
import { ObserverLocator } from 'aurelia-binding';
import { Prompt } from 'prompt';
import config from 'services/authConfig';
import keys from 'services/keycodes';
import _ from 'underscore';

@inject(DialogService, ObserverLocator)
export class Todo {
	constructor(DialogService, ObserverLocator) {
		this.dialogService = DialogService;
		this.observerLocator = ObserverLocator;
		this.api = config.providers.contrlOne.api;
		this.items = [];
		this.newTodoTitle = null;
		this.openModal = false;
		this.loginModalOpen = false;
	}

	attached() {
		if (localStorage.getItem('user') && localStorage.getItem('contrl.one.token')) {
			this.get();
		}
	}

	onKeyUp(ev) {
		if (ev.keyCode === keys.ENTER && this.openModal) {
			this.addNewTodo(this.newTodoTitle);
		}
		if (ev.keyCode === keys.ESC && this.openModal) {
			this.openModal = false;
		}
		if (ev.keyCode === keys.ENTER && this.loginModalOpen) {
			this.signUp();
		}
	}

	addNewTodo(title) {
		if (title == undefined) { return; }
		title = title.trim();
		if (title.length === 0) { return; }

		const newTodoItem = new TodoItem(title);
		this.observeItem(newTodoItem);
		this.items.push(newTodoItem);
		this.newTodoTitle = null;
		this.save();
		this.openDialog("Entry created!");

	}

	observeItem(todoItem) {
		this.observerLocator
			.getObserver(todoItem, 'title')
			.subscribe((o, n) => this.onTitleChanged(todoItem));

		this.observerLocator
			.getObserver(todoItem, 'isCompleted')
			.subscribe(() => this.onIsCompletedChanged());
	}

	onTitleChanged(todoItem) {
		if (todoItem.title === '') {
			this.deleteTodo(todoItem);
		}
		this.save();
	}

	onIsCompletedChanged() {
		this.save();
	}

	deleteTodo(todoItem) {
		this.items = _(this.items).without(todoItem);
		this.save();
	}

	load(data) {
		let storageContent = data;
		if (storageContent == undefined) { return; }

		const simpleItems = JSON.parse(storageContent);
		this.items = _.map(simpleItems, item => {
			const todoItem = new TodoItem(item.title);
			todoItem.isCompleted = item.completed;
			this.observeItem(todoItem);
			return todoItem;
		});
	}

	get() {
		const self = this;
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
				if (err.responseText.includes("jwt expired")) {
				}
			}
			self.connected = false;
		});
	}

	save() {
		const simpleItems = _.map(this.items, item => {
			return {
				title: item.title,
				completed: item.isCompleted
			}
		});

		const self = this;
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
	}


	signUp() {
		const self = this;
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
	}

	login() {
		const self = this;
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
	}

	logout() {
		localStorage.removeItem('contrl.one.token');
		localStorage.removeItem('user');
		this.connected = false;
		this.items = [];
	}

	openDialog(model) {
		this.dialogService.open({ viewModel: Prompt, model: model });
	}
}

