import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { ProductItemComponent } from '../../../shared/components/product-item/product-item.component';
import { NgOptimizedImage } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailComponent } from '../../../shared/components/product-detail/product-detail.component';

@Component({
  selector: 'app-product-detail',
  imports: [ProductItemComponent, ProductDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {

  ngOnInit(): void {
    this.getProducts();
    this.obtainProductId();
  }

  @ViewChild('carousel')
  carousel!: ElementRef<HTMLDivElement>;

  productList: Product[] = [];
  product = signal<Product>({
    id: '',
    name: '',
    price: 0,
    image: ''
  });

  isExpanded = signal<boolean>(false);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute)

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

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.productList = response;
    })
  }

  getProductDetail(id: string) {
    this.productService.getProductDetail(id).subscribe(response => {
      this.product.set(response);
    })
  }

  obtainProductId() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProductDetail(id)
    }
  }
}
