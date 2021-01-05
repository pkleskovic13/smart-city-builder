import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
import { FirestoreUserService } from 'src/app/services/db/user/firestore-user.service';
import { FirestoreProductService } from 'src/app/services/db/product/firestore-product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  numberOfProducts = 0;
  averageProductPrice = 0;

  constructor(
    private authService: AuthService,
    private firestoreUserService: FirestoreUserService,
    private firestoreProductService: FirestoreProductService) { }

  ngOnInit(): void {
    this.firestoreUserService.getCurrentUserFromFirestore('muE6lOOLAOd3zGQuYwdzenf2pCV2').subscribe(data => {
      this.user = data;
    });
    this.firestoreProductService.getProducts().subscribe(products => {
      this.numberOfProducts = products.length;
      let priceCalculation = 0;
      products.forEach(product => {
        priceCalculation = priceCalculation + Number(product.payload.doc.get('price'));
      });
      this.averageProductPrice = (priceCalculation / products.length);
    });
  }

}
