import {inject}             from 'aurelia-framework';

export class News {

    constructor() {
        this.sources = [];
        this.source = localStorage.getItem("news.en.source") || localStorage.getItem("news.de.source") || "cnn";
        this.lang = localStorage.getItem("news.lang") || "en";
        this.articles;
        this.tempArticles;
        this.firstLoad = true;
        this.updates = 0;
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
        this.getSources(this.lang);
        this.index = 0;   
        var self = this;
        // or if no option is preselected
        $(this.selectSource).on('change', e => {
            this.getArticles (e.target.value);
        });

        setInterval(function(){
            self.getSources(self.lang);
        }, 10000);
        
    }

    getSources(lang) {
        let self = this;
        this.lang = lang;
        this.isLoading = true;
        $.ajax({
            url: 'https://newsapi.org/v1/sources?language=' + self.lang + '&apiKey=356bfc9442404652add03b1e0cc1a527',
            dataType: 'json',
            type: 'GET'
            }).done(function( data ) {
                self.sources = [];
                for(var x = 0; x < data.sources.length; x++) {
                    let source = {};
                    source.name = data.sources[x].name;
                    source.id = data.sources[x].id;
                    source.urlsToLogos = data.sources[x].urlsToLogos.medium;
                    source.url = data.sources[x].url;
                    self.sources.push(source);
                }
                var str = 'news.' + self.lang + '.source';
                
                if(localStorage.getItem(str) !== 'null') {
                    self.source = localStorage.getItem(str);
                }
                else {
                    self.source = self.lang == 'de' ? 'bild' : 'cnn';
                }
                localStorage.setItem('news.lang', self.lang);
                self.getArticles(self.source);
            });
    }

    getArticles(source) {
        var result = $.grep(this.sources, function(e){ return e.id== source; });
        
        if(result.length > 0) {
            this.activeSource.name = result[0].name;
            this.activeSource.id = result[0].id;
            this.activeSource.urlsToLogos = result[0].urlsToLogos;
            this.activeSource.url = result[0].url;
        }
        var str = 'news.' + this.lang + '.source';
        localStorage.setItem(str, source);

        let self = this;
        $.ajax({
            url: 'https://newsapi.org/v1/articles?source='+source.toLowerCase()+'&apiKey=356bfc9442404652add03b1e0cc1a527',
            dataType: 'json',
            type: 'GET'
            }).done(function( data ) {
                self.articles = data.articles;
                self.isLoading = false;
                
                if(self.firstLoad) {
                    self.tempArticles = self.articles;
                    this.firstLoad = false;
                }
                else {
                    if(self.articles.title != self.tempArticles.title) {
                        self.updates++;
                    }
                }

            })



    }
    
}