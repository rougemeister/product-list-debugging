import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddToCartComponent } from './add-to-cart.component';
import { CartServiceService } from '../../services/cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

const mockProduct = {
  name: 'Brownie',
  price: 5,
  quantity: 1,
  category: 'Baked',
  image: {
    thumbnail: 'thumb.jpg',
    mobile: 'mobile.jpg',
    tablet: 'tablet.jpg',
    desktop: 'desktop.jpg'
  }
};

class MockCartService {
  getCart = jasmine.createSpy().and.returnValue(of([]));
  addToCart = jasmine.createSpy();
  updateQuantity = jasmine.createSpy();
  removeFromCart = jasmine.createSpy();
}

class MockToastrService {
  success = jasmine.createSpy();
  info = jasmine.createSpy();
  warning = jasmine.createSpy();
}

describe('AddToCartComponent', () => {
  let component: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToCartComponent],
      providers: [
        { provide: CartServiceService, useClass: MockCartService },
        { provide: ToastrService, useClass: MockToastrService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddToCartComponent);
    component = fixture.componentInstance;
    component.product = mockProduct; // Provide required @Input
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
