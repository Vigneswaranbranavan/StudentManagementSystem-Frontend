import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewSubjectService {

  url = "http://localhost:5101/api/Subject";

  constructor(private http: HttpClient) { }

  getSubjects() {
    return this.http.get<any[]>(this.url);
  }


  AddSubject(subject : any){
    return this.http.post(this.url, subject);
  }

  deleteSubject(subjectId: any) {
    return this.http.delete(this.url + '/' + subjectId);
}
//   AddClass(Class : any){
//     return this.http.post(this.url, Class);
//   }

//   deleteClass(classId: any) {
//     return this.http.delete(this.url + '?id=' + classId);
// }
}
