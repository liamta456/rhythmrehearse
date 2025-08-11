import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSessionTimerComponent } from './practice-session-timer.component';

describe('PracticeSessionTimerComponent', () => {
  let component: PracticeSessionTimerComponent;
  let fixture: ComponentFixture<PracticeSessionTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeSessionTimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeSessionTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
