/**
 * Created by Bogdan on 09.10.2020.
 */

import {LightningElement, api} from 'lwc';


export default class CountriesApiModal extends LightningElement {
  showModal = false;
  @api countries;

  @api show() {
    this.showModal = true;
  }

  handleCloseModal() {
    this.showModal = false;
  }
}