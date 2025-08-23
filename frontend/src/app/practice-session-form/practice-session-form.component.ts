import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import INSTRUMENTS from '../shared/constants/instruments';

@Component({
  selector: 'app-practice-session-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './practice-session-form.component.html',
  styleUrl: './practice-session-form.component.css'
})
export class PracticeSessionFormComponent {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.mode === 'edit' && this.sessionData) {
      this.songsPracticed = this.sessionData.songs_practiced;
      this.techniquesPracticed = this.sessionData.techniques_practiced;
      this.thingsLearned = this.sessionData.things_learned;
      this.comments = this.sessionData.comments;

      if (this.sessionData.instrument && this.instruments.includes(this.sessionData.instrument)) {
        this.instrumentSelection = this.sessionData.instrument;
      } else {
        this.instrumentSelection = 'Other';
        this.customInstrument = this.sessionData.instrument;
        this.showCustomInstrument = true;
      }
    }
  }

  @Input() mode: 'create' | 'edit' = 'create';
  @Input() sessionData: any = null;
  @Input() durationSeconds: number = 0;

  showCustomInstrument: boolean = false;
  isLoadingSave: boolean = false;
  isLoadingDelete: boolean = false;

  instruments: string[] = INSTRUMENTS;
  customInstrument: string = '';
  instrumentSelection: string = '';

  songsPracticed: string = '';
  techniquesPracticed: string = '';
  thingsLearned: string = '';
  comments: string = '';

  @Output() formCompleted = new EventEmitter<void>();
  @Output() formDiscarded = new EventEmitter<void>();
  @Output() formClosed = new EventEmitter<void>();

  onInstrumentChange() {
    this.showCustomInstrument = this.instrumentSelection === 'Other';
    if (!this.showCustomInstrument) {
      this.customInstrument = '';
    }
  }

  discardSession() {
    if (confirm('Are you sure you want to discard this session? All corresponding data will be lost.')) {
      this.formDiscarded.emit();
    }
  }

  deleteSession() {
    if (confirm('Are you sure you want to delete this session? All corresponding data will be lost.')) {
      this.isLoadingDelete = true;

      const token = localStorage.getItem('jwt');

      this.http.delete(`http://localhost:3000/api/practice-sessions/${this.sessionData.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (res) => {
          this.isLoadingDelete = false;
          console.log('Practice session deleted successfully.');
          this.formCompleted.emit();
          alert('Your practice session was deleted successfully!');
        },
        error: (err) => {
          this.isLoadingDelete = false;
          console.log('Error deleting practice session.');
          alert('Failed to delete practice session. Please try again.');
        }
      });
    }
  }

  closeSession() {
    this.formClosed.emit();
  }

  saveSession() {
    if (this.mode === 'create' && this.durationSeconds === 0) {
      alert('Practice session duration must be greater than 0 seconds.');
      return;
    }

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

    this.isLoadingSave = true;

    const token = localStorage.getItem('jwt');

    if (this.mode === 'create') {
      const payload = {
        durationSeconds: this.durationSeconds,
        instrument: finalInstrument,
        songsPracticed: this.songsPracticed,
        techniquesPracticed: this.techniquesPracticed,
        thingsLearned: this.thingsLearned,
        comments: this.comments
      };

      this.http.post('http://localhost:3000/api/practice-sessions', payload, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (res) => {
          this.isLoadingSave = false;
          console.log('Practice session saved successfully.');

          this.showCustomInstrument = false;
          this.customInstrument = '';
          this.instrumentSelection = '';

          this.songsPracticed = '';
          this.techniquesPracticed = '';
          this.thingsLearned = '';
          this.comments = '';
          
          this.formCompleted.emit();

          alert('Your practice session was saved successfully!');
        },
        error: (err) => {
          this.isLoadingSave = false;
          console.error('Error saving practice session.');
          alert('Failed to save practice session. Please try again.');
        }
      });
    } else {
      const payload = {
        instrument: finalInstrument,
        songsPracticed: this.songsPracticed,
        techniquesPracticed: this.techniquesPracticed,
        thingsLearned: this.thingsLearned,
        comments: this.comments
      };

      this.http.patch(`http://localhost:3000/api/practice-sessions/${this.sessionData.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (res) => {
          this.isLoadingSave = false;
          console.log('Practice session updated successfully.');

          this.showCustomInstrument = false;
          this.customInstrument = '';
          this.instrumentSelection = '';

          this.songsPracticed = '';
          this.techniquesPracticed = '';
          this.thingsLearned = '';
          this.comments = '';
          
          this.formCompleted.emit();

          alert('Your practice session was updated successfully!');
        },
        error: (err) => {
          this.isLoadingSave = false;
          console.error('Error updating practice session.');
          alert('Failed to update practice session. Please try again.');
        }
      });
    }
  }
}
