import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { ODService } from '../od.service';
import { IOD } from './IOD';
import { element } from '@angular/core/src/render3';
import * as _ from 'lodash';
@Component({
  selector: 'operational-data',
  templateUrl: './operational-data.component.html',
  styleUrls: ['./operational-data.component.css']
})
export class OperationalDataComponent implements OnInit {

  odData: IOD[];
  originalData: IOD[];
  pointer: number = 0;
  totalRecords: number;
  disableNext: boolean = false;
  p: number = 1;
  constructor(private odservice: ODService, private toastr: ToastrService) { }

  ngOnInit() {
    this.odservice.getAll().subscribe(
      data => {
        this.odData = data;
        this.originalData = JSON.parse(JSON.stringify(data));
        // this.paginate()
      }
    )
  }

  paginate() {
    this.totalRecords = Math.ceil(this.odData.length / 3);

    if (this.pointer == 0) {
      this.odData = this.originalData.slice(0, 3);
    } else {
      this.odData.length == 0 ? this.disableNext = true : this.disableNext = false;
      this.odData = this.originalData.slice(3 * this.pointer, 3 * 2 * this.pointer);
    }

  }

  next() {
    this.pointer++;
    this.paginate();
  }

  previous() {
    this.pointer--;
    this.paginate();
  }

  filterRecords(searchKey) {
    if (searchKey) {
      let filteredArray: IOD[] = this.searchFn(searchKey);
      console.log(filteredArray);
      
      // searchKey = searchKey.toLowerCase();
      // let filteredArray: IOD[] = [];
      // this.originalData.forEach(record => {
      //   for (let key in record) {
      //     if (String(record.serial).includes(searchKey)) {
      //       filteredArray.push(record);
      //       return;
      //     } else if (record.category.toLowerCase().includes(searchKey)) {
      //       filteredArray.push(record);
      //       return;
      //     } else if (record.date.toLowerCase().includes(searchKey)) {
      //       filteredArray.push(record);
      //       return;
      //     } else if (record.impact.toLowerCase().includes(searchKey)) {
      //       filteredArray.push(record);
      //       return;
      //     } else if (record.message.toLowerCase().includes(searchKey)) {
      //       filteredArray.push(record);
      //       return;
      //     } else if (record.time.toLowerCase().includes(searchKey)) {
      //       filteredArray.push(record);
      //       return;
      //     }
      //   }
      // });
      this.odData = filteredArray;
      if (!this.odData.length) {
        this.toastr.error('No records found', 'Error !');
      }
    } else {
      this.odData = this.originalData;
    }
  }

  searchFn (searchKey: string): IOD[] {
    let _searchKey: string = searchKey.toLowerCase();
    return _.filter(this.originalData, item => {
      return item.category.indexOf(_searchKey) > -1;
    })    
  }
  checkIfEmpty(searchKey) {
    if (!searchKey || !searchKey.length) {
      this.odData = this.originalData;
      this.disableNext = false;
      this.pointer = 0;
      this.paginate();
    }
  }

  searchOnChange(searchKey) {
    if (!searchKey) {
      this.odData = this.originalData;
      return;
    }
    let _searchKey = searchKey.split('-');
    let _searcDate = "" + _searchKey[2] + '/' + _searchKey[1] + '/' + _searchKey[0];
    // this.filterRecords(_searcDate);
    let filteredArray: IOD[] = [];
    this.originalData.forEach(record => {
      if (record.date == _searcDate) {
        filteredArray.push(record);
      }
    })
    this.odData = filteredArray;
    if (this.odData.length <= 3) {
      this.pointer = 0;
      this.disableNext = true;
    }
  }

}
