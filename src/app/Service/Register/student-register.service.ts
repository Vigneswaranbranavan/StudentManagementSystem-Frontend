import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentRegisterService {

  constructor(private http:HttpClient) { }

  url = 'https://localhost:7058/api/Student';

  getStudents(): Observable<any> {
    return this.http.get(this.url);
  }

  getStudent(studentId: string) {
    return this.http.get<any>(this.url + "/" + studentId);
  }



  
  AddStudent(student: any): Observable<any> {
    return this.http.post(this.url, student);
  }





  deleteStudent(deleteId : any)
  {
    return this.http.delete(this.url + "/" + deleteId)
  }

  editStudent( studentid : string, student: any)
  {
    return this.http.put(this.url + "/" + studentid, student)

  }
}

// export interface Student{
//   id: string;
//   name: string;
//   phone: string;
//   userReq: UserReq[]
// }

// export interface UserReq{
//   id: string;
//   email: string;
//   password: string;
 
// }