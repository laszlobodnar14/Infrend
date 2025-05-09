import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {CartService} from '../services/cart.service';
import {UserService} from '../services/user.service';
import {User} from '../shared/models/User';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartQuantity = 0;
  user!: User;
  constructor(cartService: CartService,private userService: UserService) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })

    userService.userObservable.subscribe(newUser => {

      this.user = newUser;
    })
  }

  logout() {
    this.userService.logout();
  }

  get isAuth(){
    return this.user && this.user.token;
  }

}
