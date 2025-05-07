import { Component } from '@angular/core';
import {order} from '../shared/models/order';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../services/order.service';
import {DatePipe, NgIf} from '@angular/common';
import {OrderItemsListComponent} from '../order-items-list/order-items-list.component';
import {TitleComponent} from '../title/title.component';
import {MapComponent} from '../map/map.component';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-order-track-page',
  imports: [
    DatePipe,
    OrderItemsListComponent,
    TitleComponent,
    MapComponent,
    NgIf
  ],
  templateUrl: './order-track-page.component.html',
  styleUrl: './order-track-page.component.css'
})
export class OrderTrackPageComponent implements OnInit {
  order!: order
  constructor(activatedRoute: ActivatedRoute, orderService: OrderService) {

    const params = activatedRoute.snapshot.params;
    if(!params['orderId']) return;

    orderService.trackOrderById(params['orderId']).subscribe(order => {
      this.order = order;
    })

  }
  ngOnInit() {

  }

}
