import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-notification',
  standalone: true,
  imports: [NgClass,NgFor,NgIf],
  templateUrl: './student-notification.component.html',
  styleUrl: './student-notification.component.css'
})
export class StudentNotificationComponent {
  notifications = [
    {
      id: 1,
      unread: true,
      title: 'New Assignment Uploaded',
      message: 'Your teacher has uploaded a new assignment in Math. Check it out!',
      date: '2024-11-20'
    },
    {
      id: 2,
      unread: false,
      title: 'Upcoming Exam Reminder',
      message: "Don’t forget about the upcoming Physics exam on 2024-11-25.",
      date: '2024-11-19'
    },
    {
      id: 3,
      unread: false,
      title: 'Feedback Received',
      message: 'Your teacher has provided feedback on your recent submission. Please review it.',
      date: '2024-11-18'
    },
    {
      id: 4,
      unread: true,
      title: 'Attendance Award',
      message: "Congratulations! You’ve maintained perfect attendance this month!",
      date: '2024-11-15'
    }
  ];
}
