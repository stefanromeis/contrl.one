import {inject}     from 'aurelia-framework';

export class Modal {
    constructor() {
        this.modal = {
            head: "Header",
            content: "...",
            caption: "Date: "
        }
        
    }

    attached () {

    }

    // When the user clicks the button, open the modal
   
   open (){
        $('#myModal').show();
    }

    // When the user clicks on <span> (x), close the modal
    close (event){
         console.log(event.taget);
            $('#myModal').hide();
        
       
        
    }


}