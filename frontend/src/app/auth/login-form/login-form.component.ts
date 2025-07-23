import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private http: HttpClient, private router: Router) {}

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  onLogin() {
    console.log('Logging in:', {
      email: this.email,
      password: 'hidden'
    });
    if (!this.email || !this.password) {
      console.log('Login failed: missing input fields');
      return;
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.loginUser();
  }

  loginUser() {
    const payload = {
      email: this.email,
      password: this.password
    };
    this.http.post('http://localhost:3000/api/auth/login', payload)
      .subscribe({
        next: (res) => {
          console.log('Login successful.');
          //TODO: redirect the user to their unique home page (e.g. /home/:userId)
          this.router.navigate(['/home']);
          this.isLoading = false;
        },
        error: (err) => {
          // TODO: add specific error messages (ex. email not confirmed, user doesn't exist, etc.)
          console.log('Login failed.');
          this.errorMessage = 'Login failed.';
          this.isLoading = false;
        }
      });
  }
}
