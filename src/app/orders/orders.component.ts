// orders.component.ts
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: { ProductId: number; Quantity: number }[];
  PaymentType: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe(
      (data) => {
        this.orders = data;
        console.log('Orders fetched:', this.orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
