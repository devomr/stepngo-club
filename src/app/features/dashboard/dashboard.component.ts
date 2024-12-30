import { Component } from '@angular/core';
import { TokenOverviewComponent } from './components/token-overview/token-overview.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TokenOverviewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
