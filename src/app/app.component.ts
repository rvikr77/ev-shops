import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShopStockComponent } from './shop-stock/shop-stock.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShopStockComponent,HttpClientModule], // Imported here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected the property name from "styleUrl" to "styleUrls"
})
export class AppComponent {
  title = 'shop-stock-tracker';
}