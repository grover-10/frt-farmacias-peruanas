import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, input, signal, ViewChild } from '@angular/core';
import { ProductItemComponent } from '../../../shared/components/product-item/product-item.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [ProductItemComponent, NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {

  @ViewChild('carousel')
  carousel!: ElementRef<HTMLDivElement>;

  textDescription = input<string>(
    'Es un medicamento que contiene: paracetamol que funciona para evitar que los mensajes de dolor lleguen al cerebro, también actúa en el cerebro para reducir la fiebre. La fenilefrina es un descongestionante nasal y la clorfenamina pertenece a un grupo de medicamentos llamados antihistamínicos que ayudan a reducir los síntomas de la alergia como secreción nasal, estornudos y ojos llorosos.'
  );

  isExpanded = signal<boolean>(false);


  toggleDescription(): void {
    this.isExpanded.update(current => !current);
  }

  scrollLeft(): void {
    this.carousel.nativeElement.scrollBy({
      left: -250,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {
    this.carousel.nativeElement.scrollBy({
      left: 250,
      behavior: 'smooth'
    });
  }
}
