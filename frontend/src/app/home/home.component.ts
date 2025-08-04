import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    if (this.userId) {
      this.getName();
    }
  }

  userId: string | null = null;
  userName: string = '';

  getName() {
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
        }
      });
  }
}
