import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  cart$ = new BehaviorSubject<CartItem[]>([]);

  addToCart(product: Product, quantity: number) {
    const existing = this.cartItems.find(
      item => item.product.id === product.id
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }

    this.cart$.next(this.cartItems);
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(
      item => item.product.id !== productId
    );
    this.cart$.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cart$.next(this.cartItems);
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  getItems(): CartItem[] {
    return this.cartItems;
  }
}
