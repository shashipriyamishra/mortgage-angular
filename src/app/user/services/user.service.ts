import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }
   public get currentUserValue() {
    return this.currentUserSubject.value;
}
 localstorage = JSON.parse(localStorage.getItem('currentUser'));
  userId = this.localstorage && this.localstorage.userId;
  register(form) {
    return this.http.post(`http://localhost:8085/users`, form);
}

login(form) {
  return this.http.post(`http://localhost:8085/login`,  form )
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user ) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
          }

          return user;
      }));
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}
getAccountSummaryApi(){
  return this.http.get(`http://localhost:3000/accountSummary`);
}

getAccountSummary(){
  return this.http.get(`http://localhost:8085/users/${this.userId}/accounts`);
}
}
