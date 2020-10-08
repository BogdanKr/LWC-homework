/**
 * Created by Bogdan on 08.10.2020.
 */

import {LightningElement, api} from 'lwc';

export default class PaginatorButton extends LightningElement {
  handleFirst() {
    this.dispatchEvent(new CustomEvent('first'));
  }

  handlePrevious() {
    this.dispatchEvent(new CustomEvent('previous'));
  }

  handleNext() {
    this.dispatchEvent(new CustomEvent('next'));
  }

  handleLast() {
    this.dispatchEvent(new CustomEvent('last'));
  }

  handleOnselect(event) {
    let pageSize = event.detail.value;
    this.dispatchEvent(new CustomEvent('select', {
      detail: pageSize
    }))
  }
}