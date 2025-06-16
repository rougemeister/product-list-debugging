import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartServiceService } from '../../services/cart-service.service';
import { CartItem } from '../../models/types';
import { OrderConfirmationPopupComponent } from '../../order-confirmation-popup/order-confirmation-popup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule, CurrencyPipe, OrderConfirmationPopupComponent],
})
export class CartComponent {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  showPopup: boolean = false;

  constructor(private cartService: CartServiceService,   private toastr: ToastrService) {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
    this.cartService.getTotalQuantity().subscribe(quantity => {
      this.totalQuantity = quantity;
    });
    this.cartService.getTotalPrice().subscribe(price => {
      this.totalPrice = price;
    });
  }

 confirmOrder() {
  if (this.cartItems.length === 0) {
    alert('Cart is empty. Add items before confirming your order.');
    return;
  }

  this.showPopup = false; // reset the state
  setTimeout(() => {
    this.showPopup = true;
  });
}


  closePopup() {
    this.showPopup = false;
    this.cartService.clearCart();
  }

  removeFromCart(itemName: string) {
    this.cartService.removeFromCart(itemName);
      this.toastr.success( `removed from cart`);

  }
}