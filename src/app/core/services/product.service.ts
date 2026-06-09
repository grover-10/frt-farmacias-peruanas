import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient);

  getProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/products');
  }
}
