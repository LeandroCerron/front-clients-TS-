import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cliente';
  clients = [];

  constructor(){//private _clienteService: ClinteService

  }

  ngOnInit(): void{
    // this._clienteService.getClient().subscribe((data) => {
    //   console.log(data);
    // })
  }

}
