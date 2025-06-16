import { Component, Input, input } from '@angular/core';
import desseretData from '../../public/data.json';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { NavbarComponent } from './components/add-to-cart/navbar/navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from "./components/cart/cart.component";

import { Dessert } from './models/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
   
    ProductListComponent,
    CartComponent
]
  
  
})
export class AppComponent {
  title = 'Product list';
  desserts:Dessert[] | null = null;

  constructor() {
  };
};
