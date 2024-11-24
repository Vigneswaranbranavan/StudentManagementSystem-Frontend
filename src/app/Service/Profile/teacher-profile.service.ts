import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { teacher } from '../Models/models';
import { Observable, catchError, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherProfileService {

  private url = 'http://localhost:5101/api/Teacher/Teacher';

  constructor(private http: HttpClient) {}

  getTeacher(teacherId: number): Observable<teacher> {
    return this.http.get<teacher>(`${this.url}/${teacherId}`).pipe(
      catchError(error => {
        console.error('Error fetching teacher data:', error);
        throw error;
      })
    );
  }

  updateTeacher(teacher: teacher, teacherId: number): Observable<teacher> {
    return this.http.put<teacher>(`${this.url}/${teacherId}`, teacher).pipe(
      catchError(error => {
        console.error('Error updating teacher:', error);
        throw error;
      })
    );
  }
}
  
  // deleteTeacher(teacherId: number){
  //   return this.http.delete(this.url+'/'+teacherId)
  // }


