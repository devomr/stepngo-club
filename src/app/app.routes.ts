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
    path: 'about',
    title: 'ABOUT_PAGE',
    loadComponent: () =>
      import('./features/about/about.component').then((x) => x.AboutComponent),
  },
];
