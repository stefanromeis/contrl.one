import {inject}             from 'aurelia-framework';
import {HttpClient}         from 'aurelia-fetch-client';

@inject(HttpClient)
export class News {

    constructor(http) {
        this.http = http;
        this.sources = [];
        this.source = localStorage.getItem("newsSource") || "cnn";
        this.articles;
        this.author;
        this.description;
        this.publishedAt;
        this.title;
        this.url;
        this.urlToImage;
        this.image;
        this.headline = "";
        this.activeSource = {
            name: "",
            id: "",
            urlsToLogos: "",
            url: ""
        }
        this.isLoading = false;
    }

    attached () {
        this.getSources();
        this.index = 0;   

        // or if no option is preselected
        $(this.selectSource).on('change', e => {
            this.getArticles (e.target.value);
            this.isLoading = true;
        });

        
    }

    getSources() {
        let self = this;
        //localStorage.setItem('newsSource', source);
        this.http.fetch('https://newsapi.org/v1/sources?language=en&apiKey=356bfc9442404652add03b1e0cc1a527')
            .then(response => response.json())
            .then(data => {
                for(var x = 0; x < data.sources.length; x++) {
                    let source = {};
                    source.name = data.sources[x].name;
                    source.id = data.sources[x].id;
                    source.urlsToLogos = data.sources[x].urlsToLogos.medium;
                    source.url = data.sources[x].url;
                    //console.log('id ',data.sources[x].id);
                    self.sources.push(source);
                }
                self.getArticles(self.source);
            })
    }

    getArticles(source) {
        this.source = source;

        var result = $.grep(this.sources, function(e){ return e.id== source; });
        if(result.length > 0) {
            this.activeSource.name = result[0].name;
            this.activeSource.id = result[0].id;
            this.activeSource.urlsToLogos = result[0].urlsToLogos;
            this.activeSource.url = result[0].url;
        }

        localStorage.setItem('newsSource', source);
        
        let self = this;
        this.http.fetch('https://newsapi.org/v1/articles?source='+source.toLowerCase()+'&apiKey=356bfc9442404652add03b1e0cc1a527')
            .then(response => response.json())
            .then(data => {
                self.articles = data.articles; 
                //console.log(data.articles);
                //self.loadNews();   
                this.isLoading = false;
           
            }) 
    }


    loadNews() {
        //document.getElementById("search").blur();
        this.author = this.articles[this.index].author;
        this.description = this.articles[this.index].description;
        this.publishedAt = this.articles[this.index].publishedAt.split(/-|T/);
        this.title = this.articles[this.index].title;
        this.url = this.articles[this.index].url;
        this.urlToImage = this.articles[this.index].urlToImage;
        
    }

    getNextNews () {
        this.index = this.index + 1;
        this.loadNews();
    }

    getPrevNews () {
        this.index = this.index - 1;
        this.loadNews();
    }

    loadImage(urlToImage) {
        let self = this;
        this.http.fetch(urlToImage)
            .then(response => response)
            .then(data => {
                self.image = data;              
            }) 
    }


    
}