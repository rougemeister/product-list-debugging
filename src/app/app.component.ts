import { Component } from '@angular/core';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddToCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  constructor() {
   
  };
};
