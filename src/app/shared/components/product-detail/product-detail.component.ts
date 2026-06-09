import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, Input, signal } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/utils/cart/cart.service';
import { ModalService } from '../../../core/utils/modal/modal.service';

@Component({
  selector: 'app-product-detail-component',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  @Input({ required: true })
  product!: Product;
  isExpanded = signal<boolean>(false);
  private cartService = inject(CartService);
  modal = inject(ModalService);
  textDescription = input<string>(
    'Es un medicamento que contiene: paracetamol que funciona para evitar que los mensajes de dolor lleguen al cerebro, también actúa en el cerebro para reducir la fiebre. La fenilefrina es un descongestionante nasal y la clorfenamina pertenece a un grupo de medicamentos llamados antihistamínicos que ayudan a reducir los síntomas de la alergia como secreción nasal, estornudos y ojos llorosos.'
  );
  toggleDescription(): void {
    this.isExpanded.update(current => !current);
  }

  addToCart() {
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image,
    })
    this.showInfo()
  }

  showInfo() {
    this.modal.showModal(
      'Éxito',
      'Producto agregado al carrito.',
      'success'
    );
  }
}
