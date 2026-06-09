import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getProducts(): Observable<any> {
    return this.http.get( `${this.apiUrl}/products`);
  }


  getProductById(id: string): Observable<any> {
    console.log("id", id)
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }
}
