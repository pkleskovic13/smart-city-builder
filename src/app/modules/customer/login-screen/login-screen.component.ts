import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  userLoginForm = new FormGroup({
    userEmail: new FormControl(''),
    userPassword: new FormControl('')
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  // This is done because authService is declared as private so the method cannot be called from the template :)
  onFormSubmit() {
    this.authService.signInWithEmail(this.userLoginForm.get('userEmail').value, this.userLoginForm.get('userPassword').value);
  }

}
