import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { feedback } from '../Models/model';

@Injectable({
  providedIn: 'root'
})
export class TeacherFeedbackService {

  url = "http://localhost:5101/api/Class/Class";

  constructor(private http: HttpClient) { }

  getFeedbacks() {
    return this.http.get<feedback>(this.url);
  }

  getFeedback(feedbackid: string) {
    return this.http.get<feedback>(`${this.url}/${feedbackid}`);
  }
  addFeedback(feedback : feedback){
    return this.http.post(this.url, feedback);
  }
  
  deletefeedbck(feedbackid: feedback) {
    return this.http.delete(this.url + '?id=' + feedbackid);

  }
  // deleteClass(classId: any) {
  //   return this.http.delete(this.url + '?id=' + classId);
// }


}

  // editClass( classid: string, class: any)
  // {
  //   return this.http.put(this.url + "?id=" + classid, class);

  // }

  
