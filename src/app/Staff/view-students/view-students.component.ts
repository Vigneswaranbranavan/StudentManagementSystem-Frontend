import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentRegisterService } from '../../Service/Register/student-register.service';
import { Router } from '@angular/router';
import { RegisterStudentComponent } from '../register-student/register-student.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-students',
  standalone: true,
  imports: [NgFor, HttpClientModule],
  templateUrl: './view-students.component.html',
  styleUrl: './view-students.component.css',
  providers: [StudentRegisterService]
})
export class ViewStudentsComponent implements OnInit{
  students: any[] = [];
  // search: string = '';

  constructor(private service: StudentRegisterService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.service.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  addstudent(){
    this.router.navigate(["/student-register"]);
  }




 
 
 
}