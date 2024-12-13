import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentNotificationService {
  private apiUrl = 'https://localhost:7058/api/Notification/Notification'; // Your API endpoint
  private getapiUrl = 'https://localhost:7058/api/Notification/Get%20Notification%20By%20UserId'; 

  constructor(private http: HttpClient) {}

  postNotification(notification: { userID: string, notificationType: string, message: string, date: string }): Observable<any> {
    return this.http.post(this.apiUrl, notification);
  }

  getNotificationsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.getapiUrl}?UserId=${userId}`);
  }
  deleteNotification(notificationId: string): Observable<any> {
    const url = `${this.apiUrl}/${notificationId}`;
    return this.http.delete(url);
  }


}

