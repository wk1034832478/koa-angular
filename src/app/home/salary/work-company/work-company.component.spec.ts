import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCompanyComponent } from './work-company.component';

describe('WorkCompanyComponent', () => {
  let component: WorkCompanyComponent;
  let fixture: ComponentFixture<WorkCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
