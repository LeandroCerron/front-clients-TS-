import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
    this.form = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this._authService.getPageLoad(false)
  }
  
  login() {
    const LOGIN: Login = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    
    this._authService.logIn(LOGIN).subscribe(data => {
      this._authService.getPageLoad(true);
      if(!(data.token === undefined)){
        localStorage.setItem('token', data.token);
        this.router.navigate(['/clients']);
        this._authService.getPageLoad(false);
      }else{
        this._authService.getPageLoad(false);
        this._snackBar.open('Incorrect User or Password', 'X', {
          duration: 3000
        });      
      }
    }, error => {
      console.log(error.error.message)
      this._snackBar.open(error.error.message, 'X', {
        duration: 3000
      });
    });
  }

  loggedIn() {
    return this._authService.loggedIn();
  }

  signup(){
    this._authService.getPageLoad(true);
    this.router.navigate(['/signup']);
  }

}
