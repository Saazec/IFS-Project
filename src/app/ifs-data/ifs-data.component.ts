import { Component, OnInit } from '@angular/core';
import { IFS } from './IFS';
import { IfsServiceService } from '../ifs-service.service'
import { from, Observable } from 'rxjs';
import { loginComponent } from '../login/login.component'; 
@Component({
  selector: 'ifs-data',
  templateUrl: './ifs-data.component.html',
  styleUrls: ['./ifs-data.component.css']
})
export class IFSDataComponent implements OnInit {
  ifsRecords: IFS[];
  errorMsg: string;
  originalIfsData: IFS[];
  isEditable: boolean = false;
  paginationCounter: number = 0;
  maxLength: boolean;
  reportedErrorMsg = false;
  formData: any = {};
  p: number = 1;
  currentIndex: number;
  constructor(private ifsService: IfsServiceService) { }
  ngOnInit() {
    this.ifsService.getAll().subscribe(
      data => {
        this.ifsRecords = data;
        this.originalIfsData = JSON.parse(JSON.stringify(data));
      },
      error => this.errorMsg = <any>error
    )
  }

  getTodaysDate(): string {
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = "" + today.getMonth() + 1;
    let dd = today.getDate();
    if (mm.length < 2) {
      mm = '0' + mm;
    }
    let todaysDate = yyyy + '-' + mm + '-' + dd;
    return todaysDate;
  }
  paginate(startFrom?: number) {
    if (startFrom) {
      this.ifsRecords = [];
      this.ifsRecords = this.originalIfsData.slice(startFrom, 3);
      console.log(this.ifsRecords);
      return;
    }
    if (this.paginationCounter == 0) {
      this.ifsRecords = this.originalIfsData.slice(0, 3);
    } else {
      this.ifsRecords = this.originalIfsData.slice(3 * this.paginationCounter, 3 * 2 * this.paginationCounter);
      this.ifsRecords.length == 0 ? this.maxLength = true : false;
    }
  }
  filterRecords(filterBy) {
    if (filterBy) {
      filterBy = filterBy.toLowerCase();
      let rgx = /filterBy/gi;
      let filteredArray: IFS[] = [];
      this.originalIfsData.forEach(record => {
        for (let key in record) {
          if (String(record.caseNumber).includes(filterBy)) {
            filteredArray.push(record);
            return;
          } else if (record.createdOn.toLowerCase().includes(filterBy)) {
            filteredArray.push(record);
            return;
          } else if (record.division.toLowerCase().includes(filterBy)) {
            filteredArray.push(record);
            return;
          } else if (record.engineScore.toLowerCase().includes(filterBy)) {
            filteredArray.push(record);
            return;
          } else if (record.feedbackType.toLowerCase().includes(filterBy)) {
            filteredArray.push(record);
            return;
          } else if (record.lastSaved.toLowerCase().includes(filterBy)) {
            filteredArray.push(record);
            return;
          } else if (record.reportedDate.toLowerCase().includes(filterBy)) {
            filteredArray.push(record);
            return;
          } else if (record.source.toLowerCase().includes(filterBy)) {
            filteredArray.push(record);
            return;
          }
        }
      })
      this.ifsRecords = filteredArray;
      if (this.ifsRecords.length < 3) {
        this.maxLength = true;
        this.paginationCounter = 0;
      }
      // this.paginate();
    } else {
      this.ifsRecords = this.originalIfsData;
    }
  }

  loadDefault(searchKey) {
    if (!searchKey.length) {
      this.ifsRecords = this.originalIfsData;
      this.maxLength = false;
      this.paginationCounter = 0;
      // this.paginate();
    }
  }

  enableEditing(event, item, index) {
    this.currentIndex = index;
    console.log(index);
    // event.target.nextElementSibling.classList.remove('disable-element');
  }

  saveRecord(event, data) {
    this.currentIndex = null;
    console.log(data);
    if (data) {
      this.originalIfsData[data.caseNumber - 1].source = data.source;
      this.originalIfsData[data.caseNumber - 1].feedbackType = data.feedbackType;
      this.originalIfsData[data.caseNumber - 1].division = data.division;
      this.originalIfsData[data.caseNumber - 1].reportedDate = data.reportedDate;
      this.originalIfsData[data.caseNumber - 1].createdOn = data.createdOn;
      this.originalIfsData[data.caseNumber - 1].engineScore = data.engineScore;
      this.originalIfsData[data.caseNumber - 1].lastSaved = data.lastSaved;
    }
    this.ifsRecords = this.originalIfsData;
  }
  previous() {
    this.paginationCounter--;
    this.maxLength = false;
    this.paginate();
  }

  next() {
    this.paginationCounter++;
    this.paginate();
  }
  addIfsRecord(formData, form) {
    if (form.valid && !this.reportedErrorMsg) {
      let param: IFS = {
        caseNumber: formData.caseNumber,
        createdOn: formData.createdOn,
        division: formData.division,
        feedbackType: formData.feedbackType,
        reportedDate: formData.reportedDate,
        source: formData.source,
        engineScore: 'EOS',
        lastSaved: 'Kathrine Langford'
      };
      this.ifsRecords.push(param);
      this.originalIfsData.push(param);
      this.ifsService.add(param);
      form.reset();
      form.resetForm();
    } else {
      return;
    }
  }

  checkDate(element, event, createdDate, reportedDate) {
    this.reportedErrorMsg = false;
    if (createdDate && reportedDate) {
      let _created = createdDate.split('-');
      let _reported = reportedDate.split('-')
      if (+_created[0] > +_reported[0]) {
        this.reportedErrorMsg = true;
        return;
      }
      if (+_created[1] > +_reported[1]) {
        this.reportedErrorMsg = true;
        return;
      }
      if (+_created[2] > +_reported[2]) {
        this.reportedErrorMsg = true;
        return;
      }
    }
  }

  searchOnChange(searchDate) {
    if (!searchDate) {
      this.ifsRecords = this.originalIfsData;
      return;
    }
    let _searchDate = searchDate.split('-');
    let _date = "" + _searchDate[2] + '/' + _searchDate[1] + '/' + _searchDate[0];
    let filteredArray: IFS[] = [];
    this.originalIfsData.forEach(record => {
      if (record.reportedDate == _date) {
        filteredArray.push(record)
      }
    });
    this.ifsRecords = filteredArray;
    // if(this.ifsRecords.length <= 3) {
    //   // this.ifsRecords = this.originalIfsData;
    //   this.maxLength = false;
    //   this.paginationCounter = 0;
    //   this.paginate();
    // }
    if (this.ifsRecords.length <= 3) {
      this.maxLength = true;
      this.paginationCounter = 0;
    }
  }
}
