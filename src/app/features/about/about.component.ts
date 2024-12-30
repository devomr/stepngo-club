import { Component, signal } from '@angular/core';
import { ReleaseHistoryComponent } from './components/release-history/release-history.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ReleaseHistoryComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  readonly addressCopied = signal(false);

  onCopyAddress(): void {
    navigator.clipboard.writeText('0xfD30D3E70bC4DE173aaefE4d2B7C05E95944c414');
    this.addressCopied.set(true);

    // hide info message
    setTimeout(() => this.addressCopied.set(false), 2000);
  }
}
