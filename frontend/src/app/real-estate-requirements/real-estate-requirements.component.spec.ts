import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateRequirementsComponent } from './real-estate-requirements.component';

describe('RealEstateRequirementsComponent', () => {
  let component: RealEstateRequirementsComponent;
  let fixture: ComponentFixture<RealEstateRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateRequirementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
