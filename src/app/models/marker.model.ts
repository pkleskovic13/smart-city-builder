import { Product } from './product.model';

export class Marker {
  id: string;
  product: Product;
  userId: string;
  billId: string;
  position: google.maps.LatLng;
  area: Array<google.maps.LatLng>;

  constructor(
    product: Product,
    userId: string,
    position: google.maps.LatLng
    ){
      this.product = product;
      this.userId = userId;
      this.position = position;
    }
}
