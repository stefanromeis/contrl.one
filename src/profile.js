import {inject}        from 'aurelia-framework';
import {I18N}          from 'aurelia-i18n'; 

@inject(I18N)
export class Profile {
    constructor (I18N) { 
        this.I18N = I18N;
    
    }
} 


