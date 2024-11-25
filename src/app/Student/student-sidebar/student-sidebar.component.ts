import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { student } from '../../Service/Models/model';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [NgClass,  RouterModule,HttpClientModule,ReactiveFormsModule],

  templateUrl: './student-sidebar.component.html',
  styleUrl: './student-sidebar.component.css'
})
export class StudentSidebarComponent implements  OnInit {
  isOpen = true;
  userName: string = '';

  studentid: string;
  


  toggleSidebar() {
    this.isOpen = !this.isOpen;  // Toggle sidebar visibility
  }



  student: student = {
    id: '',
    name: '',
    phone: '',
    enrollmentDate: '',
    classID: ''
  };


  constructor
  (  
    private studentProfileService: StudentProfileService,
    private route: ActivatedRoute
  )
  {
    const Sid = this.route.snapshot.paramMap.get('id');
    this.studentid = String(Sid);
  }

  ngOnInit(): void {
    if (this.studentid) {
      this.getStudentInfo(this.studentid);  // Fetch student data using studentid
    }
  }

  getStudentInfo(studentid: string) {
    this.studentProfileService.getStudent(studentid).subscribe(
      (data) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student:', error);
        // Optionally, show user-friendly error messages (e.g., using toastr)
      }
    );
  }
}


