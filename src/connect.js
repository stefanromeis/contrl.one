import {inject}         from 'aurelia-framework';
import {Facebook}       from 'facebook';
import {Soundcloud}     from 'soundcloud';
import {Gmail}          from 'gmail';

@inject(Facebook, Soundcloud, Gmail)
export class Connect {
    constructor (Facebook, Soundcloud, Gmail) {
        this.Facebook = Facebook;
        this.Soundcloud = Soundcloud;
        this.Gmail = Gmail;
    }
}