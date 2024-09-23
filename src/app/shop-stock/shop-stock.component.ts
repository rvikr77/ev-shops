import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { ShopStockService } from './shop-stock.service';
@Component({
  selector: 'app-shop-stock',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './shop-stock.component.html',
  styleUrls: ['./shop-stock.component.css']
})
export class ShopStockComponent implements OnInit{
  latitude: string | null = null;
  longitude: string | null = null;
  shops: any[] = []; 

  constructor(private http: HttpClient,private shopStockService: ShopStockService) {}
 ngOnInit(): void {
  this.loadShops(); 
}


private loadShops(): void {
  this.shopStockService.getShops().subscribe(
    data => {
      this.shops = data;
    },
    error => {
      console.error('Error loading shops data', error);
    }
  );
}



  getPosition(objectId: string): void {
    if (navigator.geolocation) {
      const timeoutVal = 10 * 1000 * 1000;
      navigator.geolocation.getCurrentPosition(
        (position) => this.displayPosition(position, objectId),
        this.displayError,
        { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
      );
    }
  }

  displayPosition(position: GeolocationPosition, objectId: string): void {
    this.latitude = position.coords.latitude.toString();
    this.longitude = position.coords.longitude.toString();
    this.sendToServer(objectId, this.latitude, this.longitude);
  }


  displayError(error: GeolocationPositionError): void {
    const errors: { [key: number]: string } = {
      1: 'Permission denied',
      2: 'Position unavailable',
      3: 'Request timeout'
    };
    alert('Error: ' + errors[error.code]);
  }

  
  sendToServer(id: string, geom: string, g: string): void {

  }

  func1(): void {
    const searchValue = (document.getElementById('search') as HTMLSelectElement).value;
  
    if (!this.latitude || !this.longitude) {
      alert('Allow location to proceed, accept location and reload the page');
      return;
    }
  
    document.getElementById('demo')!.style.display = 'block';
    this.clearDemoElements();
  
    // Calculate distance using Haversine formula
    this.shops.forEach(shop => {
      try {
        // Ensure shop.data is an object
        const shopData = typeof shop.data === 'string' ? JSON.parse(shop.data) : shop.data;
        const lat1 = this.latitude ? parseFloat(this.latitude) : NaN;
        const lon1 = this.longitude ? parseFloat(this.longitude) : NaN;
        const lat2 = shopData.latitudes;
        const lon2 = shopData.longitudes;
  
        const dlon = this.toRadians(lon2 - lon1);
        const dlat = this.toRadians(lat2 - lat1);
        const a = Math.sin(dlat / 2) ** 2 + Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dlon / 2) ** 2;
        const c = 2 * Math.asin(Math.sqrt(a));
        const r = 6371;
        shopData.distance = c * r;
        shop.data = shopData; // Update shop.data with the new object containing distance
      } catch (error) {
        console.error('Error parsing shop data', error);
      }
    });
  
    // Sort by distance
    this.shops.sort((a, b) => (a.data.distance > b.data.distance) ? 1 : ((b.data.distance > a.data.distance) ? -1 : 0));
  
    // Display items
    this.displayItems(searchValue);
  }
  

  

  async func(): Promise<void> {
    const searchValue = (document.getElementById('search') as HTMLSelectElement).value;
  
    if (!this.latitude || !this.longitude) {
      alert('Allow location to proceed, accept location and reload the page');
      return;
    }
  
    document.getElementById('demo')!.style.display = 'block';
    this.clearDemoElements();
  
    const apiKey = ''; // Replace with your Bing Maps API key
    const baseUrl = 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix';
  
    // Create a list of coordinates for the distance matrix request
    const origins = `${this.latitude},${this.longitude}`;
    const destinations = this.shops.map(shop => {
      const shopData = typeof shop.data === 'string' ? JSON.parse(shop.data) : shop.data;
      return `${shopData.latitudes},${shopData.longitudes}`;
    }).join(';');
  
    const url = `${baseUrl}?origins=${origins}&destinations=${destinations}&travelMode=driving&key=${apiKey}`;
  
    try {
      // Fetch distance matrix from Bing Maps API
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.resourceSets && data.resourceSets.length > 0 && data.resourceSets[0].resources && data.resourceSets[0].resources.length > 0) {
        const results = data.resourceSets[0].resources[0].results;
        
        // Update shop data with distances from API response
        results.forEach((result: any, index: number) => {
          let shopData = typeof this.shops[index].data === 'string' ? JSON.parse(this.shops[index].data) : this.shops[index].data;
          shopData.distance = result.travelDistance; // Distance in kilometers
          shopData.duration = result.travelDuration; // Duration in seconds (if needed)
          this.shops[index].data = shopData; // Update shop data with new object containing distance and duration
        });
  
        // Sort by distance
        this.shops.sort((a, b) => (a.data.distance > b.data.distance) ? 1 : ((b.data.distance > a.data.distance) ? -1 : 0));
  
        // Display items
        this.displayItems(searchValue);
      } else {
        console.error('No distance matrix data returned.');
      }
    } catch (error) {
      console.error('Error fetching distance matrix from Bing Maps', error);
    }
  }


  
  // Convert degrees to radians (not needed anymore for Bing Maps API)
  private toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }
  

  // Clear demo elements
  private clearDemoElements(): void {
    for (let i = 0; i < 5; i++) {
      const element = document.getElementById(`demo${i}`);
      if (element) {
        element.innerHTML = '';
      }
    }
  }

  // Display items
  private displayItems(searchValue: string): void {
    let w = 0;

    this.shops.forEach(shop => {
      if (w === 5) return;

      const machine = shop.data[searchValue];
      if (machine) {
        const demoElement = document.getElementById(`demo${w}`);
        if (demoElement) {
          demoElement.innerHTML = `
            <p style='font-style:bold;font-size:20px'>${shop.data["name"]}</p>
            <img style='cursor:text;align:right;height:20px;width:20px' src='./assets/images/arrow.png'>
            <span>${shop.data.distance.toFixed(2)} km from here</span>
            <hr>
            <p style='color:purple;'>${searchValue} - ${machine}</p>
            <a style='font-family:Comfortaa;' href='shop${shop.id + 1}.html' target='_self'>View all other products</a><br>
          `;
          w++;
        }
      }
    });

    if (document.getElementById("demo0")?.innerHTML === '') {
      document.getElementById("demo0")!.innerHTML = "Oops product not available / try again";
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}
