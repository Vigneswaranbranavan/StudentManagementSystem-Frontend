import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentRegisterService {

  constructor(private http:HttpClient) { }

  url = 'http://localhost:5101/api/Student';



  AddStudent(student: any): Observable<any> {
    return this.http.post(this.url, student);
  }
}
