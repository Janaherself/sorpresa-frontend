import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cartCount = 0;

  constructor(
    private cartService: CartService,
    private themeService: ThemeService,
    public authService: AuthService,
    private router: Router
  ) {
    this.cartService.cart$.subscribe(items => {
      this.cartCount = items.reduce((s, i) => s + i.quantity, 0);
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

    logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
