import {inject}        from 'aurelia-framework';
import {I18N}          from 'aurelia-i18n';
import {Facebook}      from 'facebook';
import {Instagram}     from 'instagram';

@inject (Facebook, Instagram)
export class SocialMedia {
    constructor (Facebook, Instagram) {
        this.Facebook = Facebook;
        this.Instagram = Instagram;
        this.label = 'Instagram';

        this.components = ['facebook', 'instagram'];
        this.componentsO =   {
                                'facebook': this.Facebook,
                                'instagram': this.Instagram
                            };

        this.latest = localStorage.getItem("social-media.latest") || "facebook";
    }          

    attached() {
        this.componentsO[this.latest].active = true;
    }

    loadComponent (component) {
        console.log(component);
        if (component in this.componentsO) {
            this.componentsO[this.latest].active = false;
            this.latest = component;
            this.componentsO[component].active = true;
            localStorage.setItem("social-media.latest", component)
        }
        else {
            console.log('component NA');
        }
    }
    
} 