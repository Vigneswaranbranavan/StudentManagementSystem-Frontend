import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';
import { student } from '../../Service/Models/models';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [
    RouterModule,HttpClientModule, ReactiveFormsModule
  ],
  providers: [StudentProfileService]
})
export class EditProfileComponent implements OnInit {

  studentid: string;
  





  student: student = {
    id: '',
    name: '',
    phone: '',
    enrollmentDate: '',
    classID: ''
  };

  constructor(
    private studentProfileService: StudentProfileService,
    private route: ActivatedRoute
  ) {
    const tid = this.route.snapshot.paramMap.get('id');
    this.studentid = String(tid);
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
