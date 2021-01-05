import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductExchangeService } from 'src/app/services/product-exchange.service';
import { FirestoreProductService } from 'src/app/services/db/product/firestore-product.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreUserService } from 'src/app/services/db/user/firestore-user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css'],
  providers: [ProductExchangeService]
})
export class CustomerLayoutComponent implements OnInit {
  testProduct = new Product('Test', '#00FF00');
  isCollapsed = false;
  products: Array<Product>;
  modalIsVisible = false;
  firestoreUser: User;
  user: User;

  editUserForm = new FormGroup({
    displayName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(
    private productService: ProductExchangeService,
    private firestoreProductService: FirestoreProductService,
    private authService: AuthService,
    private firestoreUserService: FirestoreUserService,

  ) { }

  ngOnInit(): void {
    this.firestoreProductService.getProducts().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Product
        };
      });
    });
    this.user = this.authService.getCurrentUser();
    this.firestoreUserService.getCurrentUserFromFirestore(this.user.uid).subscribe(result => {
      this.firestoreUser = result;
    });
  }


  send(product: Product) {

    this.productService.sendProduct(product);
    // this.emitter.emit(this.testProduct);
  }

  signUserOut() {
    this.authService.signOut();
  }

  submitForm() {
    this.firestoreUser.displayName = this.editUserForm.get('displayName').value;
    this.firestoreUserService.updateUser(this.firestoreUser);
    this.modalIsVisible = false;
  }

  // Modal logic
  showModal(): void {
    this.modalIsVisible = true;
  }

  handleCancel(): void {
    this.modalIsVisible = false;
  }
}
