import {inject}        from 'aurelia-framework';
import {Time}          from './time'; 

export class Profile {
    constructor () {
        this.TIME = new Time();
        this.date = "";
        this.time = "";

        this.attached();
    }

    attached() {

        let self = this;
        
        setInterval(function(){
            self.time = self.TIME.time;
            self.date = self.TIME.date;
        }, 1000);

    }

} 


