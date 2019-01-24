import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IFSDataComponent } from './ifs-data.component';

describe('IFSDataComponent', () => {
  let component: IFSDataComponent;
  let fixture: ComponentFixture<IFSDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IFSDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IFSDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
