import {inject}         from 'aurelia-framework';
import {Facebook}       from 'facebook';
import {Soundcloud}     from 'soundcloud';

@inject(Facebook, Soundcloud)
export class Connect {
    constructor (Facebook, Soundcloud) {
        this.Facebook = Facebook;
        this.Soundcloud = Soundcloud;
    }
}