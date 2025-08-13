import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSessionListComponent } from './practice-session-list.component';

describe('PracticeSessionListComponent', () => {
  let component: PracticeSessionListComponent;
  let fixture: ComponentFixture<PracticeSessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeSessionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
