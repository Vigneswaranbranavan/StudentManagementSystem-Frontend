import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../Models/models'; 
import { Observable, catchError, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TeacherProfileService {
  private url = 'http://localhost:5101/api/Teacher/Teacher';  // API URL to fetch teacher details

  constructor(private http: HttpClient) {}

  // Method to fetch teacher profile based on teacherId
  getTeacher(teacherId: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.url}/${teacherId}`).pipe(
      catchError((error) => {
        console.error('Error fetching teacher data:', error);
        return throwError(error);
      })
    );
  }
}