
import {customAttribute, inject, bindable} from 'aurelia-framework';
import $ from 'bootstrap';

@customAttribute('tooltip')
@inject(Element)
export class BootstrapTooltip {
    element: HTMLElement;
    @bindable title: any;
    @bindable placement: any;

    constructor(element) {
        this.element = element;
    }

    attached() {

        $(this.element).tooltip({
            title:this.title,
            placement:this.placement
        });
    }
}