import { isPlatformBrowser } from '@angular/common';
import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'fp_shopping_cart';
  private cartState = signal<CartItem[]>([]);
  readonly isOpen = signal(false);
  items = this.cartState.asReadonly();

  totalItemsCount = computed(() =>
    this.cartState().reduce((acc, item) => acc + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cartState().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );


  constructor() {
    // Save to local when add cart changes
    effect(() => {
      const currentCart = this.cartState();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentCart));
      }
    });
  }
  // Add to cart
  addToCart(product: Omit<CartItem, 'quantity'>): void {
    this.cartState.update(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);

      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });


    this.trackAnalyticsEvent(product);
  }
  // Clear cart
  clearCart(): void {
    this.cartState.set([]);
  }

  // Analytics Event
  private trackAnalyticsEvent(product: any): void {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
          items: [{
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            quantity: 1
          }]
        }
      });
    }
  }

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  toggle() {
    this.isOpen.update(value => !value);
  }
}
