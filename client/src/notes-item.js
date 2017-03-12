import { inject } from 'aurelia-framework';
const ENTER_KEY = 13;
const ESC_KEY = 27;

export class NoteItem {
	constructor(title, content, time) {
		this.time = time;
		this.isEditing = false;
		this.title = title.trim();
		this.content = content;
		this.editTitle = null;
		this.editContent = null;
	}
}
