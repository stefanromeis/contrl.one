import {inject}     from 'aurelia-framework';
import {Gmail}      from 'Gmail';

@inject(Gmail)
export class Modal {
    constructor(Gmail) {
        this.modal = {
            head: "Header",
            content: "...",
            caption: "Date: "
        }
        this.Gmail = Gmail;
        
    }

    attached () {

        console.log('jo', this.Gmail.content.data);
    }

    // When the user clicks the button, open the modal
   
   open (){
        console.log('jo', this.Gmail.content.data);
       console.log('xaxs');
        $('#myModal').show();
    }

    // When the user clicks on <span> (x), close the modal
    close (){
         $('#myModal').hide();;
    }


}