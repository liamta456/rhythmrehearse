import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-practice-session-timer',
  imports: [NgIf, FormsModule],
  templateUrl: './practice-session-timer.component.html',
  styleUrl: './practice-session-timer.component.css'
})
export class PracticeSessionTimerComponent {
  // Timer variables
  secondsElapsed: number = 0;
  intervalId: any = null;
  isRunning: boolean = false;
  isSessionActive: boolean = false;
  formattedTime: string = '00:00:00';

  // Summary Form variables
  showSummaryForm: boolean = false;
  songsPracticed: string = '';
  techniquesPracticed: string = '';
  thingsLearned: string = '';
  comments: string = '';
  showSubmissionSuccess: boolean = false;

  startTimer() {
    if (!this.isRunning && this.showSummaryForm === false) {
      this.isRunning = true;
      this.isSessionActive = true;
      this.intervalId = setInterval(() => {
        this.secondsElapsed++;
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

    this.showSummaryForm = true;
  }

  updateFormattedTime() {
    const hours = Math.floor(this.secondsElapsed / 3600);
    const minutes = Math.floor((this.secondsElapsed % 3600) / 60);
    const seconds = this.secondsElapsed % 60;

    this.formattedTime =
      `${hours.toString().padStart(2, '0')}:` +
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}`;
  }

  saveSession() {
    // TODO: add http request logic to record session data to the database (requires additions to the backend as well)

    this.showSummaryForm = false;
    this.songsPracticed = '';
    this.techniquesPracticed = '';
    this.thingsLearned = '';
    this.comments = '';

    this.secondsElapsed = 0;
    this.intervalId = null;
    this.isRunning = false;
    this.updateFormattedTime();

    this.showSubmissionSuccess = true;
  }
}
