import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ProductItemComponent } from '../../../shared/components/product-item/product-item.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  ngOnInit(): void {
    this.getProducts();
  }

  private productService = inject(ProductService);
  productList: Product[] = [];

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.productList = response;
    })
  }
}
