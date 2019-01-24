import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfsRecordComponent } from './ifs-record.component';

describe('IfsRecordComponent', () => {
  let component: IfsRecordComponent;
  let fixture: ComponentFixture<IfsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfsRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
