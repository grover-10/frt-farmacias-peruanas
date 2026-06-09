import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CartService } from '../../../core/utils/cart/cart.service';
import { ModalService } from '../../../core/utils/modal/modal.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
})
export class CartDrawer {

  cartService = inject(CartService);
  modal = inject(ModalService)
  closeCart() {
    this.cartService.close();
  }

  showInfo() {
    this.modal.showModal(
      'Error',
      'Se ha producido un error',
      'error'
    );
  }

  clearCart(){
    this.cartService.clearCart();
  }

}
