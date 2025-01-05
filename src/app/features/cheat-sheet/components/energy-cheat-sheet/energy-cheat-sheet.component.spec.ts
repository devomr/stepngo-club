import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyCheatSheetComponent } from './energy-cheat-sheet.component';

describe('EnergyCheatSheetComponent', () => {
  let component: EnergyCheatSheetComponent;
  let fixture: ComponentFixture<EnergyCheatSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyCheatSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyCheatSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
