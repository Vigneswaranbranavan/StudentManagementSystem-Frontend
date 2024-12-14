import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherNotificationService {
  private apiUrl = 'https://localhost:7058/api/Notification/Notification';  // Your API URL
  private getapiUrl = 'https://localhost:7058/api/Notification/Get%20Notification%20By%20UserId';

  constructor(private http: HttpClient) { }

  sendNotification(teacherId: string, notificationType: string, message: string): Observable<any> {
    const notificationData = {
      userID: teacherId,
      notificationType: notificationType,
      message: message,
      date: new Date().toISOString()
    };

    return this.http.post(this.apiUrl, notificationData);
  }


  getNotificationsByUserId(userId: string): Observable<any> {
    return this.http.get(`https://localhost:7058/api/Notification/Get Notification By UserId?UserId=${userId}`);
  }
  deleteNotification(notificationId: string): Observable<any> {
    const url = `https://localhost:7058/api/Notification/Notification/${notificationId}`;
    return this.http.delete(url);
  }


}

