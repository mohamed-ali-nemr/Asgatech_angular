import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface Product {
  ProductId: number;
  ProductName: string;
  ProductPrice: number;
  AvailablePieces: number;
  ProductImg: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private jsonUrl = 'assets/porducts.json'; // Path to your JSON file
  private productsSubject = new BehaviorSubject<Product[]>([]); // Store product data

  constructor(private http: HttpClient) {
    this.loadProducts(); // Load products when the service is initialized
  }

  private loadProducts(): void {
    this.http.get<Product[]>(this.jsonUrl).subscribe((products) => {
      this.productsSubject.next(products); // Update BehaviorSubject with fetched products
    });
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable(); // Return products as an Observable
  }

  editProductQuantity(productId: number, quantity: number): void {
    // Get the current products list
    const currentProducts = this.productsSubject.getValue();
  
    // Find the product and update its quantity
    const updatedProducts = currentProducts.map((product) =>
      product.ProductId === productId
        ? { ...product, AvailablePieces: quantity }
        : product
    );
  
    // Update the BehaviorSubject with the new list of products
    this.productsSubject.next(updatedProducts);
  
    // Log the updated products to check the result
    console.log('Updated Products:', updatedProducts);
  }
  
}
