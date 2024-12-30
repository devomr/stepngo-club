import { inject, Injectable } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly analytics = inject(Analytics);

  constructor() {}

  logPageViewEvent(eventParams?: { [key: string]: any }) {
    logEvent(this.analytics, 'page_view', eventParams);
  }

  logButtonClickEvent(eventParams?: { [key: string]: any }) {
    logEvent(this.analytics, 'button_click', eventParams);
  }
}
