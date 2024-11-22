import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { teacher } from '../Models/models';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherProfileService {


  url ='http://localhost:5101/api/Teacher/Teacher';


  constructor(private http:HttpClient) { }

  
  // createTeacher(teacher:teacher){
  //   return this.http.post(this.url,teacher)
  // }
  // getTeachers(){
  //   return this.http.get<teacher[]>(this.url)
  // }
  getTeacher(teacherId:number){
    return this.http.get<teacher>(this.url+'/'+teacherId)
  }
  updateTeacher(teacher: teacher, teacherId: number) {
    return this.http.put<teacher>(this.url + '/' + teacherId, teacher)
      .pipe(
        catchError(error => {
          console.error('Error updating teacher:', error);
          return throwError(() => new Error('Error updating teacher'));
        })
      );
  }
  
  // deleteTeacher(teacherId: number){
  //   return this.http.delete(this.url+'/'+teacherId)
  // }

}
