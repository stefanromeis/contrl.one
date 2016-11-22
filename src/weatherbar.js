import {inject}       from 'aurelia-framework';
import {I18N}         from 'aurelia-i18n';

var jQ = $;

export class Weatherbar {
    constructor () {
        this.city = localStorage.getItem("weather.city") || "San Francisco";
        this.region = "";

        this.code = "";
        this.temp = "";
        this.unit = "";
    
    }
    
    attached () {
                
        this.loadWeather(this.city);

        var self = this;
        
        setInterval(function(){
            self.loadWeather(self.city);
            console.log('City', self.city);
        }, 30000);
        
    }
         
                    
    loadWeather(city) {
        
        var self = this;
      
        jQ.simpleWeather({
            location: city,
            woeid: '',
            unit: 'c',
            success: function(weather) {
                self.code = 'icon-'+weather.code;
                self.temp = weather.temp;
                self.unit = weather.units.temp;
                self.city = weather.city;
                self.region = weather.region;
                
                localStorage.setItem("weather.city", weather.city);

            },
            error: function(error) {
              console.log(error);
              self.city = error;
            }
        });
    
        $("#search").blur();
    }

}
    
