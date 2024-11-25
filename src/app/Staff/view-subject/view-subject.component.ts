import { Component } from '@angular/core';
import { ViewSubjectService } from '../../Service/Subject/view-subject.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-subject',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-subject.component.html',
  styleUrl: './view-subject.component.css',
  providers: [ViewSubjectService]
})
export class ViewSubjectComponent {

  subjects: any[] = [];
  

  constructor(private service: ViewSubjectService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getSubjects().subscribe(data => {
          this.subjects = data;
        });
  }


  newSubjectName: string = ''; // Variable to bind the input field
  

  AddSubject() {
    if (this.newSubjectName) {
      const newSubject = { subjectName: this.newSubjectName }; // Create object to send to the API

      this.service.AddSubject(newSubject).subscribe(
        response => {
          console.log('Subject added successfully:', response);
          this.loadData(); // Reload classes after adding a new one
          this.newSubjectName = ''; // Clear input field
        },
        error => {
          console.error('Error adding Subject:', error);
        }
      );
    }
  }

  

  DeleteSubject(subjectId: any) {
    if (confirm('Are you sure you want to delete this subject?')) {
        this.service.deleteSubject(subjectId).subscribe({
            next: () => {
                alert('subject deleted successfully!');
                this.loadData(); // Reload updated data
            },
            error: (error) => {
                console.error('Error deleting subject:', error);
                alert('Failed to delete the subject. Please try again.');
            }
        });
    }
}



 

  
}
