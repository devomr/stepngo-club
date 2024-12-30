import { Component, input } from '@angular/core';
import { ReleaseNote } from '../../types/release-note.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-release-note',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './release-note.component.html',
  styleUrl: './release-note.component.css',
})
export class ReleaseNoteComponent {
  realeaseNote = input.required<ReleaseNote>();
}
