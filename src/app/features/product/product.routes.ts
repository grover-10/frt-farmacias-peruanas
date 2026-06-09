import { Routes } from '@angular/router';


export const PRODUCT_ROUTES: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  {
    path: 'product-list',
    loadComponent: () =>
      import('./product-list/product-list')
        .then(m => m.ProductList)
  },

  {
    path: 'product-detail',
    loadComponent: () =>
      import('./product-detail/product-detail')
        .then(m => m.ProductDetail)
  }
];