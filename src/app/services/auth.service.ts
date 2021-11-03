import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Login } from '../models/Login';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private pageLoad$ = new Subject<any>();
  private url = 'http://localhost:4000/api/';

  constructor(private http: HttpClient, private router: Router) {}

  singUp(user: User): Observable<any> {
    return this.http.post(this.url + 'auth/signup', user);
  }

  generateUser(user: User): Observable<any> {
    return this.http.post(this.url + 'users', user);
  }

  logIn(user: Login): Observable<any> {
    return this.http.post(this.url + 'auth/login', user);
  }

  getUsersAndRoles(): Observable<any> {
    return this.http.get(this.url + 'users');
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getPageLoad(load:any){
    this.pageLoad$.next(load);
  }

  setPageLoad(): Observable<any> {
    return this.pageLoad$.asObservable();
  }

}
