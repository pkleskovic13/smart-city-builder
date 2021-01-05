import { Component, OnInit } from '@angular/core';
import { FirestoreBillService } from 'src/app/services/db/bill/firestore-bill.service';
import { Bill } from 'src/app/models/bill.model';
import * as moment from 'moment';
import { FirestoreUserService } from 'src/app/services/db/user/firestore-user.service';
import { User } from 'src/app/models/user';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-admin-bill',
  templateUrl: './admin-bill.component.html',
  styleUrls: ['./admin-bill.component.css']
})
export class AdminBillComponent implements OnInit {
  bills: Array<Bill>;
  modalIsVisible = false;

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  constructor(
    private firestoreBillService: FirestoreBillService,
  ) { }

  ngOnInit(): void {
    this.firestoreBillService.getBills().subscribe(data => {
      this.bills = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Bill
        };
      });
    });
  }

  parseDateUsingMoment(date: string) {
    return moment(date).format('DD-MM-YYYY (LT)');
  }

  // Modal logic
  showModal(): void {
    this.modalIsVisible = true;
  }

  handleCancel(): void {
    this.modalIsVisible = false;
  }

  // Math, this would be cleaned up
  calculateItemDiscount(itemPrice: number, itemDiscount: number): number {
    return Math.round((itemPrice * (1 - (itemDiscount / 100)) + Number.EPSILON) * 100) / 100;
  }

  calculateTotal(products: Array<Product>) {
    let total = 0;
    products.forEach(product => {
      total += this.calculateItemDiscount(product.price, product.discount);
    });
    return total;
  }
}
