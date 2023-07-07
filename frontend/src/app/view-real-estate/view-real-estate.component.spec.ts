import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRealEstateComponent } from './view-real-estate.component';

describe('ViewRealEstateComponent', () => {
  let component: ViewRealEstateComponent;
  let fixture: ComponentFixture<ViewRealEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRealEstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRealEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
