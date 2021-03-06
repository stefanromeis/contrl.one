import {inject}        from 'aurelia-framework';
import {I18N}          from 'aurelia-i18n'; 
import moment          from 'moment';

@inject(I18N)
export class Time {
    constructor (I18N) { 
        this.I18N = I18N;
        this.date = "";
        this.time = "";

        this.attached();
        this.toView();
    }

    attached() {
        let d = new Date();

        this.weekdays = [];
        this.weekdays[0] = "Sunday";
        this.weekdays[1] = "Monday";
        this.weekdays[2] = "Tuesday";
        this.weekdays[3] = "Wednesday";
        this.weekdays[4] = "Thursday";
        this.weekdays[5] = "Friday";
        this.weekdays[6] = "Saturday";
        
        this.month = [];
        this.month[0] = "January";
        this.month[1] = "February";
        this.month[2] = "March";
        this.month[3] = "April";
        this.month[4] = "May";
        this.month[5] = "June";
        this.month[6] = "July";
        this.month[7] = "August";
        this.month[8] = "September";
        this.month[9] = "October";
        this.month[10] = "November";
        this.month[11] = "December";
        this.clock();
        let self = this;

        setInterval(() => this.clock(), 1000);
    }

    clock() {
        let d = new Date();
        this.date = this.weekdays[d.getDay()].substr(0, 3) + ', ' +this.getOrdinal(d.getDate()) + " of " + (this.month[d.getMonth()])  + " " + d.getFullYear();
        
        this.time = d.getHours()+':'+d.getMinutes();
        if(d.getMinutes().toString().length == 1) {
            this.time = d.getHours()+':0'+d.getMinutes();
        }
    }

    toView(value) {
        //console.log(moment(new Date()).format('D.MM.YYYY'));
        return moment(value).format(('DD.MM.YYYY'));
    }

    getOrdinal(n) {
        if((parseFloat(n) == parseInt(n)) && !isNaN(n)){
            var s=["th","st","nd","rd"],
            v=n%100;
            return n+(s[(v-20)%10]||s[v]||s[0]);
        }
        return n;     
    }
} 


