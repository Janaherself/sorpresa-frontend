import { Routes } from '@angular/router';

import { ProductList } from './components/product-list/product-list';
import { ProductDetails } from './components/product-details/product-details';
import { Cart } from './components/cart/cart';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Success } from './components/success/success';

export const routes: Routes = [
  { path: '', component: ProductList},
  { path: 'products/:id', component: ProductDetails },
  { path: 'cart', component: Cart },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'success', component: Success },
  { path: '**', redirectTo: '' }
];
