import { Injectable } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage/';
import { finalize } from 'rxjs/operators';
import { FirestoreProductService } from '../product/firestore-product.service';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreImageUploadService {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private productService: FirestoreProductService
  ) { }

  startUpload(event: FileList, inProduct: Product) {
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.error('Unsupported file type :(');
      return;
    }

    // Generating an unique path for the image
    const path = `images/${new Date().getTime()}_${file.name}`;
    // Generating a file reference using the path - https://github.com/angular/angularfire/blob/master/docs/storage/storage.md#example-usage
    const fileRef = this.storage.ref(path);
    // Generating an unique metadata tag (in case there are several projects running concurrently on the same firestore)
    const customMetadata = { app: 'A1 Smart City Planner' };

    // Uploading the actual image to Firestore
    this.task = this.storage.upload(path, file, { customMetadata });
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( url => {
          this.downloadURL = url;
          inProduct.imageUrl = url;
          this.productService.updateProduct(inProduct);
        });
      })
    ).subscribe();
  }
}
