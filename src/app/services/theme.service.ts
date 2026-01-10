import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private key = 'theme';
  private platformId = inject(PLATFORM_ID);

  initTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.key) || 'dark';
      document.body.className = saved;
    }
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const isDark = document.body.classList.contains('dark');
      const next = isDark ? 'light' : 'dark';
      document.body.className = next;
      localStorage.setItem(this.key, next);
    }
  }
}
