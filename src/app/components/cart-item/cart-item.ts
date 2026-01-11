import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  @Input() item!: any;

  @Output() increase = new EventEmitter<void>();
  @Output() decrease = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  onIncrease() {
    this.increase.emit();
  }

  onDecrease() {
    this.decrease.emit();
  }

  onRemove() {
    this.remove.emit(this.item.product.id);
  }
}
