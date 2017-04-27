import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from 'prompt';
import { ObserverLocator } from 'aurelia-binding';
import { NoteItem } from './notes-item';
import { Time } from './time';
import { Login } from 'services/login';
import _ from 'underscore';
import keys from 'services/keycodes';
import config from 'services/authConfig';

@inject(DialogService, ObserverLocator, Login)
export class Notes {
	constructor(DialogService, observerLocator, Login) {
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

	attached() {
		if (localStorage.getItem('user') && localStorage.getItem('contrl.one.token')) {
			this.get();
		}
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

	labelClicked(item) {
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
		if (!ev) { return }
		if (ev.keyCode === keys.ENTER && this.loginModalOpen) {
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
		if (title == undefined || title.length === 0) {
			title = 'No title';
		}

		title = title.trim();

		const newNoteItem = new NoteItem(title, content, this.time.date);
		this.observeItem(newNoteItem);
		this.items.push(newNoteItem);

		this.newNoteTitle = null;
		this.newNoteContent = null;
		this.save();
	}

	openAndClearModal() {
		this.openModal = true;
		this.newNoteTitle = null;
		this.newNoteContent = null;
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
		let storageContent = data;
		if (storageContent == undefined) { return; }

		const simpleItems = JSON.parse(storageContent);
		this.items = _.map(simpleItems, item => {
			const notesItem = new NoteItem(item.title, item.content, item.time);

			this.observeItem(notesItem);

			return notesItem;
		});
	}

	get() {

		let self = this;
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
				// self.login.connected = true;
			}
			self.loginModalOpen = false;
		}).fail(function (err) {
			console.log('Error', err);
			if (err.responseText) {
				if (err.responseText.includes("jwt expired")) {
				}
			}
			self.login.connected = false;
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
	}

	// signUp() {
	// 	let self = this;
	// 	this.login.signUp()
	// 		.catch((err) => {
	// 			if (err.status == 401) {
	// 				this.login.login()
	// 			}
	// 			else {
	// 				console.log('Wrong mail or password.');
	// 			}
	// 		})
	// }

}

