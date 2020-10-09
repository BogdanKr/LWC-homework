/**
 * Created by Bogdan on 08.10.2020.
 */

import {LightningElement, wire} from 'lwc';
import getCountriesBySearchType
  from '@salesforce/apex/CountriesApiController.getCountriesBySearchType'
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CountriesApiLwc extends LightningElement {
  searchKey;
  searchType;
  data;
  error;
  isDisabledButton = true;

  handleFindCountries(event) {
    this.searchKey = event.detail.searchKey;
    this.searchType = event.detail.searchType;
  }

  @wire(getCountriesBySearchType,
      {searchKey: '$searchKey', searchType: '$searchType'})
  countries({error, data}) {
    if (data) {
      this.data = data;
      this.error = error;
      this.showToast('success');
      this.isDisabledButton = false;
    }
    if (error) {
      this.data = '';
      this.showToast('error');
      this.isDisabledButton = true;

    }
  };

  showToast(variant) {
    let evt;
    if (variant === 'error') {
      evt = new ShowToastEvent({
        title: 'Sorry..',
        message: 'Something goes wrong',
        variant: 'error'
      });
    }
    if (variant === 'success') {
      evt = new ShowToastEvent({
        title: 'Request success',
        variant: 'success'
      });
    }
    this.dispatchEvent(evt);
  }

  handleShowModal() {
    const modal = this.template.querySelector('c-countries-api-modal');
    modal.show();
  }

}