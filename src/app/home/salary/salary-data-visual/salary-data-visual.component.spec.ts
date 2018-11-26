import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryDataVisualComponent } from './salary-data-visual.component';

describe('DataVisualComponent', () => {
  let component: SalaryDataVisualComponent;
  let fixture: ComponentFixture<SalaryDataVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryDataVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryDataVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
