import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TeacherNotificationService } from '../../Service/Notification/teacher-notification.service';

@Component({
  selector: 'app-teacher-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-notification.component.html',
  styleUrl: './teacher-notification.component.css'
})
export class TeacherNotificationComponent {
  notifications: any[] = [];

  constructor(private notificationService: TeacherNotificationService,
    private toastr: ToastrService 

  ) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    const userId = localStorage.getItem('UserId');
    if (userId) {
      this.notificationService.getNotificationsByUserId(userId).subscribe({
        next: (data) => {
          this.notifications = data;
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

        if (this.notifications.length === 0) {
          localStorage.removeItem('notificationType');
        }
      },
      error: (error) => {
        console.error('Error deleting notification:', error);
        this.toastr.error('Failed to delete notification.');
      }
    });
  }


}
