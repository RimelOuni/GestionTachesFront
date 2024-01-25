import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { user } from '../classes/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {

  }




  register(user: user): Observable<user> {
    return this.http.post<user>('http://localhost:4000/api/user/register', user);
  }

  login(user: user): Observable<user> {
    return this.http.post<user>('http://localhost:4000/api/user/login', user);
  } 

  updateProfile(user: user): Observable<user> {
    return this.http.put<user>(`http://localhost:4000/api/user/${user._id}`, user);
  }

  
  getAllUsers(): Observable<user[]> {
    return this.http.get<user[]>('http://localhost:4000/api/user');
  }

 getUserById(user: user): Observable<user> {
    return this.http.get<user>(`http://localhost:4000/api/user/${user._id}`);
  }




}
