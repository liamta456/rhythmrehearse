import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'register-success', component: RegisterSuccessComponent }
    // TODO: add login route and component
];
