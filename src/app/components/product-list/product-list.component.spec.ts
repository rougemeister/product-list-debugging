// src/app/components/cart/cart.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartServiceService } from '../../services/cart-service.service';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CartComponent } from '../cart/cart.component';

class MockCartService {
  public mockItems = [
    {
      name: 'Brownie',
      price: 5,
      quantity: 2,
      category: 'Baked',
      image: {
        thumbnail: 'brownie-thumb.jpg',
        mobile: 'brownie-mobile.jpg',
        tablet: 'brownie-tablet.jpg',
        desktop: 'brownie-desktop.jpg'
      }
    },
    {
      name: 'Muffin',
      price: 3,
      quantity: 1,
      category: 'Baked',
      image: {
        thumbnail: 'muffin-thumb.jpg',
        mobile: 'muffin-mobile.jpg',
        tablet: 'muffin-tablet.jpg',
        desktop: 'muffin-desktop.jpg'
      }
    }
  ];

  getCart = jasmine.createSpy().and.returnValue(of(this.mockItems));
  getTotalQuantity = jasmine.createSpy().and.returnValue(of(3));
  getTotalPrice = jasmine.createSpy().and.returnValue(of(13));
  clearCart = jasmine.createSpy();
  removeFromCart = jasmine.createSpy();
}

class MockToastrService {
  success = jasmine.createSpy();
  warning = jasmine.createSpy();
  info = jasmine.createSpy();
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
      schemas: [NO_ERRORS_SCHEMA]
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



  it('should hide popup after closing', () => {
    component.showPopup = true;
    spyOn(window, 'confirm').and.returnValue(true);
    component.closePopup();
    expect(component.showPopup).toBeFalse();
  });

  it('should show popup on confirmOrder if cart is not empty', (done) => {
    component.cartItems = [cartService.mockItems[0]];
    component.confirmOrder();
    setTimeout(() => {
      expect(component.showPopup).toBeTrue();
      done();
    }, 0);
  });

  it('should not show popup on confirmOrder if cart is empty', () => {
    spyOn(window, 'alert');
    component.cartItems = [];
    component.confirmOrder();
    expect(window.alert).toHaveBeenCalledWith('Cart is empty. Add items before confirming your order.');
    expect(component.showPopup).toBeFalse();
  });
});
