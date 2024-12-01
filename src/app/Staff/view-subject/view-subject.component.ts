import { Component } from '@angular/core';
import { ViewSubjectService } from '../../Service/Subject/view-subject.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-subject',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule, ToastrModule],
  templateUrl: './view-subject.component.html',
  styleUrl: './view-subject.component.css',
  providers: [ViewSubjectService]
})
export class ViewSubjectComponent {

  subjects: any[] = [];


  constructor(
    private service: ViewSubjectService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }


  newSubjectName: string = ''; 


  AddSubject() {
    if (this.newSubjectName) {
      const newSubject = { subjectName: this.newSubjectName }; 

      this.service.AddSubject(newSubject).subscribe(
        response => {
          console.log('Subject added successfully:', response);
          this.toastr.success('Subject added successfully!!')
          this.loadData(); 
          this.newSubjectName = ''; 
        },
        error => {
          console.error('Error adding Subject:', error);
          this.toastr.error('Error adding Subject!!')
        }
      );
    }
  }



  DeleteSubject(subjectId: any) {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.service.deleteSubject(subjectId).subscribe({
        next: () => {
          this.toastr.success('subject deleted successfully!');
          this.loadData(); 
        },
        error: (error) => {
          console.error('Error deleting subject:', error);
          this.toastr.error('Failed to delete the subject. Please try again.');
        }
      });
    }
  }






}
