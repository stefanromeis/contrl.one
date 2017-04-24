import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)

export class Prompt {

    constructor(DialogController) {
        this.controller = DialogController;
        this.controller.settings.centerHorizontalOnly = true;
        this.timer = 2500;
    }

    activate(message) {
        this.message = message;

        this.deactivate();

    }

    deactivate() {
        const self = this;
        setTimeout(function () {
            self.controller.ok();
        }, self.timer);
    }


}