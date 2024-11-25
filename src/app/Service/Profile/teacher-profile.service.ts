import { Injectable } from '@angular/core';
import { Teacher } from '../Models/model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherProfileService {

  private url = 'http://localhost:5101/api/Teacher/Teacher'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch teacher profile by ID
  getTeacher(teacherId: string): Observable<Teacher | null> {
    return this.http.get<Teacher>(`${this.url}/${teacherId}`).pipe(
      catchError(error => {
        console.error('Error fetching teacher:', error);
        return of(null); // Return a fallback value (null) in case of error
      })
    );
  }

  // Update teacher profile
  updateTeacher(teacher: Teacher, teacherId: string): Observable<Teacher | null> {
    return this.http.put<Teacher>(`${this.url}/${teacherId}`, teacher).pipe(
      catchError(error => {
        console.error('Error updating teacher:', error);
        return of(null); // Return a fallback value (null) in case of error
      })
    );
  }
}
