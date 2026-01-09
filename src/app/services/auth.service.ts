import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://sorpresa-api.onrender.com/api';
  private TOKEN_KEY = 'auth_token';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<{ token: string }>(
      `${this.BASE_URL}/users/login`,
      data
    );
  }

  register(data: any) {
    return this.http.post<{ token: string }>(
      `${this.BASE_URL}/users/register`,
      data
    );
  }

  saveToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }
}
