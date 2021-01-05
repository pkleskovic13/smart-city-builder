import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FirestoreProductService } from 'src/app/services/db/product/firestore-product.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UploadChangeParam } from 'ng-zorro-antd/upload';
import { FirestoreImageUploadService } from 'src/app/services/db/firestore/firestore-image-upload.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  products: Product[];
  editCache: { [key: string]: { edit: boolean; data: Product } } = {};
  listOfData: Product[] = [];
  modalIsVisible = false;

  addNewProductForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    imageUrl: new FormControl(''),
    icon: new FormControl(''),
    price: new FormControl(''),
    currency: new FormControl(''),
    discount: new FormControl('')
  });

  constructor(
    private productService: FirestoreProductService,
    private imageService: FirestoreImageUploadService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Product
        };
      });

      this.listOfData = this.products;
      this.updateEditCache();
    });
  }

  create(product: Product) {
    this.productService.createProduct(product);
  }

  update(product: Product) {
    this.productService.updateProduct(product);
  }

  delete(id: string) {
    this.productService.deleteProduct(id);
  }

  // NG-ZORRO editable table data
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id.toString() === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    let changedObject = this.listOfData.find(editedProduct => editedProduct.id === id);
    changedObject = this.editCache[id].data;
    this.update(changedObject);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  // Modal logic
  showModal(): void {
    this.modalIsVisible = true;
  }

  handleModalCancel(): void {
    this.modalIsVisible = false;
  }

  // Form Handler
  submitForm() {
    this.create(this.addNewProductForm.value);
    this.modalIsVisible = false;
  }

  handleFileUpload(event, product: Product) {
    console.log(product);
    console.log(event);
    this.imageService.startUpload(event, product);
  }
}
