import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { ProductExchangeService } from 'src/app/services/product-exchange.service';
import { FirestoreMarkerService } from 'src/app/services/db/marker/firestore-marker.service';
import { Marker } from 'src/app/models/marker.model';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreBillService } from 'src/app/services/db/bill/firestore-bill.service';
import { Bill } from 'src/app/models/bill.model';
import * as moment from 'moment';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})

export class MapScreenComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  subscription: Subscription;
  recievedProduct: Product;
  currentBillMarkers: Array<Marker> = [];
  receivedMarkers: Array<Marker>;
  orderProductArray: Array<Product> = [];
  user: User;
  modalIsVisible = false;
  isLoading = false;

  icon = {
    path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
    fillColor: '#ff0000',
    fillOpacity: .8,
    anchor: new google.maps.Point(0, 0),
    strokeWeight: 0,
    scale: 0.2,
    label: 'T'
  };

  markerOptions = {
    zoom: 18,
    draggable: true,
    icon: this.icon // url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  };

  markerPositions: google.maps.LatLngLiteral[] = [];
  display?: google.maps.LatLngLiteral;
  zoom = 15;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };

  markers = [];

  constructor(
    productService: ProductExchangeService,
    private firestoreMarkerService: FirestoreMarkerService,
    private authService: AuthService,
    private firestoreBillService: FirestoreBillService
  ) {
    this.subscription = productService.product$.subscribe(
      govno => {
        this.recievedProduct = govno;
        this.icon.fillColor = this.recievedProduct.icon;
      }
    );
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    this.firestoreMarkerService.getMarkers().subscribe(data => {
      this.receivedMarkers = data.map(e => {
        console.log(e.payload.doc.data());
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Marker
        };
      });

      this.receivedMarkers.forEach(marker => {
        if (marker.userId === this.user.uid) {
          this.markerPositions.push(marker.position as unknown as google.maps.LatLngLiteral);
        }
      });
    });
  }

  ngAfterInit() {
    // this.product.subscribe
  }

  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());

    this.currentBillMarkers.push(new Marker(
      this.recievedProduct,
      this.user.uid,
      event.latLng
    ));
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }

  orderButtonClicked() {
    this.showModal();
  }

  // Modal stuff
  showModal(): void {
    this.modalIsVisible = true;
  }

  createBill() {
    this.currentBillMarkers.forEach(marker => {

      this.createMarker(JSON.parse(JSON.stringify(marker)));
      this.orderProductArray.push(marker.product);
    });
    const newBill = new Bill(
      moment(new Date()).toString(),
      this.user.uid,
      this.orderProductArray,
      this.calculateTotal()
    );
    this.createNewBill(JSON.parse(JSON.stringify(newBill)));
    this.modalIsVisible = false;
  }

  handleCancel() {
    this.modalIsVisible = false;
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  calculateItemDiscount(itemPrice: number, itemDiscount: number): number {
    return Math.round((itemPrice * (1 - (itemDiscount / 100)) + Number.EPSILON) * 100) / 100;
  }

  calculateTotal() {
    let total = 0;
    this.currentBillMarkers.forEach(marker => {
      total += this.calculateItemDiscount(marker.product.price, marker.product.discount);
    });
    return total;
  }

  createNewBill(bill: Bill) {
    this.firestoreBillService.createBill(bill);
  }

  createMarker(marker: Marker) {
    this.firestoreMarkerService.createMarker(marker);
  }
}
