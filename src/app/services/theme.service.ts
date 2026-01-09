import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private key = 'theme';

  initTheme() {
    const saved = localStorage.getItem(this.key) || 'dark';
    document.body.className = saved;
  }

  toggleTheme() {
    const isDark = document.body.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    document.body.className = next;
    localStorage.setItem(this.key, next);
  }
}
