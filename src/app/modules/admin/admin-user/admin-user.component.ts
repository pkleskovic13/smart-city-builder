import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { FirestoreUserService } from 'src/app/services/db/user/firestore-user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserGuard } from 'src/app/guards/user.guard';
import { FirestoreUser } from 'src/app/models/firestore-user.model';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  users: User[];

  newUserForm = new FormGroup({
    newEmail: new FormControl(''),
    newPassword: new FormControl('')
  });

  submitForm(): void {
    this.create(
      this.newUserForm.get('newEmail').value,
      this.newUserForm.get('newPassword').value
    );
  }

  constructor(
    private firestoreUserService: FirestoreUserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.firestoreUserService.getAllUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          uid: e.payload.doc.id,
          ...e.payload.doc.data() as User
        };
      });
    });
  }

  create(email: string, password: string) {
    this.authService.createNewUser(email, password);
  }

  // delete(id: string) {
  //   // this.productService.deleteProduct(id);
  //   this.firestoreUserService.deleteUser(id);
  // }
}
