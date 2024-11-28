import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private apiUrl = 'https://localhost:7058/api/Timetable/TimeTable';

  constructor(private http: HttpClient) { }

  addTimetable(timetable: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, timetable);
  }

  getTimetableByTeacherId(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teacher/${teacherId}`);
  }

  getTimetableByClassId(classId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/class/${classId}`);
  }
}

export interface TimetableEntry {
  teacherID: string;
  subject: string;
  startTime: string;
  endTime: string;
}
