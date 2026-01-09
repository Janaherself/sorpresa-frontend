import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://sorpresa-api.onrender.com/api';
  private TOKEN_KEY = 'auth_token';

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
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
