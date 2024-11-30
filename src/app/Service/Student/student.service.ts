import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'https://localhost:7058/api/Student';

  constructor(private http: HttpClient) { }

  getStudentsByClass(classId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/class/${classId}`);
  }
  getStudentById(studentId: number): Observable<any> {
    return this.http.get<any>(`your-api-endpoint/students/${studentId}`);
  }

}
