import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  message = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.message = '';
    this.loading = true;

    this.authService.register({ firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password })
      .pipe(
        catchError(err => {
          if (err.status === 409) {
            this.message = 'Email already registered';
          } else {
            this.message = 'Something went wrong. Try again.';
          }
          this.loading = false;
          return of(null);
        })
      )
      .subscribe(res => {
        if (res?.token) {
          this.authService.saveToken(res.token);
          this.router.navigate(['/']);
        }
        this.loading = false;
      });
  }
}
