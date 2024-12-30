import { Component, inject } from '@angular/core';
import { LayoutService } from '@shared/services/layout.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  layoutService = inject(LayoutService);

  toggleTheme(): void {
    const currentTheme = this.layoutService.state.theme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.layoutService.changeTheme(newTheme);
  }
}
