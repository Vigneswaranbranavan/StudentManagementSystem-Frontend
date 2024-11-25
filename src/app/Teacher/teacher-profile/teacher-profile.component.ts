import { Component, OnInit, reflectComponentType } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeacherProfileService } from '../../Service/Profile/teacher-profile.service';
import { Teacher, student } from '../../Service/Models/model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';

@Component({
  standalone:true,
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
  imports:[RouterModule,HttpClientModule,ReactiveFormsModule]

})
export class TeacherProfileComponent implements OnInit {

 
  teacherid: string;
  
  teacher: Teacher = {
    id: '',
    name: '',
    email: '',
    phone: '',
    subjectID: '',
  };

  constructor(
    private teacherProfileService: TeacherProfileService,
    private route: ActivatedRoute
  ) {
    const tid = this.route.snapshot.paramMap.get('id');
    this.teacherid = String(tid);
  }

  ngOnInit(): void {
    if (this.teacherid) {
      this.getStudentInfo(this.teacherid);  // Fetch student data using studentid
    }
  }

  getStudentInfo(teacherid: string) {
    this.teacherProfileService.getTeacher(teacherid).subscribe(
      (data) => {
        this.teacher = data;
      },
      (error) => {
        console.error('Error fetching student:', error);
        // Optionally, show user-friendly error messages (e.g., using toastr)
      }
    );
  }
}
