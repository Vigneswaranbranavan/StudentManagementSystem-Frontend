import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { feedback } from '../../Service/Models/model';
import { TeacherFeedbackService } from '../../Service/Feedback/teacher-feedback.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-teacher-feedback',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, HttpClientModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './teacher-feedback.component.html',
  styleUrl: './teacher-feedback.component.css',
  providers: [TeacherFeedbackService],

})
export class TeacherFeedbackComponent implements OnInit {
  feedback: feedback = { id:'',userID: '', feedbackType: '', comments: '' };
  feedbackTypes = ['Payment Added', 'Payment Failed', 'General Feedback']; // Example feedback types
  feedbackList: feedback[] = [];
  isSubmitting = false;
  userId: string = '';  // User ID will be extracted from the URL
  feedbackToEdit: feedback | null = null; // Store the feedback to be edited


  constructor(private route: ActivatedRoute, private feedbackService: TeacherFeedbackService) { }



  
  ngOnInit(): void {
    // Fetch userId from the route parameters (URL)
        // Fetch userId from localStorage
        this.userId = localStorage.getItem('UserId') || ''; // Get the logged-in user's ID from localStorage
        console.log('userId from localStorage:', this.userId);  // For debugging
    
        if (!this.userId) {
          console.error('User ID not found in localStorage!');
        }
    
        // Get the previous feedback list
        this.getFeedbackList();
    

    // Get the previous feedback list
    this.getFeedbackList();
  }



  // Submit feedback to the backend
  submitFeedback(feedbackForm: NgForm): void {
    if (feedbackForm.valid) {
      this.isSubmitting = true;
  
      // Prepare the feedback data to send to the API
      const feedbackData: feedback = {
        userID: this.userId,  // The userID is fetched from the URL
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
    this.feedbackToEdit = { ...feedback };  // Clone the feedback to avoid direct mutation
    this.feedback.feedbackType = feedback.feedbackType;
    this.feedback.comments = feedback.comments;
  }

  //  updateFeedback(feedbackData: feedback): void {
  //   if (this.feedbackToEdit) {
  //     this.feedbackService.updateFeedback(feedbackData).subscribe(updatedFeedback => {
  //       const index = this.feedbackList.findIndex(f => f.userID === updatedFeedback.userID);
  //       if (index > -1) {
  //         this.feedbackList[index] = updatedFeedback; // Update the feedback in the list
  //       }
  //       this.feedbackToEdit = null;  // Clear edit mode
  //       console.log('Feedback updated successfully');
  //     }, error => {
  //       console.error('Error updating feedback:', error);
  //     });
  //   }
  // }

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

  // Handle deleting feedback
  // deleteFeedback(feedbackId: string): void {
  //   this.feedbackService.deleteFeedback(feedbackId).subscribe(() => {
  //     this.feedbackList = this.feedbackList.filter(feedback => feedback !== feedbackId);
  //     console.log('Feedback deleted successfully');
  //   }, error => {
  //     console.error('Error deleting feedback:', error);
  //   });
  // }
