import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import INSTRUMENTS from '../shared/constants/instruments';

@Component({
  selector: 'app-practice-session-timer',
  imports: [CommonModule, FormsModule],
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

  instruments: string[] = INSTRUMENTS;
  showCustomInstrument: boolean = false;
  customInstrument: string = '';
  instrumentSelection: string = '';

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

  onInstrumentChange() {
    this.showCustomInstrument = this.instrumentSelection === 'Other';
    if (!this.showCustomInstrument) {
      this.customInstrument = '';
    }
  }

  saveSession() {
    let finalInstrument: string = '';
    if (this.instrumentSelection === 'Other') {
      finalInstrument = this.customInstrument;
    } else {
      finalInstrument = this.instrumentSelection;
    }
    if (!finalInstrument.trim()) {
      alert('Please select an instrument.');
      return;
    }

    // TODO: add http request logic to record session data to the database (requires additions to the backend as well)

    this.showSummaryForm = false;

    this.showCustomInstrument = false;
    this.customInstrument = '';
    this.instrumentSelection = '';

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
