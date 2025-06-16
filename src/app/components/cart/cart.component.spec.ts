// src/app/components/cart/cart.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartServiceService } from '../../services/cart-service.service';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

class MockCartService {
  private mockItems = [
    { name: 'Brownie', price: 5, quantity: 2, category: 'Baked', image: {} },
    { name: 'Muffin', price: 3, quantity: 1, category: 'Baked', image: {} },
  ];

  getCart = jasmine.createSpy().and.returnValue(of(this.mockItems));
  getTotalQuantity = jasmine.createSpy().and.returnValue(of(3));
  getTotalPrice = jasmine.createSpy().and.returnValue(of(13));
  clearCart = jasmine.createSpy();
  removeFromCart = jasmine.createSpy();
}

class MockToastrService {
  success = jasmine.createSpy();
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: MockCartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        { provide: CartServiceService, useClass: MockCartService },
        { provide: ToastrService, useClass: MockToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartServiceService) as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart items and total price', () => {
    expect(component.cartItems.length).toBe(2);
    expect(component.totalQuantity).toBe(3);
    expect(component.totalPrice).toBe(13);
  });

  it('should call removeFromCart when item is removed', () => {
    component.removeFromCart('Brownie');
    expect(cartService.removeFromCart).toHaveBeenCalledWith('Brownie');
  });

  it('should clear cart when popup is closed with confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.closePopup();
    expect(cartService.clearCart).toHaveBeenCalled();
  });

 
});
