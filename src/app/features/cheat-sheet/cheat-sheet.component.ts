import { Component } from '@angular/core';
import { Tab } from './types/tab.type';
import { CommonModule } from '@angular/common';
import { EnergyCheatSheetComponent } from './components/energy-cheat-sheet/energy-cheat-sheet.component';
import { LevelUpCheatSheetComponent } from './components/level-up-cheat-sheet/level-up-cheat-sheet.component';

@Component({
  selector: 'app-cheat-sheet',
  standalone: true,
  imports: [
    CommonModule,
    EnergyCheatSheetComponent,
    LevelUpCheatSheetComponent,
  ],
  templateUrl: './cheat-sheet.component.html',
  styleUrl: './cheat-sheet.component.css',
})
export class CheatSheetComponent {
  readonly tabs: Tab[] = [
    { id: 1, name: 'Burn, Energy & Energy Cap', isActive: true },
    { id: 2, name: 'Sneaker Level Up', isActive: false },
  ];

  activeTabIdx: number = 1;

  selectTab(id: number): void {
    this.activeTabIdx = id;
    this.tabs.forEach((t) => (t.isActive = t.id === id));
  }
}
