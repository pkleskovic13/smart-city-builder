import { Product } from './product.model';

export class Bill {
  id: string;
  date: string;
  userId: string;
  products: Array<Product>;
  total: number;

  constructor(
    date: string,
    userId: string,
    products: Array<Product>,
    total: number
  ){
    this.date = date;
    this.userId = userId;
    this.products = products;
    this.total = total;
  }
}
