import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/product.service';
import { Router } from '@angular/router';

interface Product {
  ProductId: number;
  ProductName: string;
  ProductPrice: number;
  AvailablePieces: number;
  ProductImg: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: Product[] = [];

  constructor(private productsService: ProductsService , private router: Router) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  updateProductQuantity(productId: number, event: Event): void {
    const quantity = (+((event.target as HTMLInputElement).value)); // Get the input value
    console.log('Event Target:', event.target); // Log the EventTarget

    if (quantity >= 0) {
      // Call the service method to update the product quantity
      this.productsService.editProductQuantity(productId, quantity);
      console.log(`Updating Product ID: ${productId} with quantity: ${quantity}`);
    } else {
      console.error('Quantity cannot be negative');
    }
  }


  selectProduct(product: Product): void {
    this.selectedProducts.push(product);
    console.log(`Selected Product: ${product.ProductName}`);
  }

  addOrder(): void {
    // Redirect to order details page
    this.router.navigate(['/order-details'], { state: { selectedProducts: this.selectedProducts } });
  }

}
