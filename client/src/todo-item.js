import keys from './services/keycodes'

export class TodoItem {
	constructor(title) {
		this.isCompleted = false;
		this.isEditing = false;
		this.title = title.trim();
		this.editTitle = null;
	}

	labelDoubleClicked() {
		this.editTitle = this.title;
		this.isEditing = true;
		this.isCompleted = false;
	}

	finishEditing() {
		this.title = this.editTitle.trim();
		this.isEditing = false;
	}

	onKeyUp(ev) {
		if (ev.keyCode === keys.ENTER) {
			this.finishEditing();
		}
		if (ev.keyCode === keys.ESC) {
			this.editTitle = this.title;
			this.isEditing = false;
		}
	}
}

