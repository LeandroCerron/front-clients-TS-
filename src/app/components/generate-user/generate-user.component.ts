import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-generate-user',
  templateUrl: './generate-user.component.html',
  styleUrls: ['./generate-user.component.css']
})
export class GenerateUserComponent implements OnInit {
 form: FormGroup;
 credentials: FormGroup;
 idClient: any;

  constructor(private fb: FormBuilder, 
              private _authService: AuthService, 
              private aRoute: ActivatedRoute,
              private _clienteService: ClienteService, 
              private router: Router,
              private _snackBar: MatSnackBar) {

    this.form = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.credentials = fb.group({
      admin: false,
      moderator: false,
      user: false
    });
    this.idClient = this.aRoute.snapshot.params['id']
   }

  ngOnInit(): void {
    this._authService.getPageLoad(false);
    this._clienteService.getbtnCreateUser('newUser');
  }

  generate(){
    this._authService.getPageLoad(true);
    const newUser: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      roles: this.pushCredentials()
    }

    this._authService.singUp(newUser).subscribe(data => {
      if(data.token){
        this.form.reset();
        this.credentials.reset();
        this.router.navigate(['/clients']);
        this._snackBar.open('User successfully generated', '+', {
          duration: 3000
        });
      }else{
        this._authService.getPageLoad(false);
        this._snackBar.open(data.message, 'X', {
          duration: 3000
        });
      }      
    }, error =>{
      this._authService.getPageLoad(false);
      this._snackBar.open(error.error.message, 'X', {
        duration: 3000
      });
      
    })
    
  }

  pushCredentials(){
    const credentialsArray: any[] = [];
    this._authService.getUsersAndRoles().subscribe(data => {
      if(this.credentials.value.admin){
        credentialsArray.push(data[1][2]._id)
      }
      if(this.credentials.value.moderator){
        credentialsArray.push(data[1][1]._id)
      }
      if(this.credentials.value.user){
        credentialsArray.push(data[1][0]._id);
      }
    })    

    return credentialsArray;
  }

  clients(){
    this._authService.getPageLoad(true);
    this.router.navigate(['/clients']);        
  }
}
