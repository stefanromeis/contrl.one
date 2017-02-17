import {DialogService}  from 'aurelia-dialog';
import {inject}         from 'aurelia-framework';
import {I18N}           from 'aurelia-i18n';
import {Prompt}         from 'prompt';

@inject(DialogService)
export class Notes {
    constructor (DialogService) {
        this.dialogService = DialogService;

        this.connected = false;
        this.isLoading = false;
        this.calData = [];
        this.modalOpen = false;
      
    }
    
    attached () {

    }
         
    connect() {

    }

   
   
}
    
