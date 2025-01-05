import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { environment } from '@environment/environment';
import { ThemeToggleComponent } from '@shared/components/theme-toggle/theme-toggle.component';
import { AnalyticsService } from '@shared/services/analytics.service';

type MenuItem = {
  text: string;
  isActive: boolean;
  link: string;
};

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly analyticsService = inject(AnalyticsService);

  isMenuExpanded: boolean = false;
  readonly appName: string = environment.appName;
  readonly domainUrl: string = environment.appDomainUrl;

  menuItems: MenuItem[] = [
    {
      text: 'Earnings Calculator',
      isActive: false,
      link: '',
    },
    {
      text: 'Dashboard',
      isActive: false,
      link: 'dashboard',
    },
    {
      text: 'Converter',
      isActive: false,
      link: 'converter',
    },
    {
      text: 'Cheat Sheet',
      isActive: false,
      link: 'cheat-sheet',
    },
    {
      text: 'About',
      isActive: false,
      link: 'about',
    },
  ];

  toggleMenu(): void {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  onNavLinkClick(label: string): void {
    this.toggleMenu();

    this.analyticsService.logButtonClickEvent({
      event_category: 'navigation_click',
      button_location: 'navigation',
      button_name: label,
    });
  }
}
