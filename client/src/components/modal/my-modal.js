import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)

export class Prompt {

   constructor(controller){
      this.controller = controller;
      this.answer = null;

      controller.settings.centerHorizontalOnly = true;
   }

   activate(message) {
        this.message = message;

        //console.log($('#message-content'));    
        
        var ifrm = $('#message-content')[0].contentWindow.document;
        $('body', ifrm).html(message.Content);

   }

   test () {
       console.log('test');
       
   }

}