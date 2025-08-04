import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'register', component: RegisterComponent },
    { path: 'register-success', component: RegisterSuccessComponent },
    { path: 'login', component: LoginComponent},
    { path: 'home/:userId', component: HomeComponent }
];
