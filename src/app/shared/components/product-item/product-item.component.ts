import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, Output } from '@angular/core';
import { CartService } from '../../../core/utils/cart/cart.service';
import { ModalService } from '../../../core/utils/modal/modal.service';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-item',
  imports: [NgOptimizedImage, CurrencyPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItemComponent {

  @Input() product: Product = {
    id: '',
    image: '',
    name: '',
    price: 0
  };
  private cartService = inject(CartService);
  private router = inject(Router);
  modal = inject(ModalService);

  addToCart() {
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image,
    })
    this.showInfo()
  }
  onClick() {
    this.goDetail()

  }

  goDetail() {
    this.router.navigate(['product/product-detail', this.product.id]);
  }

  showInfo() {
    this.modal.showModal(
      'Éxito',
      'Producto agregado al carrito.',
      'success'
    );
  }

  // Analytics Event
  private trackAnalyticsEvent(product: any): void {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'view_item',
        ecommerce: {
          items: [{
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
          }]
        }
      });
    }
  }
}
