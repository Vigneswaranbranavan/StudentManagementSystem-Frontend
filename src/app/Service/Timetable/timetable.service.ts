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

  getTimetableByClassGrade(classGrade: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/class/${classGrade}`);
  }
}

export interface TimetableEntry {
  id: string; 
  subjectID: string;
  subject: { name: string }; 
  teacherID: string;
  teacher: { name: string }; 
  classID: string;
  class: { name: string }; 
  room: string;
  endTime: any;
  startTime: any; 
  date: string; 
}
