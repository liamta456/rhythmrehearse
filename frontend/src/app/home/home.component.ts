import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
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
  isCool: boolean = false;

  getUser() {
    const token = localStorage.getItem('jwt');
    this.http.get<any>(`http://localhost:3000/api/preferences`, {
      headers: { Authorization: `Bearer ${ token }`}
    })
      .subscribe({
        next: (res) => {
          console.log('User retrieved successfully.');
          this.userName = res.data.name;
          this.isCool = res.data.is_cool;
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

  changeIsCoolValue() {
    const token = localStorage.getItem('jwt');
    this.http.patch<any>('http://localhost:3000/api/preferences/cool', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .subscribe({
        next: (res) => {
          if (typeof res.user.is_cool === 'boolean') {
            this.isCool = res.user.is_cool;
            console.log(`Cool value updated successfully to: ${this.isCool}`);
          } else {
            console.log('Failed to update cool value.');
          }
        },
        error: (err) => {
          console.log('Failed to update cool value.');
          if (err.status === 401) {
            localStorage.removeItem('jwt');
            console.log('Session expired.');
            window.alert('Session expired. Please log in again.');
            this.router.navigate(['/login']);
          }
        }
      });
  }
}
