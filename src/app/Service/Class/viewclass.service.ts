import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewclassService {
  url = "http://localhost:5101/api/Class/Class";

  constructor(private http: HttpClient) { }

  getClasses() {
    return this.http.get<any[]>(this.url);  // Ensure the response is an array of classes
  }

  AddClass(Class: any) {
    return this.http.post(this.url, Class);
  }

  deleteClass(classId: any) {
    return this.http.delete(this.url + '?id=' + classId);
  }
}


