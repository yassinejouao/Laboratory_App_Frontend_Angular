import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartMonthlyComponent } from './BarChartMonthlyComponent';

describe('BarChartMonthlyComponent', () => {
  let component: BarChartMonthlyComponent;
  let fixture: ComponentFixture<BarChartMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarChartMonthlyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
