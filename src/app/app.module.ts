import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { ProductsComponent } from './products/products.component';
// import { HeaderComponent } from './shared/header/header.component';
// import { FooterComponent } from './shared/footer/footer.component';

import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';

// import { OrdersComponent } from './orders/orders.component';
// import { OrderDetailsComponent } from './orders/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    // OrdersComponent,
    // OrderDetailsComponent,
    // ProductsComponent,
    // HeaderComponent,
    // FooterComponent
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    HttpClientModule,
    ProductsModule,
    SharedModule, // Add HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
