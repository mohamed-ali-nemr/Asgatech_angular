// orders.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: { ProductId: number; Quantity: number }[];
  PaymentType: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private ordersUrl = 'assets/orders.json'; // Path to your mock JSON file
  private selectedProductsSubject = new BehaviorSubject<any[]>([]); // Store selected products
  private selectedProducts: any[] = [];
  private orders: any[] = [];


  getOrder() {
    return this.orders;
  }

  addOrder(order: any) {
    this.orders.push(order);
  }

  addSelectedProduct(product: any): void {
    this.selectedProducts.push(product);
  }

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get<any>(this.ordersUrl);  // Fetch the JSON data
  }

  getOrderById(orderId: number): Observable<any> {
    return new Observable((observer) => {
      this.http.get<any[]>(this.ordersUrl).subscribe((orders) => {
        const order = orders.find((ord) => ord.OrderId === orderId);
        observer.next(order);
        observer.complete();
      });
    });
  }

   // New methods to manage selected products
   setSelectedProducts(products: any[]): void {
    this.selectedProductsSubject.next(products);
  }

  getSelectedProducts(): any[] {
    return this.selectedProductsSubject.value;
  }

  addProductToSelected(product: any): void {
    const currentProducts = this.selectedProductsSubject.value;
    const existingProduct = currentProducts.find(p => p.ProductId === product.ProductId);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      currentProducts.push({ ...product });
    }
    this.selectedProductsSubject.next(currentProducts);
  }

  clearSelectedProducts(): void {
    this.selectedProductsSubject.next([]);
  }

}
