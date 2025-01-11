import { Component } from '@angular/core';
import { AlertComponent } from '@shared/components/alert/alert.component';

@Component({
  selector: 'app-energy-cheat-sheet',
  standalone: true,
  imports: [AlertComponent],
  templateUrl: './energy-cheat-sheet.component.html',
  styleUrl: './energy-cheat-sheet.component.css',
})
export class EnergyCheatSheetComponent {
  readonly data = [
    {
      sneakers: 1,
      totalSneakers: 1,
      totalEnergy: 90,
      energyCap: 2,
    },
    {
      sneakers: 2,
      totalSneakers: 3,
      totalEnergy: 270,
      energyCap: 3,
    },
    {
      sneakers: 2,
      totalSneakers: 5,
      totalEnergy: 450,
      energyCap: 4,
    },
    {
      sneakers: 3,
      totalSneakers: 8,
      totalEnergy: 720,
      energyCap: 5,
    },
    {
      sneakers: 3,
      totalSneakers: 11,
      totalEnergy: 990,
      energyCap: 6,
    },
    {
      sneakers: 3,
      totalSneakers: 14,
      totalEnergy: 1260,
      energyCap: 7,
    },
    {
      sneakers: 4,
      totalSneakers: 18,
      totalEnergy: 1620,
      energyCap: 8,
    },
    {
      sneakers: 4,
      totalSneakers: 22,
      totalEnergy: 1980,
      energyCap: 9,
    },
    {
      sneakers: 4,
      totalSneakers: 26,
      totalEnergy: 2340,
      energyCap: 10,
    },
    {
      sneakers: 5,
      totalSneakers: 31,
      totalEnergy: 2790,
      energyCap: 11,
    },
    {
      sneakers: 5,
      totalSneakers: 36,
      totalEnergy: 3240,
      energyCap: 12,
    },
    {
      sneakers: 5,
      totalSneakers: 41,
      totalEnergy: 3690,
      energyCap: 13,
    },
    {
      sneakers: 6,
      totalSneakers: 47,
      totalEnergy: 4230,
      energyCap: 14,
    },
    {
      sneakers: 6,
      totalSneakers: 53,
      totalEnergy: 4770,
      energyCap: 15,
    },
    {
      sneakers: 6,
      totalSneakers: 59,
      totalEnergy: 5310,
      energyCap: 16,
    },
    {
      sneakers: 7,
      totalSneakers: 66,
      totalEnergy: 5940,
      energyCap: 17,
    },
    {
      sneakers: 8,
      totalSneakers: 74,
      totalEnergy: 6660,
      energyCap: 18,
    },
    {
      sneakers: 9,
      totalSneakers: 83,
      totalEnergy: 7470,
      energyCap: 19,
    },
    {
      sneakers: 10,
      totalSneakers: 93,
      totalEnergy: 8370,
      energyCap: 20,
    },
    {
      sneakers: 12,
      totalSneakers: 105,
      totalEnergy: 9450,
      energyCap: 21,
    },
    {
      sneakers: 14,
      totalSneakers: 119,
      totalEnergy: 10710,
      energyCap: 22,
    },
    {
      sneakers: 16,
      totalSneakers: 135,
      totalEnergy: 12150,
      energyCap: 23,
    },
    {
      sneakers: 18,
      totalSneakers: 153,
      totalEnergy: 13770,
      energyCap: 24,
    },
    {
      sneakers: 20,
      totalSneakers: 173,
      totalEnergy: 15570,
      energyCap: 25,
    },
    {
      sneakers: 40,
      totalSneakers: 213,
      totalEnergy: 19170,
      energyCap: 26,
    },
    {
      sneakers: 60,
      totalSneakers: 273,
      totalEnergy: 24570,
      energyCap: 27,
    },
    {
      sneakers: 80,
      totalSneakers: 353,
      totalEnergy: 31770,
      energyCap: 28,
    },
    {
      sneakers: 100,
      totalSneakers: 453,
      totalEnergy: 40770,
      energyCap: 29,
    },
    {
      sneakers: 200,
      totalSneakers: 653,
      totalEnergy: 58770,
      energyCap: 30,
    },
  ];
}
