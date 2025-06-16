import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dessert } from '../models/types';

const CART_KEY = 'my-cart';

@Injectable({ providedIn: 'root' })
export class CartServiceService {
  private cartItems: Dessert[] = [];
  private cartSubject = new BehaviorSubject<Dessert[]>([]);
  private dataUrl = 'data.json';

  constructor(private http: HttpClient) {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      try {
        this.cartItems = JSON.parse(stored);
        this.cartSubject.next([...this.cartItems]);
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
        localStorage.removeItem(CART_KEY); // clean invalid data
      }
    }
  }

  private saveCartToStorage(): void {
    localStorage.setItem(CART_KEY, JSON.stringify(this.cartItems));
  }

  getAllProducts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>(this.dataUrl);
  }

  getCart(): Observable<Dessert[]> {
    return this.cartSubject.asObservable();
  }

  getTotalQuantity(): Observable<number> {
    return this.getCart().pipe(
      map(items => items.reduce((sum, item) => sum + (item.quantity || 1), 0))
    );
  }

  getTotalPrice(): Observable<number> {
    return this.getCart().pipe(
      map(items =>
        items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
      )
    );
  }

  addToCart(item: Dessert, quantity: number = 1): void {
    const existing = this.cartItems.find(i => i.name === item.name);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + quantity;
    } else {
      this.cartItems.push({ ...item, quantity });
    }
    this.updateCart();
  }

  updateQuantity(itemName: string, quantity: number): void {
    const existing = this.cartItems.find(i => i.name === itemName);
    if (existing) {
      if (quantity <= 0) {
        this.removeFromCart(itemName);
      } else {
        existing.quantity = quantity;
        this.updateCart();
      }
    }
  }

  removeFromCart(itemName: string): void {
    this.cartItems = this.cartItems.filter(item => item.name !== itemName);
    this.updateCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToStorage();
  }
}
