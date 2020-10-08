/**
 * Created by Bogdan on 08.10.2020.
 */

import {LightningElement, wire} from 'lwc';
import getContactList
  from '@salesforce/apex/MyPaginatorController.getContactList';
import countContacts
  from '@salesforce/apex/MyPaginatorController.countContacts';

const columns = [
  {label: 'Contact Name', fieldName: 'Name'},
  {label: 'Title', fieldName: 'Title', type: 'text'},
  {label: 'Phone', fieldName: 'Phone', type: 'phone'},
  {label: 'Email', fieldName: 'Email', type: 'email'},
];

export default class PaginatorContactList extends LightningElement {
  data;
  error;
  columns = columns;
  currentPage = 1;
  pageSize = 10;
  @wire(countContacts) countRecords;


  @wire(getContactList, {pageNumber: '$currentPage', pageSize: '$pageSize'})
  valueList({error, data}) {
    if (data) {
      console.log(data);
      this.data = data;
      this.error = error;
      console.log('data.length ' + data.length);
      this.totalPages = Math.ceil(this.countRecords.data / this.pageSize);
      // this.countRecords = data.length;
    } else {
      console.log('Some error in getting contacts')
    }
  }

  handleFirst(){
    this.currentPage = 1;
  }

  handlePrevious() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }
  }

  handleNext() {
    if (Math.ceil(this.countRecords.data / this.pageSize) > this.currentPage) {
      this.currentPage = this.currentPage + 1;
    }
  }

  handleLast(){
    this.currentPage = Math.ceil(this.countRecords.data / this.pageSize);
  }

  handleSelect(event) {
    this.currentPage = 1;
    this.pageSize = event.detail;
  }
}