import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StudentProfileService } from '../../Service/Profile/student-profile.service';
import { student } from '../../Service/Models/model';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [
    RouterModule, HttpClientModule, ReactiveFormsModule, CommonModule
  ],
  providers: [StudentProfileService]
})
export class EditProfileComponent implements OnInit {

  userId: string = '';  // User ID will be fetched from localStorage
  date = ''

  student: student = {
    id: '',
    name: '',
    phone: '',
    gender: 0,
    indexNumber: '',

    enrollmentDate: '',
    classID: '',
    class: {
      id: '',
      className: '',
    },
    userRes: {
      id: '',
      email: ''
    }
  };

  genderOptions = [
    { value: 1, label: 'Male' },
    { value: 2, label: 'Female' },
    { value: 3, label: 'Other' }
  ];


  constructor(
    private studentProfileService: StudentProfileService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    this.userId = localStorage.getItem('UserId') || '';
    console.log('userId from localStorage:', this.userId);
    if (this.userId) {
      this.getStudentInfo(this.userId);
    }
  }

  getStudentInfo(studentid: string) {
    this.studentProfileService.getStudent(studentid).subscribe(
      (data) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student:', error);
      }
    );
  }

  get genderDisplay(): string {
    const matchOption = this.genderOptions.find(opt => opt.value === this.student.gender);
    return matchOption ? matchOption.label : 'Unknown';
  }
}
