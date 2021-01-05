import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
import { FirestoreUserService } from 'src/app/services/db/user/firestore-user.service';
import { FirestoreUser } from 'src/app/models/firestore-user.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  private user: User;
  firestoreUser: User;
  isCollapsed = false;
  modalIsVisible = false;

  editUserForm = new FormGroup({
    displayName: new FormControl(''),
    email: new FormControl('')
  });


  constructor(
    private authService: AuthService,
    private firestoreUserService: FirestoreUserService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.firestoreUserService.getCurrentUserFromFirestore(this.user.uid).subscribe(result => {
      this.firestoreUser = result;
    });
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
