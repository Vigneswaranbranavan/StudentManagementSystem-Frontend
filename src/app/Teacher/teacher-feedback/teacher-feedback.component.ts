import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-feedback',
  standalone: true,
  imports: [NgClass],
  templateUrl: './teacher-feedback.component.html',
  styleUrl: './teacher-feedback.component.css'
})
export class TeacherFeedbackComponent {
  feedbackList = [];
  
}
