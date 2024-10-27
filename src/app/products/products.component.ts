import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/product.service';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';

interface Product {
  ProductId: number;
  ProductName: string;
  ProductPrice: number;
  AvailablePieces: number;
  ProductImg: string;
  orderQuantity?: number; // Add orderQuantity property

}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: Product[] = [];
  selectedProduct: any; // Assume you have a way to select the product
  orderQuantity: number = 1;

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      // Initialize order quantity for each product
      this.products = data.map(product => ({ ...product, orderQuantity: 1 })); // Default order quantity
  });
  }

  addToOrder(): void {
    // Add the product and orderQuantity to the order service
    this.ordersService.addSelectedProduct({ ...this.selectedProduct, orderQuantity: this.orderQuantity });
    console.log('Product added to order:', { ...this.selectedProduct, orderQuantity: this.orderQuantity });
  }
  


  updateProductQuantity(productId: number, event: Event): void {
    const quantity = +(event.target as HTMLInputElement).value; // Get the input value
    console.log('Event Target:', event.target); // Log the EventTarget

    if (quantity >= 0) {
      // Call the service method to update the product quantity
      this.productsService.editProductQuantity(productId, quantity);
      console.log(
        `Updating Product ID: ${productId} with quantity: ${quantity}`
      );
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
    this.router.navigate(['/order-details'], {
      state: { selectedProducts: this.selectedProducts },
    });
  }

  addProductToOrder(product: any) {
    const quantity = product.orderQuantity; // Get the order quantity from the input

    // Validate the quantity
    if (!quantity || quantity < 1 || !Number.isInteger(quantity)) {
        alert("Please enter a valid quantity (positive whole numbers only).");
        return;
    }

    // Check if the requested quantity exceeds available pieces
    if (quantity > product.AvailablePieces) {
        alert(`You cannot order more than available stock: ${product.AvailablePieces}.`);
        return;
    }

    // Proceed with adding the product to the order if valid
    this.selectedProducts.push({
        ...product,
        quantity: quantity // Store the order quantity
    });

    // Update available pieces after the order
    product.AvailablePieces -= quantity;

    // Reset order quantity input
    product.orderQuantity = 1; // Reset to a default value

    // Navigate to the user order page after adding products
    this.router.navigate(['/user-order']);
}

  // Sample product loading logic
  // loadProducts() {
  //   this.productsService.getProducts().subscribe((data: any[]) => {
  //     this.products = data.map((product) => ({ ...product, quantity: 1 })); // Initialize quantity
  //   });
  // }

  // goToOrderDetails(): void {
  //   this.router.navigate(['/orders/add']);
  // }
}
