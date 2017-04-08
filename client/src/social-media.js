import {inject}         from 'aurelia-framework';
import {I18N}           from 'aurelia-i18n';
import {Facebook}       from 'facebook';
import {Instagram}      from 'instagram';

@inject (Facebook, Instagram)
export class SocialMedia {

    constructor (Facebook, Instagram) {
        this.facebook = Facebook;
        this.instagram = Instagram;
        this.components = ['facebook', 'instagram'];
        this.componentsSocial =   { 'facebook': this.facebook,
                                    'instagram': this.instagram };

        this.latest = localStorage.getItem("social-media.latest") || "facebook";
        this.active = this.latest;
        this.init();
    }          

    init() {
        this.componentsSocial[this.active].active = true;

        $(this.selectComp).on('change', e => {
            this.loadComponent (e.target.value);
        });
    }

    loadComponent (component) {
        if (component in this.componentsSocial) {
            this.componentsSocial[this.active].active = false;
            this.active = component;
            this.componentsSocial[component].active = true;
            localStorage.setItem("social-media.latest", component)
            this.latest = component;
        }
        else {
            console.log('Component NA');
        }
    }

    
} 