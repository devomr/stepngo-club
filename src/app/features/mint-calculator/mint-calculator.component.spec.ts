import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintCalculatorComponent } from './mint-calculator.component';

describe('MintCalculatorComponent', () => {
  let component: MintCalculatorComponent;
  let fixture: ComponentFixture<MintCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MintCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MintCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
