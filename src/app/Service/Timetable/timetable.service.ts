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
    return this.http.post(this.apiUrl, timetable);
  }
  
  getTimetables(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTimetableByTeacherId(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teacher/${teacherId}`);
  }

  getTimetableByClassId(classId: string): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7058/api/Timetable/ByClassId?id=" + classId);
  }



 getTimetableByDate(date: string) {
  return this.http.get<any[]>(`/api/timetables/byDate?date=${date}`);
}

  
}

export interface TimetableEntry {
  teacherID: string;
  subject: string;
  startTime: string;
  endTime: string;
}
