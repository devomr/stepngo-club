import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HausCalculatorComponent } from './haus-calculator.component';

describe('HausCalculatorComponent', () => {
  let component: HausCalculatorComponent;
  let fixture: ComponentFixture<HausCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HausCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HausCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
