import { Injectable } from '@angular/core';
import { teacher } from '../Models/model';
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
  getTeacher(teacherid: string) {
    return this.http.get<teacher>(`${this.url}?id=${teacherid}`);
  }
  // Update teacher profile
  updateTeacher(teacher: teacher, teacherid: number) {
    return this.http.put(`${this.url}/${teacherid}`, teacher);
  }
}
