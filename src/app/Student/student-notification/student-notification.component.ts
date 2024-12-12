import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { StudentNotificationService } from '../../Service/Notification/student-notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-notification',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './student-notification.component.html',
  styleUrl: './student-notification.component.css'
})
export class StudentNotificationComponent {
  notifications: any[] = [];  // Array to store notifications

  constructor(private notificationService: StudentNotificationService,
    private toastr: ToastrService // Inject Toastr for success/error messages

  ) {}

  ngOnInit(): void {
    this.getNotifications();
  }
  // Method to fetch notifications
  getNotifications(): void {
    const userId = localStorage.getItem('UserId');
    if (userId) {
      this.notificationService.getNotificationsByUserId(userId).subscribe({
        next: (data) => {
          this.notifications = data;
          
          // Check if no notifications are returned, then clear the 'notificationType' in localStorage
          if (this.notifications.length === 0) {
            localStorage.removeItem('notificationType');
            this.toastr.info('No notifications found, clearing notification type.');
          }
        },
        error: (error) => {
          console.error('Error fetching notifications:', error);
          this.toastr.error('Failed to load notifications.');
        }
      });
    }
  }

  deleteNotification(notificationId: string): void {
    this.notificationService.deleteNotification(notificationId).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(
          (notification) => notification.id !== notificationId
        );
        this.toastr.success('Notification deleted successfully.');
        
        // If no notifications remain, clear the 'notificationType' in localStorage
        if (this.notifications.length === 0) {
          localStorage.removeItem('notificationType');
          this.toastr.info('No notifications found, clearing notification type.');
        }
      },
      error: (error) => {
        console.error('Error deleting notification:', error);
        this.toastr.error('Failed to delete notification.');
      }
    });
  }


}
