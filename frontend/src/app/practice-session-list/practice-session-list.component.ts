import { Component, Input } from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-practice-session-list',
  imports: [NgIf, NgFor, DatePipe],
  templateUrl: './practice-session-list.component.html',
  styleUrl: './practice-session-list.component.css'
})
export class PracticeSessionListComponent {
  @Input() practiceSessions: any[] = [];
  
    formatTime(durationSeconds: number) {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:` +
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}`;
  }

  // TODO: make practice sessions in list clickable to also
  // add update and delete functionalities for the practice session list (will require additions to the backend as well)
  // also, dont forget to autorefresh the list after every operation on it
}
