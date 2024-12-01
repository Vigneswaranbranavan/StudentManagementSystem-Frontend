import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { feedback } from '../../Service/Models/model';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeacherFeedbackService } from '../../Service/Feedback/teacher-feedback.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentFeedbackService } from '../../Service/Feedback/student-feedback.service';

@Component({
  selector: 'app-student-feedback',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, HttpClientModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './student-feedback.component.html',
  styleUrl: './student-feedback.component.css',
  providers:[StudentFeedbackService]
})
export class StudentFeedbackComponent {
  feedback: feedback = { id:'', userID: '', feedbackType: '', comments: '' };
  feedbackTypes = ['Technical Feedback', 'Suggestions for Improvement', 'Support and Help']; // Example feedback types
  feedbackList: feedback[] = [];
  isSubmitting = false;
  userId: string = '';  // User ID will be fetched from localStorage
  feedbackToEdit: feedback | null = null; // Store the feedback to be edited

  constructor(private feedbackService: TeacherFeedbackService) { }

  ngOnInit(): void {
    // Fetch userId from localStorage
    this.userId = localStorage.getItem('UserId') || ''; // Get the logged-in user's ID from localStorage
    console.log('userId from localStorage:', this.userId);  // For debugging

    if (!this.userId) {
      console.error('User ID not found in localStorage!');
    }

    // Get the previous feedback list
    this.getFeedbackList();
  }

  // Submit feedback to the backend
  submitFeedback(feedbackForm: NgForm): void {
    if (feedbackForm.valid) {
      this.isSubmitting = true;
  
      // Prepare the feedback data to send to the API
      const feedbackData: feedback = {
        userID: this.userId,  // Use the userID from localStorage
        feedbackType: this.feedback.feedbackType,
        comments: this.feedback.comments,
        id: ''  // Ensure this is empty, as we are not editing existing feedback
      };
  
      console.log('Submitting feedback data:', feedbackData);  // For debugging
  
      // Submit the feedback data via the service
      this.feedbackService.addFeedback(feedbackData).subscribe(response => {
        this.isSubmitting = false;
        this.feedbackList.push(response);  // Add the newly created feedback to the list
        feedbackForm.reset();  // Reset the form after submission
      }, error => {
        this.isSubmitting = false;
        console.error('Error submitting feedback:', error);
      });
    }
  }

  // Fetch the list of feedback for the current user
  getFeedbackList(): void {
    if (this.userId) {
      this.feedbackService.getFeedback(this.userId).subscribe(feedbacks => {
        this.feedbackList = feedbacks;
      }, error => {
        console.error('Error fetching feedback list:', error);
      });
    }
  }

  editFeedback(feedback: feedback): void {
    console.log('Editing feedback:', feedback);
    this.feedbackToEdit = { ...feedback };
    this.feedback.feedbackType = feedback.feedbackType;
    this.feedback.comments = feedback.comments;
  }

  deleteFeedback(feedback: feedback): void {
    this.feedbackService.deleteFeedback(feedback.id).subscribe(() => {
      // Remove the deleted feedback from the list
      this.feedbackList = this.feedbackList.filter(f => f.id !== feedback.id);
      console.log('Feedback deleted successfully');
    }, error => {
      console.error('Error deleting feedback:', error);
    });
  }
}