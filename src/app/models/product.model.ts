export class Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  icon: string;
  price: number;
  currency: string;
  discount: number;

  constructor(name: string, icon: string ){
    this.name = name;
    this.icon = icon;
  }
}
