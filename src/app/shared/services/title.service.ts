import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { SeoService } from './seo.service';

@Injectable({
  providedIn: 'root',
})
export class AppTitleStrategy extends TitleStrategy {
  readonly seoService = inject(SeoService);

  constructor() {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    // this retrieves the title value of the deepest child in the route
    const title = this.buildTitle(snapshot);

    if (title !== undefined) {
      // set the title using SeoService
      this.seoService.setPage(title);
    }
  }
}
