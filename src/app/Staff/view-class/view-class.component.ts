import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewclassService } from '../../Service/Class/viewclass.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ViewSubjectService } from '../../Service/Subject/view-subject.service';

@Component({
  selector: 'app-view-class',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule,ToastrModule],
  templateUrl: './view-class.component.html',
  styleUrl: './view-class.component.css',
  providers: [ViewclassService]
})
export class ViewClassComponent implements OnInit {
  Classes: any[] = [];
  selectedClass: any = '';

  // Initializing the variables for the class and subject names
  newClassName: string = '';
  newSubjectName: string = '';

  // Array to hold subjects
  subjects: any[] = [];

  constructor(
    private service: ViewclassService, 
    private router: Router,
    private toastr: ToastrService,
    private Subservice: ViewSubjectService
  ) { }

  ngOnInit(): void {
    this.loadData();  // Load class data
    this.loadSubjects();  // Load subjects data
  }

  // Method to load class data from service
  loadData() {
    this.service.getClasses().subscribe(data => {
      this.Classes = data;
    });
  }

  // Method to add a new class
  AddClass() {
    if (this.newClassName) {
      const newClass = { className: this.newClassName };

      this.service.AddClass(newClass).subscribe(
        response => {
          console.log('Class added successfully:', response);
          this.toastr.success('Class added successfully');
          this.loadData();  // Reload the class list after addition
          this.newClassName = '';  // Reset the input field
        },
        error => {
          console.error('Error adding class:', error);
          this.toastr.error('Error adding class');
        }
      );
    }
  }

  // Method to delete a class
  DeleteClass(classId: any) {
    if (confirm('Are you sure you want to delete this class?')) {
      this.service.deleteClass(classId).subscribe({
        next: () => {
          this.toastr.success('Class deleted successfully!');
          this.loadData();  // Reload the class list after deletion
        },
        error: (error) => {
          console.error('Error deleting class:', error);
          this.toastr.error('Failed to delete the class. Please try again.');
        }
      });
    }
  }

  // Method to load subjects data
  loadSubjects() {
    this.Subservice.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }

  // Method to add a new subject
  AddSubject() {
    if (this.newSubjectName) {
      const newSubject = { subjectName: this.newSubjectName };

      this.Subservice.AddSubject(newSubject).subscribe(
        response => {
          console.log('Subject added successfully:', response);
          this.toastr.success('Subject added successfully');
          this.loadSubjects();  // Reload the subjects list after addition
          this.newSubjectName = '';  // Reset the input field
        },
        error => {
          console.error('Error adding subject:', error);
          this.toastr.error('Error adding subject');
        }
      );
    }
  }

  // Method to delete a subject
  DeleteSubject(subjectId: any) {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.Subservice.deleteSubject(subjectId).subscribe({
        next: () => {
          this.toastr.success('Subject deleted successfully!');
          this.loadSubjects();  // Reload the subjects list after deletion
        },
        error: (error) => {
          console.error('Error deleting subject:', error);
          this.toastr.error('Failed to delete the subject. Please try again.');
        }
      });
    }
  }
}