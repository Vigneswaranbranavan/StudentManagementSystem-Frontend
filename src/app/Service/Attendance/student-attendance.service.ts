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

  submitAttendance(attendanceData:Attendance[] ) {
    return this.http.post(`${this.baseUrl}`, attendanceData);
  }
  
  getAttendanceSummary(studentId: string): Observable<{ presentDays: number; absentDays: number; lateDays: number }> {
    return this.http.get<{ presentDays: number; absentDays: number; lateDays: number }>(`${this.baseUrl}/${studentId}`);
  }

  getAttendanceDetails(studentId: string, date: string): Observable<{ time: string; subject: string; status: string }[]> {
    return this.http.get<{ time: string; subject: string; status: string }[]>(`${this.baseUrl}/${studentId}${date}`);
  }
}
