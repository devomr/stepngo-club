import { Component } from '@angular/core';
import { ReleaseNote } from '../../types/release-note.type';
import { ReleaseNoteComponent } from '../release-note/release-note.component';

const releaseNotes: ReleaseNote[] = [
  {
    version: '0.0.1',
    date: new Date('2024-12-30'),
    features: [
      'GGT earnings calculator',
      'Dashboard with GGT, GMT and POL tokens price',
      'Token price converter',
      'Light & Dark themes',
    ],
    improvements: [],
    fixes: [],
  },
];

@Component({
  selector: 'app-release-history',
  standalone: true,
  imports: [ReleaseNoteComponent],
  templateUrl: './release-history.component.html',
  styleUrl: './release-history.component.css',
})
export class ReleaseHistoryComponent {
  readonly releaseNotes: ReleaseNote[] = releaseNotes;
}
