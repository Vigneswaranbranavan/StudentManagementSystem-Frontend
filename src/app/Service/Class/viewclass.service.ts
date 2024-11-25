import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewclassService {

  url = "http://localhost:5101/api/Class/Class";

  constructor(private http: HttpClient) { }

  getClasses() {
    return this.http.get<any[]>(this.url);
  }

  AddClass(Class : any){
    return this.http.post(this.url, Class);
  }

  deleteClass(classId: any) {
    return this.http.delete(this.url + '?id=' + classId);
}

  // editClass( classid: string, class: any)
  // {
  //   return this.http.put(this.url + "?id=" + classid, class);

  // }

  
}


