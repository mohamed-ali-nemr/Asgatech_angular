import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent implements OnInit {
  selectedProducts: any[] = [];
  users: any[] = [];
  selectedUserId: string = '';
  paymentMethod: string = '';

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    // Load users (in a real scenario, replace with actual HTTP call)
    this.loadUsers();

    // Load selected products if needed
    this.selectedProducts = this.ordersService.getSelectedProducts() || [];
  }

  loadUsers(): void {
    // Replace this with actual API call to fetch users
    this.users = [
      {
        Id: '1231-1244-1233',
        Name: 'Mohamed Ashraf'
      },
      {
        Id: '8573-2903-2344',
        Name: 'Ahmed Hossam'
      }
    ];
  }

  submitOrder(): void {
    if (this.selectedUserId && this.paymentMethod) {
      // Process order submission here
      const orderDetails = {
        userId: this.selectedUserId,
        paymentMethod: this.paymentMethod,
        products: this.selectedProducts
      };
      console.log('Order Details:', orderDetails);
      // Perform order submission logic here (e.g., call a service method)
    } else {
      console.error('Please select a customer and payment method.');
    }
  }
}
