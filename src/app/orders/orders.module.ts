  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { OrdersComponent } from './orders.component';
  import { OrderDetailsComponent } from './order-details/order-details.component';
  import { OrdersRoutingModule } from './orders-routing.module';
  import { HttpClientModule } from '@angular/common/http';
  import { SharedModule } from '../shared/shared.module'; // Import SharedModule
import { FormsModule } from '@angular/forms';
import { UserOrderComponent } from './user-order/user-order.component';


  @NgModule({
    declarations: [
      OrdersComponent,
      OrderDetailsComponent,
      UserOrderComponent
    ],
    imports: [
      CommonModule, // Basic Angular directives (e.g., *ngIf, *ngFor)
      HttpClientModule, // For making HTTP requests to fetch orders
      OrdersRoutingModule, // Import routing for the Orders module
      SharedModule, // Import SharedModule to use app-header and app-footer
      FormsModule, // <-- Step 2: Add FormsModule here in imports


    ]
  })
  export class OrdersModule {}
