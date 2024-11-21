import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-view-feedback',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './admin-view-feedback.component.html',
  styleUrl: './admin-view-feedback.component.css'
})
export class AdminViewFeedbackComponent {
  feedbacks = [
    {
      studentName: 'John Doe',
      feedbackDate: '2024-11-19',
      message: 'Great experience in the last class. Learned a lot!',
    },
    {
      studentName: 'Jane Smith',
      feedbackDate: '2024-11-20',
      message: 'The lecture was informative, but the pace was a bit fast.',
    },
  ];

  filteredFeedbacks = [...this.feedbacks];
  selectedDate: string = '';

  // Modal-related properties
  modalStudentName: string = '';
  modalFeedbackDate: string = '';
  modalFeedbackMessage: string = '';
  isModalOpen: boolean = false;

  constructor() {}

  // Handles search input
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchQuery = inputElement.value.toLowerCase();
    this.filterFeedbacks(searchQuery, this.selectedDate);
  }

  // Handles date filter selection
  onDateFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedDate = selectElement.value;
    this.selectedDate = selectedDate;
    this.filterFeedbacks('', selectedDate);
  }

  // Filters feedbacks based on search query and date
  private filterFeedbacks(searchQuery: string, dateFilter: string): void {
    this.filteredFeedbacks = this.feedbacks.filter((feedback) => {
      const matchesQuery =
        !searchQuery ||
        feedback.studentName.toLowerCase().includes(searchQuery) ||
        feedback.message.toLowerCase().includes(searchQuery);

      const matchesDate = !dateFilter || feedback.feedbackDate === dateFilter;

      return matchesQuery && matchesDate;
    });
  }

  // Opens the modal with the selected feedback details
  openModal(studentName: string, feedbackDate: string, feedbackMessage: string): void {
    this.modalStudentName = studentName;
    this.modalFeedbackDate = feedbackDate;
    this.modalFeedbackMessage = feedbackMessage;
    this.isModalOpen = true;
  }

  // Closes the modal
  closeModal(): void {
    this.isModalOpen = false;
  }
}


