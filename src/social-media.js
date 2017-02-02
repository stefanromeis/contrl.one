import {inject}        from 'aurelia-framework';
import {I18N}          from 'aurelia-i18n';
import {Facebook}      from 'facebook';
import {Instagram}     from 'instagram';
//import states          from 'state-list';

@inject (Facebook, Instagram)
export class SocialMedia {

    constructor (Facebook, Instagram) {
        //this.states = states;
        this.Facebook = Facebook;
        this.Instagram = Instagram;
        this.label = 'Instagram';

        this.components = ['facebook', 'instagram'];
        this.componentsSocial =   {
                                'facebook': this.Facebook,
                                'instagram': this.Instagram
                            };

        this.latest = localStorage.getItem("social-media.latest") || "facebook";
        this.active = this.latest;
        this.init();
        //console.log('latest', this.latest);
    }          

    init() {
        console.log('latest', this.latest);

        this.componentsSocial[this.active].active = true;
        //$('#selectComp').val(this.latest);

        // or if no option is preselected
        $(this.selectComp).on('change', e => {
            this.loadComponent (e.target.value);
        });

    }

    loadComponent (component) {
        console.log('comp ', component);
        if (component in this.componentsSocial) {
            this.componentsSocial[this.active].active = false;
            console.log('comp inactive', this.active); 
            this.active = component;
            this.componentsSocial[component].active = true;
            localStorage.setItem("social-media.latest", component)
            console.log('component active:', this.active );
        }
        else {
            console.log('component NA');
        }
    }

    
} 