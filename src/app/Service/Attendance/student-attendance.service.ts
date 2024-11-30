import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentAttendanceService {

  private baseUrl = 'https://localhost:7058/api/Attendance';

  constructor(private http: HttpClient) { }

  submitAttendance(attendanceData: { studentID: string; date: string; status: number }[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/submit`, attendanceData);
  }
    

  getAttendanceByStudent(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/student/${studentId}`);
  }

  getAttendanceByDate(studentId: number, date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/student/${studentId}/attendance`, { params: { date } });
  }
}
