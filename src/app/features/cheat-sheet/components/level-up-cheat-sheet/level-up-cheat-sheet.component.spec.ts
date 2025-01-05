import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelUpCheatSheetComponent } from './level-up-cheat-sheet.component';

describe('LevelUpCheatSheetComponent', () => {
  let component: LevelUpCheatSheetComponent;
  let fixture: ComponentFixture<LevelUpCheatSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelUpCheatSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelUpCheatSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
