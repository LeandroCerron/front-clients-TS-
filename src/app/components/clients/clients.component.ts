import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { MessageConfirmationComponent } from '../message-confirmation/message-confirmation.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  edit = false;
  CLIENTS_DATA: Client[] = [];
  displayedColumns: string[] = ['name', 'lastName', 'email', 'telephone', 'actions'];
  dataSource = new MatTableDataSource<Client>();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private _clienteService: ClienteService, private _snackBar: MatSnackBar, public dialog: MatDialog, private _authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.chargeTable();
    this._authService.getPageLoad(false);
    this._clienteService.getbtnCreateUser('');
    this.listClients();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listClients(){
    this._clienteService.getClients().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.chargeTable();
    });    
  }

  delete(client:any){

    const dialogRef = this.dialog.open(MessageConfirmationComponent, {
      width: '350px',
      data: {message : 'Are you sure you want to delete the client?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'accept'){
        this._clienteService.deleteClient(client._id).subscribe(data => {
          this.listClients();
          this._snackBar.open('Client successfully deleted', 'X', {
            duration: 3000
          });      
        })
      }
    });    
  }

  createClient(){
    this._authService.getPageLoad(true);
    this.router.navigate(['/editClient/newClient'])
  }

  chargeTable(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 20);
  }
}
