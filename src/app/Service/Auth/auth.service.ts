import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<string>('John Doe'); // Default user name

  constructor() {}

  get userName() {
    return this.userSubject.asObservable();
  }

  setUser(name: string) {
    this.userSubject.next(name);
  }
}
