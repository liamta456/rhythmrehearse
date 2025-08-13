import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import INSTRUMENTS from '../shared/constants/instruments';

@Component({
  selector: 'app-practice-session-timer',
  imports: [CommonModule, FormsModule],
  templateUrl: './practice-session-timer.component.html',
  styleUrl: './practice-session-timer.component.css'
})
export class PracticeSessionTimerComponent {
  constructor(private http: HttpClient) {}

  // Timer variables

  secondsElapsed: number = 0;
  intervalId: any = null;
  isRunning: boolean = false;
  isSessionActive: boolean = false;
  formattedTime: string = '00:00:00';
  
  // Summary Form variables

  showSummaryForm: boolean = false;
  showSubmissionSuccess: boolean = false;
  showCustomInstrument: boolean = false;
  isLoading: boolean = false;

  instruments: string[] = INSTRUMENTS;
  customInstrument: string = '';
  instrumentSelection: string = '';

  songsPracticed: string = '';
  techniquesPracticed: string = '';
  thingsLearned: string = '';
  comments: string = '';

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

  discardSession() {
    if (confirm('Are you sure you want to discard this session? All corresponding data will be lost.')) {
      this.showSummaryForm = false;

      this.showCustomInstrument = false;
      this.customInstrument = '';
      this.instrumentSelection = '';

      this.songsPracticed = '';
      this.techniquesPracticed = '';
      this.thingsLearned = '';
      this.comments = '';
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

    // HTTP request logic

    this.isLoading = true;

    const token = localStorage.getItem('jwt');

    const payload = {
      durationSeconds: this.secondsElapsed,
      instrument: finalInstrument,
      songsPracticed: this.songsPracticed,
      techniquesPracticed: this.techniquesPracticed,
      thingsLearned: this.thingsLearned,
      comments: this.comments
    };

    this.http.post('http://localhost:3000/api/practice-session', payload, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('Practice session saved successfully.');

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
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error saving practice session.');
        alert('Failed to save practice session. Please try again.');
      }
    });
  }

  // TODO: add logic to disable timer start button when submission success message is being shown
}
