import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UserOrderComponent } from './user-order/user-order.component';


const routes: Routes = [
  { path: '', component: OrdersComponent }, // Default route for listing orders
  { path: 'details/:id', component: OrderDetailsComponent }, // Route for order details page
  // { path: 'user-order', component: UserOrderComponent }, // Add the route here

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
