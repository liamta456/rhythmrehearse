import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PracticeSessionTimerComponent } from "../practice-session-timer/practice-session-timer.component";

@Component({
  selector: 'app-home',
  imports: [FormsModule, PracticeSessionTimerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    if (this.userId) {
      this.getUser();
    }
  }

  userId: string | null = null;
  userName: string = '';

  getUser() {
    const token = localStorage.getItem('jwt');
    this.http.get<any>(`http://localhost:3000/api/preferences`, {
      headers: { Authorization: `Bearer ${ token }`}
    })
      .subscribe({
        next: (res) => {
          console.log('User retrieved successfully.');
          this.userName = res.data.name;
        },
        error: (err) => {
          console.log('User retrieval failed.');
          if (err.status === 401) {
            localStorage.removeItem('jwt');
            console.log('Session expired.');
            window.alert('Session expired. Please log in again.');
            this.router.navigate(['/login']);
          }
        }
      });
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
    console.log('Logout successful.');
  }
}
