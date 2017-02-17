import {inject, useView} from 'aurelia-framework';
import {CustomHttpClient} from './customHttpClient';
import 'isomorphic-fetch'; // if you need a fetch polyfill
@inject(CustomHttpClient)
@useView('./todo.html')
export class Customer2{
  heading = 'Customer management with custom http service';
  customers = [];

  url = 'api/user';

  constructor(http){
    this.http = http;
  }

  activate(){

   return this.http.fetch(this.url)
   .then(response =>  response.json())
   .then(c => this.customers = c);
}

}