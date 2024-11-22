import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { student } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {

  url ='http://localhost:5101/api/Student/Student';


  constructor(private http:HttpClient) { }

  
  // createStudent(student:student){
  //   return this.http.post(this.url,student)
  // }
  // getStudents(){
  //   return this.http.get<student[]>(this.url)
  // }
  getStudent(studentId:number){
    return this.http.get<student>(this.url+'/'+studentId)
  }
  updateStudent(student:student ,studentId:number){
    return this.http.put(this.url+'/'+studentId,student)
  }
  // deleteStudent(studentId: number){
  //   return this.http.delete(this.url+'/'+studentId)
  // }
}
