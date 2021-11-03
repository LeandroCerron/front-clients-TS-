import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent implements OnInit {
  logged = false;
  btnCreateUser = '';
  load = false;

  constructor(private _authService: AuthService, private _clienteService: ClienteService, private router: Router) {
  }

  ngOnInit(): void {
    this.listenLoad();
    this._clienteService.setbtnCreateUser().subscribe(data => {
      this.btnCreateUser = data;
    })
    this.logged = this._authService.loggedIn();
  }

  logout(){
    this._authService.logout();
  }

  loggedIn(){
    return this._authService.loggedIn();
  }

  users(){
    this.load = true;
    this.router.navigate(['/users']);
  }

  listenLoad(){
    this._authService.setPageLoad().subscribe(data => {
      this.load = data;
    });
  }

}
