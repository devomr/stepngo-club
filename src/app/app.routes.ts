import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'EARNINGS_CALCULATOR_PAGE',
    loadComponent: () =>
      import('./features/earn-calculator/earn-calculator.component').then(
        (x) => x.EarnCalculatorComponent,
      ),
  },
  {
    path: 'mint-calculator',
    title: 'MINT_CALCULATOR_PAGE',
    loadComponent: () =>
      import('./features/mint-calculator/mint-calculator.component').then(
        (x) => x.MintCalculatorComponent,
      ),
  },
  {
    path: 'haus-calculator',
    title: 'HAUS_CALCULATOR_PAGE',
    loadComponent: () =>
      import('./features/haus-calculator/haus-calculator.component').then(
        (x) => x.HausCalculatorComponent,
      ),
  },
  {
    path: 'dashboard',
    title: 'DASHBOARD_PAGE',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (x) => x.DashboardComponent,
      ),
  },
  {
    path: 'converter',
    title: 'CONVERTER_PAGE',
    loadComponent: () =>
      import('./features/converter/converter.component').then(
        (x) => x.ConverterComponent,
      ),
  },
  {
    path: 'cheat-sheet',
    title: 'CHEAT_SHEET_PAGE',
    loadComponent: () =>
      import('./features/cheat-sheet/cheat-sheet.component').then(
        (x) => x.CheatSheetComponent,
      ),
  },
  {
    path: 'gift-bag',
    title: 'GIFT_BAG_PAGE',
    loadComponent: () =>
      import('./features/gift-bag/gift-bag.component').then(
        (x) => x.GiftBagComponent,
      ),
  },
  {
    path: 'about',
    title: 'ABOUT_PAGE',
    loadComponent: () =>
      import('./features/about/about.component').then((x) => x.AboutComponent),
  },
];
