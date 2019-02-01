import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentTemplate: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  loadTab(tabName: string) {
    if (tabName === 'ifsTab') {
      this.currentTemplate = true;
    } else {
      this.currentTemplate = false;
    }
  }
}
