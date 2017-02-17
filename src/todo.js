import {DialogService}  from 'aurelia-dialog';
import {inject}         from 'aurelia-framework';
import {I18N}           from 'aurelia-i18n';
import {Prompt}         from 'prompt';
import {Api}            from 'services/api';

@inject(DialogService, Api)
export class Todo {
    constructor (DialogService, Api) {
        this.dialogService = DialogService;
        this.api = Api;

        this.connected = false;
        this.isLoading = false;
        this.calData = [];
        this.modalOpen = false;
        this.todoLoging = localStorage.getItem('togoLogin');
        this.loginModalOpen = false;
    }
    
    attached () {

    }
         
    loginWithMail() {
        //this.api.

    }



}
    
