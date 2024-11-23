import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentRegisterService {

  constructor(private http:HttpClient) { }

  url = 'https://localhost:7058/api/Student';

  getStudents(): Observable<any> {
    return this.http.get(this.url);
  }

  AddStudent(student: any): Observable<any> {
    return this.http.post(this.url, student);
  }
}
