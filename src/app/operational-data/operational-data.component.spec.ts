import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalDataComponent } from './operational-data.component';

describe('OperationalDataComponent', () => {
  let component: OperationalDataComponent;
  let fixture: ComponentFixture<OperationalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
