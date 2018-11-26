import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegerationComponent } from './integeration.component';

describe('IntegerationComponent', () => {
  let component: IntegerationComponent;
  let fixture: ComponentFixture<IntegerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
