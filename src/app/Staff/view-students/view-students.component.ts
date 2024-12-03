import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentRegisterService } from '../../Service/Register/student-register.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegisterStudentComponent } from '../register-student/register-student.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ViewclassService } from '../../Service/Class/viewclass.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-students',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './view-students.component.html',
  styleUrl: './view-students.component.css',
  providers: [StudentRegisterService]
})
export class ViewStudentsComponent implements OnInit{
  students: any[] = [];
  filteredStudents: any[] = [];
  userRole: string = '';
  selectedClassId: string = ''; // Store selected class ID
  classes: any[] = []; // Store list of available classes

  constructor(private service: StudentRegisterService, private router: Router, private toastr: ToastrService,private classService : ViewclassService) { }

  ngOnInit(): void {
    this.loadData();
    this.userRole = localStorage.getItem('role') || '';
    if (!this.userRole) {
      console.error('User ID not found in localStorage!');
    }
  }

  loadData() {
    this.service.getStudents().subscribe(data => {
      this.students = data.map((student: any) => ({
        ...student,
        enrollmentDate: new Date(student.enrollmentDate) // Convert to Date object
      }));
      this.filteredStudents = [...this.students]; // Initially show all students
    });

    // Fetch class list for the filter dropdown
    this.classService.getClasses().subscribe(data => {
      this.classes = data; // Assuming the service provides a list of classes
    });
  }

  onClassChange() {
    if (this.selectedClassId === '') {
      this.filteredStudents = [...this.students]; // Show all students if no class is selected
    } else {
      this.filteredStudents = this.students.filter(student => 
        student.class.id === this.selectedClassId // Filter students by class ID
      );
    }
  }

  EditStudent(id: string) {
    this.router.navigate(["/staff/studentupdate/" + id]);
  }

  DeleteStudent(deleteId: any) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.service.deleteStudent(deleteId).subscribe(
        () => {
          this.toastr.success('Student deleted successfully!');
          this.loadData(); // Refresh the student list after deletion
        },
        (error) => {
          console.error('Error deleting student:', error);
          this.toastr.error('Failed to delete the student. Please try again.');
        }
      );
    }
  }
}