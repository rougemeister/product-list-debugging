import { Component, Input, signal, OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { Dessert } from '../../models/types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit {
  @Input() product: Dessert | null = null;

  quantity = signal(1);
  isAddedToCart = signal(false);

  constructor(
    private cartService: CartServiceService,
    private toastr: ToastrService
) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((cart) => {
      if (this.product) {
        const cartItem = cart.find((item) => item.name === this.product!.name);
        this.isAddedToCart.set(!!cartItem);
        this.quantity.set(cartItem?.quantity || 1);
      }
    });
  }

private scrollToTopOrBottom() {
  const width = window.innerWidth;

  if (width >= 1024) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (width <= 768 && width < 1024) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
  
}



  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity());
      this.isAddedToCart.set(true);
      this.scrollToTopOrBottom();
      this.toastr.success(` ✅ ${this.product.name} added to cart`,);
      
    }
  }

  increaseProductItem() {
    if (this.product) {
      const newQuantity = this.quantity() + 1;
      this.quantity.set(newQuantity);

      this.scrollToTopOrBottom();

      if (this.isAddedToCart()) {
        this.cartService.updateQuantity(this.product.name, newQuantity);
        this.toastr.info(`🔼 Quantity increased to ${newQuantity}`);
      } else {
        this.addToCart(); // addToCart already scrolls and toasts
      }
    }
  }

  decreaseProductItem() {
    if (this.product) {
      const newQuantity = this.quantity() - 1;

      this.scrollToTopOrBottom();

      if (newQuantity >= 1) {
        this.quantity.set(newQuantity);
        this.cartService.updateQuantity(this.product.name, newQuantity);
        this.toastr.info(`Quantity decreased to ${newQuantity}`);
      } else {
        this.cartService.removeFromCart(this.product.name);
        this.isAddedToCart.set(false);
        this.quantity.set(1);
        this.toastr.warning(` 🗑️ ${this.product.name} removed from cart`,);
      }
    }
  }
}
