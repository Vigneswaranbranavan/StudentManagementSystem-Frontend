import { Injectable } from '@angular/core';
import { student } from '../Models/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherProfileService {
  url = 'http://localhost:5101/api/Teacher/Teacher';

  constructor(private http: HttpClient) {}

  // getStudentProfile(studentId: number): Observable<any> {
  //   return this.http.get(`${this.url}/${studentId}`);
  // }

  getTeacher(teacherId: string) {
    return this.http.get<student>(`${this.url}/${teacherId}`);
  }

  updateStudent(teacher: student, teacherId: number) {
    return this.http.put(`${this.url}/${teacherId}`, teacher);
  }}