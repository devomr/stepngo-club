import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { environment } from '@environment/environment';
import { ThemeToggleComponent } from '@shared/components/theme-toggle/theme-toggle.component';
import { AnalyticsService } from '@shared/services/analytics.service';

type MenuItem = {
  text: string;
  isActive: boolean;
  link: string;
  submenu?: { text: string; link: string }[];
  isSubmenuOpen?: boolean;
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
      text: 'Tools',
      isActive: false,
      link: '',
      submenu: [
        { text: 'Haus Calculator', link: 'haus-calculator' },
        { text: 'Mint Calculator', link: 'mint-calculator' },
      ],
      isSubmenuOpen: false,
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

  toggleSubmenu(index: number): void {
    const menuItem = this.menuItems[index];
    if (menuItem && menuItem.submenu) {
      menuItem.isSubmenuOpen = !menuItem.isSubmenuOpen;
    }
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
