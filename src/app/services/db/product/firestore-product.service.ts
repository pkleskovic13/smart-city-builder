import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreProductService {

  constructor(private firestore: AngularFirestore) { }

  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  createProduct(product: Product){
    return this.firestore.collection('products').add(product);
  }

  updateProduct(product: Product){
    this.firestore.doc('products/' + product.id).update(product);
  }

  deleteProduct(productId: string){
    this.firestore.doc('products/' + productId).delete();
  }
}
