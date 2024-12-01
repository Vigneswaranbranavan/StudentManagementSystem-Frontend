import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from '../Models/model';

@Injectable({
  providedIn: 'root'
})
export class StudentAttendanceService {

  private baseUrl = 'https://localhost:7058/api/Attendance';

  constructor(private http: HttpClient) { }

  submitAttendance(attendanceData: { studentID: string; date: string; status: number }[]): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.baseUrl}/submit`, attendanceData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // getAttendanceByStudent(studentId: number): Observable<Attendance[]> {
  //   return this.http.get<Attendance[]>(`${this.baseUrl}/student/${studentId}`);
  // }

  // getAttendanceByDate(studentId: number, date: string): Observable<Attendance[]> {
  //   return this.http.get<Attendance[]>(`${this.baseUrl}/student/${studentId}/attendance`, { params: { date } });
  // }
}
