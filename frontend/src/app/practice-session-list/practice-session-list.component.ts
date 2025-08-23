import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PracticeSessionFormComponent } from '../practice-session-form/practice-session-form.component';

@Component({
  selector: 'app-practice-session-list',
  imports: [NgIf, NgFor, DatePipe, PracticeSessionFormComponent],
  templateUrl: './practice-session-list.component.html',
  styleUrl: './practice-session-list.component.css'
})
export class PracticeSessionListComponent {
  constructor(private http: HttpClient) {}

  @Input() practiceSessions: any[] = [];

  @Output() sessionSaved = new EventEmitter<void>();

  currentPracticeSessionId: string = '';
  currentFullPracticeSession: any = null;
  showEditForm: boolean = false;
  
  formatTime(durationSeconds: number) {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:` +
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}`;
  }

  onFormClosed() {
    this.showEditForm = false;
    this.currentPracticeSessionId = '';
    this.currentFullPracticeSession = null;
  }

  onFormCompleted() {
    this.showEditForm = false;
    this.currentPracticeSessionId = '';
    this.currentFullPracticeSession = null;
    
    this.sessionSaved.emit();
  }

  onPracticeSessionClick(session: any) {
    this.currentPracticeSessionId = session.id;
    const token = localStorage.getItem('jwt');

    this.http.get(`http://localhost:3000/api/practice-sessions/${this.currentPracticeSessionId}`, {
      headers: { Authorization: `Bearer ${token}`}
    }).subscribe({
      next: (res: any) => {
        this.currentFullPracticeSession = res.data;
        this.showEditForm = true;
      },
      error: (err) => {
        console.error('Error getting full practice session info.');
        this.currentPracticeSessionId = '';
        this.currentFullPracticeSession = null;
        alert('Failed to retrieve full practice session info.');
      }
    });
  }
}
