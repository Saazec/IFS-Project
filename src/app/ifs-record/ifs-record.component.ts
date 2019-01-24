import { Component, OnInit, Input } from '@angular/core';
import { IFS } from '../ifs-data/IFS';

@Component({
  selector: 'ifs-record',
  templateUrl: './ifs-record.component.html',
  styleUrls: ['./ifs-record.component.css']
})
export class IfsRecordComponent implements OnInit {

  @Input() record: IFS;
  constructor() { }

  ngOnInit() {
  }

}
