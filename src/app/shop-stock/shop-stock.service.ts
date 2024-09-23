// shop-stock.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopStockService {
  private apiUrl = 'http://localhost:3000/api/shops';

  constructor(private http: HttpClient) {}

  getShops(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getShopById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
