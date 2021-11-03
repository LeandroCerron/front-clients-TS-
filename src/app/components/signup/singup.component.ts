import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  form: FormGroup;
  
  constructor(private fb: FormBuilder,  private _authService: AuthService,  private router: Router) {

    this.form = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]], 
      password: ['', [Validators.required]]
    });
    
  }

  ngOnInit(): void {
    this._authService.getPageLoad(false);
  }

  singup(){
    this._authService.getPageLoad(true);
    const USER: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      roles: []
    }
    this._authService.generateUser(USER).subscribe(data => {
      localStorage.setItem('token', data.token);
      this.form.reset();
      this.router.navigate(['/clients']);
    }, error => {console.log(error.error)});
  }

  login() {
    this._authService.getPageLoad(true);
      this.router.navigate(['/login']);  
    
  }
}
