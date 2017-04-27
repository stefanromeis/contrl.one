import { inject } from 'aurelia-framework';
import { TodoItem } from 'todo-item';
import { DialogService } from 'aurelia-dialog';
import { ObserverLocator } from 'aurelia-binding';
import { Prompt } from 'prompt';
import config from 'services/authConfig';
import keys from 'services/keycodes';
import { Login } from 'services/login'
import _ from 'underscore';

@inject(DialogService, ObserverLocator, Login)
export class Todo {
	constructor(DialogService, ObserverLocator, Login) {
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

	created() {
		this.observerLocator
			.getObserver(this.login, 'connected')
			.subscribe((o, n) => this.onConnectChange());
	}

	onConnectChange() {
		if (!this.login.connected) {
			this.items = [];
			return;
		}
		this.get()
	}

	onKeyUp(ev) {
		if (ev.keyCode === keys.ENTER && this.openModal) {
			this.addNewTodo(this.newTodoTitle);
		}
		if (ev.keyCode === keys.ESC && this.openModal) {
			this.openModal = false;
		}
		if (ev.keyCode === keys.ENTER && this.login.loginModalOpen) {
			this.login.login();
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
			// self.login.connected = true;
			if (res.todoData) {
				self.load(res.todoData);
			}
		}).fail(function (err) {
			console.log('Error', err);
			self.items = [];
			self.login.connected = false;
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
	}

	openDialog(model) {
		this.dialogService.open({ viewModel: Prompt, model: model });
	}

	// signUp() {
	// 	let self = this;
	// 	this.login.signUp()
	// 		.catch((err) => {
	// 			if (err.status == 401) {
	// 				this.login.login()
	// 					.then((res) => this.get());
	// 			}
	// 			else {
	// 				console.log('Wrong mail or password.');
	// 				this.login.login()
	// 					.then((res) => this.get());
	// 			}
	// 		})
	// 		.then((res) => this.get());
	// }
}

