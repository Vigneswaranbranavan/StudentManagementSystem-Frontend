import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentRegisterService } from '../../Service/Register/student-register.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegisterStudentComponent } from '../register-student/register-student.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-students',
  standalone: true,
  imports: [NgFor, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './view-students.component.html',
  styleUrl: './view-students.component.css',
  providers: [StudentRegisterService]
})
export class ViewStudentsComponent implements OnInit{
  students: any[] = [];
  


  constructor(private service: StudentRegisterService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData();
  }


  

  loadData() {
    this.service.getStudents().subscribe(data => {
      this.students = data.map((student: any) => ({
        ...student,
        enrollmentDate: new Date(student.enrollmentDate) // Convert to Date object
      }));
    });
  }
  
  


  // addstudent(){
  //   this.router.navigate(["/student-register"]);
  // }

  EditStudent(id: string)
  {
    this.router.navigate(["/staff/studentupdate/" + id]);
  }

  DeleteStudent(deleteId: any) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.service.deleteStudent(deleteId).subscribe(
        () => {
          // alert('Student deleted successfully!');
          this.toastr.success('Student deleted successfully!');
          this.loadData(); // Refresh the student list after deletion
        },
        (error) => {
          console.error('Error deleting student:', error);
          // alert('Failed to delete the student. Please try again.');
          this.toastr.error('Failed to delete the student. Please try again.');
        }
      );
    }
  }
  
  



 
 
 
}
