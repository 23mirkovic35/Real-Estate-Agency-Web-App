import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateUpdateComponent } from './real-estate-update.component';

describe('RealEstateUpdateComponent', () => {
  let component: RealEstateUpdateComponent;
  let fixture: ComponentFixture<RealEstateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
