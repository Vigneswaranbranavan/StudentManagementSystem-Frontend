import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { student } from '../Models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {

  url = 'http://localhost:5101/api/Student';

  constructor(private http: HttpClient) {}

  // getStudentProfile(studentId: number): Observable<any> {
  //   return this.http.get(`${this.url}/${studentId}`);
  // }

  getStudent(studentId: string) {
    return this.http.get<student>(`${this.url}/${studentId}`);
  }

  updateStudent(student: student, studentId: number) {
    return this.http.put(`${this.url}/${studentId}`, student);
  }
}
