import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionGraphComponent } from './region-graph.component';

describe('RegionGraphComponent', () => {
  let component: RegionGraphComponent;
  let fixture: ComponentFixture<RegionGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
