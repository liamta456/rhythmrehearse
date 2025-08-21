import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import INSTRUMENTS from '../shared/constants/instruments';
import { PracticeSessionFormComponent } from '../practice-session-form/practice-session-form.component';

@Component({
  selector: 'app-practice-session-timer',
  imports: [CommonModule, FormsModule, PracticeSessionFormComponent],
  templateUrl: './practice-session-timer.component.html',
  styleUrl: './practice-session-timer.component.css'
})
export class PracticeSessionTimerComponent {
  constructor(private http: HttpClient) {}

  @Output() durationSeconds: number = 0;
  intervalId: any = null;
  isRunning: boolean = false;
  isSessionActive: boolean = false;
  formattedTime: string = '00:00:00';

  showPracticeSessionForm: boolean = false;

  @Output() sessionSaved = new EventEmitter<void>();

  startTimer() {
    if (!this.isRunning && this.showPracticeSessionForm === false) {
      this.isRunning = true;
      this.isSessionActive = true;
      this.intervalId = setInterval(() => {
        this.durationSeconds++;
        this.updateFormattedTime();
      }, 1000);
    }
  }

  pauseTimer() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.intervalId);
    }
  }

  endTimer() {
    this.isRunning = false;
    this.isSessionActive = false;
    clearInterval(this.intervalId);

    this.showPracticeSessionForm = true;
  }

  updateFormattedTime() {
    const hours = Math.floor(this.durationSeconds / 3600);
    const minutes = Math.floor((this.durationSeconds % 3600) / 60);
    const seconds = this.durationSeconds % 60;

    this.formattedTime =
      `${hours.toString().padStart(2, '0')}:` +
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}`;
  }

  onFormDiscarded() {
    this.showPracticeSessionForm = false;

    this.durationSeconds = 0;
    this.intervalId = null;
    this.isRunning = false;
    this.isSessionActive = false;
    this.formattedTime = '00:00:00';
  }

  onFormCompleted() {
    this.showPracticeSessionForm = false;

    this.sessionSaved.emit();

    this.durationSeconds = 0;
    this.intervalId = null;
    this.isRunning = false;
    this.isSessionActive = false;
    this.formattedTime = '00:00:00';
  }

  // TODO: add logic to disable timer start button when submission success message is being shown
}
