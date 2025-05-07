import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {GepComponent} from './gep/gep.component';
import {CartComponent} from './cart/cart.component';
import {LoginComponent} from './login/login.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {CheckoutPageComponent} from './checkout-page/checkout-page.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {PaymentPageComponent} from './payment-page/payment-page.component';
import {OrderTrackPageComponent} from './order-track-page/order-track-page.component';

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'gep/:id', component:GepComponent},
  {path: 'cart' ,component:CartComponent},
  {path: 'login' ,component:LoginComponent},
  {path: 'register',component:RegisterPageComponent},
  {path: 'checkout',component: CheckoutPageComponent, canActivate: [AuthGuard]},
  {path: 'payment',component: PaymentPageComponent, canActivate: [AuthGuard]},
  {path: 'track/:orderId',component: OrderTrackPageComponent, canActivate: [AuthGuard]}
];
