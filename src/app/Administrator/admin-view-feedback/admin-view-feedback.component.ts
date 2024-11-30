import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { feedback } from '../../Service/Models/model';
import { AdminNotificationService } from '../../Service/Notification/admin-notification.service';

@Component({
  selector: 'app-admin-view-feedback',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule,ReactiveFormsModule],
  templateUrl: './admin-view-feedback.component.html',
  styleUrl: './admin-view-feedback.component.css'
})
export class AdminViewFeedbackComponent {
  feedbacks: feedback[] = []; // This will hold all feedbacks
  filteredFeedbacks: feedback[] = []; // This will hold filtered feedbacks

  // Modal-related properties
  modalFeedbackType: string = '';
  modalFeedbackComments: string = '';
  modalFeedbackUserId:string=';'
  isModalOpen: boolean = false;

  constructor(private notificationService: AdminNotificationService) {}

  ngOnInit(): void {
    this.loadFeedbacks(); // Load all feedbacks on component initialization
  }

  // Fetch all feedbacks from the server
  loadFeedbacks(): void {
    this.notificationService.getFeedbacks().subscribe((feedbacks: feedback[]) => {
      this.feedbacks = feedbacks;
      this.filteredFeedbacks = [...this.feedbacks];
    });
  }

  // Handles search input
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchQuery = inputElement.value.toLowerCase();
    this.filterFeedbacks(searchQuery);
  }

  // Filters feedbacks based on search query
  private filterFeedbacks(searchQuery: string): void {
    this.filteredFeedbacks = this.feedbacks.filter((feedback) => {
      const matchesQuery =
        !searchQuery ||
        feedback.feedbackType.toLowerCase().includes(searchQuery) ||
        feedback.comments.toLowerCase().includes(searchQuery);
      return matchesQuery;
    });
  }

  // Opens the modal with the selected feedback details
  openModal(feedbackType: string, feedbackComments: string,userId:string): void {
    console.log("Modal opened with feedback type:", feedbackType, "and comments:", feedbackComments);
    this.modalFeedbackType = feedbackType;
    this.modalFeedbackComments = feedbackComments;
    this.modalFeedbackUserId=userId
    this.isModalOpen = true; // Open the modal
  }

  // Closes the modal
  closeModal(): void {
    this.isModalOpen = false; // Close the modal
  }
}