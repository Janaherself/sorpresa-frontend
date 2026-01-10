import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  message = '';
  redirect = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    route: ActivatedRoute
  ) {
    route.queryParams.subscribe(p => {
      this.redirect = p['redirect'];
      if (p['message'] === 'auth-required') {
        this.message = 'Signing in is required';
      }
    });
  }

  login() {
    this.message = '';
    this.loading = true;

    this.authService.login({ email: this.email, password: this.password })
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            this.message = 'Invalid email or password';
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
          this.router.navigate([`/${this.redirect || ''}`]);
        }
        this.loading = false;
      });
  }
}
