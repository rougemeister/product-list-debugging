import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../services/cart-service.service';
import { Dessert } from '../../models/types';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, AddToCartComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products = signal<Dessert[]>([]); 
  selectedProduct: Dessert | null = null;



isSelected(product: Dessert): boolean {
  return this.selectedProduct?.name === product.name;
}
openProductDetails(product: Dessert) {
  this.selectedProduct = product;
}

  constructor(private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.cartService.getAllProducts().subscribe(data => this.products.set(data));

  }
  
}
