import { Injectable } from '@angular/core';
import { Marker } from 'src/app/models/marker.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreMarkerService {

  constructor(private firestore: AngularFirestore) { }

  getMarkers() {
    return this.firestore.collection('markers').snapshotChanges();
  }

  createMarker(marker: Marker){
    return this.firestore.collection('markers').add(marker);
  }

  updateMarker(marker: Marker){
    delete marker.id;
    this.firestore.doc('markers/' + marker.id).update(marker);
  }

  deleteMarker(markerId: string){
    this.firestore.doc('markers/' + markerId).delete();
  }
}
