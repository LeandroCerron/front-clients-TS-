import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  form: FormGroup;
  clientId: string;
  title = 'Edit';

  constructor(private fb: FormBuilder,
              private _clienteService: ClienteService,
              private aRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar, private _authService: AuthService) { 

    this.form = fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
    });

    this.clientId = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._authService.getPageLoad(false);
    if(this.clientId === 'newClient'){
      this.title = 'New';
    }else{
      this.formFields();
    }    
  }

  edit(){
    const client: Client = {
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      telephone: this.form.value.telephone
    }
    if(this.clientId === 'newClient'){
      this._authService.getPageLoad(true);
      this._clienteService.createClient(client).subscribe(data => {
        this._snackBar.open(data.message, '▲', {
          duration: 3000
        });
        this.router.navigate(['/clients']);
      }, error => {
        console.log(error);
        this._snackBar.open('Error!', 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        });
      });
    }else{
      this._authService.getPageLoad(true);
      this._clienteService.editClient(this.clientId, client).subscribe(data => {
        this.router.navigate(['/clients']);
        this._snackBar.open('Client successfully edited', '↑', {
          duration: 3000
        });
      })  
    }    
  }

  formFields(){    
    this._clienteService.getClient(this.clientId).subscribe(data => {
      this.form.setValue({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        telephone: data.telephone
      })
    });
  }
  clients(){
    this._authService.getPageLoad(true);
    this.router.navigate(['/clients']);
  }
}
