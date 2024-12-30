import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnCalculatorComponent } from './earn-calculator.component';

describe('EarnCalculatorComponent', () => {
  let component: EarnCalculatorComponent;
  let fixture: ComponentFixture<EarnCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarnCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarnCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
