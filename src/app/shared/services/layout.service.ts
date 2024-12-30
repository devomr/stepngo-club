import { Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';

type AppTheme = 'dark' | 'light';

type LayoutState = {
  theme: AppTheme;
  status: 'loading' | 'success' | 'error';
  navbar: boolean;
  footer: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  state = signalState<LayoutState>({
    theme: 'dark',
    status: 'loading',
    navbar: true,
    footer: true,
  });

  constructor() { }

  changeTheme(newTheme: AppTheme) {
    // update <html> element class
    const html = document.getElementsByTagName('html')[0];
    html.classList.remove('dark', 'light');
    html.classList.add(newTheme);

    patchState(this.state, { theme: newTheme, status: 'success' });

    // save theme value in local storage
    localStorage.setItem('theme', newTheme);
  }
}
