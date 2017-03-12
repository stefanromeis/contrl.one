import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from 'prompt';
import { ObserverLocator } from 'aurelia-binding';
import { NoteItem } from './notes-item';
import { Time } from './time';
import _ from 'underscore';

const STORAGE_NAME = 'notesmvc-aurelia';
const ENTER_KEY = 13;

@inject(DialogService, ObserverLocator)
export class Notes {
	constructor(DialogService, observerLocator, storage = null) {
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
		if(localStorage.getItem('user') && localStorage.getItem('contrl.one.token')) {
			this.get();
		}
	}

	labelDoubleClicked(item) {
		this.editTitle = item.title;
		this.editContent = item.content;
		item.isEditing = true;
		this.newNoteTitle = item.title;
		this.newNoteContent = item.content;
	}
	
	
	create(ev) {
		if (this.openModal) {
			this.addNewNote(this.newNoteTitle, this.newNoteContent);
			this.openModal = false;
		}
		if(!ev) { return }
		if (ev.keyCode === ENTER_KEY && this.loginModalOpen) {
			this.signUp();
		}
	}

	update(item) {
		item.title = this.newNoteTitle;
		item.content = this.newNoteContent;
		item.isEditing = false;
		item.time = this.time.date;
	}

	addNewNote(title = this.newNoteTitle, content = this.newNoteContent) {
		if (title == undefined) { return; }

		title = title.trim();
		if (title.length === 0) { return; }

		const newNoteItem = new NoteItem(title, content, this.time.date);
		this.observeItem(newNoteItem);
		this.items.push(newNoteItem);

		this.newNoteTitle = null;
		this.newNoteContent = null;
		this.save();
	}

	observeItem(notesItem) {
		this.observerLocator
			.getObserver(notesItem, 'title')
			.subscribe((o, n) => this.onTitleChanged(notesItem));

		this.observerLocator
			.getObserver(notesItem, 'content')
			.subscribe((o, n) => this.onContentChanged(notesItem));

		this.observerLocator
			.getObserver(notesItem, 'time')
			.subscribe((o, n) => this.onTimeChanged(notesItem));
	}

	onTitleChanged(notesItem) {
		if (notesItem.title === '') {
			notesItem.title = 'No Title';
		}

		this.save();
	}

	onContentChanged(notesItem) {
		this.save();
	}

	onTimeChanged(notesItem) {
		this.save();
	}

	deleteNote(notesItem) {
		this.items = _(this.items).without(notesItem);
		this.save();
	}

	onToggleAllChanged() {
		this.items = _.map(this.items, item => {
			return item;
		});
	}

	load(data) {
		//const storageContent = this.storage.getItem(STORAGE_NAME);
		let storageContent = data;
		if (storageContent == undefined) { return; }

		const simpleItems = JSON.parse(storageContent);
		this.items = _.map(simpleItems, item => {
			const notesItem = new NoteItem(item.title);

			this.observeItem(notesItem);

			return notesItem;
		});
	}

	get() {
		/*
		const storageContent = this.storage.getItem(STORAGE_NAME);
		if (storageContent == undefined) { return; }

		const simpleItems = JSON.parse(storageContent);
		this.items = _.map(simpleItems, item => {
			const notesItem = new NoteItem(item.title);
			notesItem.isCompleted = item.completed;

			this.observeItem(notesItem);

			return notesItem;
		});
		this.updateAreAllCheckedState();
		*/

		let self = this;
		$.ajax({
			type: "GET",
			url: this.api + 'notes/get',
			headers: {
				"Authorization": 'Bearer ' + localStorage.getItem('contrl.one.token')
			},
			data: {
				'email': localStorage.getItem('user')
			}
		}).done(function (res) {
			console.log('NoteList Success', res);
			self.load(res.notesData);

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
				content: item.content,
				time: item.time
			}
		});

		let self = this;
		$.ajax({
			type: "POST",
			url: this.api + 'notes/save',
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

