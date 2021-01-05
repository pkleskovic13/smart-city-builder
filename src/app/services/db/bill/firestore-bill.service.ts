import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Bill } from 'src/app/models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreBillService {

  constructor(private firestore: AngularFirestore) { }

  getBills() {
    return this.firestore.collection('bills').snapshotChanges();
  }

  createBill(bill: Bill){
    return this.firestore.collection('bills').add(bill);
  }

  updateBill(bill: Bill){
    delete bill.id;
    this.firestore.doc('bills/' + bill.id).update(bill);
  }

  deleteBill(billId: string){
    this.firestore.doc('bills/' + billId).delete();
  }
}
