import {inject}             from 'aurelia-framework';
import {HttpClient}         from 'aurelia-fetch-client';

@inject(HttpClient)
export class News {

    constructor(http) {
        this.http = http;
        this.source = localStorage.getItem("newsSource") || "t3n";
        this.articles;
        this.author;
        this.description;
        this.publishedAt;
        this.title;
        this.url;
        this.urlToImage;
        this.image;

        this.getArticles(this.source);
        this.index = 0;
    }

    getArticles(source) {
        let self = this;
        localStorage.setItem('newsSource', source);
        this.http.fetch('https://newsapi.org/v1/articles?source='+source+'&apiKey=356bfc9442404652add03b1e0cc1a527')
            .then(response => response.json())
            .then(data => {
                self.articles = data.articles; 
                //console.log(data.articles);
                this.index = 0;
                self.loadNews();              
            }) 
    }


    loadNews() {
        document.getElementById("search").blur();
        this.author = this.articles[this.index].author;
        this.description = this.articles[this.index].description;
        this.publishedAt = this.articles[this.index].publishedAt;
        this.title = this.articles[this.index].title;
        this.url = this.articles[this.index].url;
        this.urlToImage = this.articles[this.index].urlToImage;
        this.loadImage(this.urlToImage);
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