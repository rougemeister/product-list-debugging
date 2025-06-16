import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderConfirmationPopupComponent } from './order-confirmation-popup.component';
import { CartServiceService } from '../services/cart-service.service';
import { of } from 'rxjs';

class MockCartService {
  clearCart = jasmine.createSpy();
}

describe('OrderConfirmationPopupComponent', () => {
  let component: OrderConfirmationPopupComponent;
  let fixture: ComponentFixture<OrderConfirmationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderConfirmationPopupComponent],
      providers: [
        { provide: CartServiceService, useClass: MockCartService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationPopupComponent);
    component = fixture.componentInstance;

    // Provide mock @Input values
    component.cartItems = [
      {
        name: 'Brownie',
        price: 5,
        quantity: 2,
        category: 'Baked',
        image: {
          thumbnail: 'thumb.jpg',
          mobile: 'mobile.jpg',
          tablet: 'tablet.jpg',
          desktop: 'desktop.jpg'
        }
      }
    ];
    component.totalPrice = 10;
    component.isOpen = true;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
