import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from 'prompt';
import { ObserverLocator } from 'aurelia-binding';
import { TodoItem } from './todo-item';
import _ from 'underscore';

const STORAGE_NAME = 'todomvc-aurelia';
const ENTER_KEY = 13;

@inject(DialogService, ObserverLocator)
export class Todo {
	constructor(DialogService, observerLocator, storage = null) {
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
		if(localStorage.getItem('user') && localStorage.getItem('contrl.one.token')) {
			this.get();
		}
	}

	activate(params) {
		this.updateFilteredItems(params.filter);
	}

	onKeyUp(ev) {
		if(!ev) {
			this.addNewTodo(this.newTodoTitle);
			return;
		}
		if (ev.keyCode === ENTER_KEY && this.openModal) {
			this.addNewTodo(this.newTodoTitle);
		}
		if (ev.keyCode === ENTER_KEY && this.loginModalOpen) {
			this.signUp();
		}
	}

	addNewTodo(title = this.newTodoTitle) {
		if (title == undefined) { return; }

		title = title.trim();
		if (title.length === 0) { return; }

		const newTodoItem = new TodoItem(title);
		this.observeItem(newTodoItem);
		this.items.push(newTodoItem);
		this.newTodoTitle = null;
		this.updateAreAllCheckedState();
		this.updateFilteredItems(this.filter);
		this.save();
	}

	updateAreAllCheckedState() {
		this.areAllChecked = _(this.items).all(i => i.isCompleted);
	}

	updateFilteredItems(filter) {
		this.filter = filter || '!';

		switch (filter) {
			case 'active':
				this.filteredItems = _(this.items).filter(i => !i.isCompleted);
				break;
			case 'completed':
				this.filteredItems = _(this.items).filter(i => i.isCompleted);
				break;
			default:
				this.filteredItems = this.items;
				break;
		}
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
			this.updateAreAllCheckedState();
		}

		this.save();
	}

	onIsCompletedChanged() {
		this.updateAreAllCheckedState();
		this.updateFilteredItems(this.filter);

		this.save();
	}

	deleteTodo(todoItem) {
		this.items = _(this.items).without(todoItem);
		this.updateAreAllCheckedState();
		this.updateFilteredItems(this.filter);
		this.save();
	}

	onToggleAllChanged() {
		this.items = _.map(this.items, item => {
			item.isCompleted = this.areAllChecked;
			return item;
		});

		this.updateFilteredItems(this.filter);
	}

	clearCompletedTodos() {
		this.items = _(this.items).filter(i => !i.isCompleted);
		this.areAllChecked = false;
		this.updateFilteredItems(this.filter);
		this.save();
	}

	load(data) {
		//const storageContent = this.storage.getItem(STORAGE_NAME);
		let storageContent = data;
		if (storageContent == undefined) { return; }

		const simpleItems = JSON.parse(storageContent);
		this.items = _.map(simpleItems, item => {
			const todoItem = new TodoItem(item.title);
			todoItem.isCompleted = item.completed;

			this.observeItem(todoItem);

			return todoItem;
		});
		this.updateAreAllCheckedState();
	}

	get() {
		/*
		const storageContent = this.storage.getItem(STORAGE_NAME);
		if (storageContent == undefined) { return; }

		const simpleItems = JSON.parse(storageContent);
		this.items = _.map(simpleItems, item => {
			const todoItem = new TodoItem(item.title);
			todoItem.isCompleted = item.completed;

			this.observeItem(todoItem);

			return todoItem;
		});
		this.updateAreAllCheckedState();
		*/

		let self = this;
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
			if(err.responseText) {
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

		//this.storage.setItem(STORAGE_NAME, JSON.stringify(simpleItems));

		let self = this;
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
			if(err.responseText) {
				if (err.responseText.includes("jwt expired")) {
					self.connected = false;
				}
			}
			self.connected = false;
		});
	}


	signUp() {
		let self = this;
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

	}

	login() {
		let self = this;
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
	}

	logout() {
		localStorage.removeItem('contrl.one.token');
		localStorage.removeItem('user');
		this.connected = false;
		this.items = [];
	}


}

