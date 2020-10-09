/**
 * Created by Bogdan on 09.10.2020.
 */

import {LightningElement, api} from 'lwc';

export default class CountriesApiTable extends LightningElement {
  columns = [
    {label: "Country name", fieldName: "name", type: "text"},
    {label: "Capital", fieldName: "capital", type: "text"},
    {label: "Population", fieldName: "population", type: "number"},
    {label: "Subregion", fieldName: "subregion", type: "text"},
    {label: "Currency code", fieldName: "currencyCode", type: "text"}
  ];

  @api countries;
}