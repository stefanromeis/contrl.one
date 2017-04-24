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
    }          

    attached() {
        this.componentsMusic[this.latest].active = true;
        $(this.selectComp).val(this.latest);

        // or if no option is preselected
        $(this.selectComp).on('change', e => {
            this.loadComponent (e.target.value);
        });
    }

    loadComponent (component) {
        if (component in this.componentsMusic) {
            this.componentsMusic[this.active].active = false;
            this.active = component;
            this.componentsMusic[component].active = true;
            localStorage.setItem("music-media.latest", component)
        }
        else {
            console.log('component NA');
        }
    }

    loadNext () {
        this.componentsMusic[this.active].loadNextTrack();
    }

    loadPrev () {
        this.componentsMusic[this.active].loadPrevTrack();
    }

    
} 