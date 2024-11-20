import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-feedback',
  standalone: true,
  imports: [NgIf,NgClass],
  templateUrl: './student-feedback.component.html',
  styleUrl: './student-feedback.component.css'
})
export class StudentFeedbackComponent {
  feedbackList = [
    {
      id: 1,
      title: 'Request for Additional Study Materials',
      message: 'Could you please upload extra practice materials for Math?',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'Resolved Issue in Assignment Portal',
      message: 'The issue with uploading assignments has been resolved. Thank you!',
      status: 'Resolved'
    },
    {
      id: 3,
      title: 'Technical Issue in Attendance System',
      message: "I'm experiencing errors when marking attendance on the portal.",
      status: 'Pending'
    }
  ];
}
