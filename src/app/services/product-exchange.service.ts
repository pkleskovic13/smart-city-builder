import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductExchangeService {
  private productSource = new Subject<Product>();

  product$ = this.productSource.asObservable();

  sendProduct(product: Product){
    this.productSource.next(product);
  }

}
