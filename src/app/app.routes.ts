import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: 'product', pathMatch: 'full' },
    {
        path: 'product', loadChildren: () =>
            import('./features/product/product.routes')
                .then(m => m.PRODUCT_ROUTES)
    },
];
