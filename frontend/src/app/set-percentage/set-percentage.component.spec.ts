import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPercentageComponent } from './set-percentage.component';

describe('SetPercentageComponent', () => {
  let component: SetPercentageComponent;
  let fixture: ComponentFixture<SetPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
