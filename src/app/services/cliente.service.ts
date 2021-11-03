import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private url = 'http://localhost:4000/api/clients/';
  private btnCreateUser$ = new Subject<any>();

  constructor(private http: HttpClient) { 
  }

  createClient(client: any): Observable<any>{
    return  this.http.post(this.url, client);
  }

  getClients(): Observable<any>{
    return this.http.get(this.url);
  }

  deleteClient(id:string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  editClient(id:string, client:any): Observable<any>{
    return this.http.put(this.url + id, client);
  }

  getClient(id:string): Observable<any>{
    return this.http.get(this.url + id);
  }

  getbtnCreateUser(btn: any){
    this.btnCreateUser$.next(btn);
  }

  setbtnCreateUser(): Observable<any>{
    return this.btnCreateUser$.asObservable();
  }
}