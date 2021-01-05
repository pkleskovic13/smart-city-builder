import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreUserService {

  constructor(private firestore: AngularFirestore) { }

  getCurrentUserFromFirestore(userUid: string) {
    return this.firestore.doc<User>(`users/${userUid}`).valueChanges();
  }

  getAllUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  updateUser(user: User){
    this.firestore.doc('users/' + user.uid).update(user);
  }

  createUser(user: User){
    return this.firestore.collection('users').add(user);
  }

  deleteUser(userId: string) {
    this.firestore.doc('users/' + userId).delete();
  }
}
