import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { LayoutService } from '@shared/services/layout.service';
import { CreatorWidgetComponent } from '@shared/components/creator-widget/creator-widget.component';
import { GiftBagBannerComponent } from './features/gift-bag/components/gift-bag-banner/gift-bag-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    CreatorWidgetComponent,
    GiftBagBannerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'stepngo-club';

  readonly layoutService = inject(LayoutService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Init theme
    this.initTheme();
  }

  private initTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const theme = localStorage.getItem('theme');

      if (!theme) {
        this.layoutService.changeTheme('light');
        return;
      }

      const themeValue = theme === 'dark' ? 'dark' : 'light';
      this.layoutService.changeTheme(themeValue);
    }
  }
}
