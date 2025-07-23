import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, NgIf],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
constructor(private http: HttpClient, private router: Router) {}

  email: string = '';
  confirmEmail: string = '';
  name: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  onRegister() {
    console.log('Registering:', {
      email: this.email,
      confirmEmail: this.confirmEmail,
      name: this.name,
      password: 'hidden'
    });
    if (!this.email || !this.confirmEmail || !this.name || !this.password) {
      console.log('Registration failed: missing input fields.');
      return;
    }
    if (this.email !== this.confirmEmail) {
      console.log('Registration failed: emails do not match.');
      this.errorMessage = 'Emails do not match.'
      return;
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.registerUser();
  }

  registerUser() {
    const payload = {
      email: this.email.toLowerCase(),
      name: this.name,
      password: this.password
    }
    this.http.post('http://localhost:3000/api/auth/register', payload)
    .subscribe({
      next: (res) => {
        console.log('Registration successful.');
        this.router.navigate(['/register-success']);
        this.isLoading = false;
      },
      error: (err) => {
        // TODO: address issue of user logging in with a set of credentials already used (i.e. same email as someone else)
        console.log('Registration failed.');
        this.errorMessage = 'Registration failed.';
        this.isLoading = false;
      }
    });
  }
}
