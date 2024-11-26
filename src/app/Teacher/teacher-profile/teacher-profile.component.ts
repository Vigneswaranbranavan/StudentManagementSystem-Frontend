import { Component, OnInit, reflectComponentType } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeacherProfileService } from '../../Service/Profile/teacher-profile.service';
import { student, teacher } from '../../Service/Models/model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule,NgIf],
  providers:[TeacherProfileService]

})
export class TeacherProfileComponent implements OnInit {


  teacherid: string;
  

  Teacher: teacher = {
    email: '',
    id: '',
    name: '',
    phone: '',
    subjectID: '',
  };

  constructor(
    private TeacherProfileService: TeacherProfileService,
    private route: ActivatedRoute
  ) {
    const tid = this.route.snapshot.paramMap.get('id');
    this.teacherid = String(tid);
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    if (this.teacherid) {
      this.getTeacherInfo(this.teacherid);  // Fetch teacher data using teacherid
    }
  }

  getTeacherInfo(teacherid: string) {
    this.TeacherProfileService.getTeacher(teacherid).subscribe(
      (data) => {
        console.log('Teacher data:', data);  // Log the response to see the structure
        this.Teacher = data;
      },
      (error) => {
        console.error('Error fetching Teacher:', error);
      }
    );
  }
  
}