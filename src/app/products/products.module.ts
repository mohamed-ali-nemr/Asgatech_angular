// products.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component'; // Import ProductsComponent
import { ProductsService } from '../services/product.service'; // Import ProductsService if needed
import { SharedModule } from '../shared/shared.module'; // Import SharedModule



const routes: Routes = [
  { path: '', component: ProductsComponent } // Define the default path for the module
];

@NgModule({
  declarations: [
    ProductsComponent, // Declare ProductsComponent here
  
  ],
  imports: [  
    CommonModule, // Import CommonModule for basic Angular directives
    RouterModule.forChild(routes), // Set up lazy-loaded routing
    SharedModule // Add SharedModule here

  ],
  providers: [
    ProductsService // Provide the service here if needed
  ]
})
export class ProductsModule {}
