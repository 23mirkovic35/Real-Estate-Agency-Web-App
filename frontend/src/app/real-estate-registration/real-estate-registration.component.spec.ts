import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateRegistrationComponent } from './real-estate-registration.component';

describe('RealEstateRegistrationComponent', () => {
  let component: RealEstateRegistrationComponent;
  let fixture: ComponentFixture<RealEstateRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
