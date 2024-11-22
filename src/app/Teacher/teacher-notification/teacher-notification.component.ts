import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-notification',
  standalone: true,
  imports: [NgIf,NgClass,NgFor],
  templateUrl: './teacher-notification.component.html',
  styleUrl: './teacher-notification.component.css'
})
export class TeacherNotificationComponent {
  notifications = [
    {
      id: 1,
      unread: true,
      title: "New Assignment Uploaded",
      message: "Your teacher has uploaded a new assignment in Math. Check it out!",
      date: "2024-11-20"
    },
    {
      id: 2,
      unread: false,
      title: "Upcoming Exam Reminder",
      message: "Don’t forget about the upcoming Physics exam on 2024-11-25.",
      date: "2024-11-19"
    },
    {
      id: 3,
      unread: false,
      title: "Feedback Received",
      message: "Your teacher has provided feedback on your recent submission. Please review it.",
      date: "2024-11-18"
    },
    {
      id: 4,
      unread: true,
      title: "Attendance Award",
      message: "Congratulations! You’ve maintained perfect attendance this month!",
      date: "2024-11-15"
    },
    {
      id: 5,
      unread: true,
      title: "Holiday Announcement",
      message: "The school will be closed for the winter break from December 20th to January 5th.",
      date: "2024-11-21"
    },
    {
      id: 6,
      unread: false,
      title: "Class Rescheduled",
      message: "Your Chemistry class has been rescheduled to next Monday, 2024-11-24.",
      date: "2024-11-17"
    }
  ];
}
