/**
 * Created by Bogdan on 08.10.2020.
 */

import {LightningElement} from 'lwc';

export default class CountriesApiSearchForm extends LightningElement {
  searchKey;
  searchType = 'name';

  searchTypeOptions = [
    {label: 'Name', value: 'name'},
    {label: 'Currency', value: 'currency'},
    {label: 'Capital', value: 'capital'}
  ];

  searchKeyChange(event) {
    this.searchKey = event.target.value;
  }

  searchTypeChange(event) {
    this.searchType = event.target.value;
  }

  findCountries() {
    this.dispatchEvent(new CustomEvent('findcountries', {
      detail: {
        searchKey: this.searchKey,
        searchType: this.searchType
      }
    }))
  }
}