import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartItem } from '../models/types';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-order-confirmation-popup',
  standalone: true,
  templateUrl: './order-confirmation-popup.component.html',
  styleUrls: ['./order-confirmation-popup.component.scss'],
  imports: [CommonModule, CurrencyPipe],
})
export class OrderConfirmationPopupComponent {
  @Input() cartItems: CartItem[] = [];
  @Input() totalPrice: number = 0;
  @Input() isOpen: boolean = false;

  constructor(private cartService: CartServiceService) {}

  closePopup() {
    const confirmClear = window.confirm('Do you want to clear the cart and start a new order?');

    if (confirmClear) {
      this.cartService.clearCart();
    }

    this.isOpen = false; // always close the modal
  }

}