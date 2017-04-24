import {I18N}   from 'aurelia-i18n';
import {inject} from 'aurelia-framework';



@inject(I18N)
export class Welcome {
  constructor (){
    // Setup Dependencies

    this.heading = 'Welcome to the Aurelia Navigation App!';
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.previousValue = this.fullName;

  }  

  // Lifecycle method called when a route is activated
  activate() {
    if(localStorage.getItem('token')){
      // Resolve promise returned from igService
      return this.igService.recent()
        .then(res => res.response.data)
        .then(recent =>
          {
            // Bind to view
            this.recent = recent
          });
      }
  }

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}



