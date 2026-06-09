import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input } from '@angular/core';
import { CartService } from '../../../core/utils/cart/cart.service';

@Component({
  selector: 'app-header',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {

  private cartService = inject(CartService);

  categories = [
    { titleItem: 'Dermocosmética', route: '/dermocosmetica' },
    { titleItem: 'Farmacia', route: '/farmacia' },
    { titleItem: 'Bienestar', route: '/bienestar' },
    { titleItem: 'Infantil', route: '/infantil' },
    { titleItem: 'Fotoprotección', route: '/fotoproteccion' },
    { titleItem: 'Inkaclub', route: '/inkaclub' },
    { titleItem: 'Tienda 24 hrs.', route: '/tienda-24-hrs' },
    { titleItem: 'Catálogo', route: '/catalogo' }
  ];
  // Obtener cantidad de productos únicos en carrito
  currentQuantity = computed(() => {
    const cartItems = this.cartService.items();
    console.log('quantity', cartItems)
    return cartItems.length;
  });

  openCart(){
    this.cartService.open();
  }
}
