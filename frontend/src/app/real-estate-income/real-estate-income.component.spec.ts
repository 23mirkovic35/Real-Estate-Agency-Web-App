import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateIncomeComponent } from './real-estate-income.component';

describe('RealEstateIncomeComponent', () => {
  let component: RealEstateIncomeComponent;
  let fixture: ComponentFixture<RealEstateIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
