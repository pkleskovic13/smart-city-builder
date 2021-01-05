import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginError = false;

  adminLoginForm = new FormGroup({
    adminEmail: new FormControl(''),
    adminPassword: new FormControl('')
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onFormSubmit() {
    this.authService.signInWithEmail(this.adminLoginForm.get('adminEmail').value, this.adminLoginForm.get('adminPassword').value);
  }

}
