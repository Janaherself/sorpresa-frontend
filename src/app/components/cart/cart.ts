import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  customerFirstName = '';
  customerLastName = '';
  customerEmail = '';
  customerAddress = '';
  paymentMethod: 'cash' | 'card' = 'cash';

  cardNumber = '';
  cardHolder = '';
  cvv = '';

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  remove(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  increase(item: any) {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  decrease(item: any) {
    this.cartService.updateQuantity(item.product.id, item.quantity - 1);
  }

  goToProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  isFormInvalid(): boolean {
    if (this.cartService.getItems().length === 0) return true;

    if (
      this.customerFirstName.length < 3 ||
      this.customerLastName.length < 3 ||
      !this.customerEmail.includes('@') ||
      this.customerAddress.length < 10
    ) {
      return true;
    }

    if (this.paymentMethod === 'card') {
      if (
        this.cardNumber.length !== 16 ||
        this.cardHolder.length < 3 ||
        this.cvv.trim().length < 3 || this.cvv.trim().length > 4
      ) {
        return true;
      }
    }

    return false;
  }

  placeOrder() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { redirect: 'cart', message: 'auth-required' },
      });
      return;
    }

    if (this.isFormInvalid()) return;

    console.log('Cart items:', this.cartService.getItems());

    const order = {
      items: this.cartService.getItems().map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      customerFirstName: this.customerFirstName,
      customerLastName: this.customerLastName,
      customerEmail: this.customerEmail,
      customerAddress: this.customerAddress,
      paymentMethod: this.paymentMethod,
    };

    console.log('order items:', order.items);
    console.log('order items:', order);


    this.orderService.placeOrder(order).subscribe(() => {
      this.cartService.clearCart();
      this.router.navigate(['/success']);
    });
  }
}
