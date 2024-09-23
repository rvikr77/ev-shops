import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopStockComponent } from './shop-stock.component';

describe('ShopStockComponent', () => {
  let component: ShopStockComponent;
  let fixture: ComponentFixture<ShopStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
