import { Component,OnInit } from '@angular/core';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { Observable } from 'rxjs';
import { Dessert } from './core/models/model';
import { DataService } from './core/services/data.service'
import { inject } from '@angular/core';
import {AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "./components/product-card/product-card.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, ProductCardComponent,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  desserts$!: Observable<Dessert[]>;
  dataService = inject(DataService);

  ngOnInit(): void {
    this.desserts$ = this.dataService.getDesserts(); 
    console.log(this.desserts$);
  }

};
