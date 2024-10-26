import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: any; // Holds order details

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id'); // Get ID from route
    if (orderId) {
      this.fetchOrderDetails(parseInt(orderId));
    }
  }

  fetchOrderDetails(orderId: number): void {
    this.ordersService.getOrderById(orderId).subscribe(
      (data) => {
        this.order = data;
      },
      (error) => {
        console.error('Error fetching order details:', error);
      }
    );
  }
}
