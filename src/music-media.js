import {inject}        from 'aurelia-framework';
import {I18N}          from 'aurelia-i18n';
import {Soundcloud}    from 'soundcloud';
import {Spotify}       from 'spotify';

@inject (Soundcloud, Spotify)
export class MusicMedia {

    constructor (Soundcloud, Spotify) {
        this.Soundcloud = Soundcloud;
        this.Spotify = Spotify;
        this.label = 'Spotify';

        this.components = ['soundcloud', 'spotify'];
        this.componentsMusic =   {
                                'soundcloud': this.Soundcloud,
                                'spotify': this.Spotify
                            };

        this.latest = localStorage.getItem("music-media.latest") || "spotify";
        this.active = this.latest;
        //console.log('latest', this.latest);
        this.init();
    }          

    init() {
        console.log('latest', this.latest);

        this.componentsMusic[this.latest].active = true;
        //$('#selectComp').val(this.latest);

        // or if no option is preselected
        $(this.selectComp).on('change', e => {
            this.loadComponent (e.target.value);
        });
    }

    loadComponent (component) {
        console.log('comp ', component);
        if (component in this.componentsMusic) {
            this.componentsMusic[this.active].active = false;
            console.log('comp inactive', this.active); 
            this.active = component;
            this.componentsMusic[this.active].connect();
            this.componentsMusic[component].active = true;
            localStorage.setItem("music-media.latest", component)
            console.log('component active:', this.active );
        }
        else {
            console.log('component NA');
        }
    }

    
} 