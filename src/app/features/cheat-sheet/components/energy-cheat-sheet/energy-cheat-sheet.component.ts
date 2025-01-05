import { Component } from '@angular/core';

@Component({
  selector: 'app-energy-cheat-sheet',
  standalone: true,
  imports: [],
  templateUrl: './energy-cheat-sheet.component.html',
  styleUrl: './energy-cheat-sheet.component.css',
})
export class EnergyCheatSheetComponent {
  private readonly COMMON_ENERGY = 90;

  readonly data = [
    {
      sneakers: 1,
      totalEnergy: this.COMMON_ENERGY,
      energyCap: 2,
    },
    {
      sneakers: 270 / this.COMMON_ENERGY,
      totalEnergy: 270,
      energyCap: 3,
    },
    {
      sneakers: 450 / this.COMMON_ENERGY,
      totalEnergy: 450,
      energyCap: 4,
    },
    {
      sneakers: 720 / this.COMMON_ENERGY,
      totalEnergy: 720,
      energyCap: 5,
    },
    {
      sneakers: 990 / this.COMMON_ENERGY,
      totalEnergy: 990,
      energyCap: 6,
    },
    {
      sneakers: 1260 / this.COMMON_ENERGY,
      totalEnergy: 1260,
      energyCap: 7,
    },
    {
      sneakers: 1620 / this.COMMON_ENERGY,
      totalEnergy: 1620,
      energyCap: 8,
    },
    {
      sneakers: 1980 / this.COMMON_ENERGY,
      totalEnergy: 1980,
      energyCap: 9,
    },
    {
      sneakers: 2340 / this.COMMON_ENERGY,
      totalEnergy: 2340,
      energyCap: 10,
    },
    {
      sneakers: 2790 / this.COMMON_ENERGY,
      totalEnergy: 2790,
      energyCap: 11,
    },
    {
      sneakers: 3240 / this.COMMON_ENERGY,
      totalEnergy: 3240,
      energyCap: 12,
    },
    {
      sneakers: 3690 / this.COMMON_ENERGY,
      totalEnergy: 3690,
      energyCap: 13,
    },
    {
      sneakers: 4230 / this.COMMON_ENERGY,
      totalEnergy: 4230,
      energyCap: 14,
    },
    {
      sneakers: 4770 / this.COMMON_ENERGY,
      totalEnergy: 4770,
      energyCap: 15,
    },
    {
      sneakers: 5310 / this.COMMON_ENERGY,
      totalEnergy: 5310,
      energyCap: 16,
    },
    {
      sneakers: 5940 / this.COMMON_ENERGY,
      totalEnergy: 5940,
      energyCap: 17,
    },
    {
      sneakers: 6660 / this.COMMON_ENERGY,
      totalEnergy: 6660,
      energyCap: 18,
    },
    {
      sneakers: 7470 / this.COMMON_ENERGY,
      totalEnergy: 7470,
      energyCap: 19,
    },
    {
      sneakers: 8370 / this.COMMON_ENERGY,
      totalEnergy: 8370,
      energyCap: 20,
    },
    {
      sneakers: 9450 / this.COMMON_ENERGY,
      totalEnergy: 9450,
      energyCap: 21,
    },
    {
      sneakers: 10710 / this.COMMON_ENERGY,
      totalEnergy: 10710,
      energyCap: 22,
    },
    {
      sneakers: 12150 / this.COMMON_ENERGY,
      totalEnergy: 12150,
      energyCap: 23,
    },
    {
      sneakers: 13770 / this.COMMON_ENERGY,
      totalEnergy: 13770,
      energyCap: 24,
    },
    {
      sneakers: 15570 / this.COMMON_ENERGY,
      totalEnergy: 15570,
      energyCap: 25,
    },
    {
      sneakers: 19170 / this.COMMON_ENERGY,
      totalEnergy: 19170,
      energyCap: 26,
    },
    {
      sneakers: 24570 / this.COMMON_ENERGY,
      totalEnergy: 24570,
      energyCap: 27,
    },
    {
      sneakers: 31770 / this.COMMON_ENERGY,
      totalEnergy: 31770,
      energyCap: 28,
    },
    {
      sneakers: 40770 / this.COMMON_ENERGY,
      totalEnergy: 40770,
      energyCap: 29,
    },
    {
      sneakers: 58770 / this.COMMON_ENERGY,
      totalEnergy: 58770,
      energyCap: 30,
    },
  ];
}
